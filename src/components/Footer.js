import React from 'react';
import { Button, Header, Icon } from 'semantic-ui-react';

export default function Footer() {
  return (
    <footer>
      <div id="social">
        <Header as="h3">Support these projects: Share!</Header>
        <Button
          color="twitter"
          href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fmeaningfulcode.org&text=Pick%20a%20cause%20to%20support%2C%20find%20Open%20Source%20projects%20to%20contribute%20to%2C%20and%20write%20%23MeaningfulCode%21%20%E2%9C%A8%20https%3A%2F%2Fmeaningfulcode.org%2F"
          target="_blank"
          title="Tweet"
        >
          <Icon name="twitter" />
          Twitter
        </Button>
        <Button
          color="linkedin"
          href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fmeaningfulcode.org&title=MeaningfulCode%20-%20Impactful%20open-source&summary=Pick%20a%20cause%20to%20support%2C%20find%20Open%20Source%20projects%20to%20contribute%20to%2C%20and%20write%20%23MeaningfulCode%21%20%E2%9C%A8%20https%3A%2F%2Fmeaningfulcode.org%2F&source=https%3A%2F%2Fmeaningfulcode.org"
          target="_blank"
          title="Share on LinkedIn"
        >
          <Icon name="linkedin" />
          LinkedIn
        </Button>
        <Button
          color="red"
          href="http://www.reddit.com/submit?url=https%3A%2F%2Fmeaningfulcode.org&title=MeaningfulCode%20-%20Impactful%20open-source"
          target="_blank"
          title="Submit to Reddit"
        >
          <Icon name="reddit" />
          Reddit
        </Button>
      </div>
    </footer>
  );
}
