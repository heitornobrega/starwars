import React from 'react';
import Table from './components/Table';
// import TextFilter from './components/TextFilter';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      {/* <TextFilter /> */}
      <Table />
    </PlanetsProvider>
  );
}

export default App;
