'use client';

import React, { useCallback, useState, createRef } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ReCAPTCHA from 'react-google-recaptcha';
import submitProject from './submitProject';

const RECAPTCHA_SITE_KEY = '6LeuSEYeAAAAAJrZY05dnjlIkU-3EAe4JqDdd3wz';

const enum FormState {
  NotSubmitted,
  Submitted,
  Error,
  Success,
}

export type ProjectSubmission = {
  name: string;
  website: string;
  repository: string;
  category: string;
  description: string;
};

export default function SubmitProjectForm({ host }: { host: string }) {
  const defaultRepository = 'https://github.com/';
  const [project, setProject] = useState<ProjectSubmission>({
    name: '',
    website: '',
    repository: defaultRepository,
    category: '',
    description: '',
  });
  const [formState, setFormState] = useState(FormState.NotSubmitted);
  const [repositoryError, setRepositoryError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [ticketUrl, setTicketUrl] = useState('');
  const recaptchaRef = createRef<ReCAPTCHA>();

  const submitCallback = useCallback((): void => {
    if (!recaptchaRef.current) {
      return;
    }

    recaptchaRef.current.reset();
    setTicketUrl('');
    setErrorMessage('');
    setFormState(FormState.Submitted);
    recaptchaRef.current.execute();
  }, [recaptchaRef]);

  const recaptchaHandler = useCallback(
    (token: string | null): void => {
      if (!token) {
        setErrorMessage('Captcha error');
        setFormState(FormState.Error);
        return;
      }

      submitProject(host, project, token)
        .then((url) => {
          setTicketUrl(url);
          setFormState(FormState.Success);
        })
        .catch((err) => {
          setErrorMessage(`${err}`);
          setFormState(FormState.Error);
        });
    },
    [host, project]
  );

  const handleChange = useCallback((event: any) => {
    const { name, value } = event.target;
    if (name === 'repository') {
      const error = !value.startsWith('https://github.com/')
        ? 'Must be a valid Github Repository'
        : '';
      setRepositoryError(error);
      if (error !== '') {
        return;
      }
    }
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  }, []);

  const loading = formState === FormState.Submitted;
  const buttonDisabled = loading || repositoryError !== '';
  return (
    <>
      <Typography variant="h2">Impactful project form</Typography>
      <br />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={recaptchaHandler}
      />
      <Stack spacing={2}>
        <TextField label="Project name" name="name" onChange={handleChange} />
        <TextField label="Website" name="website" onChange={handleChange} />
        <TextField
          error={repositoryError !== ''}
          label="Github Repository"
          name="repository"
          defaultValue={defaultRepository}
          onChange={handleChange}
          helperText={repositoryError}
        />
        <TextField
          label="Category"
          name="category"
          onChange={handleChange}
          placeholder="Accessibility, Education, Environment, Health, Humanitarian, Society"
        />
        <TextField
          label="Description"
          name="description"
          multiline
          rows={5}
          onChange={handleChange}
        />
        <Container disableGutters>
          <Button
            disabled={buttonDisabled}
            variant="contained"
            onClick={submitCallback}
            startIcon={
              // @ts-ignore: ignore unrecognized 'neutral' color from custom theme
              loading ? <CircularProgress size={20} color="neutral" /> : <CheckIcon />
            }
          >
            {loading ? 'Submitting' : 'Submit'}
          </Button>
        </Container>
        {formState === FormState.Error && <Alert severity="error">{errorMessage}</Alert>}
        {formState === FormState.Success && (
          <Alert severity="success">
            Project submitted successfully! You can review the ticket on{' '}
            <a href={ticketUrl}>GitHub</a>. Thank you for your contribution 🎉
          </Alert>
        )}
      </Stack>
    </>
  );
}
