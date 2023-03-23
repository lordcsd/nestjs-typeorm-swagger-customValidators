class IDefaultValdationOptions {
  optional? = false;
  defaultValue?: any;
  description? = '';
}

class IBaseValidationOptions extends IDefaultValdationOptions {
  isArray? = false;
}

export class ICustomOnlyDateStringOptions extends IBaseValidationOptions {}

export class ICustomSwaggerOptions extends IBaseValidationOptions {
  type?: 'boolean' | 'number' | 'string' | 'array';
  validEnum?: Object;
}

export class ICustomStringOptions extends IBaseValidationOptions {
  isUUID? = false;
}

export class ICustomTimeValidatorOptions extends IBaseValidationOptions {}

export class ICustomPasswordValidatorOptions extends IDefaultValdationOptions {}

export class ICustomNumberValidationOptions extends IBaseValidationOptions {
  min?: number;
  max?: number;
}

export class ICustomEnumJSONArrayValidatorOptions extends IBaseValidationOptions {
  validEnum?: Object;
}

export class ICustomEnumValidatorOptions extends ICustomEnumJSONArrayValidatorOptions {
  isArray?: boolean = false;
}

export class ICustomBooleanValidatorOptions extends IDefaultValdationOptions {}
