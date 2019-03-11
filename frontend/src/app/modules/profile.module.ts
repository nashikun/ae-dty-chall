import {NgModule} from '@angular/core';
import {ProfileComponent} from '../components/profile/profile.component';
import {WriteMailComponent} from '../components/write-mail/write-mail.component';
import {MailboxComponent} from '../components/mailbox/mailbox.component';
import {MailComponent} from '../components/mail/mail.component';
import {CommonModule} from '@angular/common';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileRoutingModule} from './profile-routing.module';
import {AnimelistComponent} from '../components/animelist/animelist.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SafeHtmlPipe} from "../safe-html.pipe";
import {NgxEditorModule} from "ngx-editor";

@NgModule({
  declarations: [
    ProfileComponent,
    AnimelistComponent,
    WriteMailComponent,
    MailboxComponent,
    WriteMailComponent,
    MailComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    NgxEditorModule
  ]
})

export class ProfileModule {
}
