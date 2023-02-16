import React from "react";
import { useParams } from "react-router-dom";

interface ParticipantAccountProps {
  accountId: string;
}

function ParticipantAccount() {
  //   const classes = useStyles();
  const { accountId } = useParams<ParticipantAccountProps>();
  return <h2>Participant Account for Account id : {accountId}</h2>;
}

export default ParticipantAccount;
