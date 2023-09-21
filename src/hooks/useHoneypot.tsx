import React, { useState } from "react";

type UseHoneypotReturn = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasDetectedBot: boolean;
};

const useHoneypot = (): UseHoneypotReturn => {
  const [honeypotValue, setHoneypotValue] = useState("");
  const hasDetectedBot = !!honeypotValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoneypotValue(e.target.value);
  };

  return {
    handleChange,
    hasDetectedBot,
  };
};

export default useHoneypot;
