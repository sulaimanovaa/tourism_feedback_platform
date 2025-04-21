import { ValidationArguments, ValidationOptions } from 'class-validator';

export enum DtoMessagesKeys {
  isDateValid = 'isDateValid',
  isPositive = 'isPositive',
  maxLength = 'maxLength',
  minLength = 'minLength',
  maxLengthArray = 'maxLengthArray',
  isPasswordValid = 'isPasswordValid',
  isUsernameValid = 'isUsernameValid'
}

export const DtoMessages: Record<DtoMessagesKeys, ValidationOptions['message']> = {
  isDateValid: (args: ValidationArguments) =>
    `Параметр ${args.property} должен быть валидной датой указано`,
  isPositive: (args: ValidationArguments) =>
    `Параметр ${args.property} не является положительным числом`,
  maxLength: (args: ValidationArguments) =>
    `Параметр ${args.property} должен содержать менее ${args.constraints} символов`,
  minLength: (args: ValidationArguments) =>
    `Параметр ${args.property} должен содержать более ${args.constraints} символов`,
  maxLengthArray: (args: ValidationArguments) =>
    `Параметр ${args.property} должен содержать менее ${args.constraints} элементов`,
  isPasswordValid: (args: ValidationArguments) =>
    `Параметр ${args.property} слишком простой. Он должен содержать минимум 8 символов (заглавные, строчные буквы, цифры)`,
  isUsernameValid: (args: ValidationArguments) =>
    `Параметр ${args.property} может содержать только маленькие латинские буквы, цифры, точки и нижние подчеркивания.`,
};
