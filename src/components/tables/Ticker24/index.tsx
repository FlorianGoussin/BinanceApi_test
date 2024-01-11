import { useContext, useEffect, useState } from 'react';
import { getTicker24 } from '@/api/binance';
import { type Ticker24Response } from '@/api/binance-types';
import { CurrencyPairContext } from '@/CurrencyPairContext';
import { useColumns } from './columns';
import { ResultTable } from '../ResultTable';

export function Ticker24() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ticker24Data, setTicker24Data] = useState<Ticker24Response[]>();

  const { currencyPair } = useContext(CurrencyPairContext);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setTicker24Data(await getTicker24(currencyPair));
      setIsLoading(false);
    };
    if (currencyPair) {
      loadData();
    }
  }, [currencyPair]);

  const columns = useColumns();

  if (isLoading) {
    return <div>Loading trading data...</div>
  } else if (typeof ticker24Data === 'undefined' || !ticker24Data?.length) {
    return <></>;
  }
  return (
    <ResultTable
      columns={columns}
      data={ticker24Data}
    />
  );
}