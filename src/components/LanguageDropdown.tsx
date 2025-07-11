import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useTranslations } from 'next-intl';

type LanguageFilterButtonProps = {
  languages: string[];
  language: string | null;
  onChange: (event: React.SyntheticEvent<Element, Event>) => void;
};

export default function LanguageDropdown(props: LanguageFilterButtonProps) {
  const { languages, language, onChange } = props;
  const t = useTranslations('Generic');

  return (
    <Grid item>
      <Autocomplete
        autoSelect
        options={languages}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label={t('language')} />
        )}
        onChange={onChange}
        sx={{ width: 200 }}
        size="small"
        value={language || null}
      />
    </Grid>
  );
}
