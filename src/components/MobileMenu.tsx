import React from 'react';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import RocketIcon from '@mui/icons-material/Rocket';
import ScienceIcon from '@mui/icons-material/Science';

function MenuButton({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon: JSX.Element;
}) {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';
  const color = isLightMode ? 'var(--black)' : 'var(--white)';
  return (
    <ListItem component={Link} href={href}>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} sx={{ color: color }} />
      </ListItemButton>
    </ListItem>
  );
}

export default function MobileMenu(): JSX.Element {
  const buttons = [
    { href: '/submit-project', text: 'Submit project', icon: <AddIcon /> },
    { text: 'divider' },
    { href: '/', text: 'Home', icon: <HomeIcon /> },
    { href: '/get-started', text: 'Getting started', icon: <RocketIcon /> },
    { href: '/about', text: 'About', icon: <InfoIcon /> },
    { href: '/find-project', text: 'Find projects!', icon: <ScienceIcon /> },
  ];
  return (
    <List className="mobile-menu">
      {buttons.map((button, index) => {
        if (button.text === 'divider') {
          return <Divider key={index} />;
        }
        return (
          <MenuButton
            key={index}
            // @ts-ignore: href will be present
            href={button.href}
            // @ts-ignore: icon will be present
            icon={button.icon}
            text={button.text}
          />
        );
      })}
    </List>
  );
}
