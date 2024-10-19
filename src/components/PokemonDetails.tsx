import React from 'react';
import { useGetPokemonDetailsQuery } from '../redux/pokemonApi';
import { useSelector } from 'react-redux';

const PokemonDetails: React.FC = () => {
  const selectedPokemon = useSelector((state: any) => state.pokemon.selectedPokemon);
  const { data, error, isLoading } = useGetPokemonDetailsQuery(selectedPokemon, { skip: !selectedPokemon });

  if (!selectedPokemon) return <div>Select a Pokemon to see details</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching Pokemon details</div>;

  return (
    <div>
      <h3>{data?.name} Details</h3>
      <p>HP: {data?.stats[0].base_stat}</p>
      <p>Attack: {data?.stats[1].base_stat}</p>
      <p>Defense: {data?.stats[2].base_stat}</p>
    </div>
  );
};

export default PokemonDetails;
