import { OrderProduct } from "./order-product";

export interface Order {
    id: number,
    dateCreated: Date,
    orderProducts: OrderProduct[],
    userId: number,
    orderState: OrderState
}

export enum OrderState {
    CONFIRMADA = "CONFIRMADA",
    CANCELADA = "CANCELADA"
  }
  