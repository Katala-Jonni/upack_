import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { PayTypeEnum } from '@app/common/enum/payType.enum';

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
          return !!PayTypeEnum[value];
        },
        defaultMessage(args: ValidationArguments) {
          return `$property может быть только [${PayTypeEnum.cash}, ${PayTypeEnum.card}]`;
        },
      },
    });
  };
}
