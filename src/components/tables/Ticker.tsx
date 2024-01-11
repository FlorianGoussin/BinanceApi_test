import { useMemo, useContext, useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

import { getTicker } from '../../api/binance';
import { type TickerResponse } from '../../api/binance-types';
import { CurrencyPairContext } from '../../CurrencyPairContext';

export function Ticker() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tickerData, setTickerData] = useState<TickerResponse[]>();

  const { currencyPair } = useContext(CurrencyPairContext);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setTickerData(await getTicker(currencyPair.label));
      setIsLoading(false);
    };
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
        Cell: ({ cell }) => (
          <span>${cell.getValue<number>().toLocaleString()}</span>
        ),
      }
    ],
    [],
  );

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