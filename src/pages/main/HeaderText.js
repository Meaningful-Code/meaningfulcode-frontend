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
            <Content />
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
    return (
      <>
        <Emoji label="tree" symbol="🌲" /> <b>Eco-friendly</b> and <b>environmental</b>{' '}
        open-source projects, to protect our planet and the life on it{' '}
        <Emoji label="whale" symbol="🐋" />.{large ? <br /> : ' '}
        These projects focus on having a <b>positive impact</b> on climate change, energy
        consumption, pollution, or protecting plants and animal life on our planet.{' '}
        <Emoji label="tree" symbol="🌎" />
      </>
    );
  };

  return <HeaderTextContainer Content={content} />;
}

function AccessibilityHeaderText() {
  const content = ({ large }) => {
    return (
      <>
        <b>Make</b> our society <b>more accessible</b>{' '}
        <Emoji label="accessibility" symbol="♿" /> by contributing to these open-source
        projects.
        {large ? <br /> : ' '}
        Using software, we can help tools, and services to be more{' '}
        <b>inclusive {large ? <br /> : ' '}and welcoming</b> for people with disabilities{' '}
        <Emoji label="handshake" symbol="🤝🏼" />.
      </>
    );
  };

  return <HeaderTextContainer Content={content} />;
}

function HealthHeaderText() {
  const content = ({ large }) => {
    return (
      <>
        <Emoji label="health" symbol="⚕️" /> Support research and open-source initiatives
        to <b>improve</b> our
        <b> health</b> conditions. {large ? <br /> : ''}Some projects focus on medical
        <b> knowledge, detection, and treatment</b> <Emoji label="pill" symbol="💊" /> of
        diseases and health conditions. Others work to improve the public awareness and
        access to <b>information</b>, or to help creating <b>healthier habits</b>
        <Emoji label="apple" symbol="🍎" />.
      </>
    );
  };

  return <HeaderTextContainer Content={content} />;
}

export default function HeaderText(props) {
  const { category } = props;

  switch (category) {
    case 'accessibility':
      return AccessibilityHeaderText();
    case 'health':
      return HealthHeaderText();
    case 'environment':
      return EnvironmentHeaderText();
    default:
      return GenericHeaderText();
  }
}

HeaderText.propTypes = {
  category: PropTypes.string
};

HeaderText.defaultProps = {
  category: null
};
