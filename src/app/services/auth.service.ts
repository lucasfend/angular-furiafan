import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../interface/login';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, data);
  }

  saveJwtToken(token: string): void {
    localStorage.setItem('authToken', token);
    try {
      const decodedToken: any = jwtDecode(token);
      const cpf = decodedToken?.cpf;
      if (cpf) {
        localStorage.setItem('cpf', cpf);
      }
    } catch (error) {
      console.warn('Erro ao decodificar JWT:', error);
    }
  }

  saveTwitterToken(token: string): void {
    localStorage.setItem('authToken', token);
    // Não tenta decodificar — é apenas o token de acesso
  }

  isAuthenticated(): boolean {
    const jwt = localStorage.getItem('authToken');
    const twitter = localStorage.getItem('twitter_token');
    return !!jwt || !!twitter;
  }


  loginWithTwitterToken(twitterToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/twitter/exchange`, null, {
      params: { twitterToken }
    });
  }

  saveToken(token: string, isJwt: boolean = true): void {
    localStorage.setItem('authToken', token);

    if (isJwt) {
      try {
        const decodedToken: any = jwtDecode(token);
        const cpf = decodedToken?.cpf;
        if (cpf) {
          localStorage.setItem('cpf', cpf);
        }
      } catch (error) {
        console.warn('Erro ao decodificar JWT:', error);
      }
    }
  }



  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCpf(): string | null {
    return localStorage.getItem('cpf');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('cpf');
  }
}
