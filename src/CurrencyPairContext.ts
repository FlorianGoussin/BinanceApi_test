import React from 'react';
import { type CurrencyPair } from './components/CurrencyPairSelect';

export const CurrencyPairDefaultValue = { value: '', label: '' };

export type CurrencyPairContextValueType = {
  currencyPair: CurrencyPair,
  setCurrencyPair: Function
}
export const CurrencyPairContext = React.createContext<CurrencyPairContextValueType>({
  currencyPair: CurrencyPairDefaultValue,
  setCurrencyPair: () => { }
});