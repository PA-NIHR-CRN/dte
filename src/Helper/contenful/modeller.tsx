import React, { ReactNode } from "react";
import styled from "styled-components";
import { Stack } from "@mui/material";
import DTEHeader from "../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../components/Shared/UI/DTERouteLink/DTERouteLink";
import DTETable from "../../components/Shared/UI/DTETable/DTETable";
import DTEDetails from "../../components/Shared/UI/DTEDetails/DTEDetails";
import DTEHR from "../../components/Shared/UI/DTEHR/DTEHR";
import NhsLoginButton from "../../components/Shared/UI/NhsLoginButton";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const StyledDTEHR = styled(DTEHR)`
  margin-top: 2.5em;
`;

interface NodeType {
  content: any[];
  nodeType: string;
}

type HeaderType = "h1" | "h2" | "h3" | "h4";

const HeaderMap: Record<string, HeaderType> = {
  "heading-1": "h1",
  "heading-2": "h2",
  "heading-3": "h3",
  "heading-4": "h4",
};

const renderHeader = (node: NodeType) => {
  const headerType = HeaderMap[node.nodeType];
  return <DTEHeader as={headerType}>{node.content.map((child) => renderContent(child, node.nodeType))}</DTEHeader>;
};

const getTextStyles = (node: any, parentNodeType: string | undefined): React.CSSProperties | undefined => {
  if (node.nodeType !== "text" || (typeof parentNodeType === "string" && parentNodeType.startsWith("heading")))
    return undefined;

  return {
    fontWeight: node.marks.some((mark: { type: string }) => mark.type === "bold") ? "bold" : "normal",
    fontStyle: node.marks.some((mark: { type: string }) => mark.type === "italic") ? "italic" : "normal",
    textDecoration: node.marks.some((mark: { type: string }) => mark.type === "underline") ? "underline" : "none",
  };
};

const extractValueFromNode = (node: any) => {
  if (
    node &&
    node.content &&
    node.content[0] &&
    node.content[0].content &&
    node.content[0].content[0] &&
    node.content[0].content[0].value
  ) {
    return node.content[0].content[0].value;
  }
  return null;
};
const renderedIndexes = new Set<number>();
const renderContent = (node: any, parentNodeType?: string, currentIndex?: number, totalContent?: any[]) => {
  if (!node || !node.nodeType) {
    return null; // or some other default value
  }
  switch (node.nodeType) {
    case "document":
      return node.content.map((childNode: any, index: number) => (
        <React.Fragment key={index}>{renderContent(childNode, node.nodeType, index, node.content)}</React.Fragment>
      ));
    case "heading-1":
    case "heading-2":
    case "heading-3":
    case "heading-4":
      return renderHeader(node);
    case "paragraph":
      return (
        <DTEContent>
          {node.content.map((childNode: any, index: number) => (
            <React.Fragment key={index}>{renderContent(childNode, node.nodeType)}</React.Fragment>
          ))}
        </DTEContent>
      );
    case "text":
      if (parentNodeType && parentNodeType.startsWith("heading")) {
        return node.value;
      }
      return <span style={getTextStyles(node, parentNodeType)}>{node.value}</span>;
    case "hyperlink":
      const isExternalLink = node.data.uri.startsWith("http");
      return (
        <DTERouteLink
          to={node.data.uri}
          external={isExternalLink}
          target={isExternalLink ? "_blank" : undefined}
          renderStyle="standard"
          ariaLabel={`${node.content[0].value} ${isExternalLink ? "(Opens in a new tab)" : ""}`}
          rel={isExternalLink ? "noopener noreferrer" : ""}
        >
          {node.content.map((childNode: any, index: number) => (
            <React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
          ))}
        </DTERouteLink>
      );
    case "ordered-list":
      return (
        <ol>
          {node.content.map((childNode: any, index: number) => (
            <React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
          ))}
        </ol>
      );

    case "embedded-entry-block":
      const { fields } = node.data.target;
      const contentTypeID = node?.data?.target?.sys?.contentType?.sys?.id;

      const validButtonTexts = [
        "Continue with email address",
        "Register with email address",
        "Sign in with email address",
        "Cofrestru gyda chyfeiriad e-bost",
        "Mewngofnodwch gyda chyfeiriad e-bost",
      ];
      const buttonText = fields.buttonText;

      if (contentTypeID === "button" && validButtonTexts.includes(buttonText)) {
        if (currentIndex !== undefined && renderedIndexes.has(currentIndex)) {
          return null;
        }
        currentIndex !== undefined && renderedIndexes.add(currentIndex);
      }

      if (contentTypeID === "button") {
        return (
          <ButtonWrapper>
            <DTERouteLink
              to={fields.path}
              $outlined={fields.outlined}
              external={fields.external}
              target={fields.external ? "_blank" : undefined}
              ariaLabel={fields.ariaLabel}
            >
              {fields.buttonText}
            </DTERouteLink>
          </ButtonWrapper>
        );
      } else if (contentTypeID === "nhsLoginButton") {
        let nextNodeComponent = null;
        if (totalContent && currentIndex !== undefined && totalContent[currentIndex + 1]) {
          nextNodeComponent = totalContent[currentIndex + 1];
          renderedIndexes.add(currentIndex + 1);
        }
        return (
          <>
            {fields.showHelperText && (
              <div className="govuk-details__text">
                <DTEContent>{fields.helperText}</DTEContent>
              </div>
            )}
            <Stack flexDirection="row">
              <NhsLoginButton buttonText={fields.buttonText} />
              {nextNodeComponent && renderContent(nextNodeComponent)}
            </Stack>
          </>
        );
      } else if (contentTypeID === "vsAccordion") {
        const summary = fields.summary;
        const contentNode = fields.content;

        return (
          <DTEDetails summary={summary}>
            {contentNode.content.map((childNode: any, index: number) => (
              <React.Fragment key={index}>{renderContent(childNode, contentNode.nodeType)}</React.Fragment>
            ))}
          </DTEDetails>
        );
      }
      break;

    case "unordered-list":
      return (
        <ul>
          {node.content.map((childNode: any, index: number) => (
            <React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
          ))}
        </ul>
      );
    case "list-item":
      return (
        <li>
          {node.content.map((childNode: any, index: number) => (
            <React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
          ))}
        </li>
      );
    case "hr":
      return <StyledDTEHR />;
    case "table":
      const columns =
        node.content[0]?.content.map((headerCell: any) => ({
          name: extractValueFromNode(headerCell),
        })) || [];

      const rows = node.content.slice(1).map((rowNode: any) => {
        const row: { [id: string]: ReactNode } = {};
        rowNode.content.forEach((cellNode: any, index: number) => {
          row[columns[index]?.name] = extractValueFromNode(cellNode);
        });
        return row;
      });

      return <DTETable columns={columns} rows={rows} />;

    case "blockquote":
      return (
        <div className="govuk-details__text">
          <DTEContent>
            {node.content.map((childNode: any, index: number) => (
              <React.Fragment key={index}>{renderContent(childNode)}</React.Fragment>
            ))}
          </DTEContent>
        </div>
      );
    default:
      return null;
  }
};

export default renderContent;
