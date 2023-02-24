import styled from "styled-components";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import { useHistory } from "react-router-dom";
import DTEContent from "../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEDetails from "../../components/Shared/UI/DTEDetails/DTEDetails";
import DTEHeader from "../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTERouteLink from "../../components/Shared/UI/DTERouteLink/DTERouteLink";
import StepWrapper from "../../components/Shared/StepWrapper/StepWrapper";
import DTEButton from "../../components/Shared/UI/DTEButton/DTEButton";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const AccordionWrapper = styled.div`
  margin: 2rem 0;
`;

const NhsPreRegistration = () => {
  const history = useHistory();
  return (
    <>
      <Helmet
        title="Be Part of Research"
        meta={[
          {
            name: `robots`,
            content: "noindex",
          },
        ]}
      />
      <StepWrapper>
        <DTEHeader as="h1">Be Part of Research</DTEHeader>
        <DTEContent>
          Be Part of Research enables you to find and take part in a range of
          health and care research.
        </DTEContent>
        <DTEContent>
          Health research helps to discover new and better ways to treat
          diseases, improve the NHS and the quality of care across the country.
        </DTEContent>
        <DTEContent>
          Anyone can take part in research whether you have a health condition
          or not. You could take part in research at a local hospital, GP
          practice – or even at home.
        </DTEContent>
        <DTEContent>
          It&apos;s easy to get involved. Simply sign up online and choose the
          health conditions you are interested in. You will be sent details of
          approved studies that match your interests to decide if you want to
          take part.
        </DTEContent>
        <AccordionWrapper>
          <DTEDetails summary="More information about registering with Be Part of Research">
            <DTEContent>
              Find out more information about registering your account with{" "}
              <ReactGA.OutboundLink
                eventLabel="Be Part of Research"
                to="https://bepartofresearch.nihr.ac.uk/volunteer-service/"
                target="_blank"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <DTERouteLink
                  external
                  target="_blank"
                  to="https://bepartofresearch.nihr.ac.uk/volunteer-service/"
                  renderStyle="standard"
                >
                  Be Part of Research
                </DTERouteLink>
              </ReactGA.OutboundLink>
              . Please use the back button on your device to return to this
              page.
            </DTEContent>
          </DTEDetails>
        </AccordionWrapper>
        <ButtonWrapper>
          <DTEButton
            onClick={() => {
              history.push("/Participants/Register");
              ReactGA.event({
                category: "Internal Link Clicks",
                action:
                  "https://volunteer.bepartofresearch.nihr.ac.uk/Participants/Register",
                label: "Continue",
              });
            }}
            ariaLabel="Continue to register for an account"
          >
            Continue
          </DTEButton>
        </ButtonWrapper>
        <DTEContent>Already have an account?</DTEContent>
        <ButtonWrapper>
          <DTEButton
            $outlined
            onClick={() => {
              history.push("/UserLogin");
              ReactGA.event({
                category: "Internal Link Clicks",
                action:
                  "https://volunteer.bepartofresearch.nihr.ac.uk/UserLogin",
                label: "Sign in",
              });
            }}
          >
            Sign in
          </DTEButton>
        </ButtonWrapper>
      </StepWrapper>
    </>
  );
};

export default NhsPreRegistration;
