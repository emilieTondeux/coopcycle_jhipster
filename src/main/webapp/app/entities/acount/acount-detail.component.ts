import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAcount } from 'app/shared/model/acount.model';

@Component({
  selector: 'jhi-acount-detail',
  templateUrl: './acount-detail.component.html',
})
export class AcountDetailComponent implements OnInit {
  acount: IAcount | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ acount }) => (this.acount = acount));
  }

  previousState(): void {
    window.history.back();
  }
}
