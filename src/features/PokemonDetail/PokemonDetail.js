import _ from 'lodash';
import { useState, useEffect } from 'react';
import { get } from '../../api/pokemon';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

import PokemonAvatar from '../PokemonAvatar/PokemonAvatar';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

const PokemonDetail = ({url, close}) => {
  const classes = useStyles();
  const [pokemon, setPokemon] = useState(null);

  const loadPokemon = async () => {
    const data = await get(url);
    setPokemon(data);
  };

  const getTypesInfo = () => {
    const types = _(pokemon.types)
      .map('type.name')
      .map(_.capitalize)
      .join(', ');
    return `Types: ${types}`;
  }

  useEffect(() => loadPokemon(), []);

  return (
    <div>
      {pokemon &&
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <PokemonAvatar url={url} />
            }
            title={_.capitalize(pokemon.name)}
            subheader={getTypesInfo()}
            action={
              <IconButton onClick={() => close()}>
                <CloseIcon />
              </IconButton>
            }
            />
          <CardContent>
            <Typography>
              TODO: Basic info about selected Pokemon.
            </Typography>
          </CardContent>
        </Card>
      }
    </div>
  );
};

export default PokemonDetail;
