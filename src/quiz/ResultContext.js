import { createContext } from 'react';

export const ResultContext = createContext({
  result: null,
  setResult: () => {},
});
