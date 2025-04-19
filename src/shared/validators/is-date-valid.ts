import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export const IsDateValid = (validationOptions?: ValidationOptions): PropertyDecorator => {
  const decorator: PropertyDecorator = (object, propertyName): void => {
    registerDecorator({
      name: 'IsDateValid',
      target: object.constructor,
      propertyName: propertyName.toString(),
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (value instanceof Date) {
            const timestamp = value.getTime();
            const isValidDate = !Number.isNaN(timestamp);
            return isValidDate;
          }
          return false;
        },
        defaultMessage: (args: ValidationArguments) => `Дата ${args.property} невалидная`,
      },
    });
  };
  return decorator;
};
