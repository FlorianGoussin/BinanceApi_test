import { useMemo, useContext, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

import { getTicker } from '../../api/binance';
import { type TickerResponse } from '../../api/binance.d';
import { CurrencyPairContext } from '../../CurrencyPairContext';

export function Ticker() {
  const [tickerData, setTickerData] = useState<TickerResponse[]>();

  const { currencyPair } = useContext(CurrencyPairContext);
  useEffect(() => {
    const loadData = async () => {
      setTickerData(await getTicker(currencyPair.label));
    };
    console.log('currencyPair.label:', currencyPair.label);
    if (currencyPair.label) {
      loadData();
    }
  }, [currencyPair]);

  const columns = useMemo<MRT_ColumnDef<TickerResponse>[]>(
    () => [
      {
        accessorKey: 'symbol',
        header: 'Symbol',
        size: 150,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 200,
      }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: (tickerData || []) as TickerResponse[], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  if (typeof tickerData === undefined || !tickerData?.length) {
    return <div>Loading trading data...</div>
  }

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
}