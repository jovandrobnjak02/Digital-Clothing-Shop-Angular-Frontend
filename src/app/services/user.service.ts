// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  async getUserById(userId: number) {
    return await axios.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/edit/${userId}`, user);
  }
}
