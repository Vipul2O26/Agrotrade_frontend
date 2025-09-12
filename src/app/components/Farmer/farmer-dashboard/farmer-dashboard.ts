import { Component } from '@angular/core';
import { SessionService } from '../../../services/Session/session';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.html',
  styleUrl: './farmer-dashboard.css',
  imports: [CommonModule]
})
export class FarmerDashboard {

  constructor(
    private sessionService: SessionService,
    private router: Router   // ✅ correct injection
  ) {}

  logout(): void {
    this.sessionService.clearSession(); 
    this.router.navigate(['/login']);  
  }
}
