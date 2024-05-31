import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPokemonDetailsQuery } from '../services/pokemonApi';
import './PokemonDetails.css';

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetPokemonDetailsQuery(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="pokemon-details-container">
      <div className="pokemon-card">
        <h2 className="header">{data.name}</h2>
        <img src={data.sprites.front_default} alt={data.name} className="pokemon-image" />
        <hr/>
        <ul className="pokemon-list">
          <li   
            key={data.name}
            className="pokemon-details-item"
          >
            <h3>Name</h3>
            <span className="pokemon-name">{data.name}</span>
          </li>

          <li
            key={data.height}
            className="pokemon-details-item"
          >
            <h3>Height </h3>
            <span className="pokemon-name">{data.height}</span>
          </li>

          <li
            key={data.weight}
            className="pokemon-details-item"
          >
            <h3>Weight</h3>
            <span className="pokemon-name">{data.weight}</span>
          </li>

          <li
            key={45}   
            className="pokemon-details-item"
          >
            <h3>Types</h3>
            <span>
              {data.types.map((typeInfo: any) => (
                <p key={typeInfo.type.name} className="pokemon-type">{typeInfo.type.name}</p>
              ))}
            </span>
          </li>   
        </ul>
      </div>
    </div>
  );  
};

export default PokemonDetails;
