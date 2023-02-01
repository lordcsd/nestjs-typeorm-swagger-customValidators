import { Matches, MinLength } from 'class-validator';
import { ICustomPasswordValidatorOptions } from '../dto/customValidatorOptions.dto';
import { swaggerProp, isStringFn, notEmptyFn } from '../utils/commonDecoratorFunctions';


export function CustomPasswordDecorator(details: ICustomPasswordValidatorOptions) {
  const lengthFn = (customKey) =>
    MinLength(8, {
      message: `${customKey}: must have at least 8 characters`,
    });

  const lowerCaseFn = (customKey) =>
    Matches(/(?=.*[a-z])/, {
      message: `${customKey}: must contain at least one lowercase alphabet`,
    });

  const upperCaseFn = (customKey) =>
    Matches(/(?=.*[A-Z])/, {
      message: `${customKey}: must contain at least one uppercase alphabet`,
    });

  const oneNumberFn = (customKey) =>
    Matches(/(?=.*[0-9])/, {
      message: `${customKey}: must contain at least one number`,
    });

  const oneSpecialCharacterFn = (customKey) =>
    Matches(/\W|_/, {
      message: `${customKey}: must contain at least one special character`,
    });

  const { description, defaultValue } = details;

  const _swaggerProp = swaggerProp({
    description,
    defaultValue,
    type: 'string',
  });
  return function (target: any, key: string) {
    lengthFn(key)(target, key);
    lowerCaseFn(key)(target, key);
    upperCaseFn(key)(target, key);
    oneNumberFn(key)(target, key);
    oneSpecialCharacterFn(key)(target, key);
    isStringFn(key)(target, key);
    notEmptyFn(key)(target, key);
    _swaggerProp(target, key);
  };
}
