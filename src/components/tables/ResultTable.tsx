import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_TableOptions
} from 'material-react-table'

interface Props<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
  columns: MRT_ColumnDef<TData>[]
  data: TData[]
}

export function ResultTable<TData extends MRT_RowData>({
  data,
  columns,
  ...rest
}: Props<TData>) {
  const table = useMaterialReactTable<TData>({
    columns,
    data,
    initialState: { density: 'compact' },
    enableTopToolbar: false,
    enableColumnActions: false,
    ...rest
  })

  return <MaterialReactTable table={table} />
}
