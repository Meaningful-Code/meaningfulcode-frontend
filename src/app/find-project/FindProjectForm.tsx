'use client';

import React, { useState, useCallback, createRef } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

import ReCAPTCHA from 'react-google-recaptcha';
import { RECAPTCHA_SITE_KEY } from '@/constants/constants';

import invokeAgent from './invokeAgent';
import Skeleton from '@mui/material/Skeleton';
import { List, ListItem, ListItemText } from '@mui/material';

const enum FormState {
  NotSubmitted,
  Submitted,
  Error,
  Answered,
}

export default function FindProjectForm({ host }: { host: string }) {
  const [formState, setFormState] = useState(FormState.NotSubmitted);
  const [errorMessage, setErrorMessage] = useState('');
  const [prompt, setPrompt] = useState('');
  const [previousPrompt, setPreviousPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [projectList, setProjectList] = useState<Array<string>>([]);
  const recaptchaRef = createRef<ReCAPTCHA>();

  const submitCallback = useCallback((): void => {
    if (!recaptchaRef.current) {
      return;
    }

    recaptchaRef.current.reset();
    setPreviousPrompt(prompt);
    setPrompt('');
    setAnswer('');
    setErrorMessage('');
    setFormState(FormState.Submitted);
    recaptchaRef.current.execute();
  }, [prompt, recaptchaRef]);

  const recaptchaHandler = useCallback(
    (token: string | null): void => {
      if (formState !== FormState.Submitted) {
        // Ignore spurious recaptcha responses
        return;
      }
      if (!token) {
        setErrorMessage('Captcha error');
        setFormState(FormState.Error);
        return;
      }

      invokeAgent(host, previousPrompt, token)
        .then((answer: string) => {
          const sentences = answer.split('- ').map((sentence) => sentence.trim());
          setAnswer(sentences[0]);
          setProjectList(sentences.slice(1));
          setFormState(FormState.Answered);
        })
        .catch((err) => {
          setErrorMessage(`${err}`);
          setFormState(FormState.Error);
        });
    },
    [formState, host, previousPrompt]
  );

  const handleChange = useCallback((event: any) => {
    const { value } = event.target;
    setPrompt(value);
  }, []);

  const loading = formState === FormState.Submitted;
  const buttonDisabled = loading || prompt.length === 0;

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={recaptchaHandler}
      />
      <TextField
        label="Request"
        name="request"
        onChange={handleChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !buttonDisabled) {
            event.preventDefault();
            submitCallback();
          }
        }}
        value={prompt}
        sx={{ m: 1, width: '100ch' }}
        inputProps={{ maxLength: 100 }}
      />
      <IconButton
        aria-label="send request"
        disabled={buttonDisabled}
        onClick={submitCallback}
        style={{ height: 50, width: 50 }}
      >
        {loading ? <CircularProgress size={25} /> : <SendIcon />}
      </IconButton>
      <br />
      <br />
      {formState !== FormState.NotSubmitted && (
        <Card style={{ marginRight: '20%' }}>
          <CardContent>{previousPrompt}</CardContent>
        </Card>
      )}
      <br />
      <Card style={{ marginLeft: '20%' }}>
        {formState === FormState.Submitted && (
          <CardContent>
            <Skeleton />
            <Skeleton width="75%" />
            <Skeleton width="60%" />
          </CardContent>
        )}
        {formState === FormState.Answered && (
          <CardContent>
            {answer.replace('\n', '')}
            <List>
              {projectList.map((project, index) => (
                <ListItem key={index}>
                  <ListItemText primary={project} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        )}
        {formState === FormState.Error && formState === FormState.Error && (
          <Alert severity="error">{errorMessage}</Alert>
        )}
      </Card>
    </>
  );
}
