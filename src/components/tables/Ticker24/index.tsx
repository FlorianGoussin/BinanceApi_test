import { useContext, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';

import { getTicker24 } from '../../../api/binance';
import { type Ticker24Response } from '../../../api/binance.d';
import { CurrencyPairContext } from '../../../CurrencyPairContext';
import { useColumns } from './columns';

export function Ticker24() {
  const [ticker24Data, setTicker24Data] = useState<Ticker24Response[]>();

  const { currencyPair } = useContext(CurrencyPairContext);
  useEffect(() => {
    const loadData = async () => {
      setTicker24Data(await getTicker24(currencyPair.label));
    };
    console.log('currencyPair.label:', currencyPair.label);
    if (currencyPair.label) {
      loadData();
    }
  }, [currencyPair]);

  const columns = useColumns();

  const table = useMaterialReactTable({
    columns,
    data: (ticker24Data || []) as Ticker24Response[], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  if (typeof ticker24Data === undefined || !ticker24Data?.length) {
    return <div>Loading trading data...</div>
  }

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
}