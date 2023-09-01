import { useState, ReactElement, forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Header = styled.button`
  text-decoration: underline;
  text-underline-offset: 2.5px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: ${(props) => props.theme.NIHR.LinkBlue};
  display: inline-flex;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  border-radius: 2px;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
    background-color: transparent;
  }

  &:focus-visible {
    outline: none;
  }

  &:focus,
  &:focus-visible {
    background-color: ${(props) => props.theme.NIHR.Yellow};
    box-shadow: 0 -2px ${(props) => props.theme.NIHR.Yellow}, 0 4px #0b0c0c;
    border-radius: 0;
    color: black;
    text-decoration: none;
  }
`;

const Content = styled.div`
  min-width: 200px;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px ${(props) => props.theme.NIHR.LightGrey};
  background-color: ${(props) => props.theme.NIHR.PrimaryWhite};
  position: absolute;
  top: 35px;
  z-index: 100;
`;

const DropdownChild = styled.div`
  color: ${(props) => props.theme.NIHR.Blue};
  line-height: 1.5;
  white-space: nowrap;
  &:not(:first-child) {
    margin-top: 15px;
  }
  &:not(:last-child) {
    border-bottom: solid 1px ${(props) => props.theme.NIHR.LightGrey};
    padding-bottom: 15px;
  }
  svg {
    vertical-align: text-bottom;
  }
`;

interface DTEDropdownProps {
  children?:
    | ReactElement<typeof DropdownChild>[]
    | ReactElement<typeof DropdownChild>;
  text?: string;
  description?: string;
}

const DTEDropdown = forwardRef((props: DTEDropdownProps, ref) => {
  const { children, text, description } = props;
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    toggle: () => setIsOpen((oldIsOpen) => !oldIsOpen),
  }));

  return (
    <Container>
      <Header
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label={description}
      >
        {text || "Actions"}{" "}
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Header>
      {isOpen && <Content>{children}</Content>}
    </Container>
  );
});

export default DTEDropdown;
export { DropdownChild as DTEDropdownItem };
