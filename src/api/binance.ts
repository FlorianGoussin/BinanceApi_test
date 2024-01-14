import axios from 'axios'
import type {
  ExchangeInfoSymbol,
  ExchangeInfoResponse,
  TickerResponse,
  Ticker24Response,
  TradesResponse
} from './binance-types'
const baseUrl = import.meta.env.VITE_BINANCE_BASE_API_URL

export const apiVersionUrl = '/api/v3'
export const binanceBaseApiUrl = baseUrl + apiVersionUrl
export const exchangeInfoEndpoint = 'exchangeInfo'
export const tickerEndpoint = 'ticker/price'
export const ticker24Endpoint = 'ticker/24hr'
export const tradesEndpoint = 'trades'

const headers = { Accept: 'application/json' }

const timeFormat: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}

export async function getCurrencyPairs(): Promise<ExchangeInfoSymbol[]> {
  try {
    const { data } = await axios.get<ExchangeInfoResponse>(
      `${binanceBaseApiUrl}/${exchangeInfoEndpoint}`,
      { headers }
    )
    return data.symbols
  } catch(error) {
    console.error(error)
    return []
  }
}

export async function getTicker(symbol: string): Promise<TickerResponse[]> {
  try {
    const { data } = await axios.get<TickerResponse | TickerResponse[]>(
      `${binanceBaseApiUrl}/${tickerEndpoint}?symbol=${symbol}`,
      { headers }
    )
    // Make sure we get an array is returned
    if (Array.isArray(data)) {
      return data
    }
    return [data]
  } catch(error) {
    console.error(error)
    return []
  }
}

export async function getTicker24(symbol: string): Promise<Ticker24Response[]> {
  try {
    const response = await axios.get<Ticker24Response | Ticker24Response[]>(
      `${binanceBaseApiUrl}/${ticker24Endpoint}?symbol=${symbol}`,
      { headers }
    )
    const data = Array.isArray(response.data) ? response.data : [response.data]
    return data.map(
      (row: Ticker24Response) =>
        ({
          ...row,
          openTime: new Intl.DateTimeFormat('en-US', timeFormat).format(
            new Date(row.openTime)
          ),
          closeTime: new Intl.DateTimeFormat('en-US', timeFormat).format(
            new Date(row.closeTime)
          )
        }) as Ticker24Response
    )
  } catch(error) {
    console.error(error)
    return []
  }
}

export async function getTrades(symbol: string): Promise<TradesResponse[]> {
  try {
    const { data } = await axios.get<TradesResponse[]>(
      `${binanceBaseApiUrl}/${tradesEndpoint}?symbol=${symbol}`,
      { headers }
    )
    // Format dates
    return data.map(
      (row: TradesResponse) =>
        ({
          ...row,
          time: new Intl.DateTimeFormat('en-US', timeFormat).format(
            new Date(row.time)
          )
        }) as TradesResponse
    )
  } catch(error) {
    console.error(error)
    return []
  }
}
