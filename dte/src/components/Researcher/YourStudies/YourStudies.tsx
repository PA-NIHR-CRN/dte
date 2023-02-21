import { Grid, Container } from "@material-ui/core";
import styled from "styled-components";
import AddStudy from "./AddStudy";
import ListStudies from "./ListStudies";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEFlourish from "../../Shared/UI/DTEFlourish/DTEFlourish";

const PaddedContainer = styled(Container)`
  padding-top: 2rem;
`;

const YourStudies = () => {
  return (
    <PaddedContainer maxWidth="lg" role="main" id="main">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DTEHeader as="h1" $color="blue">
            Studies
          </DTEHeader>
          <DTEFlourish />
        </Grid>
      </Grid>
      <AddStudy />
      <ListStudies />
    </PaddedContainer>
  );
};

export default YourStudies;
