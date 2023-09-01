import React, { ReactNode, useContext } from "react";
import { ErrorSummary } from "nhsuk-react-components";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import { DTEAxiosError } from "../../../types/AuthTypes";
import customCodeLookup from "./customCodeLookup";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import { ContentContext } from "../../../context/ContentContext";

interface SimpleError {
  detail: string;
  url?: string;
}
interface ErrorMessageContainerProps {
  description?: string;
  DTEAxiosErrors?: (DTEAxiosError[] | undefined)[];
  simpleErrors?: SimpleError[];
  axiosError?: AxiosError<any>;
  axiosErrors?: (AxiosError<any> | undefined)[];
  children?: React.ReactNode;
  nhsError?: string;
}

const StyledErrorSummary = styled(ErrorSummary)`
  margin-bottom: 1rem;
  padding: 16px;
  border-color: ${(Props) => Props.theme.NIHR.Red};
  p {
    font-size: 18px;
    color: ${(Props) => Props.theme.NIHR.Red};
    font-weight: bolder;
    margin: 0px;
    button {
      padding: 0;
    }
  }
`;

const mapErrorCodeToSummary = (errors: (DTEAxiosError[] | undefined)[]) => {
  // For each failed request
  return errors.map((error) => {
    if (error) {
      // For each DTE error in the failed request
      return error.map((e) => {
        return {
          ...e,
          ...(e.customCode ? { detail: customCodeLookup(e.customCode, e.detail) } : {}),
        };
      });
    }
    return undefined;
  });
};

function ErrorMessageContainer({
  description,
  DTEAxiosErrors,
  simpleErrors,
  axiosError,
  axiosErrors,
  children,
  nhsError,
}: ErrorMessageContainerProps) {
  const { content } = useContext(ContentContext);
  if (nhsError) {
    return (
      <div className="error-summary">
        <StyledErrorSummary>
          <StyledErrorSummary.Title key="title">{content["error-summary-title-problem"]}</StyledErrorSummary.Title>
          <StyledErrorSummary.Body key="body">{nhsError}</StyledErrorSummary.Body>
        </StyledErrorSummary>
      </div>
    );
  }
  if (children) {
    return (
      <div className="error-summary">
        <StyledErrorSummary>
          <StyledErrorSummary.Title key="title">{content["error-summary-title-problem"]}</StyledErrorSummary.Title>
          <StyledErrorSummary.Body key="body">
            {description}
            <StyledErrorSummary.List key="list">
              <StyledErrorSummary.Item key="children">{children}</StyledErrorSummary.Item>
            </StyledErrorSummary.List>
          </StyledErrorSummary.Body>
        </StyledErrorSummary>
      </div>
    );
  }

  if (DTEAxiosErrors || simpleErrors || axiosErrors || axiosError) {
    const errors: ReactNode[] = [];

    if (
      DTEAxiosErrors &&
      DTEAxiosErrors.length > 0 &&
      DTEAxiosErrors.some((item) => item !== undefined && item !== null && item.length > 0)
    ) {
      mapErrorCodeToSummary(DTEAxiosErrors).forEach(
        (mappedErrors: any) => mappedErrors?.forEach((error: any) => errors.push(error.detail))
      );
    }
    if (simpleErrors && simpleErrors.length > 0) {
      simpleErrors.forEach((error: any) => errors.push(error.detail));
    }
    if (axiosErrors && axiosErrors.length > 0) {
      axiosErrors.forEach(
        (innerAxiosError: AxiosError<any> | undefined) =>
          innerAxiosError &&
          innerAxiosError.response?.data?.error?.length > 0 &&
          errors.push(customCodeLookup(innerAxiosError?.response?.data.error))
      );

      axiosErrors.forEach(
        (innerAxiosError: AxiosError<any> | undefined) =>
          innerAxiosError &&
          innerAxiosError.message.length > 0 &&
          errors.push(customCodeLookup(innerAxiosError.message))
      );
    }
    if (axiosError) {
      if (axiosError.message && axiosError.message.length > 0) {
        errors.push(customCodeLookup(axiosError.message));
      }
    }

    const displayErrors = errors.filter((v, i, a) => a.indexOf(v) === i);

    if (displayErrors.length > 0) {
      return (
        <div className="error-summary">
          <Box pt={1} pb={1}>
            <StyledErrorSummary>
              <StyledErrorSummary.Title key="title">{content["error-summary-title-problem"]}</StyledErrorSummary.Title>
              <StyledErrorSummary.Body key="body">
                {description}
                <StyledErrorSummary.List key="list">
                  {displayErrors.map((error: ReactNode) => (
                    <li key={uuidv4()}>
                      <DTEContent>{error}</DTEContent>
                    </li>
                  ))}
                </StyledErrorSummary.List>
              </StyledErrorSummary.Body>
            </StyledErrorSummary>
          </Box>
        </div>
      );
    }
  }

  return <></>;
}

export default ErrorMessageContainer;
