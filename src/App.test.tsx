import { render, waitFor } from "./Helper/test-utils";
import App from "./App";
import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Response, Server } from "miragejs";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({});
});

afterEach(() => {
  server.shutdown();
});

describe("App", () => {
  describe("when the API health call is successful", () => {
    beforeEach(() => {
      server.get(
        `${process.env.REACT_APP_BASE_API}/health`,
        () =>
          new Response(
            200,
            { "Content-Type": "application/json" },
            { status: "UP" }
          )
      );
    });

    it("renders without crashing", () => {
      render(<App />);
    });

    it("should not have any accessibility violations", async () => {
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("renders the Header", async () => {
      const { getByRole } = render(<App />);
      await waitFor(() => {
        const headerElement = getByRole("banner");
        expect(headerElement).toBeInTheDocument();
      });
    });

    it("renders the Footer", async () => {
      const { getByText, getByAltText } = render(<App />);
      await waitFor(() => {
        const footerElement = getByText("Follow us");
        const footerLogoElement = getByAltText(
          "Be Part Of Research footer Logo"
        );
        expect(footerElement).toBeInTheDocument();
        expect(footerLogoElement).toBeInTheDocument();
      });
    });
  });

  describe("when the API health call is not successful", () => {
    beforeEach(() => {
      server.get(
        `${process.env.REACT_APP_BASE_API}/health`,
        () =>
          new Response(
            503,
            { "Content-Type": "application/json" },
            { status: "DOWN" }
          )
      );
    });

    it("renders without crashing", () => {
      render(<App />);
    });

    it("should not have any accessibility violations", async () => {
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("renders the Header", async () => {
      const { getByRole } = render(<App />);
      await waitFor(() => {
        const headerElement = getByRole("banner");
        expect(headerElement).toBeInTheDocument();
      });
    });

    it("renders the Maintenance page", async () => {
      const { getByText } = render(<App />);

      await waitFor(() => {
        const maintenanceElement = getByText(
          /Sorry, the service is unavailable/i
        );
        expect(maintenanceElement).toBeInTheDocument();
      });
    });

    it("does not render the Footer", async () => {
      const { getByText, getByAltText } = render(<App />);

      await waitFor(() => {
        expect(() => getByText("Follow us")).toThrow();
        expect(() => getByAltText("Be Part Of Research footer Logo")).toThrow();
      });
    });
  });
});
