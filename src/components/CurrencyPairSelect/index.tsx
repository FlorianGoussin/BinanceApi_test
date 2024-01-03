import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import axios from 'axios';

type CurrencyPair = {
  id?: string,
  label: string
};

type ExchangeInfoSymbol = {
  status: string,
  symbol: string,
}

type ExchangeInfoResponse = {
  symbols: []
}

const binanceBaseApiUrl = import.meta.env.VITE_BINANCE_BASE_API_URL;
const exchangeInfoEndpoint = '/api/v3/exchangeInfo';

export function CurrencyPairSelect() {
  const [currencyPairs, setCurrencyPairs] = useState<CurrencyPair[]>([]);
  const [currencyPair, setCurrencyPair] = useState('');

  useEffect(() => {
    loadCurrencyPairs();
  }, [])

  async function loadCurrencyPairs() {
    try {
      const { data, status } = await axios.get<ExchangeInfoResponse>(
        `${binanceBaseApiUrl}${exchangeInfoEndpoint}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      console.log('options:', data.symbols);
      setCurrencyPairs(data.symbols.map((exchangeInfoSymbol: ExchangeInfoSymbol) => ({
        id: exchangeInfoSymbol.symbol,
        label: exchangeInfoSymbol.symbol
      })));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
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
              variant="outlined"
            />
          )}
          onChange={(_e, value) => setCurrencyPair(value as string)}
        />
      </FormControl>
      <Button variant="contained">Submit</Button>
    </Box>
  )
}