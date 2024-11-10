import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { BASE_URL } from '@/app/config/environment/urls';
import { Auth } from '@/app/modelos/auth';
import { Role } from '@/app/modelos/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  role: Role | null = null;
  username: string | null = null;

  private baseUrl = `${BASE_URL}/autenticacion`;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('auth_token');
    this.role = localStorage.getItem('auth_role') as Role | null;
    this.username = localStorage.getItem('username');
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      await this.refresh().toPromise();
      return true;
    } catch {
      return false;
    }
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
          localStorage.setItem('username', username);
        }),
        map((data) => {
          return data.role;
        })
      );
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role');
    localStorage.removeItem('username');
  }

  public getToken(): string {
    return this.token!;
  }

  public refresh(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http
      .post<Auth>(`${this.baseUrl}/refresh`, {}, {
        headers,
      })
      .pipe(
        tap((data) => {
          this.token = data.accessToken;
          localStorage.setItem('auth_token', this.token);
        }),
        map((data) => {
          return data.accessToken;
        })
      );
  }
}
