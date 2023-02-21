import { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import { AuthContext } from "../../../context/AuthContext";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import Utils from "../../../Helper/Utils";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import Container from "../../Shared/Container/Container";
import DTEBackLink from "../../Shared/UI/DTEBackLink/DTEBackLink";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTELinkButton from "../../Shared/UI/DTELinkButton/DTELinkButton";
import UpdateEmailForm from "./Forms/UpdateEmailForm";
import UpdatePasswordForm from "./Forms/UpdatePasswordForm";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";

interface UserDataState {
  currentEmail: string;
}

const StyledWrapper = styled.div`
  scroll-margin-top: 10em;
`;

const StyledHiddenText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  border: 0;
  white-space: nowrap;
`;

const AccountSettings = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<string>("main");
  const [pageTitle, setPageTitle] = useState(
    "Account settings - Volunteer Account - Be Part of Research"
  );
  const [gaURL, setGaURL] = useState("/AccountSettings");
  const theme = useTheme();
  const [userData, setUserData] = useState<UserDataState>();
  const { authenticatedUserId } = useContext(AuthContext);
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/participants/${authenticatedUserId}/details`,
      method: "GET",
    },
    {
      manual: false,
      useCache: false,
    }
  );

  const handlePageTitle = (page: string) => {
    switch (page) {
      case "email":
        setPageTitle(
          "What is your new email address? - Volunteer Account - Be Part of Research"
        );
        setGaURL("/AccountSettings/ChangeEmail");
        break;
      case "password":
        setPageTitle(
          "Change your password - Volunteer Account - Be Part of Research"
        );
        setGaURL("/AccountSettings/ChangePassword");
        break;
      default:
        setPageTitle(
          "Account settings - Volunteer Account - Be Part of Research"
        );
        setGaURL("/AccountSettings");
    }
  };

  const setCurrentDisplayPage = (page: string) => {
    setCurrentPage(page);
    containerRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    handlePageTitle(page);
  };

  useEffect(() => {
    if (!userData && Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
      const DTEDetailsResponse =
        Utils.ConvertResponseToDTEResponse(response)?.content;
      if (DTEDetailsResponse) {
        const stateData: UserDataState = {
          currentEmail: DTEDetailsResponse.email,
        };
        setUserData(stateData);
      }
    }
  }, [response, userData]);

  useEffect(() => {
    ReactGA.pageview(gaURL);
  }, [gaURL]);

  return (
    <DocumentTitle title={pageTitle}>
      <StyledWrapper role="main" id="main" ref={containerRef}>
        {loading && <LoadingIndicator />}
        <Container>
          {currentPage === "main" && <DTEBackLink href="/" linkText="Back" />}
          {currentPage === "main" && (
            <>
              <DTEHeader as="h1" $variant={headerVariant}>
                Account settings
              </DTEHeader>
              {userData && (
                <dl className="govuk-summary-list">
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">
                      <DTEContent>Email address</DTEContent>
                    </dt>
                    <dd className="govuk-summary-list__value">
                      <DTEContent>{userData.currentEmail}</DTEContent>
                    </dd>
                    <dd className="govuk-summary-list__actions">
                      <DTELinkButton
                        onClick={() => setCurrentDisplayPage("email")}
                      >
                        Change{" "}
                        <StyledHiddenText>email address</StyledHiddenText>
                      </DTELinkButton>
                    </dd>
                  </div>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">
                      <DTEContent>Password</DTEContent>
                    </dt>
                    <dd className="govuk-summary-list__value" />
                    <dd className="govuk-summary-list__actions">
                      <DTELinkButton
                        onClick={() => setCurrentDisplayPage("password")}
                      >
                        Change <StyledHiddenText>password</StyledHiddenText>
                      </DTELinkButton>
                    </dd>
                  </div>
                </dl>
              )}
              {error && (
                <ErrorMessageContainer
                  axiosErrors={[error]}
                  DTEAxiosErrors={[
                    Utils.ConvertResponseToDTEResponse(response)?.errors,
                  ]}
                />
              )}
            </>
          )}
          {currentPage === "email" && (
            <>
              <UpdateEmailForm
                onCancel={() => {
                  setCurrentDisplayPage("main");
                }}
                nextButtonText="Save"
                showCancelButton
              />
            </>
          )}
          {currentPage === "password" && (
            <UpdatePasswordForm
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              nextButtonText="Save"
              showCancelButton
            />
          )}
        </Container>
      </StyledWrapper>
    </DocumentTitle>
  );
};

export default AccountSettings;
