import { Component } from '@angular/core';
import { SessionService } from '../../../services/Session/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-dashboard',
  templateUrl: './farmer-dashboard.html',
  styleUrls: ['./farmer-dashboard.css'] // 👈 plural: styleUrls
})
export class FarmerDashboard {

  constructor(
    private sessionService: SessionService,
    private router: Router   // ✅ correct injection
  ) {}

  logout(): void {
    this.sessionService.clearSession(); 
    this.router.navigate(['/login']);  // ✅ works now
  }
}
