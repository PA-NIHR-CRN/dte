import React from "react";

interface StepWrapperProps {
  children: React.ReactNode;
}

function StepWrapper(props: StepWrapperProps) {
  const { children } = props;

  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">{children}</div>
      </div>
    </div>
  );
}

export default StepWrapper;
