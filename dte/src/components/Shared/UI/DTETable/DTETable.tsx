import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Table } from "nhsuk-react-components";
import styled from "styled-components";

interface DTETableProps {
  columns: { name: string; width?: number }[];
  rows: { [id: string]: ReactNode }[];
  caption?: string;
  responsive?: boolean;
}

const StyledTable = styled(Table)`
  table-layout: fixed;
`;

const StyledHead = styled(Table.Head)``;

const StyledBody = styled(Table.Body)``;

const StyledRow = styled(Table.Row)`
  &:hover {
    background-color: inherit;
  }
`;

const StyledCell = styled(Table.Cell)`
  border-bottom-color: ${(props) => props.theme.NIHR.Grey};
  color: ${(props) => props.theme.NIHR.Grey};
`;

const StyledCol = styled.col<{ colWidth: string }>`
  width: ${(props) => props.colWidth};
`;

const DTETable = (props: DTETableProps) => {
  const { columns, rows, caption, responsive } = props;

  const totalWidth =
    columns.reduce((prev, current) => {
      return {
        width: (prev?.width || 1) + (current?.width || 1),
        name: "",
      };
    })?.width || columns.length;

  return (
    <StyledTable caption={caption} responsive={responsive}>
      <colgroup>
        {columns.map((column) => (
          <StyledCol
            key={uuidv4()}
            colWidth={
              column?.width
                ? `${(column.width / totalWidth) * 100}%`
                : `${(1 / totalWidth) * 100}%`
            }
          />
        ))}
      </colgroup>
      <StyledHead>
        <StyledRow key={uuidv4()}>
          {columns.map((column) => (
            <StyledCell key={uuidv4()}>{column.name}</StyledCell>
          ))}
        </StyledRow>
      </StyledHead>
      <StyledBody>
        {rows.map((row) => (
          <StyledRow key={uuidv4()}>
            {columns.map((column) => (
              <StyledCell key={uuidv4()}>{row[column.name]}</StyledCell>
            ))}
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
};

export default DTETable;
