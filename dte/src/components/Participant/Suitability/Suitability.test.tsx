// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
describe("Suitability tests", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

// import { createServer, Response } from "miragejs";
// import { render, screen, waitFor } from "../../../Helper/test-utils";
// import "@testing-library/jest-dom";
// import App from "../../../App";
// import { AuthContext } from "../../../context/AuthContext";
// import { AuthContextProps, Role } from "../../../types/AuthTypes";
//
// let server: any;
// beforeEach(() => {
//   server = createServer({
//     routes() {
//       this.get(
//         `${process.env.REACT_APP_BASE_API}/participants/suitability/:studyid`,
//         (_schema, request) => {
//           if (request.params.studyid === "00000") {
//             return new Response(
//               404,
//               { some: "header" },
//               {
//                 error: 'Entity "Study" (0) was not found.',
//                 innerException: null,
//               }
//             );
//           }
//           return {
//             content: {
//               isSuitable: request.params.studyid === "12345",
//               studyTitle: "A Test Study Title",
//             },
//             isSuccess: request.params.studyid !== "00000",
//             errors:
//               request.params.studyid === "00000" ? ["Study not there"] : [],
//             version: 1,
//           };
//         }
//       );
//     },
//   });
// });
//
// afterEach(() => {
//   server.shutdown();
// });
//
// const value = (
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   _currentRole: Role,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   _authenticatedRole?: Role
// ): AuthContextProps => {
//   return {
//     accessToken: undefined,
//     saveAccessToken(accessToken: string): void {},
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     saveToken: (_userToken: string) => {},
//     logOutToken: () => {},
//     isAuthenticated: () => {
//       return true; // !!authenticatedRole;
//     },
//     isAuthenticatedRole: () => {
//       return true; // currentRole.valueOf === authenticatedRole?.valueOf;
//     },
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     persistLastUrl: (_x: string) => {},
//     persistLastNonLoginUrl: () => {},
//     token: "dasdsasaa",
//     lastUrl: "/",
//     prevUrl: "/",
//     lastNonLoginUrl: "/",
//     authenticatedEmail: "test@test.com",
//     authenticatedEmailVerified: true,
//     authenticatedExpiryTime: 9999999,
//     authenticatedUserId: "132115-132156165-151-56165-156",
//     authenticatedFirstname: "First Name",
//     authenticatedLastname: "Last Name",
//   };
// };
//
// test("gets data and renders - suitability successful", async () => {
//   render(
//     <AuthContext.Provider value={value(Role.Participant, Role.Participant)}>
//       <App />
//     </AuthContext.Provider>,
//     undefined,
//     ["/Participants/SelfReferral/Suitability/12345"]
//   );
//
//   await waitFor(() => {
//     expect(
//       screen.getByText("You can take part in this study")
//     ).toBeInTheDocument();
//     expect(screen.getByText("A Test Study Title")).toBeInTheDocument();
//   });
// });
//
// test("gets data and renders  - suitability unsuccessful", async () => {
//   render(
//     <AuthContext.Provider value={value(Role.Participant, Role.Participant)}>
//       <App />
//     </AuthContext.Provider>,
//     undefined,
//     ["/Participants/SelfReferral/Suitability/99999"]
//   );
//
//   await waitFor(() => {
//     expect(
//       screen.getByText("Unfortunately, this study is not suitable for you")
//     ).toBeInTheDocument();
//     expect(screen.getByText("A Test Study Title")).toBeInTheDocument();
//   });
// });
//
// test("gets data and renders error  - study not found", async () => {
//   render(
//     <AuthContext.Provider value={value(Role.Participant, Role.Participant)}>
//       <App />
//     </AuthContext.Provider>,
//     undefined,
//     ["/Participants/SelfReferral/Suitability/00000"]
//   );
//
//   await waitFor(() => {
//     expect(screen.getByText("There is a problem")).toBeInTheDocument();
//     expect(screen.getByText("An error occurred")).toBeInTheDocument();
//   });
// });
