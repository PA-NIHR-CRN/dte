import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../Helper/test-utils";
import Footer from "./Footer";

expect.extend(toHaveNoViolations);

describe("Test suite for Footer element", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Footer Component Tests", () => {
  it("Footer renders without crashing", () => {
    render(<Footer />);
  });

  it("must contain correct links", () => {
    render(<Footer />);
    const navHeader = screen.getByRole("heading", { level: 2 });
    const subHeaders = screen.getAllByRole("heading", { level: 3 });
    const links = screen.getAllByRole("link");
    expect(navHeader).toBeInTheDocument();
    expect(navHeader).toHaveTextContent("Site Links");
    expect(subHeaders).toHaveLength(4);
    expect(subHeaders[0]).toHaveTextContent("Services");
    expect(subHeaders[1]).toHaveTextContent("Learn");
    expect(subHeaders[2]).toHaveTextContent("Site policies");
    expect(subHeaders[3]).toHaveTextContent("Stay connected");

    expect(links).toHaveLength(27);
    expect(links[0]).toHaveAttribute("href", "https://www.facebook.com/OfficialNIHR/");
    expect(links[1]).toHaveAttribute("href", "https://twitter.com/NIHRtakepart");
    expect(links[2]).toHaveAttribute("href", "https://www.youtube.com/user/NIHRtv");
    expect(links[3]).toHaveAttribute("href", "https://www.linkedin.com/company/nihr-research");
    expect(links[4]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/");
    expect(links[4]).toHaveTextContent("Find a study");
    expect(links[5]).toHaveAttribute(
      "href",
      "https://bepartofresearch.nihr.ac.uk/promote-research/information-for-researchers/"
    );
    expect(links[5]).toHaveTextContent("Add my study");
    expect(links[6]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/results/a-z-conditions");
    expect(links[6]).toHaveTextContent("A-Z conditions");
    expect(links[7]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/about/glossary/");
    expect(links[7]).toHaveTextContent("Glossary");
    expect(links[8]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/about/frequently-asked-questions/");
    expect(links[8]).toHaveTextContent("FAQs");

    expect(links[9]).toHaveAttribute(
      "href",
      "https://bepartofresearch.nihr.ac.uk/about/What-is-health-and-care-research/"
    );
    expect(links[9]).toHaveTextContent("What is health and care research?");
    expect(links[10]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/taking-part/why-take-part/");
    expect(links[10]).toHaveTextContent("Why take part?");
    expect(links[11]).toHaveAttribute(
      "href",
      "https://bepartofresearch.nihr.ac.uk/taking-part/what-happens-on-a-study/"
    );
    expect(links[11]).toHaveTextContent("What happens on a study?");
    expect(links[12]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/taking-part/Consent/");
    expect(links[12]).toHaveTextContent("Consenting to a study");

    expect(links[13]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/site-policies/");
    expect(links[13]).toHaveTextContent("All site policies");
    expect(links[14]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/site-policies/accessibility");
    expect(links[14]).toHaveTextContent("Accessibility");
    expect(links[15]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/site-policies/complaints");
    expect(links[15]).toHaveTextContent("Complaints");
    expect(links[16]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/site-policies/cookie-policy");
    expect(links[16]).toHaveTextContent("Cookie policy");
    expect(links[17]).toHaveAttribute(
      "href",
      "https://bepartofresearch.nihr.ac.uk/site-policies/freedom-of-information"
    );
    expect(links[17]).toHaveTextContent("Freedom of information");
    expect(links[18]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy");
    expect(links[18]).toHaveTextContent("Privacy policy");
    expect(links[19]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/site-policies/terms-and-conditions");
    expect(links[19]).toHaveTextContent("Terms and conditions");

    expect(links[20]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/Articles/index");
    expect(links[20]).toHaveTextContent("Blogs");
    expect(links[21]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/about/#contact-form");
    expect(links[21]).toHaveTextContent("Contact us");
    expect(links[22]).toHaveAttribute(
      "href",
      "https://nihr.us14.list-manage.com/subscribe?u=299dc02111e8a68172029095f&id=3b030a1027"
    );
    expect(links[22]).toHaveTextContent("Newsletter");

    expect(links[23]).toHaveAttribute("href", "https://bepartofresearch.nihr.ac.uk/");
    expect(links[24]).toHaveAttribute("href", "https://www.nihr.ac.uk/");
    expect(links[25]).toHaveAttribute("href", "https://www.research.hscni.net/");
    expect(links[26]).toHaveAttribute("href", "https://www.nhsresearchscotland.org.uk/");
    expect(links[27]).toHaveAttribute("href", "https://healthandcareresearchwales.org/");
  });
});
