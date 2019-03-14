import {AuthService} from "angularx-social-login";
import {FacebookLoginProvider, GoogleLoginProvider} from "angularx-social-login";
import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    providers: [AuthService]
})
export class SigninComponent implements OnInit {

    constructor(private authService: AuthService, private authenticationService: AuthenticationService, private router: Router) {
    }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.authenticationService.loginSocial(user.provider.toLowerCase(), user.authToken).subscribe(() => {
                    this.router.navigate(['/'])
                }, () => {
                    this.authService.signOut()
                }
            );
        });
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

}
