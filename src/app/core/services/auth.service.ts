import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthResponse, AuthUser } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { mapUserDBToUser } from '../models/User';
import { LoginResponse, LoginResponseDB } from '../models/login-response';
import { TokenService } from './token-service';
import { CurrentUserService } from './current-user-service';
import { environment } from '../../../environments/environment.development';

const AUTH_TOKEN_KEY = 'ti_auth_token';
const MOCK_DELAY_MS = 1500;

/** Credenciales de prueba hasta conectar el backend real. */
const MOCK_CREDENTIALS = {
  email: 'demo@terrainfinitus.com',
  password: 'demo123',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly currentUserService = inject(CurrentUserService);
  
  readonly isAuthenticated = signal(false);
  readonly currentUser = signal<AuthUser | null>(null);
  private readonly baseUrl = environment.apiUrl + '/login';

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponseDB>(this.baseUrl, { email, password }).pipe(
      map((response) => ({
        token: response.token,
        user: mapUserDBToUser(response.user),
      })),
      tap((response) => {
        this.tokenService.saveToken(response.token);
        this.currentUserService.setUser(response.user);
      })
    );
  }
  
  logout(): void {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }


  private persistSession(response: AuthResponse): void {
    this.isAuthenticated.set(true);
    this.currentUser.set(response.user);
    localStorage.setItem(AUTH_TOKEN_KEY, response.token);
  }
}
