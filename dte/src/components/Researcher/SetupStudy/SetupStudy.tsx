import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";

import QuestionnaireForm, { Question } from "./QuestionnaireForm";
import StepWrapper from "./StepWrapper";
import useAxiosFetch from "../../../hooks/useAxiosFetch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: "inline-block",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const getInitialQuestionList = () => [
  {
    question: "",
    sequence: 0,
    ref: "",
    answerOptions: [""],
    validAnswers: [],
    explanation: "",
  },
];

const getSteps = () => [
  "Some example step",
  "Pre-screening Questions",
  "Some other stuff",
];

interface SetupStudyProps {
  studyid: string;
}

const SetupStudy = () => {
  const { studyid } = useParams<SetupStudyProps>();
  const [questions, setQuestions] = React.useState<Question[]>(
    getInitialQuestionList()
  );

  const handleQuestionListChange = (questionList: Question[]) => {
    setQuestions(questionList);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return "Step 1: Some example step";
      case 1:
        return (
          <QuestionnaireForm
            onQuestionListChange={handleQuestionListChange}
            questionList={questions}
          />
        );
      case 2:
        return "Step 3: This is the bit I really care about!";
      default:
        return "Unknown step";
    }
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const [
    {
      response: submitSetupResponse,
      loading: submitSetupLoading,
      error: submitSetupError,
    },
    submitSetup,
    clearSubmitSetup,
  ] = useAxiosFetch({});

  const handleSubmitSetup = async () => {
    await submitSetup(
      {
        data: {
          studyId: studyid,
          version: 1,
          questions: questions.map((question: Question) => ({
            QuestionText: question.question,
            Explanation: question?.explanation,
            Reference: question.ref,
            AnswerOptionType: "string",
            AnswerOptions: question.answerOptions,
            ValidAnswerOptions: question.validAnswers,
            Sequence: question.sequence + 1,
          })),
        },
        url: `${process.env.REACT_APP_BASE_API}/studies/prescreenerquestions`,
        method: "POST",
      },
      {
        manual: true,
      }
    ).catch(() => {});
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <StepWrapper>
            <Typography className={classes.instructions}>
              {!submitSetupLoading &&
                !submitSetupResponse &&
                !submitSetupError?.isAxiosError && (
                  <>
                    All steps completed. You are ready to submit your
                    questionnaire.
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitSetup}
                    >
                      Submit Setup Study Form
                    </Button>
                  </>
                )}
              {submitSetupError?.isAxiosError && (
                <>
                  <Typography className={classes.instructions}>
                    {submitSetupError?.message}
                  </Typography>
                  <Button onClick={() => clearSubmitSetup()} variant="outlined">
                    Try Again
                  </Button>
                </>
              )}
              {submitSetupLoading && <>Submitting setup data...</>}
              {submitSetupResponse && submitSetupResponse.status === 200 && (
                <Typography className={classes.instructions}>
                  Study {studyid} setup successfully.
                </Typography>
              )}
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </StepWrapper>
        ) : (
          <div>
            <StepWrapper>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>

              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disableElevation
                >
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}
                      disableElevation
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Go to submission page"
                        : "Complete Step"}
                    </Button>
                  ))}
              </div>
            </StepWrapper>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupStudy;
