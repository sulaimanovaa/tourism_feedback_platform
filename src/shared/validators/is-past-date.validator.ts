import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPastDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!(value instanceof Date)) return false;
          const now = new Date();
          return value.getTime() <= now.getTime();
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} не может быть в будущем`;
        },
      },
    });
  };
}
