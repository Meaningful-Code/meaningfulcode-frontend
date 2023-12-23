import React from 'react';
import Avatar from '@mui/material/Avatar';

import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

export function getCategoryCssColor(type: string) {
  switch (type) {
    case 'all':
    case 'environment':
    case 'humanitarian':
    case 'accessibility':
    case 'society':
    case 'health':
    case 'education':
      return 'var(--cat-' + type + '-color)';
    default:
      return 'var(--cat-all-color)';
  }
}

export function getCategoryIcon(type: string) {
  switch (type) {
    case 'all':
      return <AllInclusiveOutlinedIcon />;
    case 'environment':
      return <ForestOutlinedIcon />;
    case 'humanitarian':
      return <SupportOutlinedIcon />;
    case 'accessibility':
      return <AccessibleOutlinedIcon />;
    case 'society':
      return <AccountBalanceOutlinedIcon />;
    case 'health':
      return <LocalHospitalOutlinedIcon />;
    case 'education':
      return <SchoolOutlinedIcon />;
    default:
      return <QuestionMarkOutlinedIcon />;
  }
}

type CategoryIconProps = {
  type: string;
  inverted?: boolean;
};

function CategoryIcon(props: CategoryIconProps) {
  const { type, inverted } = props;
  const catColor = getCategoryCssColor(type);
  const white = 'var(--white)';
  return (
    <Avatar
      sx={{
        color: inverted ? catColor : white,
        bgcolor: inverted ? white : catColor,
      }}
    >
      {getCategoryIcon(type)}
    </Avatar>
  );
}

export default CategoryIcon;
