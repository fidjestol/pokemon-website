import React, {useEffect, useRef, useState} from 'react';
import { useGetPokemonListQuery } from '../redux/pokemonApi';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedPokemon } from '../redux/pokemonSlice';
import { Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import axios from 'axios';

const PokemonTable: React.FC = () => {
  const { data, error, isLoading } = useGetPokemonListQuery();
  const dispatch = useDispatch();
  const selectedPokemon = useSelector((state: any) => state.pokemon.selectedPokemon);
  const columns = useSelector((state: any) => state.pokemon.columns);

  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: any }>({});

  // Create a ref for the table body and rows
  const tableBodyRef = useRef<HTMLDivElement | null>(null);
  const selectedRowRef = useRef<HTMLTableRowElement | null>(null);

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

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (!data) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && selectedPokemon > 1) {
        e.preventDefault(); // Disable natural scrolling
        dispatch(setSelectedPokemon(selectedPokemon - 1));
      } else if (e.key === 'ArrowDown' && selectedPokemon < data.results.length) {
        e.preventDefault(); // Disable natural scrolling
        dispatch(setSelectedPokemon(selectedPokemon + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPokemon, data, dispatch]);

  // Scroll to selected Pokémon row when it changes
  useEffect(() => {
    if (selectedRowRef.current) {
      selectedRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest', // Scroll the selected Pokémon into view
      });
    }
  }, [selectedPokemon]);

  const handleRowClick = (id: number) => {
    dispatch(setSelectedPokemon(id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching Pokémon list</div>;

  return (
      <Box sx={{ height: '60vh', overflowY: 'auto', padding: 0 }} ref={tableBodyRef}>
        <Table sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow>
              <TableCell
                  sx={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5', zIndex: 1 }}
              >
                ID
              </TableCell>
              <TableCell
                  sx={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5', zIndex: 1 }}
              >
                Name
              </TableCell>
              {columns.picture && (
                  <TableCell
                      sx={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5', zIndex: 1 }}
                  >
                    Picture
                  </TableCell>
              )}
              {columns.weight && (
                  <TableCell
                      sx={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5', zIndex: 1 }}
                  >
                    Weight
                  </TableCell>
              )}
              {columns.height && (
                  <TableCell
                      sx={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5', zIndex: 1 }}
                  >
                    Height
                  </TableCell>
              )}
              {columns.types && (
                  <TableCell
                      sx={{ position: 'sticky', top: 0, backgroundColor: '#f5f5f5', zIndex: 1 }}
                  >
                    Types
                  </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results?.map((pokemon: any, index: number) => (
                <TableRow
                    key={pokemon.name}
                    selected={selectedPokemon === index + 1}
                    onClick={() => handleRowClick(index + 1)}
                    ref={selectedPokemon === index + 1 ? selectedRowRef : null}
                    sx={{ cursor: 'pointer', height: 60, padding: 0 }} // Remove padding from the row
                >
                  <TableCell sx={{ padding: 0 }}> {/* Remove padding from the cell */}
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ padding: 0 }}> {/* Remove padding from the cell */}
                    {capitalizeFirstLetter(pokemon.name)}
                  </TableCell>

                  {columns.picture && (
                      <TableCell sx={{ padding: 0 }}> {/* Remove padding from the cell */}
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                            alt={pokemon.name}
                            style={{
                              height: '100%',
                              width: 'auto',
                              display: 'block',
                              margin: 0,
                            }}
                        />
                      </TableCell>
                  )}

                  {columns.weight && (
                      <TableCell sx={{ padding: 0 }}>
                        {pokemonDetails[pokemon.name]?.weight || 'Loading...'}
                      </TableCell>
                  )}

                  {columns.height && (
                      <TableCell sx={{ padding: 0 }}>
                        {pokemonDetails[pokemon.name]?.height || 'Loading...'}
                      </TableCell>
                  )}

                  {columns.types && (
                      <TableCell sx={{ padding: 0 }}> {/* Remove padding */}
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
      </Box>
  );
};

export default PokemonTable;