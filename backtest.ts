import "dotenv/config";
import { binance } from "ccxt"; // Importação corrigida para Node v24
import { StrategyService } from "./src/strategy/strategy.service";
import { ENV } from "./src/env";

// --- ⚙️ CONFIGURAÇÃO ---
const CONFIG = {
	symbol: "XRP/USDT",
	timeframe: "M15",
	tp: 0.05,
	sl: 0.04,
	days: 30,
};

const TF_MAP: Record<string, string> = { M15: "15m", H1: "1h", H4: "4h" };

async function runBacktest() {
	const ccxtTimeframe = TF_MAP[CONFIG.timeframe];
	console.log(`\n🕵️ [AUDITORIA] Iniciando Backtest Manual`);
	console.log(`🎯 Alvo: ${CONFIG.symbol} | TF: ${CONFIG.timeframe}`);
	console.log(
		`⚙️ Config: TP ${(CONFIG.tp * 100).toFixed(1)}% | SL ${(CONFIG.sl * 100).toFixed(1)}%`,
	);

	const exchange = new binance({
		options: { defaultType: "future" },
		enableRateLimit: true,
	});

	console.log(`📥 Baixando ${CONFIG.days} dias de dados... Aguarde.`);
	const candles = await fetchHistoricalCandles(
		exchange,
		CONFIG.symbol,
		ccxtTimeframe,
		CONFIG.days,
	);
	console.log(`✅ ${candles.length} candles carregados.`);

	if (candles.length < 200) {
		console.error("❌ Dados insuficientes.");
		return;
	}

	const strategy = new StrategyService();
	let balance = 1000;
	const initialBalance = balance;
	const amount = 100;
	const leverage = 1;

	let wins = 0;
	let losses = 0;
	let position: {
		side: string;
		entryPrice: number;
		entryIndex: number;
	} | null = null;

	console.log("\n▶️ TIMELINE DE TRADES");
	console.log(
		"----------------------------------------------------------------",
	);

	// --- INÍCIO DO LOOP ---
	for (let i = 200; i < candles.length; i++) {
		const candle = candles[i];
		const currentPrice = candle.close;
		const candleDate = new Date(candle.closeTime).toLocaleString();

		// --- A. VERIFICAR SAÍDA (Se estiver posicionado) ---
		if (position) {
			const high = candle.high;
			const low = candle.low;
			let closed = false;
			let pnlPct = 0;
			let reason = "";

			// Definição dos alvos
			let tpPrice, slPrice, hitTP, hitSL;

			if (position.side === "BUY_LONG") {
				tpPrice = position.entryPrice * (1 + CONFIG.tp);
				slPrice = position.entryPrice * (1 - CONFIG.sl);
				hitTP = high >= tpPrice;
				hitSL = low <= slPrice;
			} else {
				// SELL_SHORT
				tpPrice = position.entryPrice * (1 - CONFIG.tp);
				slPrice = position.entryPrice * (1 + CONFIG.sl);
				hitTP = low <= tpPrice;
				hitSL = high >= slPrice;
			}

			// Lógica Pessimista de Saída
			if (hitSL && hitTP) {
				pnlPct = -CONFIG.sl;
				closed = true;
				reason = "SL (Worst Case) 💀";
			} else if (hitSL) {
				pnlPct = -CONFIG.sl;
				closed = true;
				reason = "SL 💀";
			} else if (hitTP) {
				pnlPct = CONFIG.tp;
				closed = true;
				reason = "TP 🎯";
			}

			if (closed) {
				const profit = amount * leverage * pnlPct;
				const fees = amount * leverage * 0.0008;
				const netProfit = profit - fees;
				balance += netProfit;

				if (netProfit > 0) wins++;
				else losses++;

				const color = netProfit > 0 ? "\x1b[32m" : "\x1b[31m";
				const duration = i - position.entryIndex;

				console.log(
					`${color}[${candleDate}] FECHADO ${position.side} | ${reason} | PnL: $${netProfit.toFixed(2)} | Dur: ${duration} candles | Banca: $${balance.toFixed(2)}\x1b[0m`,
				);
				position = null;
			}

			// SE ESTAVA POSICIONADO, PULA PARA O PRÓXIMO CANDLE
			// Não verificamos entrada no mesmo candle que saímos/estamos
			continue;
		}

		// --- B. VERIFICAR ENTRADA (Só roda se !position por causa do continue acima) ---
		const historySlice = candles.slice(0, i + 1);
		const analysis = strategy.analyzeMarket(historySlice);

		if (analysis.action !== "NEUTRAL") {
			console.log(
				`\n[${candleDate}] 🚀 ENTRADA ${analysis.action} @ ${currentPrice}`,
			);
			console.log(`   ↳ Motivo: ${analysis.reason} | ${analysis.details}`);

			position = {
				side: analysis.action,
				entryPrice: currentPrice,
				entryIndex: i,
			};
		}
	} // --- FIM DO LOOP ---

	// --- RELATÓRIO FINAL (AGORA FORA DO LOOP) ---
	console.log(
		"----------------------------------------------------------------",
	);
	console.log("📊 RESULTADO FINAL DA AUDITORIA");
	const totalProfit = balance - initialBalance;
	const color = totalProfit >= 0 ? "\x1b[32m" : "\x1b[31m";

	console.log(
		`Config:        ${CONFIG.symbol} (TP: ${(CONFIG.tp * 100).toFixed(1)}% / SL: ${(CONFIG.sl * 100).toFixed(1)}%)`,
	);
	console.log(`Saldo Inicial: $${initialBalance}`);
	console.log(`Saldo Final:   ${color}$${balance.toFixed(2)}\x1b[0m`);
	console.log(
		`Lucro Líquido: ${color}$${totalProfit.toFixed(2)} (${((totalProfit / initialBalance) * 100).toFixed(2)}%)\x1b[0m`,
	);
	console.log(
		`Trades:        ${wins + losses} (Wins: ${wins} | Loss: ${losses})`,
	);
	console.log(
		`Win Rate:      ${((wins / (wins + losses || 1)) * 100).toFixed(1)}%`,
	);
}

// --- HELPER ---
async function fetchHistoricalCandles(
	exchange: any, // Usando any aqui para simplificar tipagem no helper manual
	symbol: string,
	timeframe: string,
	days: number,
) {
	const since = exchange.milliseconds() - days * 24 * 60 * 60 * 1000;
	let candles: any[] = [];
	let fetchSince = since;

	while (true) {
		const batch = await exchange.fetchOHLCV(
			symbol,
			timeframe,
			fetchSince,
			1000,
		);
		if (!batch || batch.length === 0) break;
		candles = candles.concat(batch);
		const lastCandle = batch[batch.length - 1];
		if (lastCandle && lastCandle[0]) {
			fetchSince = lastCandle[0] + 1;
		}
		if (batch.length < 1000) break;
		if (candles.length > 5000) break;
	}
	return candles.map((c: any) => ({
		open: c[1],
		high: c[2],
		low: c[3],
		close: c[4],
		volume: c[5],
		closeTime: c[0],
	}));
}

runBacktest();
