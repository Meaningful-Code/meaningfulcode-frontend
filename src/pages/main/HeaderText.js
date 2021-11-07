import React from 'react';
import PropTypes from 'prop-types';
import { createMedia } from '@artsy/fresnel';
import { Container } from 'semantic-ui-react';

import Emoji from '../../components/Emoji';

const AppMedia = createMedia({
  breakpoints: {
    small: 0,
    computer: 992
  }
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

function HeaderTextContainer(props) {
  const { Content } = props;

  return (
    <>
      <style>{mediaStyles}</style>
      <MediaContextProvider>
        <Container as={Media} lessThan="computer">
          <p>
            <Content small />
          </p>
        </Container>
        <Container as={Media} greaterThanOrEqual="computer">
          <p style={{ textAlign: 'center', margin: '0 4em', fontSize: '20px' }}>
            <Content large />
          </p>
        </Container>
      </MediaContextProvider>
    </>
  );
}

HeaderTextContainer.propTypes = {
  Content: PropTypes.elementType.isRequired
};

function GenericHeaderText() {
  const content = (large) => {
    return large ? (
      <>
        <b>Pick a cause to support</b>, and <b>find Open Source projects</b> willing to
        make our world better. <br />
        From the environment to health, accessibility, and humanitarian, we believe that{' '}
        <b>code can make a difference</b> when contributed to the right projects.
      </>
    ) : (
      <>
        <b>Pick a cause to support</b>, and <b>find Open Source projects</b> willing to
        make our world better. From the environment to health and humanitarian, we
        believe that <b>code can make a difference</b> when contributed to the right
        projects.
      </>
    );
  };

  return <HeaderTextContainer Content={content} />;
}

function EnvironmentHeaderText() {
  const content = ({ large }) => {
    return large ? (
      <>
        <Emoji label="tree" symbol="🌲" />
        <b> Eco-friendly</b> and <b>environmental</b> open-source projects, to protect
        our planet and the life on it. <Emoji label="whale" symbol="🐋" />
        <br />
        These projects focus on having a <b>positive impact</b> on climate change, energy
        consumption, pollution, or protecting plants and animal life on our planet.{' '}
        <Emoji label="tree" symbol="🌎" />
      </>
    ) : (
      <>
        <Emoji label="tree" symbol="🌲" />
        <b> Eco-friendly</b> and <b>environmental</b> open-source projects, to protect
        our planet and the life on it <Emoji label="whale" symbol="🐋" />. These projects
        focus on having a <b>positive impact</b> on climate change, energy consumption,
        pollution, or protecting plants and animal life on our planet.{' '}
        <Emoji label="tree" symbol="🌎" />
      </>
    );
  };

  return <HeaderTextContainer Content={content} />;
}

export default function HeaderText(props) {
  const { category } = props;

  if (category === 'environment') {
    return EnvironmentHeaderText();
  }

  return GenericHeaderText();
}

HeaderText.propTypes = {
  category: PropTypes.string
};

HeaderText.defaultProps = {
  category: null
};
