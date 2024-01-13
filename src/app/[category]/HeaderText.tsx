import React from 'react';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Emoji from '../../components/Emoji';

type HeaderTextContainerProps = {
  Content: ({ large }: { large: boolean }) => JSX.Element;
};

function HeaderTextContainer(props: HeaderTextContainerProps) {
  const { Content } = props;
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  if (isLarge) {
    return (
      <Container className="category-description">
        <p style={{ textAlign: 'center', margin: '0 4em', fontSize: '20px' }}>
          <Content large />
        </p>
      </Container>
    );
  }

  return (
    <Container className="category-description">
      <Content large={false} />
    </Container>
  );
}

function GenericHeaderText() {
  const content = ({ large }: { large: boolean }) =>
    large ? (
      <>
        <Emoji label="planet" symbol="🌍" /> <b>Pick a cause to support</b>, and{' '}
        <b>find Open Source projects</b> willing to make our world a better place .{' '}
        <br />
        From the environment to health, accessibility, and humanitarian, we believe that{' '}
        <b>code can make a difference</b> when contributed to the right projects{' '}
        <Emoji label="computer" symbol="💻" />.
      </>
    ) : (
      <>
        <Emoji label="planet" symbol="🌍" /> <b>Pick a cause to support</b>, and{' '}
        <b>find Open Source projects</b> willing to make our world a better place . From
        the environment to health and humanitarian, we believe that{' '}
        <b>code can make a difference</b> when contributed to the right projects{' '}
        <Emoji label="computer" symbol="💻" />.
      </>
    );

  return <HeaderTextContainer Content={content} />;
}

function EnvironmentHeaderText() {
  const content = ({ large }: { large: boolean }) => (
    <>
      <Emoji label="tree" symbol="🌲" /> <b>Eco-friendly</b> and <b>environmental</b>{' '}
      open-source projects, to protect our planet and the life on it{' '}
      <Emoji label="whale" symbol="🐋" />.{large ? <br /> : ' '}
      These projects focus on having a <b>positive impact</b> on climate change, energy
      consumption, pollution, or protecting plants and animal life on our planet.{' '}
      <Emoji label="tree" symbol="🌎" />
    </>
  );

  return <HeaderTextContainer Content={content} />;
}

function AccessibilityHeaderText() {
  const content = ({ large }: { large: boolean }) => (
    <>
      Make our society <b>more accessible</b> <Emoji label="accessibility" symbol="♿" />{' '}
      by contributing to these open-source projects.
      {large ? <br /> : ' '}
      Using software, we can help tools, and services to be more{' '}
      <b>inclusive {large ? <br /> : ' '}and welcoming</b> for people with disabilities{' '}
      <Emoji label="handshake" symbol="🤝🏼" />.
    </>
  );

  return <HeaderTextContainer Content={content} />;
}

function HealthHeaderText() {
  const content = ({ large }: { large: boolean }) => (
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

  return <HeaderTextContainer Content={content} />;
}

function EducationHeaderText() {
  const content = ({ large }: { large: boolean }) => (
    <>
      <Emoji label="book" symbol="📖" /> Make <b>education</b> and <b>personal growth</b>{' '}
      more inclusive by contributing to these projects.
      {large ? <br /> : ' '}
      Let&apos;s make learning <Emoji label="graduation cap" symbol="🎓" />{' '}
      <b>more accessible</b> and fun for everyone!
    </>
  );

  return <HeaderTextContainer Content={content} />;
}

function HumanitarianHeaderText() {
  const content = ({ large }: { large: boolean }) => (
    <>
      <Emoji label="planet" symbol="🌍" /> These open-source projects make a difference
      for <b>vulnerable populations</b> around the globe and those affected by natural
      disasters, conflicts, or limited access to essential resources.{' '}
      {large ? <br /> : ' '}
      Your contribution can help <b>provide what they need</b>{' '}
      <Emoji label="handshake" symbol="🤝🏼" />, whether food, shelter, or medical
      attention.
    </>
  );

  return <HeaderTextContainer Content={content} />;
}

function SocietyHeaderText() {
  const content = ({ large }: { large: boolean }) => (
    <>
      <Emoji label="building" symbol="🏛️" /> Do you want to make our <b>society</b> more{' '}
      <b>inclusive</b> and <b>fair</b>? Or maybe provide <b>tools for citizens</b> to
      learn, organize, or communicate
      <Emoji label="megaphone" symbol="📣" />. {large ? <br /> : ' '}This is what all
      these projects aim to provide.
    </>
  );

  return <HeaderTextContainer Content={content} />;
}

type HeaderTextProps = {
  category: string | null;
};

export default function HeaderText(props: HeaderTextProps) {
  const { category } = props;

  switch (category) {
    case 'accessibility':
      return AccessibilityHeaderText();
    case 'health':
      return HealthHeaderText();
    case 'environment':
      return EnvironmentHeaderText();
    case 'education':
      return EducationHeaderText();
    case 'humanitarian':
      return HumanitarianHeaderText();
    case 'society':
      return SocietyHeaderText();
    default:
      return GenericHeaderText();
  }
}
