import { Routes } from '@angular/router';
import { LandingPageComponent }
  from './features/home/pages/landing-page/landing-page.component';
import { ProductsPageComponent } from './features/product/pages/products-page/products-page.component';
import { ProductDetailPageComponent } from './features/product/pages/product-detail-page/product-detail-page.component';
import { CheckoutPageComponent } from './features/checkout/pages/checkout-page/checkout-page.component';
import { CheckoutSummaryPageComponent } from './features/checkout/pages/checkout-summary-page/checkout-summary-page.component';
import { CheckoutPaymentPageComponent } from './features/checkout/pages/checkout-payment-page/checkout-payment-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { MessageOrderPageComponent } from './features/checkout/pages/message-order/message-order-page.component';
import { AdminPageComponent } from './features/admin/pages/admin-page/admin-page.component';
import { OrderManagComponent } from './features/admin/components/order-manag/order-manag.component';
import { ProductManagComponent } from './features/admin/components/product-manag/product-manag.component';
import { CreateFormComponent } from './features/admin/components/create-form/create-form.component';
import { UpdateFormComponent } from './features/admin/components/update-form/update-form.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { guestGuard } from './core/guards/guest.guard';
import { OrderDetailComponent } from './features/admin/components/order-detail/order-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },

  {
    path: 'products',
    component: ProductsPageComponent,
  },

  {
    path: 'products/:id',
    component: ProductDetailPageComponent,
  },

  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'checkout/payment',
    component: CheckoutPaymentPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'checkout/summary',
    component: CheckoutSummaryPageComponent
  },
  {
    path: 'messageorderpage',
    component: MessageOrderPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'product',
        children: [
          {
            path: '',
            component: ProductManagComponent
          },
          {
            path: 'create',
            component: CreateFormComponent
          },
          {
            path: 'update/:id',
            component: UpdateFormComponent
          }
        ]
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            component: OrderManagComponent,
          },
          {
            path: 'detail/:id',
            component: OrderDetailComponent
          },
        ]
      },
      /*
      {
        path: 'users',
        //component: UsersAdminPageComponent,
        //canActivate: [adminGuard],
      }*/
    ]
  },

  {
    path: 'register',
    canActivate: [guestGuard],
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    component: LoginPageComponent,
  },
  /*
  {
    //path: 'me',
    //canActivate: [authGuard],
    //component: MeComponent,
  }*/
];
