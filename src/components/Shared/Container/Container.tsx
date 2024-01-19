import React from "react";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

interface ContainerProps {
  children: React.ReactNode;
}

const StyledGrid = styled(Grid)`
  padding: 1rem;
`;

function Container(props: ContainerProps) {
  const { children } = props;

  return (
    <StyledGrid container direction="row">
      <Grid item sm={1} md={2} />
      <Grid item xs={12} sm={8} md={7} lg={6} xl={5}>
        {children}
      </Grid>
    </StyledGrid>
  );
}

export default Container;
