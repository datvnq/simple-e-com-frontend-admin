import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { map, Observable, tap } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: string;
  public password: string;

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient, private notification: NzNotificationService) { }

  login(username: string, password: string) {
    return this.httpClient.get(`${this.baseURL}/api/login`,
                                { headers: { authorization: this.createBasicAuthToken(username, password) } })
    .pipe(map((res) => {
        this.username = username;
        this.password = password;
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/api/user/${username}`);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
