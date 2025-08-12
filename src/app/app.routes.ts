import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';

import { RegisterComponent } from '../app/components/Auth/register/register';
import { FarmerComponent } from './components/farmer/farmer';
import { BuyerComponent } from './components/buyer/buyer';
import { AuthGuard } from './guard/auth-guard';


export const routes: Routes = [
    { path: 'farmer', component: FarmerComponent , canActivate: [AuthGuard]},
    { path: 'buyer' , component: BuyerComponent , canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];