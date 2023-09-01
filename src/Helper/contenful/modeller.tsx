import DTEHeader from "../../components/Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../components/Shared/UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../components/Shared/UI/DTERouteLink/DTERouteLink";
import NhsLoginButton from "../../components/Shared/UI/NhsLoginButton";
import styled from "styled-components";
import React, { ReactNode } from "react";
import DTETable from "../../components/Shared/UI/DTETable/DTETable";
import DTEDetails from "../../components/Shared/UI/DTEDetails/DTEDetails";
import DTEHR from "../../components/Shared/UI/DTEHR/DTEHR";

const ButtonWrapper = styled.div`
  margin: 1rem 0;
`;

const StyledDTEHR = styled(DTEHR)`
  margin-top: 2.5em;
`;

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

const renderContent = (node: any, parentNodeType?: string) => {
  if (!node || !node.nodeType) {
    return null; // or some other default value
  }
  switch (node.nodeType) {
    case "document":
      return node.content.map((childNode: any) => renderContent(childNode, node.nodeType));
    case "heading-1":
      return (
        <DTEHeader as="h1">{node.content.map((childNode: any) => renderContent(childNode, node.nodeType))}</DTEHeader>
      );
    case "heading-2":
      return (
        <DTEHeader as="h2">{node.content.map((childNode: any) => renderContent(childNode, node.nodeType))}</DTEHeader>
      );
    case "heading-3":
      return (
        <DTEHeader as="h3">{node.content.map((childNode: any) => renderContent(childNode, node.nodeType))}</DTEHeader>
      );
    case "heading-4":
      return (
        <DTEHeader as="h4">{node.content.map((childNode: any) => renderContent(childNode, node.nodeType))}</DTEHeader>
      );
    case "paragraph":
      return <DTEContent>{node.content.map((childNode: any) => renderContent(childNode, node.nodeType))}</DTEContent>;
    case "text":
      if (parentNodeType && parentNodeType.startsWith("heading")) {
        return node.value;
      }
      return <span style={getTextStyles(node, parentNodeType)}>{node.value}</span>;
    case "hyperlink":
      return (
        <DTERouteLink
          to={node.data.uri}
          external={node.data.uri.startsWith("http")}
          target={node.data.uri.startsWith("http") ? "_blank" : undefined}
          renderStyle="standard"
        >
          {node.content.map(renderContent)}
        </DTERouteLink>
      );
    case "ordered-list":
      return <ol>{node.content.map(renderContent)}</ol>;
    case "embedded-entry-block":
      const contentTypeID = node?.data?.target?.sys?.contentType?.sys?.id;

      if (contentTypeID === "button") {
        return (
          <ButtonWrapper>
            <DTERouteLink
              to={node.data.target.fields.path}
              $outlined={node.data.target.fields.outlined}
              external={node.data.target.fields.external}
              target={node.data.target.fields.external ? "_blank" : undefined}
              ariaLabel={node.data.target.fields.ariaLabel}
            >
              {node.data.target.fields.buttonText}
            </DTERouteLink>
          </ButtonWrapper>
        );
      } else if (contentTypeID === "nhsLoginButton") {
        return (
          <NhsLoginButton
            buttonText={node.data.target.fields.buttonText}
            helperText={node.data.target.fields.helperText}
          />
        );
      } else if (contentTypeID === "vsAccordion") {
        const summary = node.data.target.fields.summary;
        const contentNode = node.data.target.fields.content;

        return (
          <DTEDetails summary={summary}>
            {contentNode.content.map((childNode: any) => renderContent(childNode, contentNode.nodeType))}
          </DTEDetails>
        );
      } else {
      }
      break;

    case "unordered-list":
      return <ul>{node.content.map(renderContent)}</ul>;
    case "list-item":
      return <li>{node.content.map(renderContent)}</li>;
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
          <DTEContent>{node.content.map(renderContent)}</DTEContent>
        </div>
      );
    default:
      return null;
  }
};

export default renderContent;
