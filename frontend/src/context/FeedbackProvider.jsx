import React, { createContext, useContext, useState } from 'react';

export const FeedbackContext = createContext();



export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  return (
    <FeedbackContext.Provider value={{ feedback, setFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};
export const useFeedback = () => useContext(FeedbackContext);