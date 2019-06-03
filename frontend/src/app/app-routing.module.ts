import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: './modules/auth/auth.module#AuthModule', // Lazy Loading
  },
  {
    path: 'content',
    component: ContentLayoutComponent,
    loadChildren: './modules/content/content.module#ContentModule', // Lazy Loading
  },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
