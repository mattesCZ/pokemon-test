import axios from 'axios';

const ENDPOINT = 'https://pokeapi.co/api/v2';
const ENDPOINT_POKEMON = `${ENDPOINT}/pokemon`;

export const get = async (url) => {
  const {data} = await axios.get(url);
  return data;
};

export const getPokemons = async () => {
  const {data} = await axios.get(ENDPOINT_POKEMON);
  return data;
};
