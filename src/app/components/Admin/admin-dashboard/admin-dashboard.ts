import { Component, OnInit } from '@angular/core';
import { AdminHeader } from '../admin-header/admin-header';
import { CommonModule } from '@angular/common';
import { User, Users } from '../../../services/admin/users';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminHeader , CommonModule , ReactiveFormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  users: User[] | undefined;
loading: any;

  constructor(private Users: Users) {}

  
  ngOnInit(): void {  
    this.Users.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });

  }

  

}
