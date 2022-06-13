import React, { useCallback, useState, createRef } from 'react';
import { Header, Form, Button, Icon, Message } from 'semantic-ui-react';
import ReCAPTCHA from 'react-google-recaptcha';

import { submitProject } from '../projects/projects';

export default function SubmitProject() {
  return (
    <>
      <Header as="h1">SubmitProject</Header>
      <p>
        Contributing can be daunting at first, but this is the first step of a rewarding
        journey, using your experience to benefit others while learning and meeting new
        passionate people.
      </p>
      <SubmitProjectForm />
    </>
  );
}

const FormNotSubmitted = Symbol('FormNotSubmitted');
const FormSubmitted = Symbol('FormSubmitted');
const FormError = Symbol('FormError');
const FormSuccess = Symbol('FormSuccess');

function SubmitProjectForm() {
  const [project, setProject] = useState({ description: '' });
  const [formState, setFormState] = useState(FormNotSubmitted);
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketUrl, setTicketUrl] = useState('');
  const recaptchaRef = createRef();

  const submitCallback = useCallback(() => {
    recaptchaRef.current.reset();
    setTicketUrl('');
    setErrorMessage('');
    setFormState(FormSubmitted);
    recaptchaRef.current.execute();
  });

  const recaptchaHandler = useCallback((captchaValue) => {
    if (!captchaValue) {
      setErrorMessage('Captcha error');
      setFormState(FormError);
      return;
    }

    submitProject(project, captchaValue)
      .then((url) => {
        setTicketUrl(url);
        setFormState(FormSuccess);
      })
      .catch((err) => {
        setErrorMessage(`${err}`);
        setFormState(FormError);
      });
  });
  const nameChanged = useCallback((e) => {
    setProject({
      ...project,
      ...{ name: e.target.value }
    });
  });
  const websiteChanged = useCallback((e) => {
    setProject({
      ...project,
      ...{ website: e.target.value }
    });
  });
  const descriptionChanged = useCallback((e) => {
    setProject({
      ...project,
      ...{ description: e.target.value }
    });
  });

  return (
    <>
      <Message attached header="Submit a project" />
      <Form
        success={formState === FormSuccess}
        error={formState === FormError}
        className="attached fluid segment"
      >
        <Form.Input label="Name" placeholder="Project name" onChange={nameChanged} />
        <Form.Input
          label="Website"
          placeholder="Project website"
          onChange={websiteChanged}
        />
        <Form.TextArea
          label="Description"
          placeholder="Project description"
          defaultValue={`Repository:
Category: Accessibility/Education/Environment/Health/Humanitarian/Society
Description:
          `}
          onChange={descriptionChanged}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6LeuSEYeAAAAAJrZY05dnjlIkU-3EAe4JqDdd3wz"
          onChange={recaptchaHandler}
        />
        <Message success>
          <Message.Header>Project submitted</Message.Header>
          <p>
            Project submitted successfully! You can review the ticket on{' '}
            <a href={ticketUrl}>GitHub</a>. Thank you for your contribution 🎉
          </p>
        </Message>
        <Message error header="Error" content={errorMessage} />
        <Button
          loading={formState === FormSubmitted}
          color="green"
          type="submit"
          onClick={submitCallback}
        >
          <Icon name="checkmark" />
          Submit
        </Button>
      </Form>
    </>
  );
}
