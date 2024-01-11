import { useContext, useEffect, useState } from 'react';
import { getTicker } from '@/api/binance';
import { type TickerResponse } from '@/api/binance-types';
import { CurrencyPairContext } from '@/CurrencyPairContext';
import { useColumns } from './columns';
import { ResultTable } from '../ResultTable';

export function Ticker() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tickerData, setTickerData] = useState<TickerResponse[]>();

  const { currencyPair } = useContext(CurrencyPairContext);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setTickerData(await getTicker(currencyPair));
      setIsLoading(false);
    };
    if (currencyPair) {
      loadData();
    }
  }, [currencyPair]);

  const columns = useColumns();

  if (isLoading) {
    return <div>Loading trading data...</div>
  } else if (typeof tickerData === 'undefined' || !tickerData?.length) {
    return <></>;
  }
  return (
    <ResultTable
      columns={columns}
      data={tickerData}
    />
  );
}