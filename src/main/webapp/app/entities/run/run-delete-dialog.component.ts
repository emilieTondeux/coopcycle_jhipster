import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRun } from 'app/shared/model/run.model';
import { RunService } from './run.service';

@Component({
  templateUrl: './run-delete-dialog.component.html',
})
export class RunDeleteDialogComponent {
  run?: IRun;

  constructor(protected runService: RunService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.runService.delete(id).subscribe(() => {
      this.eventManager.broadcast('runListModification');
      this.activeModal.close();
    });
  }
}
