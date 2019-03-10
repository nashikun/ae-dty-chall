import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from '../app.component';
import {HomeComponent} from '../components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {TokenInterceptor} from '../token-interceptor';
import {ErrorInterceptor} from '../error-interceptor';
import {AnimeService} from '../services/anime.service';
import {EmailValidator} from '../validators/EmailValidator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PageNotFoundComponent} from '../components/errors/page-not-found.component';
import {AngularMaterialModule} from './angular-material.module';
import {AuthModule} from './auth.module';
import {SWIPER_CONFIG, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';
import {UsersComponent} from "../components/users/users.component";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        UsersComponent
    ],
    imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        AngularMaterialModule,
        AuthModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        SwiperModule
    ],
    providers: [
        AuthService,
        AnimeService,
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        EmailValidator,
    ],
    bootstrap: [AppComponent],
})

export class AppModule {
}

//TODO ADD TYPE INTERFACES,
// fix the stupid css thing a bit more
