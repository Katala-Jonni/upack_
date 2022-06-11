import { Order } from '@app/order/order.schema';

export interface OrdersResponseInterface {
  orders: Order[],
  ordersCount: number
}
