import React from 'react';
import PokemonTable from './components/PokemonTable';
import PokemonDetails from './components/PokemonDetails';
import ColumnToggler from './components/ColumnToggler';

function App() {
    return (
        <div style={{ display: 'flex', height: '95vh' }}>
            {/* Left Column (Column Toggler and Table) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '10px' }}>
                <ColumnToggler />
                <PokemonTable />
            </div>

            {/* Right Column (Pokemon Details Box) */}
            <div
                style={{
                    width: '35%', // Take up 35% of the width
                    padding: '20px',
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for style
                    marginLeft: '10px', // Optional gap between columns
                    borderRadius: '8px',
                    alignSelf: 'flex-start', // Only as tall as the content
                }}
            >
                <PokemonDetails />
            </div>
        </div>
    );
}

export default App;
