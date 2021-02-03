import _ from 'lodash';
import { useState, useEffect } from 'react';
import { get } from '../../api/pokemon';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import HeightIcon from '@material-ui/icons/Height';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import FlashOnIcon from '@material-ui/icons/FlashOn'
import Tooltip from '@material-ui/core/Tooltip';

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

  const getTypes = () => {
    return _(pokemon.types)
      .map('type.name')
      .map(_.capitalize)
      .valueOf();
  };

  const getAbilities = () => {
    return _(pokemon.abilities)
      .map('ability.name')
      .map(_.capitalize)
      .valueOf();
  };

  useEffect(() => loadPokemon(), []);

  return (
    <div className={classes.root}>
      {pokemon &&
        <Card>
          <CardHeader
            avatar={
              <PokemonAvatar url={url} />
            }
            title={_.capitalize(pokemon.name)}
            titleTypographyProps={{variant: 'h5'}}
            action={
              <IconButton onClick={() => close()}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="h6">
              Types
            </Typography>
            <Typography gutterBottom variant="body2">
              {_.join(getTypes(), ', ')}
            </Typography>
            <Typography variant="h6">
              Abilities
            </Typography>
            <Typography gutterBottom variant="body2">
              {_.join(getAbilities(), ', ')}
            </Typography>

            <Typography variant="h6">
              Info
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Tooltip title="Height" placement="left">
                    <HeightIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={`${10 * pokemon.height} cm`}/>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Tooltip title="Weight" placement="left">
                    <FitnessCenterIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={`${0.1 * pokemon.weight} kg`}/>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Tooltip title="Base experience" placement="left">
                    <FlashOnIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText primary={`${pokemon.base_experience} EXP`}/>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      }
    </div>
  );
};

export default PokemonDetail;
