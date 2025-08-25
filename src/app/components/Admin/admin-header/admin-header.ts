import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SessionService } from '../../../services/session'; 

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterModule , RouterLink],
  styleUrls: ['./admin-header.css'],
  templateUrl: './admin-header.html', 
})

export class AdminHeader implements OnInit {
  isMobileMenuOpen = false;

  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit(): void {
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.sessionService.clearSession(); 
    this.router.navigate(['/login']); 
    this.isMobileMenuOpen = false; 
  }


}

