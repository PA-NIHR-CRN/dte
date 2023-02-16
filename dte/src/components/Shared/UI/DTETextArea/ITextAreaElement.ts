export default interface IInputElement {
  id: string;
  name: string;
  label: string;
  required: boolean;
  error?: string;
  hint?: string;
  value?: string;
}
