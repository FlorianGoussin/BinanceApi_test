type ExchangeInfoSymbol = {
  status: string,
  symbol: string,
}

export type ExchangeInfoResponse = {
  symbols: ExchangeInfoSymbol[]
}

export type TickerResponse = {
  symbol: string,
  price: string
}

export type Ticker24Response = {
  symbol: string
  priceChange: string
  priceChangePercent: string
  weightedAvgPrice: string
  prevClosePrice: string
  lastPrice: string
  lastQty: string
  bidPrice: string
  bidQty: string
  askPrice: string
  askQty: string
  openPrice: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
  openTime: number
  closeTime: number
  firstId: number
  lastId: number
  count: number
}

export type TradesResponse = {
  id: number
  price: string
  qty: string
  quoteQty: string
  time: number
  isBuyerMaker: boolean
  isBestMatch: boolean
}