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
              <Image id="logo" src="/meaningfulcode-logo.png" />
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
          <Button id="addProject" color="teal" as={Link} to="submit-project">
            Add a project!
          </Button>
          <Button as={Link} to="/get-started">
            Get started
          </Button>
          <Button as={Link} to="/about">
            About
          </Button>
        </Grid.Column>
      </Grid>
    </header>
  );
}
