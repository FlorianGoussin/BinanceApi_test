import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import { CurrencyPairSelect, type CurrencyPair } from './CurrencyPairSelect';
import { CurrencyPairContext } from '../CurrencyPairContext';

export function CurrencyPairForm() {
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState<CurrencyPair>();
  const { setCurrencyPair } = useContext(CurrencyPairContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Form submitted with label:`, selectedCurrencyPair?.label);

    // save currency pair inside the context
    setCurrencyPair(selectedCurrencyPair);
  }

  return (
    <form onSubmit={handleSubmit}>
      <CurrencyPairSelect setSelected={setSelectedCurrencyPair} />
      <Button variant="contained" type="submit">Submit</Button>
    </form>
  )
}