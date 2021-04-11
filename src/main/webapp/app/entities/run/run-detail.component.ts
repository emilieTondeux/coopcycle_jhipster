import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRun } from 'app/shared/model/run.model';

@Component({
  selector: 'jhi-run-detail',
  templateUrl: './run-detail.component.html',
})
export class RunDetailComponent implements OnInit {
  run: IRun | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ run }) => (this.run = run));
  }

  previousState(): void {
    window.history.back();
  }
}
