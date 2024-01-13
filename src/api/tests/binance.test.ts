import { afterEach, beforeEach, it, expect, describe, vi, Mocked } from 'vitest';
import axios from 'axios';

import { getTicker24 } from '../binance';
import { ticker24_data1, ticker24_data2 } from './mock-data';

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

  it('Should get data from the api', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        ticker24_data1,
        ticker24_data2
      ]
    });
    const data = await getTicker24(domain);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(data[0]).toEqual(expect.objectContaining({
      symbol: ticker24_data1.symbol
    })
    );
  })

});