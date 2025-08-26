import { Component, OnInit } from '@angular/core';
import { User, Users } from '../../../services/admin/users';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminHeader } from '../admin-header/admin-header';


@Component({
  selector: 'app-viewalluser',
  imports: [ CommonModule, AdminHeader],
  templateUrl: './viewalluser.html',
  styleUrl: './viewalluser.css'
})
export class Viewalluser implements OnInit {
  users: User[] | undefined;
  loading: any;
  
    constructor(private Users: Users , private route: Router) {}
  
    
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

    navigateToAdminDashboard() {
      this.route.navigate(['/admin']);
      }

}
