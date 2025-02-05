import { OrderProduct } from "./order-product";

export interface Order {
    id: number | null,
    dateCreated: Date,
    orderProducts: OrderProduct[],
    userId: number,
    orderState: OrderState
}

export enum OrderState {
    CONFIRFMED = "CONFIRMED",
    CANCELLED = "CANCELLED"
  }
  