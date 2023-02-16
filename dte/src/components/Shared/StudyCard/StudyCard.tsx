import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Study } from "../../../types/ResearcherTypes";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface StudyCardProps {
  study: Study;
  children?: React.ReactNode;
}

const StudyCard = (props: StudyCardProps) => {
  const classes = useStyles();
  const { study, children } = props;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {study.studyCpmsId}
        </Typography>
        <DTEHeader as="h2" $variant="h4">
          {study.studyTitle}
        </DTEHeader>
        <Typography className={classes.pos} color="textSecondary">
          {study.leadResearcher}
        </Typography>
        <Typography variant="body2" component="p">
          We need to choose which attributes to display.
        </Typography>
      </CardContent>
      {children && <CardActions>{children}</CardActions>}
    </Card>
  );
};

export default StudyCard;
