import { useMemo } from 'react'
import { type MRT_ColumnDef } from 'material-react-table'
import { type TickerResponse } from '@/api/binance-types'

export function useColumns() {
  return useMemo<MRT_ColumnDef<TickerResponse>[]>(
    () => [
      {
        accessorKey: 'symbol',
        header: 'Symbol',
        size: 150
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 200,
        Cell: ({ cell }) => (
          <span>${cell.getValue<number>().toLocaleString()}</span>
        )
      }
    ],
    []
  )
}
