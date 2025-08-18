import { Component, OnInit } from '@angular/core';
import { AdminHeader } from '../admin-header/admin-header';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminHeader , CommonModule , ReactiveFormsModule ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  viewAuditTrail() {
    this.router.navigate(['/audittrail']);
  } 
  viewAllUsers() {
    this.router.navigate(['/alluser']);
  }
 

  

}
