import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import PostcodeLookup from "./PostcodeLookup";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/location/postcode/:postcode`,
        () => {
          return {
            content: [
              {
                fullAddress: "9, TRAPS LANE, NEW MALDEN, KT3 4RS",
                addressLine1: "9,",
                addressLine2: "TRAPS LANE",
                addressLine3: null,
                addressLine4: "NEW MALDEN",
                town: "KINGSTON UPON THAMES",
                postcode: "KT3 4RS",
              },
              {
                fullAddress: "FIVE STONES, TRAPS LANE, NEW MALDEN, KT3 4RS",
                addressLine1: "FIVE STONES",
                addressLine2: "TRAPS LANE",
                addressLine3: null,
                addressLine4: "NEW MALDEN",
                town: "KINGSTON UPON THAMES",
                postcode: "KT3 4RS",
              },
              {
                fullAddress:
                  "MALDEN GOLF CLUB, TRAPS LANE, NEW MALDEN, KT3 4RS",
                addressLine1: "MALDEN GOLF CLUB",
                addressLine2: "TRAPS LANE",
                addressLine3: null,
                addressLine4: "NEW MALDEN",
                town: "KINGSTON UPON THAMES",
                postcode: "KT3 4RS",
              },
            ],
            isSuccess: true,
            errors: [],
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

const emptyData = {
  postcode: "",
  addresses: [],
};

describe("PostcodeLookup", () => {
  it("renders", () => {
    const mockOnDataChange = jest.fn();
    render(
      <PostcodeLookup
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />,
    );
  });

  it("renders a postcode input field", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PostcodeLookup
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Postcode")).toBeInTheDocument();
    });
  });

  it("can submit", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PostcodeLookup
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />,
    );

    await waitFor(() => {
      fireEvent.input(screen.getByLabelText("Postcode"), {
        target: { value: "KT1 1AA" },
      });

      expect(screen.getByDisplayValue("KT1 1AA")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Find address"));
    });
  });

  it("shows an error message if the required field is not entered", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PostcodeLookup
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />,
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Find address"));
      expect(screen.getByText("Enter a postcode")).toBeInTheDocument();
    });
  });

  it("shows an error message if an invalid postcode is entered", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PostcodeLookup
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />,
    );

    await waitFor(() => {
      fireEvent.input(screen.getByLabelText("Postcode"), {
        target: { value: "test" },
      });
      fireEvent.click(screen.getByText("Find address"));
      expect(screen.getByText("Enter a real postcode")).toBeInTheDocument();
    });
  });
});

describe("Accessibility test", () => {
  it("should not fail any accessibility tests", async () => {
    const mockOnDataChange = jest.fn();
    const { container } = render(
      <PostcodeLookup
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Postcode Lookup must display error summary header on invalid submission", () => {
  it("renders correctly", async () => {
    const mockOnDataChange = jest.fn();
    render(
      <PostcodeLookup
        initialStateData={emptyData}
        onDataChange={mockOnDataChange}
      />,
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Find address"));
    });

    const errors = await screen.findAllByRole("alert");
    const summary = errors[0];
    expect(summary).toHaveAttribute("id", "error-message");
  });
});
