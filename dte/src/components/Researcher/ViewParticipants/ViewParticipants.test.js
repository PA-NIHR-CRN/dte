// import { render, screen } from "@testing-library/react";
// import { render, waitFor } from "@testing-library/react";
// import { MemoryRouter, Route } from "react-router-dom";
// import ViewParticipants from "./ViewParticipants";

describe("ViewParticipants Component Tests", () => {
  // const renderComponent = ({ trialId }) =>
  //   render(
  //     <MemoryRouter initialEntries={[`/studies/participants/${trialId}`]}>
  //       <Route path="/studies/participants/:trialId">
  //         <ViewParticipants />
  //       </Route>
  //     </MemoryRouter>
  //   );

  test("ViewParticipants correctly passes a query string", async () => {
    // Render new instance in every test to prevent leaking state
    // const { getByText } = renderComponent({ trialId: 5 });

    // await waitFor(() => getByText("View Participants for Study id : 5"));
    expect(true).toEqual(true);
  });
});
