import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Auth } from '../modelos/auth';
import { BASE_URL } from '../config/environment/urls';
import {Role} from "@/app/modelos/role";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  role: Role | null = null;

  private baseUrl = `${BASE_URL}/autenticacion`

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('auth_token');
    this.role = localStorage.getItem('auth_role') as Role | null;
  }

  public isAuthenticated(): boolean {
    return this.token !== null;
  }

  public login(username: string, password: string): Observable<string> {
    return this.http
      .post<Auth>(`${this.baseUrl}/login`, {
        username,
        password,
      })
      .pipe(
        tap((data) => {
          this.token = data.accessToken;
          this.role = data.role;
          localStorage.setItem('auth_token', this.token);
          localStorage.setItem('auth_role', this.role);
        }),
        map((data) => {
          return data.role
        })
      );
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role');
  }

  public getToken(): string {
    return this.token!;
  }
}
