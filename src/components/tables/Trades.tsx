import { useMemo, useContext, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

import { getTrades } from '../../api/binance';
import { type TradesResponse } from '../../api/binance.d';
import { CurrencyPairContext } from '../../CurrencyPairContext';

export function Trades() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tradesData, setTradesData] = useState<TradesResponse[]>();
  const { currencyPair } = useContext(CurrencyPairContext);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setTradesData(await getTrades(currencyPair.label));
      setIsLoading(false);
    };
    if (currencyPair.label) {
      loadData();
    }
  }, [currencyPair]);

  const columns = useMemo<MRT_ColumnDef<TradesResponse>[]>(
    () => [
      {
        accessorKey: 'price',
        header: 'Price',
        size: 150,
        Cell: ({ cell }) => (
          <span>${cell.getValue<number>().toLocaleString()}</span>
        ),
      },
      {
        accessorKey: 'qty',
        header: 'Quantity',
        size: 150,
      },
      {
        accessorKey: 'quoteQty',
        header: 'Quote quantity',
        size: 150,
      },
      {
        accessorKey: 'time',
        header: 'Time',
        size: 200,
      },
      {
        accessorKey: 'isBuyerMaker',
        header: 'Buyer maker',
        size: 150,
        Cell: ({ cell }) => (
          <span>{cell.getValue<number>().toLocaleString() === 'true' ? 'Yes' : 'No'}</span>
        ),
      },
      {
        accessorKey: 'isBestMatch',
        header: 'Best match',
        size: 150,
        Cell: ({ cell }) => (
          <span>{cell.getValue<number>().toLocaleString() === 'true' ? 'Yes' : 'No'}</span>
        ),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: (tradesData || []) as TradesResponse[], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    initialState: { density: 'compact' },
    enableTopToolbar: false,
  });

  if (isLoading) {
    return <div>Loading trading data...</div>
  } else if (typeof tradesData === undefined || !tradesData?.length) {
    return <></>;
  }

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
}