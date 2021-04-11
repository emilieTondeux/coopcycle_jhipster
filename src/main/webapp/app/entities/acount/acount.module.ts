import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleJhipsterSharedModule } from 'app/shared/shared.module';
import { AcountComponent } from './acount.component';
import { AcountDetailComponent } from './acount-detail.component';
import { AcountUpdateComponent } from './acount-update.component';
import { AcountDeleteDialogComponent } from './acount-delete-dialog.component';
import { acountRoute } from './acount.route';

@NgModule({
  imports: [CoopcycleJhipsterSharedModule, RouterModule.forChild(acountRoute)],
  declarations: [AcountComponent, AcountDetailComponent, AcountUpdateComponent, AcountDeleteDialogComponent],
  entryComponents: [AcountDeleteDialogComponent],
})
export class CoopcycleJhipsterAcountModule {}
