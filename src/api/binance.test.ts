import { afterEach, beforeEach, it, expect, describe, vi, Mocked } from 'vitest';
import axios from 'axios';

import {
  getTicker24,
  // getTrades
} from './binance';

import {
  type Ticker24Response,
  // type TradesResponse
} from './binance-types';

const domain = 'http://fakeapi.com/';
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;
const mockedConsole = vi.spyOn(global.console, 'error');

const mockedDataOne: Ticker24Response = {
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
const mockedDataTwo: Ticker24Response = {
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

describe('Binance API tests', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  beforeEach(() => {
    mockedAxios.get.mockReset()
    mockedConsole.mockReset()
  })

  it('Should get data from the api', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        mockedDataOne,
        mockedDataTwo
      ]
    });
    const data = await getTicker24(domain);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(data[0]).toEqual(expect.objectContaining({
      symbol: mockedDataOne.symbol
    })
    );
  })

});