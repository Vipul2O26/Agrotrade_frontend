import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';

import { RegisterComponent } from '../app/components/Auth/register/register';
import { FarmerComponent } from './components/farmer/farmer';
import { BuyerComponent } from './components/buyer/buyer';


export const routes: Routes = [
    { path: 'farmer', component: FarmerComponent },
    { path: 'buyer' , component: BuyerComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];