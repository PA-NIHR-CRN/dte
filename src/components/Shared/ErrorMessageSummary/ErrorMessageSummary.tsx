import { ReactElement } from "react";
import { FieldError } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface ErrorMessageSummaryProps {
  renderSummary: boolean;
  errors: Record<string, unknown>;
}

function ErrorMessageSummary({ renderSummary, errors }: ErrorMessageSummaryProps): ReactElement {
  return (
    <>
      {renderSummary && errors && Object.keys(errors).length > 0 && (
        <div
          className="nhsuk-u-visually-hidden"
          id="error-message"
          role="alert"
          aria-live={errors ? "assertive" : "off"}
        >
          <h2>There is a problem</h2>
          <ul>
            {Object.entries(errors).map((value) => {
              const fieldName = value[0] as string;
              const error = value[1] as FieldError;
              return (
                <li key={uuidv4()}>
                  <a href={`#${fieldName}`}>{`Error: ${error.message}`}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default ErrorMessageSummary;
