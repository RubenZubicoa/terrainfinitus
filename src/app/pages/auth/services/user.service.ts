import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddUser, UpdateUser, UpdateUserWithPassword } from '../../../core/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.apiUrl + '/users';

  public createUser(user: AddUser): Observable<void> {
    return this.http.post<void>(this.baseUrl, user);
  }

  public updateUser(uuid: string, user: UpdateUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${uuid}`, user);
  }

  public updateUserPassword(uuid: string, user: UpdateUserWithPassword): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${uuid}`, user);
  }
}
