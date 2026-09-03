import { Routes } from '@angular/router';
import { LandingPageComponent }
from './features/home/pages/landing-page/landing-page.component';
import { ProductsDetailPageComponent }
from './features/home/pages/products-detail-page/products-detail-page.component';
import { CheckoutSummaryPageComponent }
from './features/checkout/pages/checkout-summary-page/checkout-summary-page.component';
import { CheckoutPaymentPageComponent }
from './features/checkout/pages/checkout-payment-page/checkout-payment-page.component';
import { CheckoutPageComponent }
from './features/checkout/pages/checkout-page/checkout-page.component';
import { AdminPageComponent }
from './features/admin/pages/admin-page/admin-page.component';
import { RegisterPageComponent }
from './features/auth/pages/register-page/register-page.component';
import { LoginPageComponent }
from './features/auth/pages/login-page/login-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'productos/:id',
    component: ProductsDetailPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    //canActivate: [authGuard],
    children: [
      {
        path: 'checkout-summary',
        component: CheckoutSummaryPageComponent
      },
      {
        path: 'checkout-payment',
        component:CheckoutPaymentPageComponent
      }
    ]
  },
  {
    //path: 'pedido-confirmacion-page',
    //component: PedidoConfirmacionPageComponent,
    //canActivate: [authGuard],
  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    //canActivate: [adminGuard],
    children: [
      {
        path: 'products-admin-page',
        children: [
          {
            path: '',
            //component: ProductsAdminPageComponent
          },
          {
            path: 'createProducto-page',
            //component: CreateProductoPageComponent
          },
          {
            path: 'update-form-page/:id',
            //component: UpdateFormPageComponent
          }
        ]
      },
      {
        path: 'pedidos-admin-page',
        //component: PedidosAdminPageComponent,
        //canActivate: [adminGuard],
      },
      {
        path: 'users-admin-page',
        //component: UsersAdminPageComponent,
        //canActivate: [adminGuard],
      }
    ]
  },
  {
    path: 'register',
    //canActivate: [guestGuard],
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    //canActivate: [guestGuard],
    component: LoginPageComponent,
  },
  {
    //path: 'me',
    //canActivate: [authGuard],
    //component: MeComponent,
  }
];
