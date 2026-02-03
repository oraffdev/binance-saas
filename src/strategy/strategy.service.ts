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

export interface StrategyResult {
	action: "BUY_LONG" | "SELL_SHORT" | "NEUTRAL";
	reason: string; // Explicação humana (ex: "RSI alto demais")
	details: string; // Valores técnicos (ex: "RSI: 55 | Price: 100 > EMA: 90")
}

@Injectable()
export class StrategyService {
	private readonly RSI_LONG_THRESHOLD = 35;
	private readonly RSI_SHORT_THRESHOLD = 65;
	private readonly logger = new Logger(StrategyService.name);

	/**
	 * Analisa o mercado com base na estratégia Trend Following.
	 * @param candles Array de candles (o mais recente é o último do array)
	 */
	public analyzeMarket(candles: any[]): StrategyResult {
		// Precisamos de pelo menos 200 candles para EMA
		if (candles.length < 200) {
			return {
				action: "NEUTRAL",
				reason: "Dados insuficientes",
				details: `Candles: ${candles.length}/200`,
			};
		}

		// 1. Prepara os dados (Array de preços de fechamento)
		const closes = candles.map((c) => c.close);
		const currentPrice = closes[closes.length - 1];

		// 2. Calcula Indicadores
		// RSI (14 períodos)
		const rsiValues = RSI.calculate({
			values: closes,
			period: 14,
		});
		const rsi = rsiValues[rsiValues.length - 1];

		// EMA (200 períodos - Tendência)
		const emaValues = EMA.calculate({
			values: closes,
			period: 200,
		});
		const ema = emaValues[emaValues.length - 1];

		// Formatação para logs (arredondar valores)
		const rsiFmt = rsi.toFixed(2);
		const priceFmt = currentPrice.toFixed(4);
		const emaFmt = ema.toFixed(4);

		// String de detalhes técnicos para logar sempre
		const details = `Preço: ${priceFmt} | EMA200: ${emaFmt} | RSI: ${rsiFmt}`;

		// 3. Lógica de Decisão (O "Cérebro")

		// --- ANÁLISE PARA LONG (COMPRA) ---
		// Regra: Preço ACIMA da EMA (Tendência Alta) + RSI BAIXO (Correção/Oportunidade)
		if (currentPrice > ema) {
			if (rsi < this.RSI_LONG_THRESHOLD) {
				return {
					action: "BUY_LONG",
					reason: "Tendência de Alta confirmada + RSI Sobrevendido",
					details,
				};
			}
			// Se está acima da EMA mas RSI não está baixo
			else {
				return {
					action: "NEUTRAL",
					reason: `Tendência de Alta (OK), mas RSI ${rsiFmt} ainda não está baixo o suficiente (< ${this.RSI_LONG_THRESHOLD})`,
					details,
				};
			}
		}

		// --- ANÁLISE PARA SHORT (VENDA) ---
		// Regra: Preço ABAIXO da EMA (Tendência Baixa) + RSI ALTO (Repique/Oportunidade)
		else if (currentPrice < ema) {
			if (rsi > this.RSI_SHORT_THRESHOLD) {
				return {
					action: "SELL_SHORT",
					reason: "Tendência de Baixa confirmada + RSI Sobrecomprado",
					details,
				};
			}
			// Se está abaixo da EMA mas RSI não está alto
			else {
				return {
					action: "NEUTRAL",
					reason: `Tendência de Baixa (OK), mas RSI ${rsiFmt} ainda não está alto o suficiente (> ${this.RSI_SHORT_THRESHOLD})`,
					details,
				};
			}
		}

		// Fallback (caso raro onde preço == ema)
		return { action: "NEUTRAL", reason: "Indefinido", details };
	}
}
