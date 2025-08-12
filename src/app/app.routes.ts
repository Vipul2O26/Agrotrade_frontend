import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';
import { Admin } from './components/admin/admin';
import { RegisterComponent } from '../app/components/Auth/register/register';
import { FarmerComponent } from './components/farmer/farmer';
import { AuthGuard } from './guard/auth-guard';
import { Add } from './components/Products/add/add';
import { View } from './components/Products/view/view';



export const routes: Routes = [
    { path: 'farmer', component: FarmerComponent , canActivate: [AuthGuard]},
    { path: 'admin' , component: Admin , canActivate: [AuthGuard] },
    { path: 'add' , component: Add , canActivate: [AuthGuard] },
    { path: 'view' , component: View , canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];