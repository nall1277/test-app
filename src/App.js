import React from 'react';
import Data from './Data';
import { DataProvider } from './DataContext';

function App() {
  return (
      <DataProvider>
        <Data />
      </DataProvider>
  );
}

export default App;