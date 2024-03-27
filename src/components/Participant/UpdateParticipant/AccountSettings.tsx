import { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import DocumentTitle from "react-document-title";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ReactGA from "react-ga";
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
import { ContentContext } from "../../../context/ContentContext";
import { UserContext } from "../../../context/UserContext";

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

function AccountSettings() {
  const { content } = useContext(ContentContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentAccountPage: currentPage, setCurrentAccountPage: setCurrentPage } = useContext(UserContext);
  const [pageTitle, setPageTitle] = useState(content["accountsettings-document-title"]);
  const [gaURL, setGaURL] = useState("/AccountSettings");
  const theme = useTheme();
  const [userData, setUserData] = useState<UserDataState>();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";
  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/participants/details`,
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
        setPageTitle(content["accountsettings-change-email-document-title"]);
        setGaURL("/AccountSettings/ChangeEmail");
        break;
      case "password":
        setPageTitle(content["accountsettings-change-password-document-title"]);
        setGaURL("/AccountSettings/ChangePassword");
        break;
      default:
        setPageTitle(content["accountsettings-document-title"]);
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
      const DTEDetailsResponse = Utils.ConvertResponseToDTEResponse(response)?.content;
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
        {loading && <LoadingIndicator text={content["reusable-loading"]} />}
        <Container>
          {currentPage === "main" && <DTEBackLink href="/" linkText={content["reusable-back-link"]} />}
          {currentPage === "main" && (
            <>
              <DTEHeader as="h1" $variant={headerVariant} captionKey="reusable-account-settings-header">
                {content["reusable-account-settings-header"]}
              </DTEHeader>
              {userData && (
                <dl className="govuk-summary-list">
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">
                      <DTEContent>{content["reusable-text-email-address"]}</DTEContent>
                    </dt>
                    <dd className="govuk-summary-list__value">
                      <DTEContent>{userData.currentEmail}</DTEContent>
                    </dd>
                    <dd className="govuk-summary-list__actions">
                      <DTELinkButton onClick={() => setCurrentDisplayPage("email")}>
                        {content["reusable-change"]}{" "}
                        <StyledHiddenText>{content["reusable-text-email-address"].toLowerCase()}</StyledHiddenText>
                      </DTELinkButton>
                    </dd>
                  </div>
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">
                      <DTEContent>{content["reusable-text-password"]}</DTEContent>
                    </dt>
                    <dd className="govuk-summary-list__value" />
                    <dd className="govuk-summary-list__actions">
                      <DTELinkButton onClick={() => setCurrentDisplayPage("password")}>
                        {content["reusable-change"]}{" "}
                        <StyledHiddenText>{content["reusable-text-password"].toLowerCase()}</StyledHiddenText>
                      </DTELinkButton>
                    </dd>
                  </div>
                </dl>
              )}
              {error && (
                <ErrorMessageContainer
                  axiosErrors={[error]}
                  DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(response)?.errors]}
                />
              )}
            </>
          )}
          {currentPage === "email" && (
            <UpdateEmailForm
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              nextButtonText={content["reusable-save"]}
              showCancelButton
            />
          )}
          {currentPage === "password" && (
            <UpdatePasswordForm
              onCancel={() => {
                setCurrentDisplayPage("main");
              }}
              nextButtonText={content["reusable-save"]}
              showCancelButton
            />
          )}
        </Container>
      </StyledWrapper>
    </DocumentTitle>
  );
}

export default AccountSettings;
