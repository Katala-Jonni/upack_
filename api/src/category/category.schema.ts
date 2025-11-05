import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

const getFistUppercase = (v: string): string => {
    const otherText = v.slice(1, v.length);
    return `${v[0].toUpperCase()}${otherText}`;
};

// @Schema()
// export class Category {
//   @Prop({
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       get: getFistUppercase,
//       set: (v) => v.toLowerCase(),
//     },
//   )
//   title: string;
//   @Prop({
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//   )
//   slug: string;
//   @Prop({
//     default: null,
//   })
//   products: [
//     {
//       productId: {
//         type: MongooseSchema.Types.ObjectId,
//         ref: 'Product',
//       }
//     }
//   ];
//   @Prop({
//     type: Boolean,
//     default: true,
//   })
//   active: boolean;
//   @Prop({
//     type: String,
//     default: null,
//   })
//   image: string;
//   @Prop({ default: new Date() })
//   createdAt: Date;
// }

// id: item.Ref_Key,
//     isFolder: item.IsFolder,
//     deletionMark: item.DeletionMark,
//     name: item.Description,
//     icon: null,
//     image: null,
//     slug: getSlug(item.Description),
//     parent_key: item.Parent_Key,
//     description: 'Upto 60% off',

@Schema()
export class Category {
    @Prop({
            type: String,
            required: true,
            trim: true
        }
    )
    title: string;
    @Prop({
        type: String
    })
    refKey: string;
    @Prop({
            type: String,
            required: true,
            trim: true
        }
    )
    parent: string;
    @Prop({
            type: String,
            required: true,
            trim: true
        }
    )
    slug: string;
    @Prop({ default: new Date() })
    createdAt: Date;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
