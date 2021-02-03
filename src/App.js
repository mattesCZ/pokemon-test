import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import PokemonList from './features/PokemonList/PokemonList';
import PokemonDetail from './features/PokemonDetail/PokemonDetail';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const App = () => {
  const classes = useStyles();
  const [activePokemonUrl, setActivePokemonUrl] = useState(null);

  const content = activePokemonUrl ? <PokemonDetail url={activePokemonUrl} close={() => setActivePokemonUrl(null)} /> : <PokemonList setPokemon={setActivePokemonUrl}/>;

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Pokemon preview
        </Typography>
        {content}
      </div>
    </Container>
  );
}

export default App;
