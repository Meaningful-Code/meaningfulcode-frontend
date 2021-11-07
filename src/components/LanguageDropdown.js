import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

export default function LanguageFilterButton(props) {
  function mapLanguageOptions(languages) {
    if (!languages) {
      return [];
    }

    const opts = [];
    languages.forEach((language) => {
      opts.push({
        key: language,
        text: language,
        value: language.toLowerCase()
      });
    });
    return opts;
  }

  const { languages, language, onChange } = props;
  const lowerCaseLanguage = language ? language.toLowerCase() : null;

  return (
    <Dropdown
      placeholder="language"
      clearable
      search
      selection
      defaultValue={lowerCaseLanguage}
      options={mapLanguageOptions(languages)}
      onChange={onChange}
    />
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
