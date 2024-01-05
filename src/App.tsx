import './App.css'

import { useState } from 'react';
import { CurrencyPairContext, CurrencyPairDefaultValue } from './CurrencyPairContext';
import { type CurrencyPair } from './components/CurrencyPairSelect';
import { CurrencyPairForm } from './components/CurrencyPairForm';
import { Results } from './components/Results';
import Box from '@mui/material/Box';
import { TitleHeading } from './TitleHeading';

function App() {
  const [currencyPair, setCurrencyPair] = useState<CurrencyPair>(CurrencyPairDefaultValue);

  const CurrencyPairContextValue = {
    currencyPair,
    setCurrencyPair
  };

  return (
    <CurrencyPairContext.Provider value={CurrencyPairContextValue}>
      <TitleHeading>Financial Data</TitleHeading>
      <CurrencyPairForm />
      <Box sx={{ marginBottom: 2 }} />
      <Results />
    </CurrencyPairContext.Provider>
  )
}
export default App
