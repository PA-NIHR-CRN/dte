import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import StudyInfo from "./StudyInfo";

jest.mock("../../../../hooks/useAxiosFetch");
const mockedUseAxiosFetch = useAxiosFetch as jest.Mocked<typeof useAxiosFetch>;

test("gets data and renders", async () => {
  const history = createMemoryHistory();
  history.push("/Participants/SelfReferral/Information/12345");

  (mockedUseAxiosFetch as jest.Mock).mockReturnValue([
    {
      loading: false,
      error: null,
      response: {
        data: {
          content: {
            title: "the title",
            shortName: "the short name",
            whatImportant:
              "This is a study\nIts about some disease.\nAnd other things.\n",
            sites: [
              {
                id: "16fe0988-4fc0-41a7-8d59-5495bd63d291",
                name: "Middlesex Hospital-1",
                addressSummary: "Camden SW19UY",
              },
              {
                id: "28a31935-9155-482a-9dcc-24b5b35d4906",
                name: "Kings College-1",
                addressSummary: "Camden SW19UY",
              },
            ],
          },
          isSuccess: true,
          errors: [],
          version: 1,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
        request: {},
      },
    },
  ]);

  render(
    <Router history={history}>
      <StudyInfo />
    </Router>
  );

  expect(mockedUseAxiosFetch).toHaveBeenCalledTimes(1);
});
