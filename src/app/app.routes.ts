import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';
import { RegisterComponent } from './components/Auth/register/register';
import { FarmerDashboard } from './components/Farmer/farmer-dashboard/farmer-dashboard';
import { AdminDashboard } from './components/Admin/admin-dashboard/admin-dashboard';





export const routes: Routes = [

    //main routes
    { path: 'farmerdashboard', component: FarmerDashboard},
    { path: 'admindashboard' , component: AdminDashboard},
    // Authentication Routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];