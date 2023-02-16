import React, { useState, ChangeEvent } from "react";
import { TextField, Tooltip, Grid, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";
import MultipleChoiceEditor, { Choices } from "./MultipleChoiceEditor";

type Question = {
  question: string;
  sequence: number;
  ref: string;
  answerOptions: string[];
  validAnswers: string[];
  explanation?: string;
};

interface QuestionnaireFormProps {
  questionList: Question[];
  onQuestionListChange(arg: Question[]): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(1),
    },
    pronouncedButton: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  })
);

const QuestionnaireForm = (props: QuestionnaireFormProps) => {
  const { questionList: initialQuestionList } = props;
  const [questionList, setQuestionList] = useState(initialQuestionList);

  const classes = useStyles();

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | { name?: string | undefined; value: unknown }
    >,
    i: number
  ) => {
    const { name, value } = e.target;
    setQuestionList((questionListOld) => {
      const list = [...questionListOld];
      // Make TS happy
      if (typeof value === "string") {
        switch (name) {
          case "question":
            list[i].question = value;
            break;
          case "ref":
            list[i].ref = value;
            break;
          case "explanation":
            list[i].explanation = value;
            break;
          default:
            break;
        }
      }
      props.onQuestionListChange(list);
      return list;
    });
  };

  const handleChangeChoices = (choices: Choices, index: number) => {
    setQuestionList((questionListOld) => {
      const list = [...questionListOld];
      list[index].answerOptions = choices.answerOptions;
      list[index].validAnswers = choices.validAnswers;
      props.onQuestionListChange(list);
      return list;
    });
  };

  const handleAddQuestion = (questionListLength: number) => {
    // Sanity check that the user can actually add a new value. If not, do nothing.
    if (
      questionList[questionListLength - 1].question &&
      questionList[questionListLength - 1].ref &&
      questionList[questionListLength - 1].answerOptions.length > 0 &&
      questionList[questionListLength - 1].validAnswers.length > 0
    ) {
      setQuestionList((questionListOld) => {
        const newQuestionList = [
          ...questionListOld,
          {
            question: "",
            sequence: questionListLength,
            ref: "",
            answerOptions: [""],
            validAnswers: [],
          },
        ];
        props.onQuestionListChange(newQuestionList);
        return newQuestionList;
      });
    }
  };

  const addButtonDisabled = (questionListLength: number) => {
    // If and only if all mandatory parameters have been entered for a question, the user can choose to add another question.
    if (
      questionList[questionListLength - 1].question &&
      questionList[questionListLength - 1].ref &&
      questionList[questionListLength - 1].answerOptions.length > 0 &&
      questionList[questionListLength - 1].validAnswers.length > 0
    ) {
      return false;
    }
    return true;
  };

  const handleRemoveQuestion = (i: number) => {
    setQuestionList((questionListOld) => {
      const list = [...questionListOld];
      list.splice(i, 1);
      props.onQuestionListChange(list);
      return list;
    });
  };

  return (
    <>
      {questionList.map((question, index) => (
        <>
          <DTEPaper variant="outlined" className={classes.paper}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <TextField
                  name="question"
                  type="text"
                  label="Question *"
                  defaultValue={question.question}
                  onChange={(e) => handleChange(e, index)}
                  variant="outlined"
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="ref"
                  type="text"
                  label="Unique reference *"
                  defaultValue={question.ref}
                  onChange={(e) => handleChange(e, index)}
                  variant="outlined"
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="explanation"
                  type="text"
                  label="Explanation"
                  defaultValue={question.explanation}
                  onChange={(e) => handleChange(e, index)}
                  variant="outlined"
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={12}>
                <MultipleChoiceEditor
                  onChangeChoices={(choices) =>
                    handleChangeChoices(choices, index)
                  }
                  choices={{
                    answerOptions: question.answerOptions,
                    validAnswers: question.validAnswers,
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                {questionList.length !== 1 && (
                  <Tooltip title="Remove the question from the questionnaire">
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      aria-label="delete"
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                )}
              </Grid>
            </Grid>
          </DTEPaper>
          {questionList.length - 1 === index && (
            <Tooltip title="Add a new question">
              <Button
                variant="outlined"
                color="primary"
                className={classes.pronouncedButton}
                startIcon={<AddCircleIcon />}
                aria-label="add"
                onClick={() => handleAddQuestion(questionList.length)}
                disabled={addButtonDisabled(questionList.length)}
              >
                Add Question
              </Button>
            </Tooltip>
          )}
        </>
      ))}
    </>
  );
};

export default QuestionnaireForm;
export type { Question };
