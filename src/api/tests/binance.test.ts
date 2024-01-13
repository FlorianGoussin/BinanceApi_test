import { afterEach, beforeEach, it, expect, describe, vi, Mocked } from 'vitest'
import axios from 'axios'
import {
  getTicker,
  getTicker24,
  getTrades,
  apiVersionUrl,
  binanceBaseApiUrl,
  tickerEndpoint,
  ticker24Endpoint,
  tradesEndpoint
} from '../binance'
import {
  ticker_data1,
  ticker_data2,
  ticker24_data1,
  ticker24_data2,
  trades_data1,
  trades_data2
} from './mock-data'

const baseUrl = import.meta.env.VITE_BINANCE_BASE_API_URL
const headers = { Accept: 'application/json' }
const fakeUrl = 'https://fakeapi.com'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>
const mockedConsole = vi.spyOn(global.console, 'error')

describe('Binance API tests', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  beforeEach(() => {
    mockedAxios.get.mockReset()
    mockedConsole.mockReset()
  })

  it('should be included apiVersionUrl in binanceBaseApiUrl', () => {
    expect(binanceBaseApiUrl).toEqual(baseUrl + apiVersionUrl)
  })

  describe('getTicker', () => {
    it('should get data from the api', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [ticker_data1, ticker_data2]
      })
      const data = await getTicker(fakeUrl)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(data[0]).toEqual(
        expect.objectContaining({
          symbol: ticker_data1.symbol
        })
      )
    })

    it('should get data using the symbol parameter', async () => {
      const symbol = 'ETHBTC'
      mockedAxios.get.mockResolvedValueOnce({ data: [ticker_data1] })
      await getTicker(symbol)

      expect(mockedAxios.get).toHaveBeenCalled()
      expect(mockedAxios.get).toBeCalledWith(
        `${binanceBaseApiUrl}/${tickerEndpoint}?symbol=${symbol}`,
        {
          headers
        }
      )
    })
  })

  describe('getTicker24', () => {
    it('should get data from the api', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [ticker24_data1, ticker24_data2]
      })
      const data = await getTicker24(fakeUrl)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(data[0]).toEqual(
        expect.objectContaining({
          symbol: ticker24_data1.symbol
        })
      )
    })

    it('should get data using the symbol parameter', async () => {
      const symbol = 'ETHBTC'
      mockedAxios.get.mockResolvedValueOnce({ data: ticker24_data2 })
      await getTicker24(symbol)

      expect(mockedAxios.get).toHaveBeenCalled()
      expect(mockedAxios.get).toBeCalledWith(
        `${binanceBaseApiUrl}/${ticker24Endpoint}?symbol=${symbol}`,
        {
          headers
        }
      )
    })
  })

  describe('getTrades', () => {
    it('should get data from the api', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [trades_data1, trades_data2]
      })
      const data = await getTrades(fakeUrl)
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(data[0]).toEqual(
        expect.objectContaining({
          id: trades_data1.id
        })
      )
    })

    it('should get data using the symbol parameter', async () => {
      const symbol = 'ETHBTC'
      mockedAxios.get.mockResolvedValueOnce({ data: [trades_data1] })
      await getTrades(symbol)

      expect(mockedAxios.get).toHaveBeenCalled()
      expect(mockedAxios.get).toBeCalledWith(
        `${binanceBaseApiUrl}/${tradesEndpoint}?symbol=${symbol}`,
        {
          headers
        }
      )
    })
  })
})
