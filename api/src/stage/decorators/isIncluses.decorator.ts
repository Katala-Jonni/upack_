import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { StageEnum } from '@app/common/enum/stage.enum';

export function IsIncludes(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Record<string, any>, propertyName: string) {
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
          return !!StageEnum[value.toLowerCase()];
        },
        defaultMessage(args: ValidationArguments) {
          return `$property может быть только [${StageEnum['новый']}, ${StageEnum['прочитано']}, ${StageEnum['готовится']}, ${StageEnum['отменено']}, ${StageEnum['закрыто']}]`;
        },
      },
    });
  };
}
