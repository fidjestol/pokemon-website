import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonTable from './PokemonTable';  // Adjust the path to your component
import { Provider } from 'react-redux';
import { store } from '../redux/store'; // Import your Redux store
import { useGetPokemonListQuery } from '../redux/pokemonApi';

// Mock the useGetPokemonListQuery hook
jest.mock('../redux/pokemonApi');

describe('PokemonTable Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        // Mock useGetPokemonListQuery to simulate loading state
        (useGetPokemonListQuery as jest.Mock).mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
        });

        render(
            <Provider store={store}>
                <PokemonTable />
            </Provider>
        );

        // Check if loading message is displayed
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders Pokémon data when API call is successful', async () => {
        // Mock useGetPokemonListQuery to simulate successful API call
        (useGetPokemonListQuery as jest.Mock).mockReturnValue({
            data: {
                results: [
                    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
                ],
            },
            error: null,
            isLoading: false,
        });

        // No need to mock Axios separately since we are only testing the hook response

        render(
            <Provider store={store}>
                <PokemonTable />
            </Provider>
        );

        // Verify that the Pokémon names are displayed
        expect(await screen.findByText('Bulbasaur')).toBeInTheDocument(); // Capitalized by your component
        expect(await screen.findByText('Ivysaur')).toBeInTheDocument();
    });

    it('handles error state correctly', () => {
        // Mock useGetPokemonListQuery to simulate an error
        (useGetPokemonListQuery as jest.Mock).mockReturnValue({
            data: null,
            error: true,
            isLoading: false,
        });

        render(
            <Provider store={store}>
                <PokemonTable />
            </Provider>
        );

        // Verify that the error message is displayed
        expect(screen.getByText('Error fetching Pokémon list')).toBeInTheDocument();
    });
});
