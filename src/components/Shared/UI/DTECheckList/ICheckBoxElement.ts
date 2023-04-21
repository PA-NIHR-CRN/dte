import react from "react";

export default interface ICheckBoxElement {
  value: string;
  text: string | react.ReactNode;
  checked: boolean;
  disabled: boolean;
  conditional?: string | react.ReactNode;
}
