import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";
import Login from "./Login";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/participants/undefined/demographics`,
        () => {
          return {
            content: null,
            isSuccess: false,
            errors: [
              {
                service: "ParticipantService",
                component: "GetParticipantDemographicsQueryHandler",
                exceptionName: "HttpServiceException",
                httpStatusName: "NotFound",
                httpStatusCode: 404,
                httpResponseString:
                  '{"error":"No participant demographics found for participantId: fce08cf7-4b04-4311-b60b-0b76a072fb0b","innerException":null,"conversationId":null}',
                customCode: "err",
                detail:
                  "ParticipantService received http status: NotFound (404) calling: https://vd8b5c9qk6.execute-api.eu-west-1.amazonaws.com/dev/api/participants/fce08cf7-4b04-4311-b60b-0b76a072fb0b/demographics",
              },
            ],
            conversationId: null,
            version: 1,
          };
        },
      );
    },
  });
});

afterEach(() => {
  server.shutdown();
});

const ParticipantParams =
  "id_token=eyJraWQiOiI2Q1I2MkRaRUFKb0JwZkd0U0tFNWZsZ2xNS3Vla01XVFZFOVlka21JNlNBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmY2UwOGNmNy00YjA0LTQzMTEtYjYwYi0wYjc2YTA3MmZiMGIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfNzcwZ0x6cG9wIiwiY29nbml0bzp1c2VybmFtZSI6ImZjZTA4Y2Y3LTRiMDQtNDMxMS1iNjBiLTBiNzZhMDcyZmIwYiIsIm9yaWdpbl9qdGkiOiI1YzEzNDQ3Ni05MTI3LTRiOTctYjg2Ni00ZDVkYWM5MTk5MzAiLCJhdWQiOiIxb2M0YnQ3YWxrc2MxcTVpOHVtODk1azZmdiIsImV2ZW50X2lkIjoiOWUzZjI3Y2MtZDg2Mi00YmY5LTkwOTgtODVhM2UwN2Q5MTFkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDgyMDY0MDAsImV4cCI6MTY0ODI5MjgwMCwiaWF0IjoxNjQ4MjA2NDAwLCJqdGkiOiJiZDdlNjcyMC01MzljLTRkYTgtODY2OS0zZDY0OWM5ODNkZDUiLCJlbWFpbCI6Im5paHItd2hpdGVsaXN0QG1pbGVzLnNvIn0.p0IKk3hfEgEau5z1tojpjh7r8O_x6WryKJ6_ZKYnCux7s6zRrkQwTh6iEGTzzaKAvZEM5qP7f0Lwg7FNb-TZBwN9U42z9vnVU9gy_UyY88-rVpW8TV6ZsUGoT_2uTUgqWA11n-63tfSUvSpt65bSj_3a407NB4mKO22K77k6qQIqKZ9vnV13LgQrAV5imcmzqtpNrMGSKn_XCt2pMHutfRcPswkQNZcQyo6ol6Ny7p6woL7bcrfFTLS_s3N21UTO9j_vzCaAxcpgqs_7m8SB3-fCG2pexkskSS2Q6M-lYQk-b-5n2NIiw2KkTmx4SbugBp6VSwSFVjGrAa7boQKEQA";

const ResearcherParams =
  "id_token=eyJraWQiOiI2Q1I2MkRaRUFKb0JwZkd0U0tFNWZsZ2xNS3Vla01XVFZFOVlka21JNlNBPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoidkpCb01La1p6YTRTRXBVdFh0a1g1USIsInN1YiI6IjQxYTU1MTZlLTFjYTctNDE4NC1hYzA1LTIwZGJlOTljNjJiZCIsImNvZ25pdG86Z3JvdXBzIjpbImV1LXdlc3QtMV83NzBnTHpwb3BfaWRnIl0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfNzcwZ0x6cG9wIiwiY29nbml0bzp1c2VybmFtZSI6ImlkZ19kOWU5YzllYS0zMzdkLTRhNjMtYmI3Ni0zMTIyYTM0MjA0MWQiLCJnaXZlbl9uYW1lIjoiUmVzZWF…iaWF0IjoxNjQ4MjE5NDEyLCJmYW1pbHlfbmFtZSI6Ik9uZSIsImp0aSI6IjI4N2Y5YTE5LWM0OTEtNDg5OS1iMmU5LTA3ZjUzM2RjYmMyNSIsImVtYWlsIjoicmVzZWFyY2hlcjFAeW9wbWFpbC5jb20ifQ.Ws9VtfTzmNg_dc_ufYhzAF4BfmUkmsA8_kcLWikPvbUtt9fKvjcTE5QBpyPvgtfS3zSytxArIBrIrX_JeYdysSxHSTOmRQR3JflVQj07_iIgkOL4eXEQQLOJZoZXJmzt3pttYEgQI8zf_mu_jm7vXyrnYUZmNFhkWwdcaZX2wc_uR5ziF4DlW5OWh3TdEJCKNNTOHeJWcs8v2xZYXgIbE_OdUCvv_nqvNiXa7jvs69Pu1LIC4z2XxWNI7fpv5rU95pAZ_k-RrMScNIuPkT_ODJ8ur23gLUfbX0i5ffXRpjXGsOeweOVzaUbzFItnnPOHT_d11xTcZuYpSb13_NQ3vQ";

describe("Login accessibility tests", () => {
  it("should not have accessibility violations", async () => {
    const content = render(<Login />, {}, [
      { pathname: "/login", search: `?${ParticipantParams}` },
    ]);
    const results = await axe(content.container);
    expect(results).toHaveNoViolations();
  });
});

describe("Login tests", () => {
  it("renders without error", async () => {
    render(<Login />, {}, [
      { pathname: "/login", search: `?${ParticipantParams}` },
    ]);
  });
  it("checks demographics for participant", async () => {
    render(<Login />, {}, [
      { pathname: "/login", search: `?${ParticipantParams}` },
    ]);
    server.pretender.handledRequest = (path) => {
      expect(path).toBe(
        `${process.env.REACT_APP_BASE_API}/participants/undefined/demographics`,
      );
    };
  });
  it("doesn't check demographics for researcher", async () => {
    render(<Login />, {}, [
      { pathname: "/login", search: `?${ResearcherParams}` },
    ]);
    server.pretender.handledRequest = (path) => {
      expect(path).not.toBe(
        `${process.env.REACT_APP_BASE_API}/participants/undefined/demographics`,
      );
    };
  });
});
