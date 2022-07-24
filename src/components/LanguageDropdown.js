import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function LanguageFilterButton(props) {
  const { languages, language, onChange } = props;

  return (
    <Grid item>
      <Autocomplete
        autoSelect
        options={languages}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label="Language" />
        )}
        onChange={onChange}
        sx={{ width: 200 }}
        size="small"
        value={language}
      />
    </Grid>
  );
}

LanguageFilterButton.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  language: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

LanguageFilterButton.defaultProps = {
  language: null
};
