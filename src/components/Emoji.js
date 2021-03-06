import React from 'react';
import PropTypes from 'prop-types';

// Thank you Sean
// https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7
function Emoji(props) {
  const { label, symbol } = props;

  return (
    <span
      className="emoji"
      role="img"
      aria-label={label}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  );
}

Emoji.propTypes = {
  label: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired
};

export default Emoji;
