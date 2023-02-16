import React, { useState, ChangeEvent } from "react";
import { TextField, Tooltip, Checkbox, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

type Choices = {
  answerOptions: string[];
  validAnswers: string[];
};

interface MultipleChoiceEditorProps {
  choices: Choices;
  onChangeChoices(arg: Choices): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const MultipleChoiceEditor = (props: MultipleChoiceEditorProps) => {
  const { choices: initialChoices } = props;
  const [choices, setChoices] = useState(initialChoices);

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
    setChoices((choicesOld) => {
      const answerOptions = [...choicesOld.answerOptions];
      const validAnswers = [...choicesOld.validAnswers];
      // If the event target is the answer option textbox
      if (name === "answerOption" && typeof value === "string") {
        // Update the valid answer to match the new answer option
        if (validAnswers.indexOf(answerOptions[i]) !== -1) {
          validAnswers[i] = value;
        }
        // And then update the answer option
        answerOptions[i] = value;
        // Or if the event target is the valid answer checkbox
      } else if (name === "validAnswer" && "checked" in e.target) {
        // If the valid answer checkbox is checked
        const { checked } = e.target;
        if (checked) {
          // It is a valid answer
          validAnswers.push(answerOptions[i]);
        } else {
          // It is not a valid answer
          validAnswers.splice(validAnswers.indexOf(answerOptions[i]), 1);
        }
      }
      const newChoices = {
        answerOptions,
        validAnswers,
      };
      props.onChangeChoices(newChoices);
      return newChoices;
    });
  };

  const handleAddChoice = () => {
    setChoices((choicesOld) => {
      const newChoices = {
        answerOptions: [...choicesOld.answerOptions, ""] as string[],
        validAnswers: [...choicesOld.validAnswers] as string[],
      };
      props.onChangeChoices(newChoices);
      return newChoices;
    });
  };

  const handleRemoveChoice = (i: number) => {
    setChoices((choicesOld) => {
      const answerOptions = [...choicesOld.answerOptions];
      const validAnswers = [...choicesOld.validAnswers];
      const answer = answerOptions[i];
      // indexOf is innefficient but it's ok for now as there will never be to many choices
      const answerLocation = validAnswers.indexOf(answer);
      if (answerLocation !== -1) {
        validAnswers.splice(answerLocation, 1);
      }
      answerOptions.splice(i, 1);
      const newChoices = {
        answerOptions,
        validAnswers,
      };
      props.onChangeChoices(newChoices);
      return newChoices;
    });
  };

  return (
    <>
      {choices.answerOptions.map((option, index) => (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={8} xl={9}>
            <TextField
              name="answerOption"
              type="text"
              label={`Choice ${index + 1}`}
              defaultValue={option}
              onChange={(e) => handleChange(e, index)}
              variant="outlined"
              className={classes.formControl}
            />
          </Grid>
          <Grid item xs>
            <Tooltip title="Valid answer">
              <Checkbox
                name="validAnswer"
                defaultChecked={choices.validAnswers.includes(option)}
                onChange={(e) => handleChange(e, index)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Tooltip>
            {choices.answerOptions.length !== 1 && (
              <Tooltip title="Remove the choice">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveChoice(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            {choices.answerOptions.length - 1 === index && (
              <Tooltip title="Add a new choice">
                <IconButton aria-label="add" onClick={() => handleAddChoice()}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default MultipleChoiceEditor;
export type { Choices };
