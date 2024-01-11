import { useContext, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';

import { getTrades } from '@/api/binance';
import { type TradesResponse } from '@/api/binance-types';
import { CurrencyPairContext } from '@/CurrencyPairContext';
import { useColumns } from './columns';

export function Trades() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tradesData, setTradesData] = useState<TradesResponse[]>();
  const { currencyPair } = useContext(CurrencyPairContext);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setTradesData(await getTrades(currencyPair));
      setIsLoading(false);
    };
    if (currencyPair) {
      loadData();
    }
  }, [currencyPair]);

  const columns = useColumns();

  const table = useMaterialReactTable({
    columns,
    data: (tradesData || []) as TradesResponse[], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    initialState: { density: 'compact' },
    enableTopToolbar: false,
    enableColumnActions: false,
  });

  if (isLoading) {
    return <div>Loading trading data...</div>
  } else if (typeof tradesData === 'undefined' || !tradesData?.length) {
    return <></>;
  }

  return (
    <MaterialReactTable table={table} />
  );
}