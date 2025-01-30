import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { UserSearchParams, UserSearchResponse } from './user.service.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getUsers(queryParams: UserSearchParams): Observable<UserSearchResponse> {
    const params = this.getParams(queryParams);
    return this.http.get<UserSearchResponse>(`${this.apiUrl}/search`, { params });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/details/${id}`);
  }

  private getParams(params: Object): HttpParams {
    let httpParams = new HttpParams();

    const safeParams = (typeof params === 'object' && params !== null) ? params : {};

    Object.keys(safeParams).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return httpParams;
  }
}
