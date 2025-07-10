export type AnswerTypes =
  | "text"
  | "textarea"
  | "email"
  | "number"
  | "url"
  | "tel"
  | "date"
  | "file"
  | "checkbox"
  | "radio"
  | "dropdown";

export type DataType = {
  uuid: string;
  name: string;
  label: string;
  type: AnswerTypes;
  required: boolean;
  placeholder?: string;
  description?: string;
  options?: OptionType[];
};

export type OptionType = {
  uuid: string;
  value: string;
  label: string;
};

export const options: AnswerTypes[] = [
  "text",
  "textarea",
  "email",
  "number",
  "checkbox",
  "radio",
  "dropdown",
  "url",
  "tel",
  "file",
  "date",
];
