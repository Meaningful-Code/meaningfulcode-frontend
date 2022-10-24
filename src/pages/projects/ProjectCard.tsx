import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

import CodeIcon from '@mui/icons-material/Code';
import CommitIcon from '@mui/icons-material/Commit';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInIconNot from '@mui/icons-material/TurnedInNot';

import CategoryIcon from '../../components/CategoryIcon';
import { Project } from '../../models/Project';

export function formatLastUpdateAge(lastCommitAgeInDays: number | null) {
  if (lastCommitAgeInDays == null) {
    return 'never';
  }

  const monthDuration = 30;
  const yearDuration = 365;
  if (lastCommitAgeInDays < 1) {
    return 'today';
  }

  let lastUpdateText = '';
  if (lastCommitAgeInDays < monthDuration) {
    lastUpdateText = `${lastCommitAgeInDays} ${
      lastCommitAgeInDays === 1 ? 'day' : 'days'
    }`;
  } else if (lastCommitAgeInDays < yearDuration) {
    const lastCommitAgeInMonths = Math.floor(lastCommitAgeInDays / monthDuration);
    lastUpdateText = `${lastCommitAgeInMonths} ${
      lastCommitAgeInMonths === 1 ? 'month' : 'months'
    }`;
  } else {
    const lastCommitAgeInYears = Math.floor(lastCommitAgeInDays / yearDuration);
    lastUpdateText = `${lastCommitAgeInYears} ${
      lastCommitAgeInYears === 1 ? 'year' : 'years'
    }`;
  }

  return lastUpdateText + ' ago';
}

const SmallListAvatar = styled(Avatar)((props) => ({
  width: 35,
  height: 35,
  backgroundColor: props.color || 'transparent',
  color: props.color ? 'white' : 'black',
}));

function FeaturedListItem() {
  return (
    <ListItem disableGutters disablePadding>
      <ProjectCardListIcon avatar={<StarIcon />} />
      <ListItemText primary="Featured" />
    </ListItem>
  );
}

type ProjectCardListIconProps = {
  avatar: React.ReactElement;
  color?: string;
};
function ProjectCardListIcon(props: ProjectCardListIconProps) {
  const { avatar, color } = props;
  return (
    <ListItemAvatar>
      <SmallListAvatar color={color}>{avatar}</SmallListAvatar>
    </ListItemAvatar>
  );
}

type ProjectCardProps = {
  project: Project;
};

function ProjectCard(props: ProjectCardProps) {
  const {
    project: {
      categories,
      description,
      languages,
      lastCommitTimestamp,
      name,
      owner,
      stars,
      url,
      websiteUrl,
    },
  } = props;

  const bookmarkKey = `${url}.bookmarked`;
  const prevBookmarked = localStorage.getItem(bookmarkKey) === '1';
  const [bookmarked, setBookmarked] = useState(prevBookmarked);

  useEffect(() => {
    if (bookmarked) {
      localStorage.setItem(bookmarkKey, '1');
    } else {
      localStorage.removeItem(bookmarkKey);
    }
  });

  const maxDescription = 300;
  let descriptionText = description || '';
  if (descriptionText.length > maxDescription) {
    descriptionText = descriptionText.substring(0, maxDescription);
  }

  const secInADay = 3600 * 24;
  const now = new Date().getSeconds();
  let lastCommitAgeInDays: number | null = null;
  if (lastCommitTimestamp > 0) {
    lastCommitAgeInDays = Math.floor((now - lastCommitTimestamp) / secInADay);
  }

  let websiteButton;
  if (websiteUrl) {
    websiteButton = (
      <Button
        className="project-button"
        component={Link}
        href={websiteUrl}
        color="secondary"
        startIcon={<PublicIcon />}
      >
        Website
      </Button>
    );
  }

  let githubButton;
  if (url) {
    githubButton = (
      <Button
        className="project-button"
        component={Link}
        href={url}
        color="secondary"
        endIcon={<KeyboardArrowRightIcon />}
      >
        GitHub&nbsp;
      </Button>
    );
  }

  const isFeatured =
    name === 'covid19_scenarios' ||
    name === 'ifme' ||
    name === 'terrastories' ||
    name === 'platform-client';
  const isNew = false;

  return (
    <div
      className={`project-item ${categories} ${isNew ? 'new' : ''} ${
        isFeatured ? 'featured' : ''
      }`}
      data-category={categories}
      data-last-update={lastCommitAgeInDays}
      data-bookmarked={bookmarked}
      data-stars={stars}
      data-name={name.toLowerCase()}
      data-owner={owner.toLowerCase()}
      data-desc={description?.toLowerCase()}
    >
      <Card raised>
        <CardHeader
          component="h3"
          title={name}
          subheader={owner}
          sx={{ marginTop: 0, marginBottom: 0 }}
          action={
            <IconButton
              aria-label={`Bookmark project "${name}"`}
              onClick={() => setBookmarked(!bookmarked)}
            >
              {bookmarked ? <TurnedInIcon /> : <TurnedInIconNot />}
            </IconButton>
          }
        />
        <CardContent sx={{ paddingTop: 0 }}>
          <List dense>
            <ListItem disableGutters disablePadding>
              <ProjectCardListIcon avatar={<CategoryIcon type={categories[0]} />} />
              <ListItemText className="category-label" primary={categories} />
              <Chip variant="outlined" icon={<StarIcon />} label={stars} />
            </ListItem>
            {isFeatured ? FeaturedListItem() : ''}
            <ListItem disableGutters disablePadding>
              <ProjectCardListIcon avatar={<CodeIcon />} />
              <ListItemText
                className="languages"
                primary={languages ? languages.slice(0, 3).join(', ') : 'N/A'}
              />
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ProjectCardListIcon avatar={<CommitIcon />} />
              <ListItemText
                className="last-update"
                primary={formatLastUpdateAge(lastCommitAgeInDays)}
              />
            </ListItem>
          </List>
          <p className="project-desc">{descriptionText}</p>
        </CardContent>
        <CardActions>
          <ButtonGroup variant="outlined" fullWidth>
            {websiteButton}
            {githubButton}
          </ButtonGroup>
        </CardActions>
      </Card>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.string),
    lastCommitTimestamp: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    websiteUrl: PropTypes.string,
  }).isRequired,
};

function ProjectPlaceholder() {
  return (
    <Grid item xs={4} className="project-item">
      <Card raised sx={{ padding: '1em' }}>
        <Skeleton />
        <Skeleton sx={{ marginBottom: '2em' }} />
        <Skeleton width="75%" />
        <Skeleton width="60%" />
        <Skeleton width="70%" sx={{ marginBottom: '1em' }} />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton width="60%" sx={{ marginBottom: '2em' }} />
      </Card>
    </Grid>
  );
}

export default ProjectCard;
export { ProjectPlaceholder };
