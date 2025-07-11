import React from 'react';
import Container from '@mui/material/Container';
import Emoji from '../../components/Emoji';
import { useTranslations } from 'next-intl';

function HeaderTextContainer({ children }: { children: React.ReactNode }) {
  return <Container className="category-description">{children}</Container>;
}

function GenericHeaderText() {
  const t = useTranslations('HeaderText');

  return (
    <HeaderTextContainer>
      <p className="description-large">
        {t.rich('descriptionLarge', {
          emoji1: () => <Emoji label="planet" symbol="🌍" />,
          emoji2: () => <Emoji label="computer" symbol="💻" />,
          bold1: (chunks) => <b>{chunks}</b>,
          bold2: (chunks) => <b>{chunks}</b>,
          bold3: (chunks) => <b>{chunks}</b>,
          br: () => <br />,
        })}
      </p>

      <p className="description-small">
        {t.rich('descriptionSmall', {
          emoji1: () => <Emoji label="planet" symbol="🌍" />,
          emoji2: () => <Emoji label="computer" symbol="💻" />,
          bold1: (chunks) => <b>{chunks}</b>,
          bold2: (chunks) => <b>{chunks}</b>,
          bold3: (chunks) => <b>{chunks}</b>,
        })}
      </p>
    </HeaderTextContainer>
  );
}

function EnvironmentHeaderText() {
  const t = useTranslations('HeaderText');
  return (
    <HeaderTextContainer>
      {t.rich('environment', {
        emoji1: () => <Emoji label="tree" symbol="🌲" />,
        emoji2: () => <Emoji label="whale" symbol="🐋" />,
        emoji3: () => <Emoji label="tree" symbol="🌎" />,
        bold1: (chunks) => <b>{chunks}</b>,
        bold2: (chunks) => <b>{chunks}</b>,
        bold3: (chunks) => <b>{chunks}</b>,
        br: () => <br className="lg-only-br" />,
      })}
    </HeaderTextContainer>
  );
}

function AccessibilityHeaderText() {
  const t = useTranslations('HeaderText');

  return (
    <HeaderTextContainer>
      {t.rich('accessibility', {
        emoji1: () => <Emoji label="accessibility" symbol="♿" />,
        emoji2: () => <Emoji label="handshake" symbol="🤝🏼" />,
        bold1: (chunks) => <b>{chunks}</b>,
        bold2: (chunks) => <b>{chunks}</b>,
        br: () => <br className="lg-only-br" />,
      })}
    </HeaderTextContainer>
  );
}

function HealthHeaderText() {
  const t = useTranslations('HeaderText');

  return (
    <HeaderTextContainer>
      {t.rich('health', {
        emoji1: () => <Emoji label="health" symbol="⚕️" />,
        emoji2: () => <Emoji label="pill" symbol="💊" />,
        emoji3: () => <Emoji label="apple" symbol="🍎" />,
        bold1: (chunks) => <b>{chunks}</b>,
        bold2: (chunks) => <b>{chunks}</b>,
        bold3: (chunks) => <b>{chunks}</b>,
        bold4: (chunks) => <b>{chunks}</b>,
        bold5: (chunks) => <b>{chunks}</b>,
        br: () => <br className="lg-only-br" />,
      })}
    </HeaderTextContainer>
  );
}

function EducationHeaderText() {
  const t = useTranslations('HeaderText');
  return (
    <HeaderTextContainer>
      {t.rich('education', {
        emoji1: () => <Emoji label="book" symbol="📖" />,
        emoji2: () => <Emoji label="graduation cap" symbol="🎓" />,
        bold1: (chunks) => <b>{chunks}</b>,
        bold2: (chunks) => <b>{chunks}</b>,
        bold3: (chunks) => <b>{chunks}</b>,
        br: () => <br className="lg-only-br" />,
      })}
    </HeaderTextContainer>
  );
}

function HumanitarianHeaderText() {
  const t = useTranslations('HeaderText');

  return (
    <HeaderTextContainer>
      {t.rich('humanitarian', {
        emoji1: () => <Emoji label="planet" symbol="🌍" />,
        emoji2: () => <Emoji label="handshake" symbol="🤝🏼" />,
        bold1: (chunks) => <b>{chunks}</b>,
        bold2: (chunks) => <b>{chunks}</b>,
        br: () => <br className="lg-only-br" />,
      })}
    </HeaderTextContainer>
  );
}

function SocietyHeaderText() {
  const t = useTranslations('HeaderText');

  return (
    <HeaderTextContainer>
      {t.rich('society', {
        emoji1: () => <Emoji label="building" symbol="🏛️" />,
        emoji2: () => <Emoji label="megaphone" symbol="📣" />,
        bold1: (chunks) => <b>{chunks}</b>,
        bold2: (chunks) => <b>{chunks}</b>,
        bold3: (chunks) => <b>{chunks}</b>,
        bold4: (chunks) => <b>{chunks}</b>,
        br: () => <br className="lg-only-br" />,
      })}
    </HeaderTextContainer>
  );
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
