import { Component } from '@angular/core';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FarmerComponent } from '../farmer/farmer';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
logout() {
throw new Error('Method not implemented.');
}
  fullName = '';

  constructor(
    private sessionService: SessionService,
    private authservice: AuthService
    
  ) {}
 
}
