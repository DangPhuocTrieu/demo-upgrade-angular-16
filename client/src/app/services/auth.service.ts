import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { USER_KEY } from '../constants';
import { DataServer } from '../models/data';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:8000/api/auth'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  signUp(data: any): Observable<DataServer> {
    return this.http.post<DataServer>(`${this.BASE_URL}/signup`, data)
  }

  login(data: any): Observable<DataServer> {
    return this.http.post<DataServer>(`${this.BASE_URL}/login`, data)
  }

  getUserStorage(): User {
    const userJSON: any = localStorage.getItem(USER_KEY)
    return JSON.parse(userJSON)
  }
}

