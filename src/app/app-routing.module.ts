import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthComponent } from './page/auth/auth.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: AuthComponent }, // Authentication route
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // Protect the main layout// will true

    
    children: [
      { path: '', redirectTo: 'category/1', pathMatch: 'full' }, // Redirect root route to Electronics
      { path: 'category/:categoryId', component: ProductPageComponent }, // Dynamic category route
      { path: 'checkout', component: CheckoutComponent },
      { path: 'cart', component: CartComponent },
    ],
  },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/auth' }, // Catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],// just pass a array of route which will give component to renderd
  exports: [RouterModule],
})
export class AppRoutingModule { }
