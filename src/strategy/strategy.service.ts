import { Injectable, Logger } from "@nestjs/common";
import { EMA, RSI, MACD } from "technicalindicators";

// Definindo tipos para clareza
export interface CandleData {
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	closeTime: number;
}

export interface TradeSignal {
	action: "BUY_LONG" | "SELL_SHORT" | "NEUTRAL";
	reason: string;
	price: number;
}

@Injectable()
export class StrategyService {
	private readonly logger = new Logger(StrategyService.name);

	/**
	 * Analisa o mercado com base na estratégia Trend Following.
	 * @param candles Array de candles (o mais recente é o último do array)
	 */
	public analyzeMarket(candles: CandleData[]): TradeSignal {
		// Precisamos de dados suficientes para o EMA200
		if (candles.length < 200) {
			this.logger.warn("Dados insuficientes para calcular indicadores.");
			return { action: "NEUTRAL", reason: "Not enough data", price: 0 };
		}

		// Extrair apenas os preços de fechamento para os cálculos
		const closes = candles.map((c) => c.close);
		const currentPrice = closes[closes.length - 1];

		// 1. Calcular EMA 200 (Tendência de Longo Prazo)
		const ema200Values = EMA.calculate({ period: 200, values: closes });
		const lastEma200 = ema200Values[ema200Values.length - 1];

		// 2. Calcular RSI 14 (Força Relativa)
		const rsiValues = RSI.calculate({ period: 14, values: closes });
		const lastRsi = rsiValues[rsiValues.length - 1];

		// 3. Calcular MACD (Momentum)
		// Configuração padrão MACD (12, 26, 9)
		const macdValues = MACD.calculate({
			values: closes,
			fastPeriod: 12,
			slowPeriod: 26,
			signalPeriod: 9,
			SimpleMAOscillator: false,
			SimpleMASignal: false,
		});
		const lastMacd = macdValues[macdValues.length - 1];
		const prevMacd = macdValues[macdValues.length - 2];

		if (
			!prevMacd ||
			!lastMacd ||
			prevMacd.MACD === undefined ||
			prevMacd.signal === undefined ||
			lastMacd.MACD === undefined ||
			lastMacd.signal === undefined
		) {
			this.logger.warn(
				"Dados de MACD insuficientes ou inválidos para a análise.",
			);
			return {
				action: "NEUTRAL",
				reason: "Insufficient or invalid MACD data",
				price: currentPrice,
			};
		}

		// Lógica de Cruzamento do MACD (Histograma ou Linha MACD x Sinal)
		// Bullish Cross: Linha MACD cruza para cima da Linha de Sinal
		const isMacdBullish =
			prevMacd.MACD <= prevMacd.signal && lastMacd.MACD > lastMacd.signal;

		// Bearish Cross: Linha MACD cruza para baixo da Linha de Sinal
		const isMacdBearish =
			prevMacd.MACD >= prevMacd.signal && lastMacd.MACD < lastMacd.signal;

		this.logger.log(
			`Análise: Preço(${currentPrice}) | EMA200(${lastEma200.toFixed(2)}) | RSI(${lastRsi.toFixed(2)})`,
		);

		// --- APLICAÇÃO DAS REGRAS DE NEGÓCIO ---

		// REGRA DE COMPRA (LONG)
		// 1. Preço ACIMA da EMA200 (Tendência de alta)
		// 2. RSI < 70 (Ainda tem espaço para subir, não está sobrecomprado)
		// 3. MACD Cruzamento de Alta (Momentum positivo iniciando)
		if (currentPrice > lastEma200 && lastRsi < 70 && isMacdBullish) {
			return {
				action: "BUY_LONG",
				reason: "Trend Bullish + RSI OK + MACD Cross Up",
				price: currentPrice,
			};
		}

		// REGRA DE VENDA (SHORT)
		// 1. Preço ABAIXO da EMA200 (Tendência de baixa)
		// 2. RSI > 30 (Ainda tem espaço para cair, não está sobrevendido)
		// 3. MACD Cruzamento de Baixa (Momentum negativo iniciando)
		if (currentPrice < lastEma200 && lastRsi > 30 && isMacdBearish) {
			return {
				action: "SELL_SHORT",
				reason: "Trend Bearish + RSI OK + MACD Cross Down",
				price: currentPrice,
			};
		}

		return { action: "NEUTRAL", reason: "No setup found", price: currentPrice };
	}
}
