import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import RocketIcon from '@mui/icons-material/Rocket';

import { Link as RouterLink } from 'react-router-dom';

export default function MobileMenu(): JSX.Element {
  return (
    <List>
      <ListItem component={RouterLink} to="/submit-project">
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Submit project" sx={{color: 'var(--black)'}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component={RouterLink} to="/">
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{color: 'var(--black)'}} />
        </ListItemButton>
      </ListItem>
      <ListItem component={RouterLink} to="/get-started">
        <ListItemButton>
          <ListItemIcon>
            <RocketIcon />
          </ListItemIcon>
          <ListItemText primary="Getting started"  sx={{color: 'var(--black)'}}/>
        </ListItemButton>
      </ListItem>
      <ListItem component={RouterLink} to="/about">
        <ListItemButton>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About"  sx={{color: 'var(--black)'}}/>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
