import {
  type TickerResponse,
  type Ticker24Response,
  type TradesResponse
} from '../binance-types'

export const ticker_data1: TickerResponse = {
  symbol: 'string',
  price: 'string'
}

export const ticker_data2: TickerResponse = {
  symbol: 'string',
  price: 'string'
}

export const ticker24_data1: Ticker24Response = {
  symbol: 'symbol1',
  priceChange: 'string',
  priceChangePercent: 'string',
  weightedAvgPrice: 'string',
  prevClosePrice: 'string',
  lastPrice: 'string',
  lastQty: 'string',
  bidPrice: 'string',
  bidQty: 'string',
  askPrice: 'string',
  askQty: 'string',
  openPrice: 'string',
  highPrice: 'string',
  lowPrice: 'string',
  volume: 'string',
  quoteVolume: 'string',
  openTime: new Date().toDateString(),
  closeTime: new Date().toDateString(),
  firstId: 23341,
  lastId: 67533,
  count: 98735
}
export const ticker24_data2: Ticker24Response = {
  symbol: 'symbol2',
  priceChange: 'string',
  priceChangePercent: 'string',
  weightedAvgPrice: 'string',
  prevClosePrice: 'string',
  lastPrice: 'string',
  lastQty: 'string',
  bidPrice: 'string',
  bidQty: 'string',
  askPrice: 'string',
  askQty: 'string',
  openPrice: 'string',
  highPrice: 'string',
  lowPrice: 'string',
  volume: 'string',
  quoteVolume: 'string',
  openTime: new Date().toDateString(),
  closeTime: new Date().toDateString(),
  firstId: 23341,
  lastId: 67533,
  count: 98735
}

export const trades_data1: TradesResponse = {
  id: 32412,
  price: 'string',
  qty: 'string',
  quoteQty: 'string',
  time: new Date().toDateString(),
  isBuyerMaker: false,
  isBestMatch: true
}

export const trades_data2: TradesResponse = {
  id: 99877,
  price: 'string',
  qty: 'string',
  quoteQty: 'string',
  time: new Date().toDateString(),
  isBuyerMaker: true,
  isBestMatch: true
}
