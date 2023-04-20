import { ReactNode } from "react";

export default interface IFormBaseProps {
  hideHeader?: boolean;
  instructionText?: ReactNode;
  showCancelButton?: boolean;
  hideInfo?: boolean;
  nextButtonText?: string;
  onCancel?: () => void;
}
