import { UnprocessableEntityException } from "@nestjs/common";
import { TransformFnParams } from "class-transformer";

export const TransformBooleanStringToBoolean = (params: TransformFnParams) => {
  const value = params.obj[params.key] || params.value;
  if (typeof value === "boolean") {
    return value;
  }
  if (value && typeof value == "string") {
    if(value.trim().toLocaleLowerCase() === "true") return true
    if(value.trim().toLocaleLowerCase() === "false") return false
  }
  return null;
};

export const TransformNumberStringToNumber = (params: TransformFnParams) => {
  const value = params.obj[params.key] || params.value
  if (Array.isArray(value)) {
    return value.map((_value) =>
      typeof _value == "string" ? Number(_value) : _value,
    );
  } else if (!Array.isArray(value) && typeof value === "string") {
    return Number(value);
  }
  return value;
};

export const SortStringArrayAlphabetically = (params: TransformFnParams) => {
  const value = params.obj[params.key] || params.value
  return value && Array.isArray(value)
    ? value.sort((a, b) => a.localeCompare(b))
    : value;
};
export const TransformStringToJSONArray = (params:TransformFnParams) => {
  const value = params.obj[params.key] || params.value
  if (!value) {
    throw new UnprocessableEntityException(`${params.key}: Must not be empty`);
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
      `${params.key}: Must be an array, JSON array or comma separated string`,
    );
  }
};

export const TransformSortStringArray = (params:TransformFnParams) => {
  const value = params.obj[params.key] || params.value
  return Array.isArray(value) && value.length
    ? value.sort((a, b) => a.localeCompare(b))
    : value;
};

export const TransformSingleItemToArray = (params:TransformFnParams) => {
  const value = params.obj[params.key] || params.value
  return Array.isArray(value) ? value : [value];
};

export const TransformDateStringToDateObject = (params:TransformFnParams) => {
  const value = params.obj[params.key] || params.value
  const date = new Date(value);
  if (typeof value === "string" && date) {
    return date;
  }
  return value;
};
