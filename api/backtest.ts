import "dotenv/config";
import { binance, type OHLCV } from "ccxt";
import { StrategyService } from "./src/strategy/strategy.service";

// --- Tipos de Dados ---
type Candle = {
	closeTime: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
};

type Position = {
	side: "BUY_LONG" | "SELL_SHORT";
	entryPrice: number;
	entryTime: number;
	atrAtEntry?: number;
};

// --- ⚙️ CONFIGURAÇÃO DE TESTE ---
const CONFIG = {
	symbol: "SOL/USDT",
	timeframe: "H1",
	days: 30,
	amount: 100,

	// --- ESTRATÉGIA DE SAÍDA ---
	// Opção 1: TP/SL Fixo (em porcentagem)
	useDynamicSLTP: true,
	tp: 0.05, // 5%
	sl: 0.025, // 2.5%

	// Opção 2: TP/SL Dinâmico (baseado em ATR)
	// useDynamicSLTP: true,
	atrMultiplier: 1.5, // Stop Loss = 1.5 * ATR
	tpSlRatio: 2, // Take Profit = 2 * Stop Loss
};

// Mapa para converter Enum do Prisma/App para string do CCXT
const TF_MAP: Record<string, string> = {
	M15: "15m",
	H1: "1h",
	H4: "4h",
};

async function runBacktest() {
	const ccxtTimeframe = TF_MAP[CONFIG.timeframe];

	if (!ccxtTimeframe) {
		console.error(
			`❌ Erro: Timeframe '${CONFIG.timeframe}' não definido no TF_MAP.`,
		);
		return;
	}

	console.log(`\n🕵️ [AUDITORIA DE ALTA PRECISÃO] Backtest com Drill-Down (M1)`);
	console.log(
		`🎯 Alvo: ${CONFIG.symbol} | TF: ${CONFIG.timeframe} (${ccxtTimeframe})`,
	);

	if (CONFIG.useDynamicSLTP) {
		console.log(
			`⚙️ Config: SL Dinâmico (${CONFIG.atrMultiplier} * ATR) | TP/SL Ratio: ${CONFIG.tpSlRatio}`,
		);
	} else {
		console.log(
			`⚙️ Config: TP Fixo ${(CONFIG.tp * 100).toFixed(1)}% | SL Fixo ${(
				CONFIG.sl * 100
			).toFixed(1)}%`,
		);
	}

	const exchange = new binance({
		options: { defaultType: "future" },
		enableRateLimit: true,
	});

	console.log(`📥 Baixando dados ${CONFIG.timeframe}...`);
	const candles: Candle[] = await fetchHistoricalCandles(
		exchange,
		CONFIG.symbol,
		ccxtTimeframe,
		CONFIG.days,
	);
	console.log(`✅ ${candles.length} candles carregados.`);

	if (candles.length < 200) {
		console.error("❌ Dados insuficientes (mínimo 200 para EMA/ATR).");
		return;
	}

	const strategy = new StrategyService();
	let balance = 1000;
	const initialBalance = balance;
	let wins = 0;
	let losses = 0;
	let position: Position | null = null;

	console.log(
		"\n▶️ TIMELINE DE TRADES\n" +
			"----------------------------------------------------------------",
	);

	for (let i = 200; i < candles.length; i++) {
		const candle = candles[i];
		const currentPrice = candle.close;
		const candleDate = new Date(candle.closeTime).toLocaleString();

		if (position) {
			const high = candle.high;
			const low = candle.low;
			let closed = false;
			let pnlPct = 0;
			let reason = "";

			const isLong = position.side === "BUY_LONG";
			let tpPrice: number, slPrice: number;
			let tpPct: number, slPct: number;

			if (CONFIG.useDynamicSLTP && position.atrAtEntry) {
				const slDistance = position.atrAtEntry * CONFIG.atrMultiplier;
				const tpDistance = slDistance * CONFIG.tpSlRatio;
				slPct = slDistance / position.entryPrice;
				tpPct = tpDistance / position.entryPrice;

				if (isLong) {
					slPrice = position.entryPrice - slDistance;
					tpPrice = position.entryPrice + tpDistance;
				} else {
					slPrice = position.entryPrice + slDistance;
					tpPrice = position.entryPrice - tpDistance;
				}
			} else {
				tpPct = CONFIG.tp;
				slPct = CONFIG.sl;
				tpPrice = isLong
					? position.entryPrice * (1 + tpPct)
					: position.entryPrice * (1 - tpPct);
				slPrice = isLong
					? position.entryPrice * (1 - slPct)
					: position.entryPrice * (1 + slPct);
			}

			const hitTP = isLong ? high >= tpPrice : low <= tpPrice;
			const hitSL = isLong ? low <= slPrice : high >= slPrice;

			if (hitTP && hitSL) {
				process.stdout.write(
					`\n   🔍 Conflito em ${candleDate}. Baixando M1... `,
				);
				const winner = await resolveConflict(
					exchange,
					CONFIG.symbol,
					candle.closeTime,
					ccxtTimeframe,
					tpPrice,
					slPrice,
					position.side,
				);
				if (winner === "TP") {
					pnlPct = tpPct;
					closed = true;
					reason = "TP (Validado M1) 🎯";
					process.stdout.write("TP Venceu! ✅\n");
				} else {
					pnlPct = -slPct;
					closed = true;
					reason = "SL (Validado M1) 💀";
					process.stdout.write("SL Venceu! ❌\n");
				}
			} else if (hitTP) {
				pnlPct = tpPct;
				closed = true;
				reason = "TP 🎯";
			} else if (hitSL) {
				pnlPct = -slPct;
				closed = true;
				reason = "SL 💀";
			}

			if (closed) {
				const profit = CONFIG.amount * pnlPct;
				const fees = CONFIG.amount * 0.0008;
				const netProfit = profit - fees;
				balance += netProfit;

				if (netProfit > 0) wins++;
				else losses++;

				const color = netProfit > 0 ? "\x1b[32m" : "\x1b[31m";
				console.log(
					`${color}[${candleDate}] FECHADO ${
						position.side
					} | ${reason} | PnL: $${netProfit.toFixed(
						2,
					)} | Banca: $${balance.toFixed(2)}\x1b[0m`,
				);
				position = null;
			}

			continue;
		}

		const historySlice = candles.slice(0, i + 1);
		const analysis = strategy.analyzeMarket(historySlice);

		if (analysis.action !== "NEUTRAL") {
			console.log(
				`\n[${candleDate}] 🚀 ENTRADA ${analysis.action} @ ${currentPrice.toFixed(
					4,
				)} (ATR: ${analysis.atr?.toFixed(4)})`,
			);

			position = {
				side: analysis.action as "BUY_LONG" | "SELL_SHORT",
				entryPrice: currentPrice,
				entryTime: candle.closeTime,
				atrAtEntry: analysis.atr,
			};
		}
	}

	console.log(
		"----------------------------------------------------------------\n" +
			"📊 RELATÓRIO FINAL DE PERFORMANCE",
	);

	const totalTrades = wins + losses;
	const totalProfit = balance - initialBalance;
	const profitPct = (totalProfit / initialBalance) * 100;
	const color = totalProfit >= 0 ? "\x1b[32m" : "\x1b[31m";

	console.log(`Par/Timeframe: ${CONFIG.symbol} / ${CONFIG.timeframe}`);
	console.log(`Período:       ${CONFIG.days} dias`);
	console.log(
		`Trades:        ${totalTrades} (✅ ${wins} Wins | ❌ ${losses} Losses)`,
	);
	console.log(
		`Win Rate:      ${
			totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0
		}%`,
	);
	console.log(`Saldo Inicial: $${initialBalance.toFixed(2)}`);
	console.log(`Saldo Final:   ${color}$${balance.toFixed(2)}\x1b[0m`);
	console.log(
		`Lucro Líquido: ${color}$${totalProfit.toFixed(2)} (${profitPct.toFixed(
			2,
		)}%)\x1b[0m`,
	);
	console.log(
		"----------------------------------------------------------------",
	);
}

// --- 🔬 FUNÇÃO LUPA (Drill-Down) ---
// Resolve conflitos baixando velas de 1 minuto
async function resolveConflict(
	exchange: any,
	symbol: string,
	candleCloseTime: number,
	parentTimeframe: string,
	tpPrice: number,
	slPrice: number,
	side: string,
): Promise<"TP" | "SL"> {
	const DURATION_MAP: Record<string, number> = {
		"15m": 15,
		"1h": 60,
		"4h": 240,
	};
	const durationMinutes = DURATION_MAP[parentTimeframe] || 15;
	const timeframeMs = durationMinutes * 60 * 1000;
	const fetchSince = candleCloseTime - timeframeMs + 1;

	try {
		const m1Candles: OHLCV[] = await exchange.fetchOHLCV(
			symbol,
			"1m",
			fetchSince,
			durationMinutes,
		);
		m1Candles.sort((a, b) => a[0] - b[0]);

		for (const candle of m1Candles) {
			const high = candle[2];
			const low = candle[3];

			if (side === "BUY_LONG") {
				if (low <= slPrice) return "SL";
				if (high >= tpPrice) return "TP";
			} else {
				if (high >= slPrice) return "SL";
				if (low <= tpPrice) return "TP";
			}
		}
	} catch (e) {
		console.error(`\n   ⚠️ Erro ao baixar M1 para resolver conflito: ${e}`);
	}

	return "SL";
}

// --- HELPER DE PAGINAÇÃO DE DADOS ---
async function fetchHistoricalCandles(
	exchange: any,
	symbol: string,
	timeframe: string,
	days: number,
): Promise<Candle[]> {
	const since = exchange.milliseconds() - days * 24 * 60 * 60 * 1000;
	let allCandles: OHLCV[] = [];
	let fetchSince = since;

	console.log(
		`   ↳ Baixando lotes de 1000 velas desde ${new Date(
			since,
		).toISOString()}`,
	);

	while (true) {
		process.stdout.write(`   ↳ Buscando ${allCandles.length} velas...`);
		const batch: OHLCV[] = await exchange.fetchOHLCV(
			symbol,
			timeframe,
			fetchSince,
			1000,
		);
		if (!batch || batch.length === 0) {
			process.stdout.write(" Fim do histórico.\n");
			break;
		}
		allCandles = allCandles.concat(batch);
		fetchSince = batch[batch.length - 1][0] + 1;
		if (batch.length < 1000) {
			process.stdout.write(" Último lote recebido.\n");
			break;
		}
	}

	return allCandles
		.map((c: OHLCV) => ({
			closeTime: c[0],
			open: c[1],
			high: c[2],
			low: c[3],
			close: c[4],
			volume: c[5],
		}))
		.sort((a, b) => a.closeTime - b.closeTime);
}

runBacktest();
