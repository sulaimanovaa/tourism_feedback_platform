import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordComplexityConstraint implements ValidatorConstraintInterface {
  validate(password: string, _args: ValidationArguments): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
    return passwordRegex.test(password) && !/\s/.test(password);
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры, и не должен содержать пробелы';
  }
}

export function IsPasswordComplex(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordComplexityConstraint,
    });
  };
}
