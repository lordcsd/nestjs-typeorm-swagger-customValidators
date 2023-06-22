import {
  IsOptional,
  registerDecorator,
  ValidationOptions,
} from "class-validator";
import { ICustomOnlyDateStringOptions } from "../dto/customValidatorOptions.dto";
import { notEmptyFn, swaggerProp } from "../utils/commonDecoratorFunctions";
import { Transform } from "class-transformer";
import { TransformDateStringToDateObject } from "../transformers/validatorTransformers";

function IsOnlyDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsOnlyDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: "Please provide only date like 2020-12-08",
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
          return (
            (typeof value === "string" && regex.test(value)) ||
            value instanceof Date
          );
        },
      },
    });
  };
}

export function CustomOnlyDateString(details: ICustomOnlyDateStringOptions) {
  const { isArray, optional, description, defaultValue } = details;

  const mySwaggerProp = swaggerProp({
    optional,
    description,
    defaultValue: defaultValue || "2013-02-23",
    type: "string",
    isArray,
  });

  return function (target: any, key: string) {
    optional ? IsOptional()(target, key) : notEmptyFn(key)(target, key);
    IsOnlyDate({ each: isArray })(target, key);
    Transform(TransformDateStringToDateObject)(target, key);
    mySwaggerProp(target, key);
  };
}
