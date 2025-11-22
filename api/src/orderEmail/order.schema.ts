import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as moment from 'moment';
import * as randomatic from 'randomatic';
import { Product } from "@app/product/product.schema";
// import moment from "moment";
// import { format } from "date-fns";
// import { ru } from 'date-fns/locale';

// organization: '',
//     phone: '',
//     email: '',
//     address: '',
//     comment: '',
//     date: '',
//     time: '',
//     surname: '',
//     name: ''

moment.locale('ru');

// const getDeliveryDateDefault = today => {
//     const dateCount = today.getDate();
//     today.setDate(dateCount + 1);
//     return format(today, "dd MMMM", {});
// };

@Schema()
export class Order {
    @Prop({
        type: Date,
        default: new Date()
    })
    createdAt: Date;
    @Prop({
        type: String,
        default: function () {
            return `${moment().format( 'DDMM')}-${randomatic('0000')}`;
        }
    })
    orderNumber: string;
    @Prop({
        type: Date,
        required: true,
        default: moment().format( 'DDMM')
    })
    date: Date;
    @Prop({
        type: String,
        required: true,
        default: "15:00-18:00"
    })
    time: string;
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    address: string;
    @Prop({
        type: String,
        trim: true,
        lowercase: true
    })
    organization: string;
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    name: string;
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    surname: string;
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    phone: string;
    @Prop({
        type: String,
        required: true,
        trim: true
    })
    email: string;
    @Prop({
        type: String,
        trim: true
    })
    comment: string;
    @Prop({
        type: [
            {
                count: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true},
                name: { type: String, required: true, trim: true},
                imgUrl: { type: String, required: true},
                id: { type: String, required: true},
                qty: { type: Number, required: true}
            },
        ],
        default: [],
    })
    cart: {
        count: number,
        price: number,
        name: string,
        imgUrl: string,
        id: string,
        qty: number
    }[];
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
