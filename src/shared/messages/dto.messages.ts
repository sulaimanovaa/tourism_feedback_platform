import { ValidationArguments, ValidationOptions } from 'class-validator';

export enum DtoMessagesKeys {
  isArray = 'isArray',
  isDateValid = 'isDateValid',
  isEnum = 'isEnum',
  isInt = 'isInt',
  isNotEmpty = 'isNotEmpty',
  isPositive = 'isPositive',
  isString = 'isString',
  maxLength = 'maxLength',
  minLength = 'minLength',
  maxLengthArray = 'maxLengthArray',
  isPasswordValid = 'isPasswordValid',
}

export const DtoMessages: Record<DtoMessagesKeys, ValidationOptions['message']> = {
  isArray: (args: ValidationArguments) => `Параметр ${args.property} не является списком значений`,
  isDateValid: (args: ValidationArguments) =>
    `Параметр ${args.property} должен быть валидной датой указано`,
  isEnum: (args: ValidationArguments) => `Параметр ${args.property} содержит недопустимое значение`,
  isNotEmpty: (args: ValidationArguments) =>
    `Параметр ${args.property} не может содержать пустое значение`,
  isInt: (args: ValidationArguments) => `Параметр ${args.property} не является числом`,
  isString: (args: ValidationArguments) => `Параметр ${args.property} не является строкой`,
  isPositive: (args: ValidationArguments) =>
    `Параметр ${args.property} не является положительным числом`,
  maxLength: (args: ValidationArguments) =>
    `Параметр ${args.property} должен содержать менее ${args.constraints} символов`,
  minLength: (args: ValidationArguments) =>
    `Параметр ${args.property} должен содержать более ${args.constraints} символов`,
  maxLengthArray: (args: ValidationArguments) =>
    `Параметр ${args.property} должен содержать менее ${args.constraints} элементов`,
  isPasswordValid: (args: ValidationArguments) => `Параметр ${args.property} слишком простой`,
};
