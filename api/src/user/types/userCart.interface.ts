import * as mongoose from 'mongoose';

export interface ICartUserSchema {
  items?: [
    {
      count: number;
      productId: mongoose.Schema.Types.ObjectId;
    },
  ];
}
