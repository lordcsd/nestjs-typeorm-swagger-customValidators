import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from "class-validator";
import { ICustomSwaggerOptions } from "../dto/customValidatorOptions.dto";

const each = true;

export const notEmptyFn = (customKeys: string) =>
  IsNotEmpty({ message: `${customKeys}: Must not be empty` });

export const isStringFn = (customKeys: string, isArray = false) =>
  IsString({
    message: `${customKeys}: Must be a string`,
    ...(isArray && { each }),
  });

export const isEnumFn = (
  customKey: string,
  validEnum: object,
  isArray = false
) => {
  const message = `
  ${customKey}: Must be ${
    isArray ? "a list containing" : "either"
  } ${Object.values(validEnum).join(" and/or ")}`;

  return IsEnum(validEnum, {
    message,
    ...(isArray && { each: true }),
  });
};

export const isBooleanFn = (customKeys: any) =>
  IsBoolean({ message: `${customKeys}: Must be true or false` });

export const isNumberFn = (customKeys: any, isArray: any) =>
  IsNumber(
    {},
    {
      message: `${customKeys}: Must be a ${
        isArray ? "number array" : "number"
      }`,
      ...(isArray && { each }),
    }
  );

export const isUUIDFn = (customKey: string, isArray: boolean) =>
  IsUUID("all", {
    message: `${customKey}: Must be ${
      isArray ? "an array of valid UUIDs" : "a valid UUID"
    }`,
    ...(isArray && { each }),
  });

export const isArrayFn = (customKey: string) =>
  IsArray({ message: `${customKey}: Must be array` });

export const swaggerProp = (details: ICustomSwaggerOptions) => {
  const { description, validEnum, optional, isArray, type } = details;

  let defaultValue = details.defaultValue;

  if (typeof defaultValue == "string") {
    defaultValue = defaultValue.trim();
  }

  const types = {
    boolean: Boolean,
    string: String,
    number: Number,
    array: Array,
  };

  const options: ApiPropertyOptions = {
    description,
    ...(type && { type: types[type] }),
    ...(isArray && { isArray }),
    ...(validEnum && { enum: validEnum }),
    ...(defaultValue && { default: defaultValue }),
  };

  return optional ? ApiPropertyOptional(options) : ApiProperty(options);
};
