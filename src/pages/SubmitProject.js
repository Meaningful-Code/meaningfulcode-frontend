import React, { useCallback, useState, createRef } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import CheckIcon from '@mui/icons-material/Check';

import ReCAPTCHA from 'react-google-recaptcha';

import { submitProject } from '../projects/projects';

export default function SubmitProject() {
  return (
    <>
      <Typography variant="h1" component="h1">
        SubmitProject
      </Typography>
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

  const loading = formState === FormSubmitted;
  return (
    <>
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
