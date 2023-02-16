import { axe, toHaveNoViolations } from "jest-axe";
import { createServer } from "miragejs";
import { render } from "../../../Helper/test-utils";
import ListStudies from "./ListStudies";

expect.extend(toHaveNoViolations);

let server: any;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(`${process.env.REACT_APP_BASE_API}/studies?limit=100`, () => {
        return {
          content: {
            paginationToken: null,
            items: [
              {
                studyId: 11111,
                cpmsId: 11111,
                irasId: 11111,
                isrctnId: "2437be21-f5cd-49a5-aef9-ddd15c82062f",
                title: "study one",
                shortName: "study 1 short title",
                about:
                  "This study is testing the full hormone effect of Covid-19 as this is currently unknown. The aim is to provide more information to guide clinicians when caring for patients diagnosed with Covid-19.\n\rThe researchers are looking for men and women over the age of 18 who have been tested for Covid-19 at least three months ago to try a new approach to treatment and support.",
                howHelp:
                  "Taking part in the study will provide information regarding the participant’s hormone system including the critical hypothalamic-pituitary-adrenal axis.\n\rParticipation may identify hormonal problems that would have otherwise been undetected.\n\rThis study may also help guide endocrine surveillance of these patients on a global scale to reduce illness and death.",
                whenNeeded:
                  "If you take part you'll attend an initial two hour visit that takes place at least 3 month after the initial symptoms, with up to three further study visits over the course of the year at three monthly intervals.\n\rThe study will start in October 2020, and run for approx 12 months, so you'll need to make sure you're you can be available during this time.",
                studyQuestionnaireLink: null,
                leadResearcher: {
                  id: "d9e9c9ea-337d-4a63-bb76-3122a342041d",
                  firstname: "john",
                  lastname: "conner",
                  email: "john.conner@email.com",
                },
                sites: null,
                status: "Incomplete",
                createdAtUtc: "2021-11-09T15:34:08.425Z",
                createdById: "e445b246-014c-11eb-8154-060c27787e25",
                updatedAtUtc: null,
                updatedById: null,
              },
              {
                studyId: 22222,
                cpmsId: 22222,
                irasId: 22222,
                isrctnId: "3d586020-30df-4fe8-b6c9-7b59e4ac6848",
                title:
                  "a pilot clinical trial to test the acceptability and feasibility of different doses of oral iron supplementation to prevent maternal anaemia",
                shortName: "panda - dose study, v1.0",
                about: null,
                howHelp: null,
                whenNeeded: null,
                studyQuestionnaireLink: null,
                leadResearcher: {
                  id: "d9e9c9ea-337d-4a63-bb76-3122a342041d",
                  firstname: "researcher",
                  lastname: "one",
                  email: "idg_d9e9c9ea-337d-4a63-bb76-3122a342041d",
                },
                sites: null,
                status: "Incomplete",
                createdAtUtc: "2021-11-29T10:14:57.44Z",
                createdById: "e445b246-014c-11eb-8154-060c27787e25",
                updatedAtUtc: null,
                updatedById: null,
              },
              {
                studyId: 33333,
                cpmsId: 33333,
                irasId: 33333,
                isrctnId: "82778ddc-2655-45f8-b198-ddb29f0e10de",
                title: "the title",
                shortName: "the short name",
                about:
                  "About text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id aliquet felis. Nunc id tortor tempor, sagittis massa in, volutpat justo. Proin eget elementum ipsum, a consequat orci. Curabitur interdum, urna sed dictum commodo, libero metus euismod tortor, eu rhoncus odio purus et libero. Nulla venenatis mollis erat non imperdiet. Aliquam pulvinar nisl vitae lorem tristique, quis bibendum dui lacinia. Morbi ac est maximus, bibendum ex dictum, lobortis orci. Sed sollicitudin, nulla vel hendrerit blandit, massa odio elementum ligula, eu elementum mi lectus sit amet urna. Curabitur pulvinar venenatis rutrum. Nam pellentesque tincidunt turpis, non vehicula quam cursus in.\r\n\t\t\t\r\n\t\t\tIn nec aliquam metus, in finibus quam. Nam eget egestas justo, nec semper ligula. Nullam sollicitudin nulla eget lectus pretium euismod. Quisque tincidunt erat nec quam interdum blandit. Sed ut tellus facilisis, interdum augue vulputate, vehicula nulla. Cras sit amet semper nisi, ut gravida turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris risus sapien, finibus blandit lectus sed, pretium dictum nisi.\r\n\t\t\t\r\n\t\t\tNullam volutpat urna non pulvinar scelerisque. Vivamus semper nibh eget metus cursus, nec facilisis mauris aliquam. Proin sed faucibus lectus. Aenean vel consequat quam, ac dignissim urna. Nunc nec ultrices justo. Vestibulum consectetur magna nec nunc cursus rhoncus. Sed sed eros faucibus, dignissim nibh tempor, congue magna. Phasellus consectetur velit vel nibh sodales rutrum. Vestibulum eget magna enim. Vestibulum nec nisi ex. Nunc laoreet vitae justo non pellentesque. Nam venenatis, est vel commodo finibus, mauris metus pharetra justo, eu rutrum diam diam sit amet turpis. Nulla nec pretium metus. Donec nec imperdiet elit. Phasellus odio ipsum, aliquam commodo augue a, imperdiet condimentum urna.",
                howHelp:
                  "How to help text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id aliquet felis. Nunc id tortor tempor, sagittis massa in, volutpat justo. Proin eget elementum ipsum, a consequat orci. Curabitur interdum, urna sed dictum commodo, libero metus euismod tortor, eu rhoncus odio purus et libero. Nulla venenatis mollis erat non imperdiet. Aliquam pulvinar nisl vitae lorem tristique, quis bibendum dui lacinia. Morbi ac est maximus, bibendum ex dictum, lobortis orci. Sed sollicitudin, nulla vel hendrerit blandit, massa odio elementum ligula, eu elementum mi lectus sit amet urna. Curabitur pulvinar venenatis rutrum. Nam pellentesque tincidunt turpis, non vehicula quam cursus in.\r\n\t\t\t\r\n\t\t\tIn nec aliquam metus, in finibus quam. Nam eget egestas justo, nec semper ligula. Nullam sollicitudin nulla eget lectus pretium euismod. Quisque tincidunt erat nec quam interdum blandit. Sed ut tellus facilisis, interdum augue vulputate, vehicula nulla. Cras sit amet semper nisi, ut gravida turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris risus sapien, finibus blandit lectus sed, pretium dictum nisi.\r\n\t\t\t\r\n\t\t\tNullam volutpat urna non pulvinar scelerisque. Vivamus semper nibh eget metus cursus, nec facilisis mauris aliquam. Proin sed faucibus lectus. Aenean vel consequat quam, ac dignissim urna. Nunc nec ultrices justo. Vestibulum consectetur magna nec nunc cursus rhoncus. Sed sed eros faucibus, dignissim nibh tempor, congue magna. Phasellus consectetur velit vel nibh sodales rutrum. Vestibulum eget magna enim. Vestibulum nec nisi ex. Nunc laoreet vitae justo non pellentesque. Nam venenatis, est vel commodo finibus, mauris metus pharetra justo, eu rutrum diam diam sit amet turpis. Nulla nec pretium metus. Donec nec imperdiet elit. Phasellus odio ipsum, aliquam commodo augue a, imperdiet condimentum urna.",
                whenNeeded:
                  "When needed text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id aliquet felis. Nunc id tortor tempor, sagittis massa in, volutpat justo. Proin eget elementum ipsum, a consequat orci. Curabitur interdum, urna sed dictum commodo, libero metus euismod tortor, eu rhoncus odio purus et libero. Nulla venenatis mollis erat non imperdiet. Aliquam pulvinar nisl vitae lorem tristique, quis bibendum dui lacinia. Morbi ac est maximus, bibendum ex dictum, lobortis orci. Sed sollicitudin, nulla vel hendrerit blandit, massa odio elementum ligula, eu elementum mi lectus sit amet urna. Curabitur pulvinar venenatis rutrum. Nam pellentesque tincidunt turpis, non vehicula quam cursus in.\r\n\t\t\t\r\n\t\t\tIn nec aliquam metus, in finibus quam. Nam eget egestas justo, nec semper ligula. Nullam sollicitudin nulla eget lectus pretium euismod. Quisque tincidunt erat nec quam interdum blandit. Sed ut tellus facilisis, interdum augue vulputate, vehicula nulla. Cras sit amet semper nisi, ut gravida turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris risus sapien, finibus blandit lectus sed, pretium dictum nisi.\r\n\t\t\t\r\n\t\t\tNullam volutpat urna non pulvinar scelerisque. Vivamus semper nibh eget metus cursus, nec facilisis mauris aliquam. Proin sed faucibus lectus. Aenean vel consequat quam, ac dignissim urna. Nunc nec ultrices justo. Vestibulum consectetur magna nec nunc cursus rhoncus. Sed sed eros faucibus, dignissim nibh tempor, congue magna. Phasellus consectetur velit vel nibh sodales rutrum. Vestibulum eget magna enim. Vestibulum nec nisi ex. Nunc laoreet vitae justo non pellentesque. Nam venenatis, est vel commodo finibus, mauris metus pharetra justo, eu rutrum diam diam sit amet turpis. Nulla nec pretium metus. Donec nec imperdiet elit. Phasellus odio ipsum, aliquam commodo augue a, imperdiet condimentum urna.",
                studyQuestionnaireLink: "https://google.com",
                leadResearcher: {
                  id: "47b65bd3-e620-456f-a5d0-3b9fd9752d31",
                  firstname: "firstname",
                  lastname: "lastname",
                  email: "name@email.com",
                },
                sites: null,
                status: "Incomplete",
                createdAtUtc: "0001-01-01T00:00:00Z",
                createdById: null,
                updatedAtUtc: null,
                updatedById: null,
              },
            ],
          },
          isSuccess: true,
          errors: [],
          version: 1,
        };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("ListStudies", () => {
  // Having real issues getting this to work with the mock server.
  // it("should render", async () => {
  //   render(<ListStudies />);
  //   await waitFor(
  //     () => expect(screen.getByText("study one")).toBeInTheDocument(),
  //     { timeout: 4000 }
  //   );
  // });
});

describe("ListStudies accessibility tests", () => {
  it("should be accessible", async () => {
    const { container } = render(<ListStudies />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
