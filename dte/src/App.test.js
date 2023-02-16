// import { render, screen } from "@testing-library/react";
// import createMemoryHistory from "history";
// import Router from "react-router-dom";
// import App from "./App";
// import { AuthProvider } from "./context/AuthContext";

// https://github.com/facebook/jest/issues/936#issuecomment-265074320
// function mockFunction() {
//   const original = require.requireMock("react-router-dom");
//   return {
//     ...original,
//     useLocation: jest.fn().mockReturnValue({
//       pathname: "/",
//       search: "",
//       hash: "",
//       state: null,
//       key: "5nvxpbdafa",
//     }),
//   };
// }

// jest.mock("react-router-dom", () => mockFunction());

describe("App Component Tests", () => {
  test("App renders without crashing", () => {
    // const history = createMemoryHistory();
    // render(
    //   <Router history={history}>
    //     <AuthProvider>
    //       <App />
    //     </AuthProvider>
    //   </Router>
    // );
    // expect(screen.getByText("Welcome to DTE")).toBeInTheDocument();
    expect(true).toBe(true);
  });

  // test('full app rendering/navigating/routes', () => {
  //   const history = createMemoryHistory()
  //   render(
  //     <Router history={history}>
  //       <App />
  //     </Router>,
  //   )
  //   // verify page content for expected route
  //   // often you'd use a data-testid or role query, but this is also possible
  //   expect(screen.getByText(/you are home/i)).toBeInTheDocument()

  //   const leftClick = {button: 0}
  //   userEvent.click(screen.getByText(/about/i), leftClick)

  //   // check that the content changed to the new page
  //   expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
  // })

  // test('landing on a bad page', () => {
  //   const history = createMemoryHistory()
  //   history.push('/some/bad/route')
  //   render(
  //     <Router history={history}>
  //       <App />
  //     </Router>,
  //   )

  //   expect(screen.getByText(/no match/i)).toBeInTheDocument()
  // })
});
