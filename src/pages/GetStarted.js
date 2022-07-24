import React, { useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function GetStarted() {
  useEffect(() => {
    document.title = 'Getting started with open-source';
  });

  return (
    <>
      <Typography variant="h1">Get Started</Typography>
      <p>
        Contributing can be daunting at first, but this is the first step of a rewarding
        journey, using your experience to benefit others while learning and meeting new
        passionate people.
      </p>
      <Typography variant="h2">Every project is different</Typography>
      <p>
        Every project is different, so don&apos;t hesitate to look at multiple
        initiatives to find what makes the most sense to you. Look at their project page
        and website, issues tagged &quot;goodfirstissue&quot;, and contact them if you
        have any questions.
      </p>
      <p>
        To have a better idea of how the team works and how to help, you can also check
        the contribution guidelines and past pull requests.
      </p>
      <Typography variant="h2">
        You don&apos;t need to be an expert, all support matters
      </Typography>
      <p>
        Depending on your goals and expertise, you may very well find yourself outside of
        your comfort zone. This is perfectly normal, and part of the learning experience.
        As long as you are motivated to learn and help, maintainers of open source
        projects are usually happy to help and guide you, to have your contribution
        integrated.
      </p>
      <p>
        Contributing to the code base is also one of many ways to help: some need support
        translating, improving documentation or tutorials, reviewing, or using it. And
        the simple act of sharing a project with others is also a great way to help.
      </p>
      <Typography variant="h2">More inspirational guides to get you started</Typography>
      If you want to learn more before diving in, these are some great guides to get you
      started:
      <ul>
        <li>
          <Link href="https://www.firsttimersonly.com/">
            First timers only: Welcome! Let’s do some open source!
          </Link>
        </li>
        <li>
          <Link href="https://alistapart.com/article/make-something-great-become-an-open-source-contributor/">
            Make Something Great: Become an Open Source Contributor
          </Link>
        </li>
        <li>
          <Link href="https://opensource.guide/how-to-contribute/">
            How to Contribute to Open Source
          </Link>
        </li>
      </ul>
    </>
  );
}
