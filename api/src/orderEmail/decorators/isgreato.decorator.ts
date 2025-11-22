import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsGreater(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return function(object: Record<string, any>, propertyName: string) {
    let sum = null;
    registerDecorator({
      name: 'IsGreater',
      target: object.constructor,
      propertyName: propertyName,
      constraints: property,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName, returnMoney, payType] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          const money = (args.object as any)[returnMoney];
          const type = (args.object as any)[payType];
          sum = relatedValue;
          if (type === 'cash' && money) {
            return value > relatedValue;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `$property должно быть больше ${sum}`;
        },
      },
    });
  };
}
