import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';
import { AdminDashboard } from './components/Admin/admin-dashboard/admin-dashboard';
import { RegisterComponent } from '../app/components/Auth/register/register';
import { FarmerComponent } from './components/farmer/farmer';
import { AuthGuard } from './guard/auth-guard';
import { Add } from './components/Products/add/add';
import { View } from './components/Products/view/view';
import { Myproducts } from './components/Products/myproducts/myproducts';
import { Bid } from './components/Products/bid/bid';



export const routes: Routes = [

  // Main Routes
    { path: 'farmer', component: FarmerComponent , canActivate: [AuthGuard]},
    { path: 'admin' , component: AdminDashboard , canActivate: [AuthGuard] },

    // Product Routes
    { path: 'add' , component: Add , canActivate: [AuthGuard] },
    { path: 'view' , component: View , canActivate: [AuthGuard] },
    { path: 'myproducts' , component: Myproducts, canActivate: [AuthGuard]},

    // Bid Routes
    { path: 'bid/:guid' , component: Bid , canActivate: [AuthGuard] },

    


    // Authentication Routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];