import { render, screen, waitFor } from "../../../Helper/test-utils";
import ThreeWords from "./threeWords";

describe("threeWords component test", () => {
  it("should return the correct text", async () => {
    render(<ThreeWords />);

    expect(
      screen.getByText(
        /We recommend using three random words to generate your password, e.g. 'applenemobiro' as these are easy for you to remember and hard for others to guess./
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /You should avoid family and pet names, your favourite sports team, and dates and locations related to you./
      )
    ).toBeInTheDocument();
  });
});
