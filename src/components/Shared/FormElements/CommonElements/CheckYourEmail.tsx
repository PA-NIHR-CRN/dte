import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEHeaderCaption from "../../UI/DTETypography/DTEHeaderCaption/DTEHeaderCaption";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import ResendEmail from "./ResendEmail";
import { useContext } from "react";
import { ContentContext } from "../../../../context/ContentContext";

type CheckYourEmailProps = {
  emailAddress?: string;
};

function CheckYourEmail({ emailAddress }: CheckYourEmailProps) {
  const { content } = useContext(ContentContext);
  return (
    <>
      <DTEHeaderCaption contentKey="reusable-check-your-email-header-caption" />
      <DTEHeader as="h1">{content["reusable-check-your-email-header"]}</DTEHeader>
      <DTEContent as="b" $marginBottom="large">
        {content["reusable-check-email-bold-text"]} {emailAddress}
      </DTEContent>
      {content["register-check-email-text-linksent"]}
      {content["reusable-check-email-body"]}

      <ResendEmail userId={emailAddress} />
    </>
  );
}

export default CheckYourEmail;
