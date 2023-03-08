import { IsOptional } from 'class-validator';
import { ICustomEnumValidatorOptions } from '../dto/customValidatorOptions.dto';
import {
  swaggerProp,
  notEmptyFn,
  isEnumFn,
} from '../utils/commonDecoratorFunctions';

export function CustomEnumValidator(details: ICustomEnumValidatorOptions) {
  const { validEnum, optional, defaultValue, description, isArray } = details;

  const mySwaggerProp = swaggerProp({
    validEnum,
    optional,
    description,
    defaultValue: `${
      optional ? 'optional enum, example:' : ''
    } ${defaultValue}`,
    isArray,
  });

  return function (target: any, key: string) {
    optional ? IsOptional()(target, key) : notEmptyFn(key)(target, key);
    notEmptyFn(key)(target, key);
    isEnumFn(key, validEnum as object, isArray)(target, key);
    mySwaggerProp(target, key);
  };
}
