import DTEContent from "../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../components/Shared/UI/DTERouteLink/DTERouteLink";
import StepWrapper from "../../components/Shared/StepWrapper/StepWrapper";
import DTEHeader from "../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTETable from "../../components/Shared/UI/DTETable/DTETable";

const CookiePage = () => {
  return (
    <StepWrapper>
      <div className="govuk-width-container">
        <DTEHeader as="h1">Cookies</DTEHeader>
        <DTEContent>
          Cookies are small files saved on your phone, tablet or computer when
          you visit a website.{" "}
        </DTEContent>
        <DTEContent>
          We use cookies to make GOV.UK Notify work and collect information
          about how you use Be Part of Research.
        </DTEContent>{" "}
        <DTEHeader as="h2">Essential cookies</DTEHeader>
        <DTEContent>
          Essential cookies keep your information secure while you use Notify.
          We do not need to ask permission to use them.
          <DTETable
            caption="Essential analytics"
            columns={[
              { name: "Name", width: 2 },
              { name: "Purpose", width: 2 },
              { name: "Expires", width: 1 },
            ]}
            rows={[
              {
                Name: "cookiesAccepted",
                Purpose:
                  "This cookie tracks whether or not the user wants to have analytical cookies tracked.",
                Expires: "6 months",
              },
              {
                Name: "lastLoginURL",
                Purpose: "This cookie stores the URL of the last login made.",
                Expires: "End of Session",
              },
              {
                Name: "previousUrl",
                Purpose:
                  "This cookie stores the URL of the most recent page visited before the current page.",
                Expires: "End of Session",
              },
              {
                Name: "currentUrl",
                Purpose: "This cookie stores the URL of the current page.",
                Expires: "End of Session",
              },
              {
                Name: "_GRECAPTCHA",
                Purpose:
                  "This cookie is set by the Google recaptcha service to identify bots to protect the website against malicious spam attacks.",
                Expires: "6 months",
              },
              {
                Name: "JSESSIONID",
                Purpose:
                  "TThe JSESSIONID cookie is used by New Relic to store a session identifier so that New Relic can monitor session counts for an application.",
                Expires: "End of Session",
              },
            ]}
          />
          <DTEHeader as="h2">Analytical cookies</DTEHeader>
          <DTEContent>
            With your permission, we use Google Analytics to collect data about
            how you use Notify. This information helps us to improve our
            service.
          </DTEContent>
          <DTEContent>
            Google is not allowed to use or share our analytics data with
            anyone.
          </DTEContent>
          <DTEContent>
            Google Analytics stores anonymised information about:
          </DTEContent>
          <ul className="govuk-list govuk-list--bullet">
            <li>how you got to GOV.UK Notify</li>
            <li>
              the pages you visit on Notify and how long you spend on them
            </li>
            <li>any errors you see while using Notify</li>
          </ul>
          <DTETable
            caption="Essential analytics"
            columns={[
              { name: "Name", width: 2 },
              { name: "Purpose", width: 2 },
              { name: "Expires", width: 1 },
            ]}
            rows={[
              {
                Name: "_ga",
                Purpose:
                  "The _ga cookie, installed by Google Analytics, calculates visitor, session and campaign data and also keeps track of site usage for the site's analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognize unique visitors.",
                Expires: "2 years",
              },
              {
                Name: "_gat",
                Purpose:
                  "This cookie is installed by Google Universal Analytics to restrain request rate and thus limit the collection of data on high traffic sites.",
                Expires: "1 minute",
              },
              {
                Name: "_gid",
                Purpose:
                  "Installed by Google Analytics, _gid cookie stores information on how visitors use a website, while also creating an analytics report of the website's performance. Some of the data that are collected include the number of visitors, their source, and the pages they visit anonymously.",
                Expires: "24 hours",
              },
              {
                Name: "_gat_UA-224588360-4",
                Purpose:
                  "A variation of the _gat cookie set by Google Analytics and Google Tag Manager to allow website owners to track visitor behaviour and measure site performance. The pattern element in the name contains the unique identity number of the account or website it relates to.",
                Expires: "1 minute",
              },
              {
                Name: "_ga_8B6DBMQR6H",
                Purpose: "This cookie is installed by Google Analytics.",
                Expires: "2 years",
              },
              {
                Name: "_hjFirstSeen",
                Purpose:
                  "Hotjar sets this cookie to identify a new user’s first session. It stores a true/false value, indicating whether it was the first time Hotjar saw this user.",
                Expires: "30 minutes",
              },
              {
                Name: "_hjIncludedInSessionSample",
                Purpose:
                  "Hotjar sets this cookie to know whether a user is included in the data sampling defined by the site's daily session limit.",
                Expires: "2 minutes",
              },
              {
                Name: "_hjAbsoluteSessionInProgress",
                Purpose:
                  "Hotjar sets this cookie to detect the first pageview session of a user. This is a True/False flag set by the cookie.",
                Expires: "30 minutes",
              },
              {
                Name: "uvc",
                Purpose:
                  "Set by addthis.com to determine the usage of addthis.com service.",
                Expires: "1 year 1 month",
              },
              {
                Name: "_gat_UA-49546820-5",
                Purpose:
                  "A variation of the _gat cookie set by Google Analytics and Google Tag Manager to allow website owners to track visitor behaviour and measure site performance. The pattern element in the name contains the unique identity number of the account or website it relates to.",
                Expires: "1 minute",
              },
              {
                Name: "at-rand",
                Purpose:
                  "AddThis sets this cookie to track page visits, sources of traffic and share counts.",
                Expires: "never",
              },
              {
                Name: "_gat_UA-49546820-6",
                Purpose:
                  "A variation of the _gat cookie set by Google Analytics and Google Tag Manager to allow website owners to track visitor behaviour and measure site performance. The pattern element in the name contains the unique identity number of the account or website it relates to.",
                Expires: "1 minute",
              },
              {
                Name: "_gat_gtag_UA_67277747_4",
                Purpose: "Set by Google to distinguish users.",
                Expires: "1 minute",
              },
              {
                Name: "_hjSessionUser_3175979",
                Purpose:
                  "Hotjar - Ensures data from subsequent visits to the same site are attributed to the same user ID",
                Expires: "1 year",
              },
              {
                Name: "_hjSession_3175979",
                Purpose:
                  "Holds current session data. Ensures subsequent requests in the session window are attributed to the same session.",
                Expires: "30 minutes",
              },
            ]}
          />
          <DTERouteLink to="/#">
            Go back to the page you were looking at
          </DTERouteLink>
        </DTEContent>
      </div>
    </StepWrapper>
  );
};

export default CookiePage;
