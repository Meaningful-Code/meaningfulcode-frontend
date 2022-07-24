import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import SupportOutlinedIcon from '@mui/icons-material/SupportOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

export function getCategoryColor(type) {
  switch (type) {
    case 'all':
      return '#49494a';
    case 'environment':
      return '#4dc86a';
    case 'humanitarian':
      return '#f58d49';
    case 'accessibility':
      return '#4d9dd9';
    case 'society':
      return '#835dd4';
    case 'health':
      return '#33c4bd';
    case 'education':
      return '#e25353';
    default:
      return '#49494a';
  }
}

export function getCategoryIcon(type) {
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

function CategoryIcon(props) {
  const { type } = props;
  return (
    <Avatar sx={{ bgcolor: getCategoryColor(type) }}>{getCategoryIcon(type)}</Avatar>
  );
}

CategoryIcon.propTypes = {
  type: PropTypes.string.isRequired
};

export default CategoryIcon;
