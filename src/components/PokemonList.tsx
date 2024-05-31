import React from 'react';
import { useGetPokemonListQuery } from '../services/pokemonApi';
import { useNavigate } from 'react-router-dom';
import './PokemonList.css';

const PokemonList: React.FC = () => {
  const { data, error, isLoading } = useGetPokemonListQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      <h1 className='header'>PokeReact</h1>
      <ul className="pokemon-list">
        {data.results.map((pokemon: any, index: number) => (
          <li
            key={pokemon.name}
            onClick={() => navigate(`/pokemon/${index + 1}`)}
            className="pokemon-item"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={pokemon.name}
              className="pokemon-list-image"
            />
            <span className="pokemon-name">{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PokemonList;
