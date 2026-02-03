import "dotenv/config";
import * as ccxt from "ccxt";
import { StrategyService } from "./src/strategy/strategy.service";

// --- 🤖 CONFIGURAÇÃO DO BOT (Simulando o Banco de Dados) ---
// Aqui você define o cenário que quer testar, como se fosse um bot criado no sistema
const MOCK_BOT = {
	name: "XRP Test Bot",
	symbol: "XRP/USDT",
	timeframe: "M15", // Timeframe do Enum (M15, H1, H4)
	amount: 2, // Valor da aposta ($)
	tp: 0.02, // Take Profit (1.5%)
	sl: 0.015, // Stop Loss (1.0%)
	leverage: 10, // Alavancagem (Simulada)
};

const DAYS_TO_TEST = 120; // Quantos dias olhar para trás

// Mapeamento igual ao do TradeProcessor
const TF_MAP: Record<string, string> = { M15: "15m", H1: "1h", H4: "4h" };

async function runBacktest() {
	const ccxtTimeframe = TF_MAP[MOCK_BOT.timeframe];
	console.log(`⏳ [BACKTEST] Iniciando simulação para ${MOCK_BOT.name}`);
	console.log(
		`⚙️ Config: ${MOCK_BOT.symbol} | TP: ${(MOCK_BOT.tp * 100).toFixed(1)}% | SL: ${(MOCK_BOT.sl * 100).toFixed(1)}%`,
	);

	// 1. Baixar Dados
	const exchange = new ccxt.binance({ options: { defaultType: "future" } });
	const since = exchange.milliseconds() - DAYS_TO_TEST * 24 * 60 * 60 * 1000;

	let candles = [];
	let fetchSince = since;

	process.stdout.write("📥 Baixando candles... ");
	while (true) {
		const batch = await exchange.fetchOHLCV(
			MOCK_BOT.symbol,
			ccxtTimeframe,
			fetchSince,
			1000,
		);
		if (!batch.length) break;
		candles = candles.concat(batch);
		fetchSince = batch[batch.length - 1][0] + 1;
		if (batch.length < 1000) break;
	}
	console.log(`✅ ${candles.length} candles baixados.`);

	// 2. Preparar Simulação
	const strategy = new StrategyService();
	let balance = 20; // Banca Inicial Fictícia
	const initialBalance = balance;

	let wins = 0;
	let losses = 0;
	let position = null; // Guarda o trade aberto

	console.log("\n▶️ INICIANDO TIMELINE...");
	console.log(
		"----------------------------------------------------------------",
	);

	// Loop Candle a Candle
	// Começamos do 200 porque a EMA precisa de histórico
	for (let i = 200; i < candles.length; i++) {
		const currentCandle = candles[i];
		const currentPrice = currentCandle[4]; // Close
		const candleDate = new Date(currentCandle[0]).toLocaleString();

		// --- A. VERIFICAR SAÍDA (TP/SL) ---
		if (position) {
			const high = currentCandle[2];
			const low = currentCandle[3];
			let closed = false;
			let pnlPct = 0;
			let reason = "";

			if (position.side === "BUY_LONG") {
				const tpPrice = position.entryPrice * (1 + MOCK_BOT.tp);
				const slPrice = position.entryPrice * (1 - MOCK_BOT.sl);

				if (high >= tpPrice) {
					pnlPct = MOCK_BOT.tp; // Ganhou o TP cheio
					closed = true;
					reason = "TP 🎯";
				} else if (low <= slPrice) {
					pnlPct = -MOCK_BOT.sl; // Perdeu o SL cheio
					closed = true;
					reason = "SL 💀";
				}
			} else {
				// SELL_SHORT
				const tpPrice = position.entryPrice * (1 - MOCK_BOT.tp);
				const slPrice = position.entryPrice * (1 + MOCK_BOT.sl);

				if (low <= tpPrice) {
					pnlPct = MOCK_BOT.tp;
					closed = true;
					reason = "TP 🎯";
				} else if (high >= slPrice) {
					pnlPct = -MOCK_BOT.sl;
					closed = true;
					reason = "SL 💀";
				}
			}

			if (closed) {
				// Cálculo Financeiro
				const grossProfit = MOCK_BOT.amount * MOCK_BOT.leverage * pnlPct;
				// Taxas (Aprox 0.08% total ida e volta sobre o volume notional)
				const fees = MOCK_BOT.amount * MOCK_BOT.leverage * 0.0008;
				const netProfit = grossProfit - fees;

				balance += netProfit;
				if (netProfit > 0) wins++;
				else losses++;

				const color = netProfit > 0 ? "\x1b[32m" : "\x1b[31m"; // Verde ou Vermelho
				const reset = "\x1b[0m";

				console.log(
					`${color}[${candleDate}] FECHADO ${position.side} | ${reason} | PnL: $${netProfit.toFixed(2)} | Banca: $${balance.toFixed(2)}${reset}`,
				);
				position = null;
			}
			continue; // Se estava posicionado, não procura entrada no mesmo candle
		}

		// --- B. VERIFICAR ENTRADA (STRATEGY SERVICE) ---
		// Cria fatia do histórico até o momento atual
		const historySlice = candles.slice(0, i + 1).map((c) => ({
			open: c[1],
			high: c[2],
			low: c[3],
			close: c[4],
			volume: c[5],
			closeTime: c[0],
		}));

		// CHAMA SEU NOVO STRATEGY SERVICE
		const analysis = strategy.analyzeMarket(historySlice);

		if (analysis.action !== "NEUTRAL") {
			console.log(
				`\n[${candleDate}] 🚀 ENTRADA ${analysis.action} @ ${currentPrice}`,
			);
			console.log(`   ↳ Motivo: ${analysis.reason}`);
			console.log(`   ↳ Dados: ${analysis.details}`);

			position = {
				side: analysis.action,
				entryPrice: currentPrice,
				entryTime: currentCandle[0],
			};
		}
	}

	// --- RELATÓRIO FINAL ---
	console.log(
		"----------------------------------------------------------------",
	);
	console.log("📊 RESULTADO FINAL");
	const totalProfit = balance - initialBalance;
	const color = totalProfit >= 0 ? "\x1b[32m" : "\x1b[31m";

	console.log(`Saldo Inicial: $${initialBalance}`);
	console.log(`Saldo Final:   ${color}$${balance.toFixed(2)}\x1b[0m`);
	console.log(`Lucro Líquido: ${color}$${totalProfit.toFixed(2)}\x1b[0m`);
	console.log(`Trades: ${wins + losses} (Wins: ${wins} | Loss: ${losses})`);
	console.log(`Win Rate: ${((wins / (wins + losses || 1)) * 100).toFixed(1)}%`);
}

runBacktest();
