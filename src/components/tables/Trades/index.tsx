import { useContext, useEffect, useState } from 'react';
import { getTrades } from '@/api/binance';
import { type TradesResponse } from '@/api/binance-types';
import { CurrencyPairContext } from '@/CurrencyPairContext';
import { useColumns } from './columns';
import { ResultTable } from '../ResultTable';

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

  if (isLoading) {
    return <div>Loading trading data...</div>
  } else if (typeof tradesData === 'undefined' || !tradesData?.length) {
    return <></>;
  }

  return (
    <ResultTable
      columns={columns}
      data={tradesData}
    />
  )
}