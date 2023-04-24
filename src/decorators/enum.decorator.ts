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
    defaultValue,
    isArray,
  });

  const throwError = (target: any) => {
    throw new Error(
      `Enum with keys ${Object.keys(
        validEnum
      )} got invalid default value ${defaultValue} in ${
        target.constructor.name
      }`
    );
  };

  return function (target: any, key: string) {
    if (!validEnum) {
      console.log(target);
      throw new Error(
        `Please provide a validEnum for ${target.constructor.name}}.${key}`
      );
    }

    if (
      defaultValue &&
      !isArray &&
      !Object.values(validEnum).includes(defaultValue)
    ) {
      throwError(target);
    }

    if (defaultValue && isArray && Array.isArray(defaultValue)) {
      const allDefaultsValues = Object.values(defaultValue);
      const invalidDefault = defaultValue.filter(
        (value) => !allDefaultsValues.includes(value)
      );

      if (invalidDefault.length) throwError(target);
    }
    if (optional) IsOptional()(target, key);
    notEmptyFn(key)(target, key);
    isEnumFn(key, validEnum as object, isArray)(target, key);
    mySwaggerProp(target, key);
  };
}
