import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';
import { RegisterComponent } from './components/Auth/register/register';





export const routes: Routes = [


    // Authentication Routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];