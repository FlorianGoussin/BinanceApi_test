import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CurrencyPairSelect, type CurrencyPair } from './CurrencyPairSelect';
import { CurrencyPairContext } from '../CurrencyPairContext';

export function CurrencyPairForm() {
  const [selectedCurrencyPair, setSelectedCurrencyPair] = useState<CurrencyPair>();
  const { setCurrencyPair } = useContext(CurrencyPairContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // save currency pair inside the context
    setCurrencyPair(selectedCurrencyPair);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex' }}>
        <CurrencyPairSelect setSelected={setSelectedCurrencyPair} />
        <Button variant="contained" type="submit">Submit</Button>
      </Box>
    </form>
  )
}