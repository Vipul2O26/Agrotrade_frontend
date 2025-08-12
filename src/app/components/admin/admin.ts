import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule , Header],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

}
