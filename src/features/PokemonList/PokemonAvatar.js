import { Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { get } from '../../api/pokemon';

const PokemonAvatar = ({url}) => {
  const [pokemon, setPokemon] = useState(null);

  const loadPokemon = async () => {
    const result = await get(url);
    setPokemon(result);
  }

  useEffect(() => loadPokemon(), []);

  return (
    <Avatar src={pokemon?.sprites.front_default} />
  );
}

export default PokemonAvatar;