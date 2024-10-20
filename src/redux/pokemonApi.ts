import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the response structure for the Pokemon list
interface PokemonListResponse {
  results: Array<{ name: string; url: string }>;
}

interface PokemonSprites {
  front_default: string | null;  // Only keep the front_default sprite
}

// Define the response structure for Pokemon details
interface PokemonDetailsResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: Array<{base_stat: number}>;
  sprites: PokemonSprites;
  abilities: string[];
  // You can add more fields as necessary
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    // Explicitly define that this query does not expect any argument
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => 'pokemon?limit=150',
    }),
    getPokemonDetails: builder.query<PokemonDetailsResponse, number>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
