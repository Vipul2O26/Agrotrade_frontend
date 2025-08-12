import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';

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
  imports: [CommonModule , Header],
  templateUrl: './farmer.html',
})
export class FarmerComponent   {
 



 

 
}