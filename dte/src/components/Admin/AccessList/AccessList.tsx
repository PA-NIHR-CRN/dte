import { KeyboardEvent, useState } from "react";
import { Grid, Container } from "@material-ui/core";
import styled from "styled-components";
import DTEFlourish from "../../Shared/UI/DTEFlourish/DTEFlourish";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import AccessListTable from "./AccessListTable";
import AddUsers from "./AddUsers";
import DTEDataGridTab from "../../Shared/UI/DTEDataGridTab/DTEDataGridTab";
import DTERouteLink from "../../Shared/UI/DTERouteLink/DTERouteLink";

const PaddedContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 4rem;
`;

const PaddedGrid = styled(Grid)`
  padding-bottom: 5px;
  padding-left: 2px;
  padding-right: 2px;
`;

const AccessList = () => {
  enum DisplayType {
    ShowUsersDisplay,
    AddUsersDisplay,
  }
  const [displayMode, setDisplayMode] = useState<DisplayType>(
    DisplayType.ShowUsersDisplay
  );

  const getDisplayTable = () => {
    switch (displayMode) {
      case DisplayType.ShowUsersDisplay:
        return <AccessListTable />;
      case DisplayType.AddUsersDisplay:
        return <AddUsers />;
      default:
        return <></>;
    }
  };

  const handleEnter = (
    e: KeyboardEvent<HTMLButtonElement>,
    displayState: DisplayType
  ) => {
    const { key } = e;
    if (key === "Enter" || key === "Space") {
      e.preventDefault();
      setDisplayMode(displayState);
    }
  };

  // This should be refactored.
  const getTabButton = (buttonText: string, displayState: DisplayType) => {
    return displayMode !== displayState ? (
      <DTEDataGridTab
        $active
        $fullwidth
        onClick={() => setDisplayMode(displayState)}
        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
          handleEnter(e, displayState);
        }}
      >
        {buttonText}
      </DTEDataGridTab>
    ) : (
      <DTEDataGridTab
        $fullwidth
        onClick={() => setDisplayMode(displayState)}
        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
          handleEnter(e, displayState);
        }}
      >
        {buttonText}
      </DTEDataGridTab>
    );
  };

  return (
    <>
      <PaddedContainer maxWidth="lg" role="main">
        <DTEHeader as="h1">Access List Management</DTEHeader>
        <DTEFlourish />
        <Grid container justifyContent="center">
          <PaddedGrid container spacing={3}>
            <Grid item xs={4}>
              {getTabButton("Access List", DisplayType.ShowUsersDisplay)}
            </Grid>
            <Grid item xs={4}>
              {getTabButton("Add Users", DisplayType.AddUsersDisplay)}
            </Grid>
            <Grid item xs={4}>
              <DTERouteLink to="/logoutredirect" $fullwidth>
                Sign out
              </DTERouteLink>
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

export default AccessList;
