import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleJhipsterSharedModule } from 'app/shared/shared.module';
import { PaymentSysComponent } from './payment-sys.component';
import { PaymentSysDetailComponent } from './payment-sys-detail.component';
import { PaymentSysUpdateComponent } from './payment-sys-update.component';
import { PaymentSysDeleteDialogComponent } from './payment-sys-delete-dialog.component';
import { paymentSysRoute } from './payment-sys.route';

@NgModule({
  imports: [CoopcycleJhipsterSharedModule, RouterModule.forChild(paymentSysRoute)],
  declarations: [PaymentSysComponent, PaymentSysDetailComponent, PaymentSysUpdateComponent, PaymentSysDeleteDialogComponent],
  entryComponents: [PaymentSysDeleteDialogComponent],
})
export class CoopcycleJhipsterPaymentSysModule {}
