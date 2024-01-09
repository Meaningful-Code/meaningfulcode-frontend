import React from 'react';
import Container from '@mui/material/Container';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';

export default function Footer() {
  return (
    <footer>
      <Container id="social" sx={{ padding: 0 }}>
        <Typography variant="h3">Support these projects: Share!</Typography>
        <ButtonGroup id="socialButton" disableElevation variant="outlined">
          <Button
            href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fmeaningfulcode.org&text=Pick%20a%20cause%20to%20support%2C%20find%20Open%20Source%20projects%20to%20contribute%20to%2C%20and%20write%20%23MeaningfulCode%21%20%E2%9C%A8%20https%3A%2F%2Fmeaningfulcode.org%2F"
            target="_blank"
            title="Tweet"
            startIcon={<TwitterIcon />}
          >
            Twitter
          </Button>
          <Button
            href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fmeaningfulcode.org&title=MeaningfulCode%20-%20Impactful%20open-source&summary=Pick%20a%20cause%20to%20support%2C%20find%20Open%20Source%20projects%20to%20contribute%20to%2C%20and%20write%20%23MeaningfulCode%21%20%E2%9C%A8%20https%3A%2F%2Fmeaningfulcode.org%2F&source=https%3A%2F%2Fmeaningfulcode.org"
            target="_blank"
            title="Share on LinkedIn"
            startIcon={<LinkedInIcon />}
          >
            LinkedIn
          </Button>
          <Button
            href="http://www.reddit.com/submit?url=https%3A%2F%2Fmeaningfulcode.org&title=MeaningfulCode%20-%20Impactful%20open-source"
            target="_blank"
            title="Submit to Reddit"
            startIcon={<RedditIcon />}
          >
            Reddit
          </Button>
        </ButtonGroup>
      </Container>
    </footer>
  );
}
