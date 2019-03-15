import {NgModule} from '@angular/core';
import {LoginComponent} from '../components/login/login.component';
import {MailSent, RegisterComponent} from '../components/register/register.component';
import {SigninComponent} from "../components/signin/signin.component";
import {GuestHeaderComponent} from '../components/header/guest-header.component';
import {UserHeaderComponent} from '../components/user-header/user-header.component';
import {VerificationComponent} from '../components/verification/verification.component';
import {RecaptchaModule} from 'ng-recaptcha';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from "angularx-social-login";
import {environment} from "../../environments/environment";

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.google_app_id)
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.fb_app_id)
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
    declarations: [
        GuestHeaderComponent,
        UserHeaderComponent,
        LoginComponent,
        RegisterComponent,
        VerificationComponent,
        MailSent,
        SigninComponent
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RecaptchaModule,
        FormsModule,
        ReactiveFormsModule,
        RecaptchaFormsModule,
        RouterModule,
        FlexLayoutModule
    ],
    exports: [
        GuestHeaderComponent,
        UserHeaderComponent,
        LoginComponent,
        RegisterComponent,
        VerificationComponent,
        MailSent,
        SigninComponent
    ], providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
    entryComponents: [MailSent]
})

export class AuthModule {

}
