import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { TransformBooleanStringToBoolean } from "../transformers/validatorTransformers";
import { ICustomBooleanValidatorOptions } from "../dto/customValidatorOptions.dto";
import {
  isBooleanFn,
  notEmptyFn,
  swaggerProp,
} from "../utils/commonDecoratorFunctions";

export function CustomBooleanValidator(
  details: ICustomBooleanValidatorOptions
) {
  const { optional, description, defaultValue } = details;

  const mySwaggerProp = swaggerProp({
    optional,
    description,
    defaultValue: defaultValue || false,
    type: "boolean",
  });

  return function (target: any, key: string) {
    optional ? IsOptional()(target, key) : notEmptyFn(key)(target, key);
    Transform(TransformBooleanStringToBoolean)(target, key);
    notEmptyFn(key)(target, key);
    isBooleanFn(key)(target, key);
    mySwaggerProp(target, key);
  };
}
