import React from "react";
import { v4 as uuidv4 } from "uuid";
import { AccordionMenu } from "nhsuk-react-components-extensions";
import styled from "styled-components";
import DTEAccordionSection from "./DTEAccordionSection";
import { IAccordionSection } from "./IAccordionSection";

type Props = {
  id: string;
  name: string;
  outlined?: boolean;
  noSideBar?: boolean;
  sections: IAccordionSection[];
  bold?: boolean;
};

const StyledAccordionMenu = styled(AccordionMenu)<{
  $outlined?: boolean;
  $noSideBar?: boolean;
  $bold?: boolean;
}>`
  // && Overrides the NHS default styling
  && {
    margin-bottom: 2em;
    border: none;
    border-top: ${(props) => (props.$outlined ? "1px solid #d8dde0" : "none")};
    border-bottom: ${(props) =>
      props.$outlined ? "1px solid #d8dde0" : "none"};
    background-color: transparent;

    details {
      background-color: transparent;

      summary {
        background-color: transparent;
        color: ${(Props) => Props.theme.NIHR.Blue};
        padding-left: 0;
        padding-right: 0;
        border: none;
        font-weight: ${(props) => (props.$bold ? "bold" : "inherit")};

        &:focus,
        &:active {
          border-bottom: none;
          svg > path {
            stroke: ${(Props) => Props.theme.NIHR.Blue};
          }
        }

        svg {
          circle {
            display: none;
          }
          path {
            stroke-width: 2;
          }
        }

        .nhsuk-accordion-menu__section-summary-text {
          margin-left: 0.2rem;
        }
      }

      div {
        margin: 0;
        padding-top: 8px;
        padding-bottom: 8px;
        border-left: ${(props) =>
          props.$noSideBar ? "none" : "6px solid #becad0"};

        p {
          padding: 8px;
          margin-bottom: 0;
          color: ${(Props) => Props.theme.NIHR.PrimaryDarkGrey};
        }
      }
    }
  }
`;

const StyledAccordionSection = styled(DTEAccordionSection)`
  && {
    && {
      border: 4px solid transparent;
      &:focus-within {
        border-color: ${(Props) => Props.theme.NIHR.Blue};
        box-shadow: none;
        outline: 4px solid ${(Props) => Props.theme.NIHR.Yellow};
      }
    }
  }
`;

const DTEAccordion = ({
  id,
  name,
  sections,
  outlined,
  noSideBar,
  bold,
}: Props) => {
  const handleOnChange = (e: any) => {
    if (!e.currentTarget.open) {
      e.currentTarget.setAttribute("aria-expanded", "true");
    } else {
      e.currentTarget.setAttribute("aria-expanded", "false");
    }
  };

  return (
    <StyledAccordionMenu
      id={id}
      name={name}
      $outlined={outlined}
      $noSideBar={noSideBar}
      $bold={bold}
    >
      {sections.map((section) => (
        <StyledAccordionSection
          defaultOpen={section.isDefault}
          heading={section.title}
          aria-expanded={section.isDefault}
          onClick={(e: any) => handleOnChange(e)}
          onKeyPress={(e: any) => handleOnChange(e)}
          key={section.title}
        >
          <div className="nhsuk-accordion-menu__subsection">
            {section.contentElements.map((element) => (
              <React.Fragment key={uuidv4()}>
                {element?.text && (
                  <p className="nhsuk-accordion-menu__subsection-content">
                    {element.text}
                  </p>
                )}
                {element?.child && element.child}
              </React.Fragment>
            ))}
          </div>
        </StyledAccordionSection>
      ))}
    </StyledAccordionMenu>
  );
};

export default DTEAccordion;
