import React from 'react';
import PokemonTable from './components/PokemonTable';
import PokemonDetails from './components/PokemonDetails';
import ColumnToggler from './components/ColumnToggler';

function App() {
  return (
    <div>
      <ColumnToggler />
      <PokemonTable />
      <PokemonDetails />
    </div>
  );
}

export default App;
