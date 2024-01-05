import { useMemo, useContext, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

import { getTrades } from '../../api/binance';
import { type TradesResponse } from '../../api/binance';
import { CurrencyPairContext } from '../../CurrencyPairContext';

export function Trades() {
  const [tradesData, setTradesData] = useState<TradesResponse[]>();
  const { currencyPair } = useContext(CurrencyPairContext);
  useEffect(() => {
    const loadData = async () => {
      setTradesData(await getTrades(currencyPair.label));
    };
    console.log('currencyPair.label:', currencyPair.label);
    if (currencyPair.label) {
      loadData();
    }
  }, [currencyPair]);

  const columns = useMemo<MRT_ColumnDef<TradesResponse>[]>(
    () => [
      {
        accessorKey: 'price',
        header: 'Price',
        size: 200,
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
        // Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(),
      },
      {
        accessorKey: 'isBuyerMaker',
        header: 'Buyer maker',
        size: 150,
        // render: (rowData: TradesResponse) => (rowData.isBuyerMaker ? "Yes" : "No"),
      },
      {
        accessorKey: 'isBestMatch',
        header: 'Best match',
        size: 200,
        // render: (rowData: TradesResponse) => (rowData.isBestMatch ? "Yes" : "No"),
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: (tradesData || []) as TradesResponse[], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  if (typeof tradesData === undefined || !tradesData?.length) {
    return <div>Loading trading data...</div>
  }

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
}