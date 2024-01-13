import { afterEach, beforeEach, it, expect, describe, vi, Mocked } from 'vitest';
import axios from 'axios';

import {
  getTicker24,
  // getTrades
} from './binance';

// import type {
//   Ticker24Response,
//   TradesResponse
// } from './binance-types';

const domain = 'http://fakeapi.com/';
vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;
const mockedConsole = vi.spyOn(global.console, 'error');

describe('Binance API tests', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  beforeEach(() => {
    mockedAxios.get.mockReset()
    mockedConsole.mockReset()
  })

  it('Should get api data', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [{
        test: 'Hi I worked!',
        openTime: new Date().toDateString(),
        closeTime: new Date().toDateString()
      }]
    })
    await getTicker24(domain)
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
  })
});