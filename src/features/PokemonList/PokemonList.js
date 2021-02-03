import _ from 'lodash';
import { useState, useEffect } from 'react';
import { get, getPokemons } from '../../api/pokemon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import PokemonAvatar from '../PokemonAvatar/PokemonAvatar';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  loadMore: {
    textAlign: 'center',
  },
}));

const PokemonList = ({setPokemon}) => {
  const classes = useStyles();
  const [pokemons, setPokemons] = useState(null);
  const [loadMoreUrl, setLoadMoreUrl] = useState(null);

  const loadPokemons = async () => {
    const data = await getPokemons();
    setPokemons(data.results);
    setLoadMoreUrl(data.next);
  };

  const loadMoreHandler = async () => {
    const data = await get(loadMoreUrl);
    setPokemons([...pokemons, ...data.results]);
    setLoadMoreUrl(data.next);
  };

  useEffect(() => loadPokemons(), []);

  let loadMoreContent = null;

  if (loadMoreUrl) {
    loadMoreContent = (
      <ListItem className={classes.loadMore} button>
        <ListItemText onClick={() => loadMoreHandler()} primary="LOAD MORE"/>
      </ListItem>
    );
  }

  return (
    <div className={classes.root}>
      <List>
        {
        _.map(pokemons, (pokemon) => (
          <ListItem button onClick={() => setPokemon(pokemon.url)}>
            <ListItemAvatar>
              <PokemonAvatar url={pokemon.url} />
            </ListItemAvatar>
            <ListItemText primary={_.capitalize(pokemon.name)} />
          </ListItem>
        ))
        }
        { loadMoreContent }
      </List>
    </div>
  );
};

export default PokemonList;
