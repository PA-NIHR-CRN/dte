import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../../../Helper/test-utils";
import DTEHeader from "./DTEHeader";

expect.extend(toHaveNoViolations);

describe("DTEHeader", () => {
  it("is accessible", async () => {
    const { container } = render(
      <DTEHeader as="h1" $variant="h1" captionKey="Content">
        Content
      </DTEHeader>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders", async () => {
    render(
      <>
        <DTEHeader as="h1" $variant="h1" captionKey="H1 Header">
          H1 Header
        </DTEHeader>
        <DTEHeader as="h1" $platform="mobile" captionKey="H1 Header forced mobile">
          H1 Header forced mobile
        </DTEHeader>
        <DTEHeader as="h1" $platform="desktop" captionKey="H1 Header forced desktop">
          H1 Header forced desktop
        </DTEHeader>
        <DTEHeader as="h1" $weight="normal" captionKey="H1 Header Light">
          H1 Header Light
        </DTEHeader>
        <DTEHeader as="h2" $variant="h2" captionKey="H2 Header">
          H2 Header
        </DTEHeader>
        <DTEHeader as="h3" captionKey="H3 Header">
          H3 Header
        </DTEHeader>
        <DTEHeader as="h4" captionKey="H4 Header">
          H4 Header
        </DTEHeader>
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
