import React from 'react';
import { useGetPokemonDetailsQuery } from '../redux/pokemonApi';
import { useSelector } from 'react-redux';

const PokemonDetails: React.FC = () => {
    const selectedPokemon = useSelector((state: any) => state.pokemon.selectedPokemon);
    const { data, error, isLoading } = useGetPokemonDetailsQuery(selectedPokemon, { skip: !selectedPokemon });

    // Function to calculate bar color based on the stat value (0 - 255)
    const getBarColor = (stat: number) => {
        const percentage = (stat / 255) * 100; // Calculate percentage of the stat relative to 255
        if (percentage < 50) {
            return `rgb(255, ${(percentage / 50) * 255}, 0)`; // Red to Yellow
        } else {
            return `rgb(${(1 - (percentage - 50) / 50) * 255}, 255, 0)`; // Yellow to Green
        }
    };

    const capitalizeFirstLetter = (name: string) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    // Function to calculate bar width based on the stat value
    const getBarWidth = (stat: number) => {
        return `${(stat / 255) * 100}%`; // Width as a percentage of the max stat (255)
    };

    if (!selectedPokemon) return <div>Select a Pokemon to see details</div>;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching Pokemon details</div>;

    return (
        <div>
            <h3>{capitalizeFirstLetter(data?.name || '')} Details</h3>
            <img
                src={data?.sprites['front_default'] || ''}
                alt={"Loading"}
                style={{
                    height: '300%',
                    width: 'auto',
                    display: 'block',
                    margin: 0,
                }}
            />
            {data?.stats.map((stat: any, index: number) => (
                <div key={index} style={{marginBottom: '10px'}}>
                    <p>{capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}</p>
                    <div
                        style={{
                            height: '10px',
                            width: '100%',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '5px',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                                width: getBarWidth(stat.base_stat),
                                backgroundColor: getBarColor(stat.base_stat),
                                transition: 'width 0.3s ease',
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PokemonDetails;
