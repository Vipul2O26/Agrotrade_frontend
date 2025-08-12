import { Component } from '@angular/core';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  fullName = '';

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fullName = this.sessionService.getName() ?? '';
  }

  logout() {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }
}
