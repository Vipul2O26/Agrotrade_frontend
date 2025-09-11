import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';
import { RegisterComponent } from './components/Auth/register/register';
import { FarmerDashboard } from './components/Farmer/farmer-dashboard/farmer-dashboard';





export const routes: Routes = [

    { path: 'farmerdashboard', component: FarmerDashboard},
    // Authentication Routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];