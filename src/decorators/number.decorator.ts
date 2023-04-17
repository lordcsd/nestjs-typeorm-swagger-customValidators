import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';
import {
  TransformNumberStringToNumber,
  TransformSingleItemToArray,
} from '../transformers/validatorTransformers';
import {
  swaggerProp,
  notEmptyFn,
  isArrayFn,
  isNumberFn,
} from '../utils/commonDecoratorFunctions';
import { ICustomNumberValidationOptions } from '../dto/customValidatorOptions.dto';

function MinNumberFN(min: number, key: string, isArray: boolean = false) {
  return Min(min, {
    ...(isArray && {
      message: `${key}: Must be a list of numbers greater or equals ${min}`,
    }),
    ...(!isArray && {
      message: `${key}: Must be greater or equals ${min}`,
    }),
  });
}

function MaxNumberFN(max: number, key: string, isArray: boolean = false) {
  return Max(max, {
    ...(isArray && {
      message: `${key}: Must be a list of numbers less or equals ${max}`,
    }),
    ...(!isArray && {
      message: `${key}: Must be less or equals ${max}`,
    }),
  });
}

export function CustomNumberValidator(details: ICustomNumberValidationOptions) {
  const { optional, defaultValue, description, isArray, min, max } = details;

  const mySwaggerProp = swaggerProp({
    optional,
    description,
    defaultValue: `${
      optional ? 'optional number, example: ' : ''
    }${defaultValue}`,
    type: 'number',
    isArray,
  });

  return function (target: any, key: string) {
    optional ? IsOptional()(target, key) : notEmptyFn(key)(target, key);
    min && MinNumberFN(min, key, isArray)(target, key);
    max && MaxNumberFN(max, key, isArray)(target, key);
    Transform(TransformNumberStringToNumber)(target, key);
    isArray && Transform(TransformSingleItemToArray)(target, key);
    isArray && isArrayFn(key)(target, key);
    isNumberFn(key, isArray)(target, key);
    notEmptyFn(key)(target, key);
    mySwaggerProp(target, key);
  };
}
