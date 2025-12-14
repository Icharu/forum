import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterRequest {
    username: string;
    password: string;
    isAdmin?: boolean;
}

interface LoginRequest {
    username: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://forumback-ha4q.onrender.com/auth';

    constructor(private httpClient: HttpClient) {}


    RegisterUser(request: RegisterRequest): Observable<string> {
  const body = new URLSearchParams();
  body.set('username', request.username);
  body.set('password', request.password);
  body.set('isAdmin', String(request.isAdmin ?? false));

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  return this.httpClient.post(`${this.apiUrl}/register`, body.toString(), { 
    headers,
    responseType: 'text'
  });
}

  login(request: LoginRequest): Observable<string> {
  const params = new URLSearchParams();
  params.set('username', request.username);
  params.set('password', request.password);

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  return this.httpClient.post(`${this.apiUrl}/login`, params.toString(), {
    headers,
    responseType: 'text'
  });
}


    savetoken(token: string): void {
        localStorage.setItem('token', token);
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    logout(): void {
        localStorage.removeItem('token');
    }
    isLoggedIn(): boolean {
        return !!this.getToken();
    }
    getUsername(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub || payload.username || null;
  } catch (e) {
    console.error("Inválido", e);
    return null;
  }
}
getIsAdmin(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles?.includes("ROLE_ADMIN");
  } catch {
    return false;
  }
}


}