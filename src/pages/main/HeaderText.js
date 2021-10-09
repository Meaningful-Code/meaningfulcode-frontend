import React from 'react';
import { createMedia } from '@artsy/fresnel';
import { Container } from 'semantic-ui-react';

const AppMedia = createMedia({
  breakpoints: {
    computer: 992
  }
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

export default function HeaderText() {
  return (
    <>
      <style>{mediaStyles}</style>
      <MediaContextProvider>
        <Container as={Media} lessThan="computer">
          <p>
            <b>Pick a cause to support</b>, and <b>find Open Source projects</b> willing
            to make our world better. From the environment to health and humanitarian, we
            believe that <b>code can make a difference</b> when contributed to the right
            projects.
          </p>
        </Container>
        <Container as={Media} greaterThanOrEqual="computer">
          <p style={{ textAlign: 'center', margin: '0 5em', fontSize: '20px' }}>
            <b>Pick a cause to support</b>, and <b>find Open Source projects</b> willing
            to make our world better. <br />
            From the environment to health, accessibility, and humanitarian, we believe
            that <b>code can make a difference</b> when contributed to the right
            projects.
          </p>
        </Container>
      </MediaContextProvider>
    </>
  );
}
