import React, { useState, useEffect } from 'react';
import {
  Button,
  Icon,
  Label,
  Segment,
  Header,
  List,
  Grid,
  Placeholder
} from 'semantic-ui-react';

import { CategoryListIcon } from './CategoryIcon';

function formatLastUpdateAge(lastCommitAgeInDays) {
  const monthDuration = 30;
  const yearDuration = 365;
  let lastUpdateText = '';
  if (lastCommitAgeInDays < 1) {
    lastUpdateText = 'today';
  } else {
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
    lastUpdateText += ' ago';
  }

  return lastUpdateText;
}

function ProjectCard(props) {
  const {
    categories,
    description,
    languages,
    lastCommitTime,
    name,
    owner,
    stars,
    url,
    websiteUrl
  } = props.project;

  const bookmarkKey = `${url}.bookmarked`;
  const prevBookmarked = localStorage.getItem(bookmarkKey) === '1';
  const [bookmarked, setBookmarked] = useState(prevBookmarked);

  useEffect(() => {
    if (bookmarked) {
      localStorage.setItem(bookmarkKey, 1);
    } else {
      localStorage.removeItem(bookmarkKey);
    }
  });

  const msInADay = 1000 * 3600 * 24;
  const lastCommitDate = Date.parse(lastCommitTime);
  const lastCommitAgeInDays = Math.floor((new Date() - lastCommitDate) / msInADay);
  const maxDescription = 300;

  return (
    <div
      className="project-item"
      data-category={categories}
      data-last-update={lastCommitAgeInDays}
      data-bookmarked={bookmarked}
    >
      <Segment raised>
        <Header
          as="h3"
          className="name"
          style={{ fontSize: '1.5em', marginBottom: '1em' }}
        >
          <Header.Content>{name}</Header.Content>
          <Header.Subheader>{owner}</Header.Subheader>
        </Header>
        <Button
          icon
          className={bookmarked ? 'bookmark-button active' : 'bookmark-button'}
          onClick={() => setBookmarked(!bookmarked)}
        >
          <Icon name="bookmark" />
        </Button>
        <Grid style={{ marginBottom: '1em' }}>
          <Grid.Column width={11}>
            <List>
              <List.Item>
                <CategoryListIcon type={categories[0]} />
                <List.Content className="categories">{categories}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="code" />
                <List.Content className="languages">
                  {languages ? languages.slice(0, 3).join(', ') : 'N/A'}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="code branch" />
                <List.Content className="last-update">
                  {formatLastUpdateAge(lastCommitAgeInDays)}
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Label>
              <Icon name="star" />
              <b className="stars">{stars}</b>
            </Label>
          </Grid.Column>
        </Grid>
        <p style={{ marginBottom: '1.5em' }}>
          {description.length > maxDescription
            ? `${description.substring(0, maxDescription)}...`
            : description}
        </p>
        <Grid columns={2} className="buttons-row">
          <Grid.Column className="left-column">
            <Button className="project-button" fluid icon as="a" href={websiteUrl}>
              <Icon name="globe" />
              &nbsp;Website
            </Button>
          </Grid.Column>
          <Grid.Column className="right-column">
            <Button className="project-button" fluid icon as="a" href={url}>
              View on GitHub&nbsp;
              <Icon name="right arrow" />
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}

function ProjectPlaceholder() {
  return (
    <Grid.Column>
      <Segment raised className="project-item">
        <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
          <Placeholder.Paragraph>
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>
  );
}

export default ProjectCard;
export { ProjectPlaceholder };
