import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAcount } from 'app/shared/model/acount.model';

type EntityResponseType = HttpResponse<IAcount>;
type EntityArrayResponseType = HttpResponse<IAcount[]>;

@Injectable({ providedIn: 'root' })
export class AcountService {
  public resourceUrl = SERVER_API_URL + 'api/acounts';

  constructor(protected http: HttpClient) {}

  create(acount: IAcount): Observable<EntityResponseType> {
    return this.http.post<IAcount>(this.resourceUrl, acount, { observe: 'response' });
  }

  update(acount: IAcount): Observable<EntityResponseType> {
    return this.http.put<IAcount>(this.resourceUrl, acount, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAcount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
