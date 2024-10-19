import React, { useEffect, useState } from 'react';
import { useGetPokemonListQuery } from '../redux/pokemonApi';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPokemon } from '../redux/pokemonSlice';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const PokemonTable: React.FC = () => {
  const { data, error, isLoading } = useGetPokemonListQuery();
  const dispatch = useDispatch();
  const selectedPokemon = useSelector((state: any) => state.pokemon.selectedPokemon);
  const columns = useSelector((state: any) => state.pokemon.columns);

  // State to store detailed Pokémon data for each row
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: any }>({});

  // Fetch details for all Pokémon
  useEffect(() => {
    if (!data) return;

    const fetchAllPokemonDetails = async () => {
      const promises = data.results.map((pokemon: any) =>
          axios.get(pokemon.url).then((res) => ({
            name: pokemon.name,
            details: res.data,
          }))
      );

      try {
        const detailsArray = await Promise.all(promises);
        const detailsMap = detailsArray.reduce((acc: any, pokemon: any) => {
          acc[pokemon.name] = pokemon.details;
          return acc;
        }, {});

        setPokemonDetails(detailsMap);
      } catch (err) {
        console.error('Error fetching Pokémon details:', err);
      }
    };

    fetchAllPokemonDetails();
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && selectedPokemon > 1) {
        dispatch(setSelectedPokemon(selectedPokemon - 1));
      } else if (e.key === 'ArrowDown' && selectedPokemon < data.results.length) {
        dispatch(setSelectedPokemon(selectedPokemon + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPokemon, data, dispatch]);

  // Define the handleRowClick function to set the selected Pokemon
  const handleRowClick = (id: number) => {
    dispatch(setSelectedPokemon(id));
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching Pokémon list</div>;

  return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            {columns.picture && <TableCell>Picture</TableCell>}
            {columns.weight && <TableCell>Weight</TableCell>}
            {columns.height && <TableCell>Height</TableCell>}
            {columns.types && <TableCell>Types</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.results?.map((pokemon: any, index: number) => (
              <TableRow
                  key={pokemon.name}
                  selected={selectedPokemon === index + 1}
                  onClick={() => handleRowClick(index + 1)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pokemon.name}</TableCell>

                {columns.picture && (
                    <TableCell>
                      <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                          alt={pokemon.name}
                      />
                    </TableCell>
                )}
                {columns.weight && (
                    <TableCell>
                      {pokemonDetails[pokemon.name]?.weight || 'Loading...'}
                    </TableCell>
                )}
                {columns.height && (
                    <TableCell>
                      {pokemonDetails[pokemon.name]?.height || 'Loading...'}
                    </TableCell>
                )}
                {columns.types && (
                    <TableCell>
                      {pokemonDetails[pokemon.name]?.types
                          ? pokemonDetails[pokemon.name].types
                              .map((typeObj: any) => typeObj.type.name)
                              .join(', ')
                          : 'Loading...'}
                    </TableCell>
                )}
              </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};

export default PokemonTable;
