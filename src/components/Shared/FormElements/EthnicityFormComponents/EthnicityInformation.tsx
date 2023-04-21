import DTEDetails from "../../UI/DTEDetails/DTEDetails";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";

export interface EthnicityNavigationButtonsProps {
  hideInfo: boolean;
  studyType: string;
}

const EthnicityInformation = (props: EthnicityNavigationButtonsProps) => {
  const { hideInfo, studyType } = props;

  return (
    <>
      {!hideInfo && (
        <DTEDetails summary="Why we are asking this question">
          <DTEContent>
            Many studies want to make sure they have a representative sample of
            the population taking part in research studies, and some may be
            looking for people from specific ethnic {studyType}.
          </DTEContent>
          <DTEContent>
            If we find that some ethnic {studyType} are under represented when
            people are signing up to be contacted about research we will look at
            how to improve this.
          </DTEContent>
        </DTEDetails>
      )}
    </>
  );
};

export default EthnicityInformation;
