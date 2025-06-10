import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "../../../Helper/test-utils";
import Footer from "./Footer";

expect.extend(toHaveNoViolations);

describe("Footer Accessibility  Tests", () => {
  it("should not fail any accessibility tests", async () => {
    const { container } = render(<Footer />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("Test suite for Footer element", () => {
  let links: HTMLElement[];

  beforeEach(() => {
    const { getAllByRole } = render(<Footer />);
    links = getAllByRole("link");
  });

  describe("Footer Component Tests", () => {
    it("Footer renders without crashing", () => {
      render(<Footer />);
    });

    it("must contain correct links", () => {
      const navHeader = screen.getByRole("heading", { level: 2 });
      const subHeaders = screen.getAllByRole("heading", { level: 3 });
      expect(navHeader).toBeInTheDocument();
      expect(navHeader).toHaveTextContent("Site Links");
      expect(subHeaders).toHaveLength(4);
      expect(subHeaders[0]).toHaveTextContent("Services");
      expect(subHeaders[1]).toHaveTextContent("Learn");
      expect(subHeaders[2]).toHaveTextContent("Site policies");
      expect(subHeaders[3]).toHaveTextContent("Stay connected");

      expect(links).toHaveLength(28);
    });

    describe.each([
      ["https://www.accessibility-services.co.uk/certificates/nihr-be-part-of-research/", "Shaw Trust Accessible, Be Part of Research Accreditation", true, true],
      ["https://www.facebook.com/OfficialNIHR/", "Facebook", true, true],
      ["https://twitter.com/NIHRtakepart", "Twitter", true, true],
      ["https://www.youtube.com/user/NIHRtv", "YouTube", true, true],
      ["https://www.linkedin.com/company/nihr-research", "LinkedIn", true, true],
      ["https://bepartofresearch.nihr.ac.uk", "Be Part of Research", true, true],
      ["https://www.research.hscni.net/", "Public Health Agency Northern Ireland", true, true],
      ["https://www.nhsresearchscotland.org.uk/", "NHS Scotland", true, true],
      ["https://healthandcareresearchwales.org/", "Health and Care Research Wales", true, true],
      ["https://www.nihr.ac.uk/", "National Institute for Health and Care Research", false, true],
      ["https://bepartofresearch.nihr.ac.uk/", "Find a study", true, false],
      [
        "https://bepartofresearch.nihr.ac.uk/promote-research/information-for-researchers/",
        "Add my study",
        true,
        false,
      ],
      ["https://bepartofresearch.nihr.ac.uk/results/a-z-conditions", "A-Z conditions", true, false],
      ["https://bepartofresearch.nihr.ac.uk/about/glossary/", "Glossary", true, false],
      [
        "https://bepartofresearch.nihr.ac.uk/what-is-health-and-care-research/",
        "What is health and care research?",

        true,
        false,
      ],
      [
        "https://bepartofresearch.nihr.ac.uk/take-part-in-research/why-taking-part-matters/",
        "Why taking part matters",
        true,
        false,
      ],
      [
        "https://bepartofresearch.nihr.ac.uk/take-part-in-research/what-to-expect-on-a-study/",
        "What to expect on a study",
        true,
        false,
      ],
      ["https://bepartofresearch.nihr.ac.uk/taking-part/Consent/", "Consenting to a study", true, false],
      ["https://bepartofresearch.nihr.ac.uk/site-policies/", "All site policies", true, false],
      ["https://bepartofresearch.nihr.ac.uk/site-policies/accessibility", "Accessibility", true, false],
      ["https://bepartofresearch.nihr.ac.uk/site-policies/complaints", "Complaints", true, false],
      ["https://bepartofresearch.nihr.ac.uk/site-policies/cookie-policy", "Cookie policy", true, false],
      [
        "https://bepartofresearch.nihr.ac.uk/site-policies/freedom-of-information",
        "Freedom of information",
        true,
        false,
      ],
      ["https://bepartofresearch.nihr.ac.uk/site-policies/privacy-policy", "Privacy policy", true, false],
      ["https://bepartofresearch.nihr.ac.uk/site-policies/terms-and-conditions", "Terms and conditions", true, false],
      ["https://bepartofresearch.nihr.ac.uk/Articles/index", "Blogs", true, false],
      ["https://bepartofresearch.nihr.ac.uk/get-in-touch/", "Get in touch", true, false],
      [
        "https://nihr.us14.list-manage.com/subscribe?u=299dc02111e8a68172029095f&id=3b030a1027",
        "Newsletter",
        true,
        false,
      ],
    ])("Testing link %s", (link, text, isExternal, isImage) => {
      it(`should have the correct attribute for the image for ${text}`, () => {
        const linkElement = links.find((l) => l.getAttribute("href") === link);
        expect(linkElement).toBeInTheDocument();
        if (isExternal) {
          expect(linkElement).toHaveAttribute("aria-label", `${text} (Opens in a new tab)`);
          expect(linkElement).toHaveAttribute("target", "_blank");
          expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
          if (!isImage) {
            expect(linkElement).toHaveTextContent(text);
          }
        } else {
          expect(linkElement).toHaveAttribute("aria-label", text);
          expect(linkElement).not.toHaveAttribute("target");
          expect(linkElement).not.toHaveAttribute("rel");
        }
      });
    });
  });
});
