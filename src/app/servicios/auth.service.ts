import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Auth } from '../modelos/auth';
import { BASE_URL } from '../config/environment/urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;

  private baseUrl = `${BASE_URL}/autenticacion/login`

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('auth_token');
  }

  public isAuthenticated(): boolean {
    return this.token !== null;
  }

  public login(username: string, password: string): Observable<void> {
    return this.http
      .post<Auth>(`${this.baseUrl}/auth/login`, {
        nombre: username,
        contrasena: password,
      })
      .pipe(
        tap((data) => {
          this.token = data.accessToken;
          localStorage.setItem('auth_token', this.token);
        }),
        map(() => void 0)
      );
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  public getToken(): string {
    return this.token!;
  }
}
