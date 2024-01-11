import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { type TradesResponse } from '@/api/binance-types';

export function useColumns() {
  return useMemo<MRT_ColumnDef<TradesResponse>[]>(
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
    []
  );
}