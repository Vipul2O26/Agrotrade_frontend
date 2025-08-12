import { Component , OnInit} from '@angular/core';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer',
  imports: [],
  templateUrl: './buyer.html',
  styleUrl: './buyer.css'
})
export class BuyerComponent implements OnInit {
  fullName = '';


  constructor(
    private sessionService: SessionService,
    private router: Router

  ) {}

  ngOnInit() {
    this.fullName = this.sessionService.getName() ?? '';
  }

  logout() {
    this.sessionService.clearSession(); // Clear session data
    this.router.navigate(['/login']); 
    
  }
}

