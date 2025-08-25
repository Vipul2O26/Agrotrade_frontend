import { Component } from '@angular/core';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  fullName = '';

  constructor(
    private sessionService: SessionService,
    private authservice: AuthService
    
  ) {}

  ngOnInit() {
    this.fullName = this.sessionService.getName() ?? '';
  }

  logout() {
    this.authservice.logout();
  }

  
}
