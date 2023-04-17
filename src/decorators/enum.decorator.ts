import { IsOptional } from "class-validator";
import { ICustomEnumValidatorOptions } from "../dto/customValidatorOptions.dto";
import {
  swaggerProp,
  notEmptyFn,
  isEnumFn,
} from "../utils/commonDecoratorFunctions";

export function CustomEnumValidator(details: ICustomEnumValidatorOptions) {
  const { validEnum, optional, defaultValue, description, isArray } = details;

  const mySwaggerProp = swaggerProp({
    validEnum,
    optional,
    description,
    defaultValue: defaultValue || defaultValue[Object.values(validEnum)[0]],
    isArray,
  });

  return function (target: any, key: string) {
    if (!validEnum) {
      throw new Error(`Please provide a validEnum for ${target}.${key}`);
    }

    if (!validEnum[defaultValue]) {
      throw new Error(
        `Please provide valid default value for  ${target}.${key}`
      );
    }

    optional ? IsOptional()(target, key) : notEmptyFn(key)(target, key);
    notEmptyFn(key)(target, key);
    isEnumFn(key, validEnum as object, isArray)(target, key);
    mySwaggerProp(target, key);
  };
}
