import { Routes } from '@angular/router';
import { LoginComponent } from '../app/components/Auth/login/login';
import { AdminDashboard } from './components/Admin/admin-dashboard/admin-dashboard';
import { RegisterComponent } from '../app/components/Auth/register/register';
import { FarmerComponent } from './components/farmer/farmer';
import { AuthGuard } from './guard/auth-guard';
import { Add } from './components/Products/add/add';
import { Viewalluser } from './components/Admin/viewalluser/viewalluser';
import { Audittrail } from './components/Admin/audittrail/audittrail';
import { Allproduct } from './components/Products/allproduct/allproduct';
import { Myproduct } from './components/Products/myproduct/myproduct';
import { EditProduct } from './components/Products/edit/edit';
import { CartComponent } from './components/Products/cart/cart';



export const routes: Routes = [

  // Main Routes
    { path: 'farmer', component: FarmerComponent , canActivate: [AuthGuard]},
    { path: 'admin' , component: AdminDashboard , canActivate: [AuthGuard] },

    // Product Routes
    { path: 'addproduct' , component: Add , canActivate: [AuthGuard] },
    { path: 'allproduct' , component: Allproduct , canActivate: [AuthGuard] },
    { path: 'myproduct' , component: Myproduct , canActivate: [AuthGuard] },
    { path: 'editproduct/:id', component: EditProduct, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent , canActivate: [AuthGuard]},


    

    //admin routes
    {path: 'alluser' , component: Viewalluser , canActivate: [AuthGuard]},
    {path: 'audittrail' , component: Audittrail , canActivate: [AuthGuard]},

    // Authentication Routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  ];