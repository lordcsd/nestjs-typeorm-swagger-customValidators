import { IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";
import { notEmptyFn, swaggerProp } from "../utils/commonDecoratorFunctions";
import { ICustomMediaValidationOptions } from "../dto/customValidatorOptions.dto";
import { UnprocessableEntityException } from "@nestjs/common";

export function CustomMediaValidator(details: ICustomMediaValidationOptions) {
  const {
    maxSizeInByte,
    mimetypes,
    isArray,
    optional,
    defaultValue,
    description,
  } = details;

  const mySwaggerProp = swaggerProp({
    optional,
    description,
    defaultValue,
    isArray,
    format: "binary",
    type: "media",
  });

  return function (target: any, key: string) {
    if (optional) {
      IsOptional()(target, key);
    }

    if (mimetypes.length == 0) {
      throw new UnprocessableEntityException(
        `${key}: Please provide at least one mimetype`
      );
    }

    IsFile({
      ...(isArray && { each: true }),
      message: `${key}: Must be a file`,
    })(target, key);

    notEmptyFn(key, isArray)(target, key);

    MaxFileSize(maxSizeInByte, {
      ...(isArray && { each: true }),
      message: `${key}: cannot exceed ${(maxSizeInByte) / 1e6} megabytes`,
    })(target, key);

    HasMimeType(mimetypes, {
      ...(isArray && { each: true }),
      message: `${key}: must have mimetype ${mimetypes.join(" or ")}`,
    })(target, key);
    mySwaggerProp(target, key);
  };
}
