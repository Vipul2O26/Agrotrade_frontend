import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../session';

export interface User {
createdAt: string|number|Date;
mobileNumber: any;
  getUsers(arg0: {}): unknown;

  userId?: string;
  fullName: string;
  email: string;
  role: string; 
  phoneNumber?: string;
  address?: string;
  isActive: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class Users {
  

  private apiUrl = 'http://localhost:5142/api/Users'; 

  constructor(
    private http: HttpClient
  ) {}




  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  
}





