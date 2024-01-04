import axios from 'axios';
import type {
  ExchangeInfoResponse,
  TickerResponse,
  Ticker24Response,
  TradesResponse
} from './binance.d';

const apiVersionUrl = '/api/v3';
const binanceBaseApiUrl = import.meta.env.VITE_BINANCE_BASE_API_URL + apiVersionUrl;

const exchangeInfoEndpoint = 'exchangeInfo';
const tickerEndpoint = 'ticker/price';
const ticker24Endpoint = 'ticker/24hr';
const tradesEndpoint = 'trades';

const headers = {
  Accept: 'application/json',
};

export async function getCurrencyPairs() {
  const { data } = await axios.get<ExchangeInfoResponse>(
    `${binanceBaseApiUrl}/${exchangeInfoEndpoint}`, { headers },
  );
  return data.symbols;
};

export async function getTicker(symbol: string) {
  const { data } = await axios.get<TickerResponse>(
    `${binanceBaseApiUrl}/${tickerEndpoint}?symbol=${symbol}`, { headers },
  );
  return data;
}

export async function getTicker24(symbol: string) {
  const { data } = await axios.get<Ticker24Response>(
    `${binanceBaseApiUrl}/${ticker24Endpoint}?symbol=${symbol}`, { headers },
  );
  return data;
}

export async function getTrades(symbol: string) {
  const { data } = await axios.get<TradesResponse>(
    `${binanceBaseApiUrl}/${tradesEndpoint}?symbol=${symbol}`, { headers },
  );
  return data;
}