import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserSearchParams } from './user.mode.service';
import { Observable } from 'rxjs';
import { User, UserPreview } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient;
  apiUrl = environment.apiUrl;

  constructor() {
    this.http = inject(HttpClient);
  }

  getUsers(queryParams: UserSearchParams): Observable<UserPreview[]> {
    const params = this.getParams(queryParams);
    return this.http.get<UserPreview[]>(`${this.apiUrl}/users`, { params });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
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
