import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProfileComponent} from '../components/profile/profile.component';
import {WriteMailComponent} from '../components/write-mail/write-mail.component';
import {MailboxComponent} from '../components/mailbox/mailbox.component';
import {MailComponent} from '../components/mail/mail.component';
import {AuthGuard} from '../guards/auth.guard';
import {AnimelistComponent} from '../components/animelist/animelist.component';


const routes: Routes = [
  {path: '', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'animelist', component: AnimelistComponent, canActivate: [AuthGuard]},
  {path: ':user', component: ProfileComponent},
  {path: ':user/animelist', component: AnimelistComponent},
  {path: 'mails/create', component: WriteMailComponent, canActivate: [AuthGuard]},
  {path: 'mails/received', component: MailboxComponent, canActivate: [AuthGuard]},
  {path: 'mails/:mail', component: MailComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
