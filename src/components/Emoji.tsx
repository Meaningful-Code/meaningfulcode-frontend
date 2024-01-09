import React from 'react';

type EmojiProps = {
  label?: string;
  symbol: string;
};

// Thank you Sean
// https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7
function Emoji(props: EmojiProps) {
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

export default Emoji;
