import _ from 'lodash';
import { useState, useEffect } from 'react';
import { getNext, getPokemons } from '../../api/pokemon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  loadMore: {
    textAlign: 'center',
  },
}));

const PokemonList = () => {
  const classes = useStyles();
  const [pokemons, setPokemons] = useState(null);
  const [loadMoreUrl, setLoadMoreUrl] = useState(null);

  const loadPokemons = async () => {
    const data = await getPokemons();
    setPokemons(data.results);
    setLoadMoreUrl(data.next);
  };

  const loadMoreHandler = async () => {
    const data = await getNext(loadMoreUrl);
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
          <ListItem button>
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
