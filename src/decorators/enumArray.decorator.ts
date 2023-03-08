import { Transform } from 'class-transformer';
import { ArrayMinSize, IsOptional } from 'class-validator';
import { ICustomEnumJSONArrayValidatorOptions } from '../dto/customValidatorOptions.dto';
import {
  TransformStringToJSONArray,
  TransformSingleItemToArray,
  TransformSortStringArray,
} from '../transformers/validatorTransformers';
import {
  swaggerProp,
  notEmptyFn,
  isArrayFn,
  isEnumFn,
} from '../utils/commonDecoratorFunctions';

export function CustomEnumJSONArrayValidator(
  details: ICustomEnumJSONArrayValidatorOptions
) {
  const { validEnum, optional, defaultValue, description } = details;

  const mySwaggerProp = swaggerProp({
    optional,
    description,
    defaultValue: `${
      optional ? 'optional enum array, example: ' : ''
    } ${defaultValue}`,
    type: 'array',
  });

  return function (target: any, key: string) {
    optional ? IsOptional()(target, key) : notEmptyFn(key)(target, key);
    Transform(TransformStringToJSONArray)(target, key);
    Transform(TransformSingleItemToArray)(target, key);
    ArrayMinSize(1)(target, key);
    isArrayFn(key)(target, key);
    isEnumFn(key, validEnum as any, true)(target, key);
    notEmptyFn(key)(target, key);
    Transform(TransformSortStringArray)(target, key);
    mySwaggerProp(target, key);
  };
}
