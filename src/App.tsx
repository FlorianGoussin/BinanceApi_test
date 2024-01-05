import './App.css'

import { useState } from 'react';
import { CurrencyPairContext, CurrencyPairDefaultValue } from './CurrencyPairContext';
import { type CurrencyPair } from './components/CurrencyPairSelect';
import { CurrencyPairForm } from './components/CurrencyPairForm';
import { Results } from './components/Results';
import Box from '@mui/material/Box';

function App() {
  const [currencyPair, setCurrencyPair] = useState<CurrencyPair>(CurrencyPairDefaultValue);

  const CurrencyPairContextValue = {
    currencyPair,
    setCurrencyPair
  };

  return (
    <CurrencyPairContext.Provider value={CurrencyPairContextValue}>
      <CurrencyPairForm />
      <Box sx={{ marginBottom: 2 }} />
      <Results />
    </CurrencyPairContext.Provider>
  )
}
export default App
