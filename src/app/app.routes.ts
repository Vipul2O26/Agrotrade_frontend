import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';
import { RegisterComponent } from './components/Auth/register/register';
import { FarmerDashboard } from './components/Farmer/farmer-dashboard/farmer-dashboard';
import { AdminDashboard } from './components/Admin/admin-dashboard/admin-dashboard';
import { authGuardGuard } from './services/Auth/guard/auth-guard-guard';



export const routes: Routes = [
  // main routes with role-based access
  { path: 'farmerdashboard', component: FarmerDashboard, canActivate: [authGuardGuard], data: { roles: ['Farmer'] } },
  { path: 'admindashboard',  component: AdminDashboard,  canActivate: [authGuardGuard], data: { roles: ['Admin'] }  },

  // Authentication Routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];