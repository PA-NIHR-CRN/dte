import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../../../Helper/test-utils";
import DTEHeader from "./DTEHeader";

expect.extend(toHaveNoViolations);

describe("DTEHeader", () => {
  it("is accessible", async () => {
    const { container } = render(
      <DTEHeader as="h1" $variant="h1">
        Content
      </DTEHeader>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders", async () => {
    render(
      <>
        <DTEHeader as="h1" $variant="h1">
          H1 Header
        </DTEHeader>
        <DTEHeader as="h1" $platform="mobile">
          H1 Header forced mobile
        </DTEHeader>
        <DTEHeader as="h1" $platform="desktop">
          H1 Header forced desktop
        </DTEHeader>
        <DTEHeader as="h1" $weight="normal">
          H1 Header Light
        </DTEHeader>
        <DTEHeader as="h2" $variant="h2">
          H2 Header
        </DTEHeader>
        <DTEHeader as="h3">H3 Header</DTEHeader>
        <DTEHeader as="h4">H4 Header</DTEHeader>
      </>
    );
    expect(screen.getByText("H1 Header")).toBeInTheDocument();
    expect(screen.getByText("H1 Header forced mobile")).toBeInTheDocument();
    expect(screen.getByText("H1 Header forced desktop")).toBeInTheDocument();
    expect(screen.getByText("H1 Header Light")).toBeInTheDocument();
    expect(screen.getByText("H2 Header")).toBeInTheDocument();
    expect(screen.getByText("H3 Header")).toBeInTheDocument();
    expect(screen.getByText("H4 Header")).toBeInTheDocument();
  });
});
