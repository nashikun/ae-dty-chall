import {NgModule} from '@angular/core';
import {ProfileComponent} from '../components/profile/profile.component';
import {WriteMailComponent} from '../components/write-mail/write-mail.component';
import {MailboxComponent} from '../components/mailbox/mailbox.component';
import {MailComponent} from '../components/mail/mail.component';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './angular-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileRoutingModule} from './profile-routing.module';
import {AnimelistComponent} from '../components/animelist/animelist.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    ProfileComponent,
    AnimelistComponent,
    WriteMailComponent,
    MailboxComponent,
    WriteMailComponent,
    MailComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    FlexLayoutModule
  ]
})

export class ProfileModule {
}
