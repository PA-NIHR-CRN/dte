import DTEHeader from "../../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import ResendEmail from "./ResendEmail";

type CheckYourEmailProps = {
  emailAddress?: string;
};

const CheckYourEmail = ({ emailAddress }: CheckYourEmailProps) => {
  return (
    <>
      <DTEHeader as="h1">Check your email</DTEHeader>
      <DTEContent as="b" $marginBottom="large">
        We&apos;ve sent an email to {emailAddress}
      </DTEContent>
      <DTEContent>
        You&apos;ll need to click on the link to validate it within 24 hours.
      </DTEContent>
      <DTEContent>
        Once you&apos;ve verified the email, you will be able to continue
        registration by signing in.
      </DTEContent>
      <DTEContent>Unable to find it? Check your spam folder.</DTEContent>
      <DTEContent>Still unable to find the email? </DTEContent>

      <ResendEmail userId={emailAddress} />
    </>
  );
};

export default CheckYourEmail;
