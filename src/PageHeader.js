import React from 'react';
import { Button, Header, Grid, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

import AddProjectButton from './AddProjectButton'

export default function PageHeader() {
  return (
    <header>
      <Grid stackable>
        <Grid.Column tablet={16} computer={8}>
          <Link to="/">
            <Header as='h1' color='blue'>
              <Icon id='title-icon' name='code' />
              <Header.Content id='title'>
                Meaningful Code
              <Header.Subheader>
                  Find Open Source projects, contribute, make a difference.
              </Header.Subheader>
              </Header.Content>
            </Header>
          </Link>
        </Grid.Column>
        <Grid.Column tablet={16} computer={8} id='links'>
          <Link to="/about">
            <Button floated='right'>About</Button>
          </Link >
          <AddProjectButton />
          <Link to="/get-started">
            <Button floated='right'>Get started</Button>
          </Link >
        </Grid.Column>
      </Grid>
    </header >
  )
}
