import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRun } from 'app/shared/model/run.model';
import { RunService } from './run.service';
import { RunDeleteDialogComponent } from './run-delete-dialog.component';

@Component({
  selector: 'jhi-run',
  templateUrl: './run.component.html',
})
export class RunComponent implements OnInit, OnDestroy {
  runs?: IRun[];
  eventSubscriber?: Subscription;

  constructor(protected runService: RunService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.runService.query().subscribe((res: HttpResponse<IRun[]>) => (this.runs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRuns();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRun): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRuns(): void {
    this.eventSubscriber = this.eventManager.subscribe('runListModification', () => this.loadAll());
  }

  delete(run: IRun): void {
    const modalRef = this.modalService.open(RunDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.run = run;
  }
}
