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

import { submitProject, ProjectSubmission } from '../api/ProjectApi';

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

const enum FormState {
  NotSubmitted,
  Submitted,
  Error,
  Success
}

function SubmitProjectForm() {
  const [project, setProject] = useState<ProjectSubmission>({
    name: '',
    website: '',
    repository: '',
    category: '',
    description: ''
  });
  const [formState, setFormState] = useState(FormState.NotSubmitted);
  const [repositoryError, setRepositoryError] = useState("");
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

      submitProject(project, token)
        .then((url) => {
          setTicketUrl(url);
          setFormState(FormState.Success);
        })
        .catch((err) => {
          setErrorMessage(`${err}`);
          setFormState(FormState.Error);
        });
    },
    [project]
  );

  const nameChanged = useCallback(
    (e: any) => {
      const updatedProject = project;
      updatedProject.name = e.target.value;
      setProject(updatedProject);
    },
    [project]
  );
  const websiteChanged = useCallback(
    (e: any) => {
      const updatedProject = project;
      updatedProject.website = e.target.value;
      setProject(updatedProject);
    },
    [project]
  );
  const repositoryChanged = useCallback(
    (e: any) => {
      const updatedProject = project;
      const val = e.target.value;
      updatedProject.repository = val;
      setProject(updatedProject);
      if (!val.startsWith("https://github.com/")){
        setRepositoryError("Must be valid Github Repository");
      } else {
        setRepositoryError("");
      }
    },
    [project]
  );
  const categoryChanged = useCallback(
    (e: any) => {
      const updatedProject = project;
      updatedProject.category = e.target.value;
      setProject(updatedProject);
    },
    [project]
  );
  const descriptionChanged = useCallback(
    (e: any) => {
      const updatedProject = project;
      updatedProject.description = e.target.value;
      setProject(updatedProject);
    },
    [project]
  );

  const loading = formState === FormState.Submitted;
  const buttonDisabled = loading || repositoryError !== "";
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
        <TextField error={repositoryError!==""} label="Repository" onChange={repositoryChanged} helperText={repositoryError}/>
        <TextField label="Category" onChange={categoryChanged}
          defaultValue={`Accessibility/Education/Environment/Health/Humanitarian/Society`}
        />
        <TextField
          label="Description"
          multiline
          rows={5}
          onChange={descriptionChanged}
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
        {formState === FormState.Error ? (
          <Alert severity="error">{errorMessage}</Alert>
        ) : (
          ''
        )}
        {formState === FormState.Success ? (
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