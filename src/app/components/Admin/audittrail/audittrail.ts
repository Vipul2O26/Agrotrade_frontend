import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../../../services/admin/users'; 
import { CommonModule } from '@angular/common';
import { AdminHeader } from '../admin-header/admin-header';

@Component({
  selector: 'app-audittrail',
  templateUrl: './audittrail.html',
  styleUrls: ['./audittrail.css'],
  imports: [CommonModule , AdminHeader]
})
export class Audittrail implements OnInit {
  auditLogs: any[] = [];
  loading: any;
  

  constructor(private userService: Users, private router: Router) {}

  ngOnInit() {
    this.getUserAudit();
  }

  getUserAudit() {
    const userId = ''; 
    this.userService.getUserAuditTrail(userId).subscribe({
      next: (auditLogs: any) => {
        this.auditLogs = auditLogs;
        console.log('Fetched audit logs:', auditLogs);
      },
      error: (error: any) => {
        console.error('Error fetching audit logs:', error);
      }
    });
  }

  navigateToAdminDashboard() {
    this.router.navigate(['/admin']);
  }
}
