import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationScreenComponent } from './containers/confirmation-screen/confirmation-screen.component';

const routes: Routes = [{ path: '', component: ConfirmationScreenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmationScreenRoutingModule {}
