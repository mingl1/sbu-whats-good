import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";

const PromptOutput = ({ text, isNew }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isNew) {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 3));
        index += 3;
        if (index > text.length) {
          clearInterval(intervalId);
        }
      }, 100); // Adjust the interval duration as needed
      return () => clearInterval(intervalId);
    } else {
      setDisplayedText(text);
    }
  }, [text]);

  return <Markdown className="max-w-[800px]">{displayedText}</Markdown>;
};

export default PromptOutput;
