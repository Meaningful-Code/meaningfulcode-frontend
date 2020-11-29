import React, { useState, useEffect } from 'react';
import { Button, Icon, Label, Segment, Header, List, Grid, Placeholder } from 'semantic-ui-react'

import { CategoryListIcon } from './CategoryIcon'

function ProjectCard(props) {
  const bookmarkKey = props.project.url + '.bookmarked'
  const prevBookmarked = (localStorage.getItem(bookmarkKey) === '1');
  const [bookmarked, setBookmarked] = useState(prevBookmarked ? true : false);

  useEffect(() => {
    if (bookmarked)
      localStorage.setItem(bookmarkKey, 1);
    else
      localStorage.removeItem(bookmarkKey)
  });

  const lastCommitAgeInDays = Math.floor(((new Date()) - Date.parse(props.project.lastCommitTime)) / (1000 * 3600 * 24))
  const maxDescription = 300
  return (
    <div className="project-item" data-category={props.project.categories}
      data-last-update={lastCommitAgeInDays}
      data-bookmarked={bookmarked}>
      <Segment raised>
        <Header as="h3" className="name" style={{ fontSize: '1.5em', marginBottom: '1em' }}>
          <Header.Content>{props.project.name}</Header.Content>
          <Header.Subheader>{props.project.owner}</Header.Subheader>
        </Header>
        <Button icon className={bookmarked ? 'bookmark-button active' : 'bookmark-button'}
          onClick={() => setBookmarked(!bookmarked)}>
          <Icon name='bookmark' />
        </Button>
        <Grid style={{ marginBottom: '1em' }}>
          <Grid.Column width={11}>
            <List>
              <List.Item>
                <CategoryListIcon type={props.project.categories[0]} />
                <List.Content className="categories">{props.project.categories}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='code' />
                <List.Content className="languages">{props.project.languages ? props.project.languages.slice(0, 3).join(', ') : "N/A"}</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='code branch' />
                <List.Content className="last-update">{lastCommitAgeInDays === 0 ? "today" : lastCommitAgeInDays + " days ago"}</List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Label>
              <Icon name='star' /><b className="stars">{props.project.stars}</b>
            </Label>
          </Grid.Column>
        </Grid>
        <p style={{ "marginBottom": "1.5em" }}>{props.project.description.length > maxDescription ?
          props.project.description.substring(0, maxDescription) + '...' : props.project.description}</p>
        <Grid columns={2} className='buttons-row'>
          <Grid.Column className='left-column'>
            <Button className='project-button' fluid icon as='a' href={props.project.websiteUrl}>
              <Icon name='globe' />
              &nbsp;Website
            </Button>
          </Grid.Column>
          <Grid.Column className='right-column'>
            <Button className='project-button' fluid icon as='a' href={props.project.url}>
              View on GitHub&nbsp;
              <Icon name='right arrow' />
            </Button>
          </Grid.Column>
        </Grid>
      </Segment >
    </div>
  )
}

function ProjectPlaceholder() {
  return (
    <Grid.Column>
      <Segment raised className="project-item">
        <Placeholder >
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
  )
}

export default ProjectCard
export { ProjectPlaceholder }