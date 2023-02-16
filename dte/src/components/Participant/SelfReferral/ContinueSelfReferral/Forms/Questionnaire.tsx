import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Radios } from "nhsuk-react-components";
import { useForm, Controller } from "react-hook-form";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTELinkButton from "../../../../Shared/UI/DTELinkButton/DTELinkButton";
import DTERadio from "../../../../Shared/UI/DTERadio/DTERadio";
import content from "./questionnaireContent";

type Question = {
  question: string;
  index: number;
  flags: string[];
  answers: Answer[];
};

type Answer = {
  answer: string;
  flags: string[];
};

export type AnsweredQuestion = {
  question: Question;
  answer: string;
};

interface Props {
  onSubmit: (data: AnsweredQuestion[]) => void;
}

const Questionnaire = (props: Props) => {
  const { onSubmit } = props;
  const { handleSubmit, control } = useForm({
    mode: "all",
  });
  const [flags, setFlags] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answeredQuestions, setAnsweredQuestions] =
    useState<AnsweredQuestion[]>();

  const response: { content: { questions: Question[] } } = content;

  useEffect(() => {
    if (response) {
      setQuestions(response.content.questions);
    }
  }, []);

  const submitHandler = (data: { answer: string }) => {
    setAnsweredQuestions((prev) => [
      ...(prev || []),
      { question: questions[currentQuestion], answer: data.answer },
    ]);
    const answerFlags = questions[currentQuestion].answers.find(
      (answer: Answer) => answer.answer === data.answer
    );
    if (answerFlags) {
      setFlags((prevFlags) => [...prevFlags, ...answerFlags.flags]);
    }
  };

  // TODO: Limitation that every answer needs a flag. Could potentially use useReducer to get round this
  useEffect(() => {
    // `if` needed due to race conditions with questions loading
    if (questions.length !== 0) {
      // Is the questionnaire finished?
      const finished = !questions
        .slice(currentQuestion + 1) // Get the remaining questions
        // For each of the questions
        .some((question: Question, i) => {
          // If the question's flags are a subset of the current flags
          if (question.flags.every((flag) => flags.includes(flag))) {
            setCurrentQuestion((prev) => prev + i + 1); // Set that question as the current question
            return true; // Break the loop, and mark finished as false
          }
          return false; // Not a match, keep looping
        }); // If no trues returned, finished = true
      if (finished) {
        // Not sure how this could be undefined, but just to keep TS happy
        if (answeredQuestions) {
          onSubmit(answeredQuestions);
        }
      }
    }
  }, [flags]);

  return (
    <>
      <DTEHeader as="h1">Questionnaire</DTEHeader>
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          {questions.length !== 0 && (
            <>
              <pre>Flags: {JSON.stringify(flags, null, 2)}</pre>
              <form onSubmit={handleSubmit(submitHandler)}>
                <Controller
                  control={control}
                  name="answer"
                  render={({ field: { onChange } }) => (
                    <DTERadio
                      id="answer"
                      name="answer"
                      label={questions[currentQuestion].question}
                      onChange={onChange}
                    >
                      {questions[currentQuestion].answers.map(
                        (answer: Answer) => (
                          <Radios.Radio
                            key={answer.answer}
                            label={answer.answer}
                            value={answer.answer}
                          >
                            {answer.answer}
                          </Radios.Radio>
                        )
                      )}
                    </DTERadio>
                  )}
                  rules={{
                    validate: (value) => {
                      if (value === "") return "Please select an answer";
                      return true;
                    },
                  }}
                />
                <DTELinkButton arrowIcon type="submit">
                  Continue
                </DTELinkButton>
              </form>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Questionnaire;
