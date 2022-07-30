import React, { useCallback, useEffect, useState, createRef } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CheckIcon from '@mui/icons-material/Check';

import ReCAPTCHA from 'react-google-recaptcha';

import { submitProject } from '../projects/projects';

export default function SubmitProject() {
  useEffect(() => {
    document.title = 'Submit an impactful project';
  });

  const NewProjectIssueLink =
    'https://github.com/Meaningful-Code/meaningfulcode-frontend/issues/new?assignees=&labels=meaningful+project&template=meaningful_project.md&title=Meaningful+project%3A+';
  return (
    <>
      <Typography variant="h1">Submit a project</Typography>
      <p>
        If you have an impactful project that you want to share with the community,
        please submit it here! You can also manually create an{' '}
        <Link href={NewProjectIssueLink}>new issue on GitHub</Link> to submit your
        project.
      </p>
      <br />
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

  const loading = formState === FormSubmitted;
  return (
    <>
      <Typography variant="h2">Impactful project form</Typography>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey="6LeuSEYeAAAAAJrZY05dnjlIkU-3EAe4JqDdd3wz"
        onChange={recaptchaHandler}
      />
      <Stack spacing={2}>
        <TextField label="Project name" onChange={nameChanged} />
        <TextField label="Website" onChange={websiteChanged} />
        <TextField
          label="Description"
          multiline
          rows={5}
          onChange={descriptionChanged}
          defaultValue={`Repository:
Category: Accessibility/Education/Environment/Health/Humanitarian/Society
Description:`}
        />
        <Container disableGutters>
          <Button
            disabled={loading}
            variant="contained"
            color="secondary"
            onClick={submitCallback}
            startIcon={
              loading ? <CircularProgress size={20} color="neutral" /> : <CheckIcon />
            }
          >
            {loading ? 'Submitting' : 'Submit'}
          </Button>
        </Container>
        {formState === FormError ? <Alert severity="error">{errorMessage}</Alert> : ''}
        {formState === FormSuccess ? (
          <Alert severity="success">
            Project submitted successfully! You can review the ticket on{' '}
            <a href={ticketUrl}>GitHub</a>. Thank you for your contribution 🎉
          </Alert>
        ) : (
          ''
        )}
      </Stack>
    </>
  );
}
