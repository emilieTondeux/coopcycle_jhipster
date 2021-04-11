import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleJhipsterSharedModule } from 'app/shared/shared.module';
import { RunComponent } from './run.component';
import { RunDetailComponent } from './run-detail.component';
import { RunUpdateComponent } from './run-update.component';
import { RunDeleteDialogComponent } from './run-delete-dialog.component';
import { runRoute } from './run.route';

@NgModule({
  imports: [CoopcycleJhipsterSharedModule, RouterModule.forChild(runRoute)],
  declarations: [RunComponent, RunDetailComponent, RunUpdateComponent, RunDeleteDialogComponent],
  entryComponents: [RunDeleteDialogComponent],
})
export class CoopcycleJhipsterRunModule {}
