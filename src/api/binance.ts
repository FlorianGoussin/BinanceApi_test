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

const headers = { Accept: 'application/json' };

const timeFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};

export async function getCurrencyPairs() {
  const { data } = await axios.get<ExchangeInfoResponse>(
    `${binanceBaseApiUrl}/${exchangeInfoEndpoint}`, { headers },
  );
  return data.symbols;
};

export async function getTicker(symbol: string): Promise<TickerResponse[]> {
  const { data } = await axios.get<TickerResponse | TickerResponse[]>(
    `${binanceBaseApiUrl}/${tickerEndpoint}?symbol=${symbol}`, { headers },
  );
  // Make sure we get an array is returned
  if (Array.isArray(data)) {
    return data;
  }
  return [data];
}

export async function getTicker24(symbol: string): Promise<Ticker24Response[]> {
  const response = await axios.get<Ticker24Response | Ticker24Response[]>(
    `${binanceBaseApiUrl}/${ticker24Endpoint}?symbol=${symbol}`, { headers },
  );
  const data = Array.isArray(response.data) ? response.data : [response.data];
  return data.map((row: Ticker24Response | any) => ({
    ...row,
    openTime: new Intl.DateTimeFormat('en-US', timeFormat).format(row.openTime),
    closeTime: new Intl.DateTimeFormat('en-US', timeFormat).format(row.closeTime)
  } as Ticker24Response));
}

export async function getTrades(symbol: string): Promise<TradesResponse[]> {
  const { data } = await axios.get<TradesResponse[]>(
    `${binanceBaseApiUrl}/${tradesEndpoint}?symbol=${symbol}`, { headers },
  );
  // Format dates
  return data.map((row: TradesResponse | any) => ({
    ...row,
    time: new Intl.DateTimeFormat('en-US', timeFormat).format(row.time)
  } as TradesResponse));
}