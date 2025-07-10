import { DataType } from "./types/formdata";

export function CapitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const findDuplicateNames = (data: DataType[]) => {
  return data
    .map((item, i) => {
      return data.filter(
        (otherItem, j) => i !== j && otherItem.name === item.name
      ).length > 0
        ? item.name
        : null;
    })
    .filter((name) => name !== null);
};

export const correctText = (text: string) => {
  return text.replace(/ /g, "_".toLowerCase());
};
