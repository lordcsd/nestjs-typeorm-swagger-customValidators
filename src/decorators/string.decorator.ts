import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";
import { ICustomStringOptions } from "../dto/customValidatorOptions.dto";
import { TransformSingleItemToArray } from "../transformers/validatorTransformers";
import {
  swaggerProp,
  notEmptyFn,
  isUUIDFn,
  isStringFn,
} from "../utils/commonDecoratorFunctions";

export function CustomStringValidator(details: ICustomStringOptions) {
  const { description, isUUID, defaultValue, optional, isArray } = details;

  const mySwaggerProp = swaggerProp({
    description,
    defaultValue,
    optional,
    isArray,
  });

  return function (target: any, key: string) {
    optional ? IsOptional()(target, key) : notEmptyFn(key)(target, key);
    isArray && Transform(TransformSingleItemToArray)(target, key);
    mySwaggerProp(target, key);
    isUUID
      ? isUUIDFn(key, isArray)(target, key)
      : isStringFn(key, isArray)(target, key);
  };
}
