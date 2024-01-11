import React from 'react';
import {
  type CurrencyPair,
  type SetSelectedFunction
} from './components/CurrencyPairSelect';

export type CurrencyPairContextValueType = {
  currencyPair: CurrencyPair,
  setCurrencyPair: SetSelectedFunction
}
export const CurrencyPairContext = React.createContext<CurrencyPairContextValueType>({
  currencyPair: '',
  setCurrencyPair: () => { }
});