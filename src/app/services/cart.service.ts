import { Injectable } from '@angular/core';
import { ItemCart } from '../interfaces/item-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Map<number, ItemCart> = new Map<number, ItemCart>();
  itemList: ItemCart[] = [];

  constructor() { }

  addItemCart(itemCart: ItemCart) {
    if (this.items.has(itemCart.productId)) {
      // Si el producto ya está en el carrito, sumamos la cantidad
      let existingItem = this.items.get(itemCart.productId)!;
      existingItem.quantity += itemCart.quantity;
    } else {
      // Si el producto no está en el carrito, lo agregamos
      this.items.set(itemCart.productId, itemCart);
    }
  }

  deleteItemCart(productId: number) {
    this.items.delete(productId);
    this.items.forEach(
      (valor, clave) => {
        console.log('This is the key and value: ' + clave, valor)
      }
    );
  }

  clearCart() {
    this.items.clear(); 
    this.itemList = []; 
  }

  totalCart() {
    let totalCart: number = 0;
    this.items.forEach(
      (itemValue) => {
        totalCart += itemValue.price * itemValue.quantity;
      }
    );
    return totalCart;
  }

  getListFromMap() {
    this.itemList.splice(0, this.itemList.length);
    this.items.forEach(
      (item) => {
        this.itemList.push(item)
      }
    )
    return this.itemList;

  }
}
