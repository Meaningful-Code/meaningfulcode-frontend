import React from 'react';
import { Button, Header, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function PageHeader() {
  return (
    <header>
      <Grid stackable>
        <Grid.Column tablet={16} computer={8}>
          <Link to="/">
            <Header as="h1" color="blue">
              <Image src="/meaningfulcode-logo-64x64.png" />
              <Header.Content id="title">
                Meaningful Code
                <Header.Subheader>
                  Find Open Source projects, <br />
                  contribute, make a difference.
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Link>
        </Grid.Column>
        <Grid.Column id="links" textAlign="right" tablet={16} computer={8}>
          <Button
            id="addProject"
            as="a"
            target="_blank"
            color="teal"
            href="https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=meaningful+project&template=meaningful_project.md&title=Meaningful+project%3A+"
          >
            Add a project!
          </Button>
          <Button as="a" href="/get-started">
            Get started
          </Button>
          <Button as="a" href="/about">
            About
          </Button>
        </Grid.Column>
      </Grid>
    </header>
  );
}
