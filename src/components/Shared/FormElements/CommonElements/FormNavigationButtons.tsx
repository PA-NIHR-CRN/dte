import { Grid } from "@material-ui/core";
import DTEButton from "../../UI/DTEButton/DTEButton";
import DTELinkButton from "../../UI/DTELinkButton/DTELinkButton";

export interface FormNavigationButtonsProps {
  showCancelButton?: boolean;
  nextButtonText: string;
  onCancel?: () => void;
}

function FormNavigationButtons(props: FormNavigationButtonsProps) {
  const { nextButtonText, showCancelButton, onCancel } = props;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <DTEButton>{nextButtonText}</DTEButton>
      </Grid>
      {showCancelButton && onCancel && (
        <Grid item>
          <DTELinkButton type="button" padded onClick={() => onCancel()}>
            Cancel
          </DTELinkButton>
        </Grid>
      )}
    </Grid>
  );
}

export default FormNavigationButtons;
