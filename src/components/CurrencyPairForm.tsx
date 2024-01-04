import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CurrencyPairSelect } from './CurrencyPairSelect';
import type { CurrencyPair } from './CurrencyPairSelect';

import { getTicker, getTicker24, getTrades } from '../api/binance';
import type { TickerResponse, Ticker24Response, TradesResponse } from '../api/binance.d';

export function CurrencyPairForm() {
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState<CurrencyPair>();
  const [tickerData, setTickerData] = useState<TickerResponse>();
  const [ticker24Data, setTicker24Data] = useState<Ticker24Response>();
  const [tradesData, setTradesData] = useState<TradesResponse>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Form submitted with label:`, selectedCurrencyPair?.label);

    loadPublicMarketData(selectedCurrencyPair?.value as string);
  }
  const loadPublicMarketData = async (currencyPair: string) => {
    try {
      setTickerData(await getTicker(currencyPair));
      setTicker24Data(await getTicker24(currencyPair));
      setTradesData(await getTrades(currencyPair));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CurrencyPairSelect setSelected={setSelectedCurrencyPair} />
      <Button variant="contained" type="submit">Submit</Button>
      <div>
        <h2>DEBUG</h2>
        <div>Ticker data: {JSON.stringify(tickerData, null, 1)}</div>
        <div>Ticker 24 data: {JSON.stringify(ticker24Data, null, 1)}</div>
        <div>Trades data: {JSON.stringify(tradesData, null, 1)}</div>
      </div>
    </form>
  )
}