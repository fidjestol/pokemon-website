import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';  // Your actual Redux store
import PokemonTable from './PokemonTable';

// Only mock the specific hook, not the entire module
jest.mock('../redux/pokemonApi', () => ({
    ...jest.requireActual('../redux/pokemonApi'), // Keep other exports intact
    useGetPokemonListQuery: jest.fn(), // Mock only the hook
}));

describe('PokemonTable', () => {
    it('renders the PokemonTable correctly', async () => {
        // Mock API data
        const mockData = {
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
        };

        // Mock the return value of the API hook
        const useGetPokemonListQuery = require('../redux/pokemonApi').useGetPokemonListQuery;
        useGetPokemonListQuery.mockReturnValue({
            data: mockData,
            isLoading: false,
            error: null,
        });

        // Render the component wrapped in the Redux Provider with the actual store
        render(
            <Provider store={store}>
                <PokemonTable />
            </Provider>
        );

        // Check if Pokémon names are rendered
        expect(await screen.findByText('Bulbasaur')).toBeInTheDocument();
        expect(await screen.findByText('Ivysaur')).toBeInTheDocument();
    });
});
