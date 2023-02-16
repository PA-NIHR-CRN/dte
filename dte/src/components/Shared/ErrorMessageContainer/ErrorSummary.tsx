import React from "react";
import { FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type ErrorSummaryProps<T> = {
  errors: FieldErrors<T>;
};
function ErrorSummary<T>({ errors }: ErrorSummaryProps<T>) {
  if (Object.keys(errors).length === 0) {
    return null;
  }
  return (
    <div className="error-summary">
      {Object.keys(errors).map((fieldName) => (
        <ErrorMessage
          errors={errors}
          name={fieldName as any}
          as="div"
          key={fieldName}
        />
      ))}
    </div>
  );
}

export default ErrorSummary;
