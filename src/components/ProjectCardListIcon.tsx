import React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useTheme, styled } from '@mui/material/styles';

export const ProjectCartListAvatar = styled(Avatar)((props) => ({
  width: 35,
  height: 35,
  backgroundColor: 'transparent',
  color: props.color,
}));

export type ProjectCardListIconProps = {
  avatar: React.ReactElement;
  color?: string;
};

export function ProjectCardListIcon(props: ProjectCardListIconProps) {
  const { avatar, color } = props;
  const theme = useTheme();
  const defaultColor =
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.common.white;
  return (
    <ListItemAvatar>
      <ProjectCartListAvatar color={color ?? defaultColor}>
        {avatar}
      </ProjectCartListAvatar>
    </ListItemAvatar>
  );
}
