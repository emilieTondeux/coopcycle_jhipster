import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRun } from 'app/shared/model/run.model';

type EntityResponseType = HttpResponse<IRun>;
type EntityArrayResponseType = HttpResponse<IRun[]>;

@Injectable({ providedIn: 'root' })
export class RunService {
  public resourceUrl = SERVER_API_URL + 'api/runs';

  constructor(protected http: HttpClient) {}

  create(run: IRun): Observable<EntityResponseType> {
    return this.http.post<IRun>(this.resourceUrl, run, { observe: 'response' });
  }

  update(run: IRun): Observable<EntityResponseType> {
    return this.http.put<IRun>(this.resourceUrl, run, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRun>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRun[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
