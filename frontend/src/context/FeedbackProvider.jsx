import React, { createContext, useContext, useState } from 'react';

export const FeedbackContext = createContext();



export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [header, setHeader] = useState("");
  const [sem, setSem] = useState("");
  return (
    <FeedbackContext.Provider value={{ feedback, setFeedback, header, setHeader, sem, setSem }}>
      {children}
    </FeedbackContext.Provider>
  );
};
export const useFeedback = () => useContext(FeedbackContext);