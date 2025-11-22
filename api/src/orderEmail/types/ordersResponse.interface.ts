import { Order } from "@app/orderEmail/order.schema";

export interface OrdersResponseInterface {
  orders: Order[],
  ordersCount: number
}
