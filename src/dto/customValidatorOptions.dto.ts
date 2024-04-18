class IDefaultValdationOptions {
  optional? = false;
  defaultValue?: any;
  description? = "";
}

class IBaseValidationOptions extends IDefaultValdationOptions {
  isArray? = false;
}

export class ICustomOnlyDateStringOptions extends IBaseValidationOptions {}

export class ICustomSwaggerOptions extends IBaseValidationOptions {
  type?: "boolean" | "number" | "string" | "array";
  format?: 'binary'
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

export enum MimeTypeEnum {
  JPG = "image/jpg",
  JPEG = "image/jpeg",
  PNG = "image/png",
  JFIF = "image/jfif",
  GIF = "image/gif",
  MP4 = "video/mp4",
  "3GP" = "video/3gpp",
  WEBM = "video/webm",
  PDF = "application/pdf",
  MS_DOC = "application/x-cfb",
  MS_WORD = "application/msword", //.DOC
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
export class ICustomMediaValidationOptions extends IBaseValidationOptions {
  maxSize?: number = 1e10;
  mimetypes?: MimeTypeEnum[] = [];
  isArray?: boolean = false;
}
