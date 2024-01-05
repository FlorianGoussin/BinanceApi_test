import './App.css'
import { useState } from 'react';
import { CurrencyPairForm } from './components/CurrencyPairForm';
import { Trades, Ticker, Ticker24 } from './components/tables';
import { CurrencyPairContext, CurrencyPairDefaultValue } from './CurrencyPairContext';
import { type CurrencyPair } from './components/CurrencyPairSelect';

function App() {
  const [currencyPair, setCurrencyPair] = useState<CurrencyPair>(CurrencyPairDefaultValue);

  const CurrencyPairContextValue = {
    currencyPair,
    setCurrencyPair
  };

  return (
    <CurrencyPairContext.Provider value={CurrencyPairContextValue}>
      <CurrencyPairForm />
      <Ticker />
      <Ticker24 />
      <Trades />
    </CurrencyPairContext.Provider>
  )
}
export default App
