import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { AuthService } from '../../services/auth';
import { SessionService } from '../../services/session';

interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  isBidding: boolean;
}

@Component({
  selector: 'app-farmer',
  standalone: true,
  imports: [CommonModule,HeaderComponent ],
  templateUrl: './farmer.html',
})
export class FarmerComponent   {
fullName: any;

 constructor( private sessionService: SessionService, private authservice: AuthService){}

 ngOnInit() {
  this.fullName = this.sessionService.getName() ?? '';
}

logout() {
  this.authservice.logout();
}

}