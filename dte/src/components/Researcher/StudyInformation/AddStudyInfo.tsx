import { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { useHistory, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Utils from "../../../Helper/Utils";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import DTEFlourish from "../../Shared/UI/DTEFlourish/DTEFlourish";
import DTEHR from "../../Shared/UI/DTEHR/DTEHR";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import DTEContent from "../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEForwardLookup from "../../Shared/UI/DTEForwardLookup/DTEForwardLookup";
import DTERichTextEditor from "../../Shared/UI/DTERichText/DTERichTextEditor";
import DTERichTextValidators from "../../Shared/UI/DTERichText/DTERichTextValidators";
import StudyDetailsHeader from "../../Shared/StudyDetailsHeader/StudyDetailsHeader";

const PaddedContainer = styled(Container)`
  padding-top: 2rem;
`;

const ThickDTEHR = styled(DTEHR)`
  && {
    margin: 30px 0;
    border-bottom: 2px solid #192e72;
  }
`;

// const StyledGrid = styled(Grid)<{ color?: string }>`
//   && {
//     background: ${(props) => props.color};
//     border-radius: 5px;
//     padding: 1rem;
//     margin-bottom: 2rem;
//   }
// `;

interface FormData {
  important: string;
  conditions: string[];
}
interface Props {
  studyid: string;
}

const AddStudyInfo = () => {
  const { studyid } = useParams<Props>();
  const history = useHistory();
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    important: "",
    conditions: [],
  });
  const [isFormUpdated, setIsFormUpdated] = useState(false);
  const [importantError, setImportantError] = useState("");

  const updateRichTextBox = (value: string, field: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateCategories = (e: string[]) => {
    setFormData({ ...formData, conditions: e });
  };

  const [{ response, loading, error }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/studies/${studyid}`,
      method: "GET",
    },
    { manual: false, useCache: false }
  );

  const [
    {
      response: healthConditionsResponse,
      loading: healthConditionsLoading,
      error: healthConditionsError,
    },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/referencedata/health/healthconditions`,
    },
    {
      useCache: false,
    }
  );

  useEffect(() => {
    if (response && Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
      setFormData({
        ...formData,
        important:
          Utils.ConvertResponseToDTEResponse(response)?.content.item
            .whatImportant,
        conditions:
          Utils.ConvertResponseToDTEResponse(response)?.content.item
            .healthConditions,
      });
      setIsFormUpdated(true);
    }
  }, [response]);

  const [
    { response: postResponse, loading: postLoading, error: postError },
    saveChangesPost,
  ] = useAxiosFetch(
    {
      method: "PUT",
    },
    { useCache: false, manual: true }
  );

  const handleSave = async (data: FormData) => {
    let formImportantValid = true;
    setImportantError("");
    if (!DTERichTextValidators.validateRequired(data.important)) {
      setImportantError("Important information required");
      formImportantValid = false;
    }
    if (formImportantValid) {
      await saveChangesPost({
        url: `${process.env.REACT_APP_BASE_API}/studies/${studyid}`,
        method: "PUT",
        data: {
          whatImportant: data.important,
          healthConditions: data.conditions,
        },
      }).catch(() => {});
    }
  };

  return (
    <>
      <StudyDetailsHeader studyid={studyid} title={location?.state?.title} />
      <PaddedContainer maxWidth="xl" role="main">
        <DTEButton
          onClick={() => history.push(`/Researchers/Study/${studyid}`)}
          $outlined
          $backArrow
          $small
        >
          Back to study dashboard
        </DTEButton>
        <DTEPaper $spaced elevation={5}>
          {(loading || healthConditionsLoading) && (
            <LoadingIndicator text="Loading..." />
          )}
          {(postError ||
            !Utils.ConvertResponseToDTEResponse(response)?.isSuccess) && (
            <ErrorMessageContainer
              axiosErrors={[postError]}
              DTEAxiosErrors={[
                Utils.ConvertResponseToDTEResponse(postResponse)?.errors,
              ]}
            />
          )}
          <ErrorMessageContainer
            axiosErrors={[error, healthConditionsError]}
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(response)?.errors,
              Utils.ConvertResponseToDTEResponse(healthConditionsResponse)
                ?.errors,
            ]}
          />
          {response &&
            Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
            healthConditionsResponse &&
            Utils.ConvertResponseToDTEResponse(healthConditionsResponse)
              ?.isSuccess && (
              <>
                <Grid
                  container
                  spacing={4}
                  direction="row"
                  justifyContent="space-between"
                >
                  <Grid item xs={12} sm={8}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <InfoIcon
                          style={{
                            fontSize: 48,
                            color: "#193e72",
                            marginRight: "1rem",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <DTEHeader as="h1" $color="blue">
                          Add study information
                        </DTEHeader>
                      </Grid>
                    </Grid>
                    <DTEFlourish />
                    {isFormUpdated && (
                      <>
                        <Grid item xs={12} sm={9}>
                          <DTERichTextEditor
                            id="whatsImportant"
                            label="What's important about this study"
                            value={formData.important || ""}
                            onValueChange={(val) =>
                              updateRichTextBox(val, "important")
                            }
                            error={importantError}
                          />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <DTEForwardLookup
                            id="categories"
                            label="Study categories"
                            data={
                              Utils.ConvertResponseToDTEResponse(
                                healthConditionsResponse
                              )?.content
                            }
                            onSelectedValuesChange={updateCategories}
                            values={formData.conditions}
                            placeholder="Start typing for a condition"
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Grid container>
                      {/* <StyledGrid item xs={12} color="#fff6e4">
                        <DTEContent>
                          <strong>Do</strong>
                        </DTEContent>
                        <DTEUL>
                          <li>focus on things people most need to know</li>
                          <li>
                            mention the benefits and importance of the study
                          </li>
                          <li>
                            use bullet points (and sub-headings) to make this
                            easier to read
                          </li>
                          <li>
                            answer some practical questions such as
                            reimbursement, time-commitments etc.
                          </li>
                        </DTEUL>
                        <DTEContent>
                          <strong>Don&apos;t</strong>
                        </DTEContent>
                        <DTEUL>
                          <li>
                            cut and paste sections from the Participant
                            Information Sheet (PIS)
                          </li>
                          <li>use obscure clinical or medical terms</li>
                          <li>
                            underplay any known risks - be sure to mention them
                          </li>
                          <li>
                            be afraid to keep it simple: write the way people
                            speak
                          </li>
                        </DTEUL>
                      </StyledGrid> */}
                    </Grid>
                  </Grid>
                </Grid>
                <ThickDTEHR />
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item>
                    {/* <DTEButton $outlined>Preview participant view</DTEButton> */}
                  </Grid>
                  <Grid item>
                    {postLoading && (
                      <DTEContent $align="center">Saving...</DTEContent>
                    )}
                    <DTEButton
                      onClick={() => {
                        handleSave(formData);
                      }}
                    >
                      Save my progress
                    </DTEButton>
                  </Grid>
                </Grid>
              </>
            )}
        </DTEPaper>
      </PaddedContainer>
    </>
  );
};

export default AddStudyInfo;
