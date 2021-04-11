import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAcount } from 'app/shared/model/acount.model';
import { AcountService } from './acount.service';

@Component({
  templateUrl: './acount-delete-dialog.component.html',
})
export class AcountDeleteDialogComponent {
  acount?: IAcount;

  constructor(protected acountService: AcountService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.acountService.delete(id).subscribe(() => {
      this.eventManager.broadcast('acountListModification');
      this.activeModal.close();
    });
  }
}
