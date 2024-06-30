import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { CatalogComponent } from './catalog/catalog.component';
import { BasketComponent } from './basket/basket.component';
import { ProfileComponent } from './profile/profile.component';
import { ReviewComponent } from './review/review.component';

export const appRoutes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'product/:id', component: ReviewComponent },
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
