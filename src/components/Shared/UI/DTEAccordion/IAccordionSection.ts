import { ReactNode } from "react";

export interface IAccordionContentElement {
  text?: string;
  child?: ReactNode;
}

export interface IAccordionSection {
  isDefault: boolean;
  title: string;
  contentElements: IAccordionContentElement[];
}
