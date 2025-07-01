import React from "react";

interface ErrorMessageProps {
  name: string;
  errors: Record<string, string | null>;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ name, errors }) => {
  if (!errors[name]) return null;

  return (
    <p style={{ color: "red", fontSize: "0.875rem", marginTop: "4px" }}>
      {errors[name]}
    </p>
  );
};

export default ErrorMessage;
