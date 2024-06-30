import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private jwtHelper = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService
  ) {
    const token = this.cookieService.get('token');
    let user = null;

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      user = decodedToken ? decodedToken.user : null;
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, credentials).pipe(
      tap(async response => {
        if (response.token) {
          this.cookieService.set('token', response.token);
          const decodedToken = this.jwtHelper.decodeToken(response.token);
          let user = await this.userService.getUserById(Number(decodedToken.sub))
          this.currentUserSubject.next(decodedToken ? user.data : null);
          this.router.navigate(['/home']);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);
      })
    );
  }

  logout() {
    this.cookieService.delete('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getRole(): string {
    const token = this.cookieService.get('token');
    if (!token) return 'No role assigned';
    
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken ? decodedToken.roles : 'No role assigned';
  }

  isAdmin(): boolean {
    return this.getRole().includes('ROLE_ADMIN');
  }
}
