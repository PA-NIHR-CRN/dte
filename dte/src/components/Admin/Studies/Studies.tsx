import { KeyboardEvent, useEffect, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import styled from "styled-components";
import DTEFlourish from "../../Shared/UI/DTEFlourish/DTEFlourish";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import StudyRequestsTable from "./StudyRequestsTable";
import DeclinedStudyRequestsTable from "./DeclinedStudyRequestsTable";
import DTEDataGridTab from "../../Shared/UI/DTEDataGridTab/DTEDataGridTab";

const PaddedContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

const PaddedGrid = styled(Grid)`
  padding-bottom: 5px;
  padding-left: 2px;
  padding-right: 2px;
`;

const Studies = () => {
  enum DisplayType {
    Requests,
    Active,
    Declined,
  }
  const [displayMode, setDisplayMode] = useState<DisplayType>(
    DisplayType.Requests
  );

  useEffect(() => {}, [displayMode]);

  const getDisplayTable = () => {
    switch (displayMode) {
      case DisplayType.Requests:
        return <StudyRequestsTable />;
      case DisplayType.Declined:
        return <DeclinedStudyRequestsTable />;
      default:
        return <></>;
    }
  };

  const getTabButton = (buttonText: string, displayState: DisplayType) => {
    return displayMode !== displayState ? (
      <DTEDataGridTab
        $active
        $fullwidth
        onClick={() => setDisplayMode(displayState)}
        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
          const { key } = e;
          if (key === "Enter" || key === "Space") {
            e.preventDefault();
            setDisplayMode(displayState);
          }
        }}
      >
        {buttonText}
      </DTEDataGridTab>
    ) : (
      <DTEDataGridTab
        $fullwidth
        onClick={() => setDisplayMode(displayState)}
        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
          const { key } = e;
          if (key === "Enter" || key === "Space") {
            e.preventDefault();
            setDisplayMode(displayState);
          }
        }}
      >
        {buttonText}
      </DTEDataGridTab>
    );
  };

  return (
    <>
      <PaddedContainer maxWidth="lg" role="main" id="main">
        <DTEHeader as="h1" $color="blue">
          Studies
        </DTEHeader>
        <DTEFlourish />
        <Grid container justifyContent="center">
          <PaddedGrid container spacing={3}>
            <Grid item xs={4}>
              {getTabButton("Study requests", DisplayType.Requests)}
            </Grid>
            <Grid item xs={4}>
              {getTabButton("Active studies", DisplayType.Active)}
            </Grid>
            <Grid item xs={4}>
              {getTabButton("Declined requests", DisplayType.Declined)}
            </Grid>
          </PaddedGrid>
          <Grid item xs={12}>
            {getDisplayTable()}
          </Grid>
        </Grid>
      </PaddedContainer>
    </>
  );
};

export default Studies;
