import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DTEPaper from "../../Shared/UI/DTEPaper/DTEPaper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

const StepWrapper = (props: any) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
        <DTEPaper className={classes.paper}>{children}</DTEPaper>
      </Grid>
    </Grid>
  );
};

export default StepWrapper;
