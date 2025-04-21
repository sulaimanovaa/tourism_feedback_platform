import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsUsernameValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUsernameValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') return false;

          const regex = /^[a-z0-9._]+$/;
          const noEdgeDotsUnderscores = /^(?!.*[._]{2,})(?![._])[a-z0-9._]+(?<![._])$/;

          return regex.test(value) && noEdgeDotsUnderscores.test(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return 'Никнейм может содержать только маленькие латинские буквы, цифры, точки и нижние подчеркивания.';
        },
      },
    });
  };
}