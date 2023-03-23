import DTEHeader from "../../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import StepWrapper from "../../../components/Shared/StepWrapper/StepWrapper";

const Under18ErrorPage = () => {
  return (
    <StepWrapper>
      <DTEHeader as="h1">There is a problem</DTEHeader>
      <DTEContent>
        You are not able to register as you must be 18 years old or over to use
        this service.
      </DTEContent>
    </StepWrapper>
  );
};

export default Under18ErrorPage;
