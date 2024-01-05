import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { getCurrencyPairs } from '../api/binance';

export type CurrencyPair = {
  value?: string,
  label: string
};

type CurrencyPairSelectProps = {
  setSelected: Function
}

export function CurrencyPairSelect({ setSelected }: CurrencyPairSelectProps) {
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([]);

  useEffect(() => {
    loadCurrencyPairs();
  }, [])

  async function loadCurrencyPairs() {
    try {
      const pairs = await getCurrencyPairs();
      setCurrencyPairs(pairs.map((exchangeInfoSymbol) => ({
        value: exchangeInfoSymbol.symbol,
        label: exchangeInfoSymbol.symbol
      })));
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 500,
  });

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Autocomplete
          id="currency-pair-selector"
          filterOptions={filterOptions}
          disablePortal
          options={currencyPairs}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a currency pair"
              variant="filled"
            />
          )}
          onChange={(_e, value) => setSelected(value as string)}
        />
      </FormControl>
    </Box>
  )
}