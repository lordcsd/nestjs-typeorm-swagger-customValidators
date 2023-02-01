import { IsOptional, Matches } from 'class-validator';
import { swaggerProp, notEmptyFn } from '../utils/commonDecoratorFunctions';
import {  ICustomTimeValidatorOptions } from '../dto/customValidatorOptions.dto';


export function CustomTimeValidator(details: ICustomTimeValidatorOptions) {
  const { optional, defaultValue, isArray, description } = details;

  const mySwaggerProp = swaggerProp({
    optional,
    description,
    defaultValue,
    type: isArray ? 'array' : 'string',
  });
  return function (target: any, key: string) {
    optional ? IsOptional()(target, key) : notEmptyFn(key)(target, key);
    Matches(new RegExp('(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]'), {
      message: `${key}: Must be a valid 24h time`,
      ...isArray && {each: true},
    })(target, key);
    mySwaggerProp(target, key);
  };
}
