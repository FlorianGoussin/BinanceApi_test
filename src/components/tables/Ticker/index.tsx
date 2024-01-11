import { useContext, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';

import { getTicker } from '@/api/binance';
import { type TickerResponse } from '@/api/binance-types';
import { CurrencyPairContext } from '@/CurrencyPairContext';
import { useColumns } from './columns';

export function Ticker() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tickerData, setTickerData] = useState<TickerResponse[]>();

  const { currencyPair } = useContext(CurrencyPairContext);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setTickerData(await getTicker(currencyPair));
      setIsLoading(false);
    };
    if (currencyPair) {
      loadData();
    }
  }, [currencyPair]);

  const columns = useColumns();

  const table = useMaterialReactTable({
    columns,
    data: (tickerData || []) as TickerResponse[], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    initialState: { density: 'compact' },
    enableTopToolbar: false,
    enableColumnActions: false,
  });

  if (isLoading) {
    return <div>Loading trading data...</div>
  } else if (typeof tickerData === 'undefined' || !tickerData?.length) {
    return <></>;
  }

  return (
    <MaterialReactTable table={table} />
  );
}