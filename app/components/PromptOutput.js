import React, { useState, useEffect } from 'react';

const PromptOutput = ({ text, isNew}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if(isNew) {
        let index = 0;
        const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index+3));
        index+=3;
        if (index > text.length) {
            clearInterval(intervalId);
        }
        }, 100); // Adjust the interval duration as needed
        return () => clearInterval(intervalId);
    } else {
        setDisplayedText(text);
    }
  }, [text]);

  return <p className="max-w-[800px]">{displayedText}</p>;
};

export default PromptOutput;