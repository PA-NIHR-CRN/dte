import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../../Helper/test-utils";
import DTERouteLink from "./DTERouteLink";

expect.extend(toHaveNoViolations);

describe("DTERouteLink accessibility tests", () => {
  it("should be accessible", async () => {
    const { container } = render(<DTERouteLink to="/">Link text</DTERouteLink>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("DTERouteLink styling tests", () => {
  it("base style link must have correct classes assigned", async () => {
    render(<DTERouteLink to="/">Link text</DTERouteLink>);
    const link = await screen.findByRole("link");
    expect(link).toHaveClass("nhsuk-button button-route");
  });

  it("standard style link must have correct classes assigned", async () => {
    render(
      <DTERouteLink renderStyle="standard" to="/">
        Link text
      </DTERouteLink>,
    );
    const link = await screen.findByRole("link");
    expect(link).toHaveClass("standard-route");
  });
});

describe("DTERouteLink noreferrer", () => {
  it("internal link must not have rel assigned", async () => {
    render(<DTERouteLink to="/">Link text</DTERouteLink>);
    const link = await screen.findByRole("link");
    expect(link).not.toHaveAttribute("rel");
  });
});

describe("DTERouteLink target", () => {
  it("link must not have target attribute when not assigned", async () => {
    render(<DTERouteLink to="/">Link text</DTERouteLink>);
    const link = await screen.findByRole("link");
    expect(link).not.toHaveAttribute("target");
  });

  it("link must have target attribute when assigned", async () => {
    render(
      <DTERouteLink target="_blank" to="/">
        Link text
      </DTERouteLink>,
    );
    const link = await screen.findByRole("link");
    expect(link).toHaveAttribute("target");
  });

  it("link must have target attribute of _blank", async () => {
    render(
      <DTERouteLink target="_blank" to="/">
        Link text
      </DTERouteLink>,
    );
    const link = await screen.findByRole("link");
    const relValue = link.getAttribute("target");
    expect(relValue).toEqual("_blank");
  });
});
