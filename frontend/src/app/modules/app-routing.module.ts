import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {HomeComponent} from '../components/home/home.component';
import {VerificationComponent} from '../components/verification/verification.component';
import {PageNotFoundComponent} from '../components/errors/page-not-found.component';
import {UsersComponent} from "../components/users/users.component";
import {LegalComponent} from "../components/legal/legal.component";

const routes: Routes = [
    {path: '', component: HomeComponent, pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'verify/:url', component: VerificationComponent},
    {path: 'verify', component: VerificationComponent},
    {path: 'users', component: UsersComponent},
    {path: 'profile', loadChildren: './profile.module#ProfileModule'},
    {path: 'animes', loadChildren: './anime.module#AnimeModule'},
    {path: 'privacy-policy', component: LegalComponent, data: {page: 'privacy-policy.html'}},
    {path: '**', component: PageNotFoundComponent}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
