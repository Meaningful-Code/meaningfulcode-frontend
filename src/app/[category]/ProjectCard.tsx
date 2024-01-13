import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ButtonGroup from '@mui/material/ButtonGroup';

import CodeIcon from '@mui/icons-material/Code';
import CommitIcon from '@mui/icons-material/Commit';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInIconNot from '@mui/icons-material/TurnedInNot';

import CategoryIcon from '../../components/CategoryIcon';
import GitHubButton from '../../components/GitHubButton';
import { ProjectCardListIcon } from './ProjectCardListIcon';
import { Project } from '../../models/Project';
import { formatLastUpdateAge } from '../../utils/date';

function FeaturedListItem() {
  return (
    <ListItem disableGutters disablePadding>
      <ProjectCardListIcon avatar={<StarIcon />} />
      <ListItemText primary="Featured" />
    </ListItem>
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
  const isFeatured = false;
  const bookmarkKey = `${url}.bookmarked`;
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(localStorage.getItem(bookmarkKey) === '1');
  }, []);

  const toggleBookmarked = () => {
    if (!bookmarked) {
      localStorage.setItem(bookmarkKey, '1');
      setBookmarked(true);
    } else {
      localStorage.removeItem(bookmarkKey);
      setBookmarked(false);
    }
  };

  const maxDescription = 300;
  let descriptionText = description || '';
  if (descriptionText.length > maxDescription) {
    descriptionText = descriptionText.substring(0, maxDescription);
  }

  const secInADay = 3600 * 24;
  let lastCommitAgeInDays: number | null = null;
  if (lastCommitTimestamp > 0) {
    const nowSeconds = Date.now() / 1000;
    lastCommitAgeInDays = Math.floor((nowSeconds - lastCommitTimestamp) / secInADay);
  }

  return (
    <div className={`project-item ${categories} ${isFeatured ? 'featured' : ''}`}>
      <Card variant="outlined">
        <CardHeader
          component="h3"
          title={name}
          subheader={owner}
          sx={{ marginTop: 0, marginBottom: 0 }}
          action={
            <IconButton
              aria-label={`Bookmark project "${name}"`}
              onClick={() => toggleBookmarked()}
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
            {isFeatured && FeaturedListItem()}
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
          <ButtonGroup variant="text" color="secondary" fullWidth>
            {websiteUrl && (
              <Button component={Link} href={websiteUrl} startIcon={<PublicIcon />}>
                Website
              </Button>
            )}
            {url && <GitHubButton url={url} />}
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

export default ProjectCard;
