import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: `trip-cart`,
    pathMatch: 'full',
  },
  {
    path: `trip-cart`,
    loadChildren: () =>
      import('./screens/landing-screen/landing-screen.module').then(
        (m) => m.LandingScreenModule
      ),
  },
  {
    path: `review-and-pay`,
    loadChildren: () =>
      import(
        './screens/review-and-pay-screen/review-and-pay-screen.module'
      ).then((m) => m.ReviewAndPayScreenModule),
  },
  {
    path: `booking-confirmation`,
    loadChildren: () =>
      import('./screens/confirmation-screen/confirmation-screen.module').then(
        (m) => m.ConfirmationScreenModule
      ),
  },
  {
    path: `traveler-info`,
    loadChildren: () =>
      import('./screens/traveler-info-screen/traveler-info-screen.module').then(
        (m) => m.TravelerInfoScreenModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
