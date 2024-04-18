import { IsOptional, ValidateIf } from "class-validator";
import { ICustomMediaValidationOptions } from "dto/customValidatorOptions.dto";
import { HasMimeType, IsFile, MaxFileSize } from "nestjs-form-data";
import { swaggerProp } from "utils/commonDecoratorFunctions";

export function CustomMediaValidator(details: ICustomMediaValidationOptions) {
  const { maxSize, mimetypes, isArray, optional, defaultValue, description } =
    details;

  const mySwaggerProp = swaggerProp({
    optional,
    description,
    defaultValue,
    isArray,
    format: "binary",
  });

  return function (target: any, key: string) {
    ValidateIf((obj, media) => obj[media])(target, key);
    if (optional) IsOptional()(target, key);
    IsFile({ ...(isArray && { each: true }) })(target, key);

    MaxFileSize(maxSize, { ...(isArray && { each: true }) })(target, key);

    HasMimeType(mimetypes, { ...(isArray && { each: true }) })(target, key);
    mySwaggerProp(target, key);
  };
}
