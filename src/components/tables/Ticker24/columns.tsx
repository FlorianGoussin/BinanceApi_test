import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import { type Ticker24Response } from '../../../api/binance.d';

export function useColumns() {
  return useMemo<MRT_ColumnDef<Ticker24Response>[]>(() => [
    {
      accessorKey: 'symbol',
      header: 'Symbol',
      size: 150,
    },
    {
      accessorKey: 'priceChange',
      header: 'Price change',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'priceChangePercent',
      header: 'Price change percent',
      size: 150,
    },
    {
      accessorKey: 'weightedAvgPrice',
      header: 'Weighted average price',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'prevClosePrice',
      header: 'Previous close price',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'lastPrice',
      header: 'Last price',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'lastQty',
      header: 'Last quantity',
      size: 150,
    },
    {
      accessorKey: 'bidPrice',
      header: 'Bid price',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'bidQty',
      header: 'Bid price',
      size: 150,
    },
    {
      accessorKey: 'askPrice',
      header: 'Ask price',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'askQty',
      header: 'Ask quantity',
      size: 150,
    },
    {
      accessorKey: 'openPrice',
      header: 'Open price',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'highPrice',
      header: 'High price',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'lowPrice',
      header: 'Low price',
      size: 150,
      Cell: ({ cell }) => (
        <span>${cell.getValue<number>().toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'volume',
      header: 'Volume',
      size: 150,
    },
    {
      accessorKey: 'quoteVolume',
      header: 'Quote volume',
      size: 150,
    },
    {
      accessorKey: 'openTime',
      header: 'Open time',
      size: 150,
    },
    {
      accessorKey: 'closeTime',
      header: 'Close time',
      size: 150,
    },
  ], []);
}