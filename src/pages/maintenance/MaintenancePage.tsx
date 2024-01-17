import DTEHeader from "../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../components/Shared/UI/DTETypography/DTEContent/DTEContent";

const MaintenancePage = () => {
  return (
    <div role="main" id="main">
      <div className="inset-text">
        <DTEHeader as="h1">Sorry, the service is unavailable</DTEHeader>

        <DTEContent>You will be able to use the service later.</DTEContent>
        <DTEContent>
          If you need to contact the Be Part of Research team please email{" "}
          <a href="mailto:bepartofresearch@nihr.ac.uk">
            bepartofresearch@nihr.ac.uk
          </a>
        </DTEContent>
      </div>
    </div>
  );
};

export default MaintenancePage;
