import { UnprocessableEntityException } from "@nestjs/common";

export const TransformBooleanStringToBoolean = ({ value }) => {
  if (typeof value === "boolean") {
    return value;
  }
  if (value && typeof value == "string") {
    if (value.trim().toLocaleLowerCase() === "true") {
      return true;
    } else if (value.trim().toLocaleLowerCase() === "false") {
      return false;
    }
  }
  return "";
};

export const TransformNumberStringToNumber = ({ value }) => {
  if (Array.isArray(value)) {
    return value.map((_value) =>
      typeof _value == "string" ? Number(_value) : _value
    );
  } else if (!Array.isArray(value) && typeof value === "string") {
    return Number(value);
  }
  return value;
};

export const SortStringArrayAlphabetically = ({ value }) => {
  return value && Array.isArray(value)
    ? value.sort((a, b) => a.localeCompare(b))
    : value;
};
export const TransformStringToJSONArray = ({ value, key }) => {
  if (!value) {
    throw new UnprocessableEntityException(`${key}: Must not be empty`);
  }
  try {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      const splitAsString = value.split(",");

      const isJSONArrayString = value.constructor === [].constructor;

      if (
        Array.isArray(splitAsString) &&
        splitAsString.length > 0 &&
        !isJSONArrayString
      ) {
        return splitAsString;
      }

      if (isJSONArrayString) {
        return JSON.parse(value);
      }
    }

    throw new Error("validation failed");
  } catch (err) {
    throw new UnprocessableEntityException(
      `${key}: Must be an array, JSON array or comma separated string`
    );
  }
};

export const TransformSortStringArray = ({ value }) => {
  console.log(
    "value from transformSort: ",
    value,
    " \n returns:",
    Array.isArray(value) && value.length
      ? value.sort((a, b) => a.localeCompare(b))
      : value
  );
  return Array.isArray(value) && value.length
    ? value.sort((a, b) => a.localeCompare(b))
    : value;
};

export const TransformSingleItemToArray = ({ value }) => {
  console.log({ value });
  return Array.isArray(value) ? value : [value];
};

export const TransformDateStringToDateObject = ({ value }) => {
  const date = new Date(value);
  if (typeof value === "string" && date) {
    return date;
  }
  return value;
};
