import React from 'react';
import { Header } from 'semantic-ui-react';

export default function GetStarted() {
  return (
    <>
      <Header as="h1">Get Started</Header>
      <p>
        Contributing can be daunting at first, but this is the first step of a rewarding
        journey, using your experience to benefit others while learning and meeting new
        passionate people.
      </p>
      <Header as="h2">Every project is different</Header>
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
      <Header as="h2">You don&apos;t need to be an expert, all support matters</Header>
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
      <Header as="h2">More inspirational guides to get you started</Header>
      If you want to learn more before diving in, these are some great guides to get you
      started:
      <ul>
        <li>
          <a href="https://www.firsttimersonly.com/">
            First timers only: Welcome! Let’s do some open source!
          </a>
        </li>
        <li>
          <a href="https://alistapart.com/article/make-something-great-become-an-open-source-contributor/">
            Make Something Great: Become an Open Source Contributor
          </a>
        </li>
        <li>
          <a href="https://opensource.guide/how-to-contribute/">
            How to Contribute to Open Source
          </a>
        </li>
      </ul>
    </>
  );
}
