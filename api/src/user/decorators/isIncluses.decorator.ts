import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { RolesEnum } from '@app/common/enum/roles.emum';

export function IsIncludes(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsIncludes',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (Array.isArray(value)) {
            return value.every((prop: string): boolean => RolesEnum[prop]);
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          return `$property может быть только [${RolesEnum.user}, ${RolesEnum.admin}]`;
        },
      },
    });
  };
}
