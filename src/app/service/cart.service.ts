import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',//Makes this class available for dependency injection throughout the application
})
export class CartService {
  private cart: any[] = [];
  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.cart);//wrap and store current data and update the data on cart change

  // Observable for cart items
  getCartItems(): Observable<any[]> {
    return this.cartSubject.asObservable();//Allows components to subscribe and get real-time updates when the cart changes
  }

  // Add product to the cart
  addToCart(product: any): void {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if the product exists
    } else {
      this.cart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }

    this.cartSubject.next(this.cart); // notify subscribers of the updated cart state.
  }

  // Get total items count
  getTotalItemsCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  removeItem(productId: string): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.cartSubject.next(this.cart);
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);//update user the cart is empty....
  }

}
