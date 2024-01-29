import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../../Helper/test-utils";
import DTERichTextRender from "./DTERichTextRender";

expect.extend(toHaveNoViolations);

describe("DTERichTextRender accessibility", () => {
  it("must be accessible when rendered with empty string", async () => {
    const { container } = render(<DTERichTextRender richText="" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("must be accessible when rendered with valid accessible html string", async () => {
    const { container } = render(<DTERichTextRender richText="<p>This is a valid html string</p>" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("DTERichTextRender only renders allowed html", () => {
  it("must render p tags", async () => {
    const richText = JSON.stringify("<p>Content in p tags</p>");
    render(<DTERichTextRender richText={richText} />);
    const content = await screen.findByText("Content in p tags");
    expect(content).toBeInTheDocument();
  });

  it("must render b tags", async () => {
    const richText = JSON.stringify("<b>Content in b tags</b>");
    render(<DTERichTextRender richText={richText} />);
    const content = await screen.findByText("Content in b tags");
    expect(content).toBeInTheDocument();
  });

  it("must render strong tags", async () => {
    const richText = JSON.stringify("<strong>Content in strong tags</strong>");
    render(<DTERichTextRender richText={richText} />);
    const content = await screen.findByText("Content in strong tags");
    expect(content).toBeInTheDocument();
  });

  it("must render ul li tags", async () => {
    const richText = JSON.stringify("<ul><li>Item 1</li><li>Item 2</li></ul>");
    render(<DTERichTextRender richText={richText} />);
    const item1 = await screen.findByText("Item 1");
    const item2 = await screen.findByText("Item 2");
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it("must render ol li tags", async () => {
    const richText = JSON.stringify("<ol><li>Item 1</li><li>Item 2</li></ol>");
    render(<DTERichTextRender richText={richText} />);
    const item1 = await screen.findByText("Item 1");
    const item2 = await screen.findByText("Item 2");
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it("must not render i tags", async () => {
    const richText = JSON.stringify("<i>Content in i tags</i>");
    render(<DTERichTextRender richText={richText} />);
    const htmlContent = await screen.queryByText("<i>Content in i tags<i>");
    const plainContent = await screen.findByText("Content in i tags");
    expect(htmlContent).not.toBeInTheDocument();
    expect(plainContent).toBeInTheDocument();
  });
});
