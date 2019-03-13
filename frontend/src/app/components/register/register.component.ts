import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../validators/EmailValidator';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {environment} from '../../../environments/environment'
import {HttpClient} from "@angular/common/http";

const BACKEND = environment.backend;

declare var FB: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    show = true;
    captcha_key: string = environment.captcha_key;
    registrationForm: FormGroup;
    errors = {emailExists: false, unverified: false};

    constructor(private _auth: AuthService,
                private router: Router,
                private fb: FormBuilder,
                private emailValidator: EmailValidator,
                private dialog: MatDialog,
                private http: HttpClient) {
    }

    ngOnInit() {
        (window as any).fbAsyncInit = function () {
            FB.init({
                appId: '2043788692590804',
                cookie: true,
                xfbml: true,
                version: 'v3.2'
            });
            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        this.registrationForm = this.fb.group({
            email: new FormControl(null, {
                validators: [Validators.required, Validators.pattern('([!#-\'*+/-9=?A-Z^-~-]+(\\.[!#-\'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \\t]' +
                    '|(\\\\[\\t -~]))+")@([!#-\'*+/-9=?A-Z^-~-]+(\\.[!#-\'*+/-9=?A-Z^-~-]+)*|\\[[\\t -Z^-~]*])')
                ], asyncValidators: [this.emailValidator.available.bind(this.emailValidator)]
            }),
            password: new FormControl(null, {
                validators: [Validators.required, Validators.pattern('(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,20}$')
                ]
            }),
            recaptcha: new FormControl(null, {validators: [Validators.required]})
        });
    }

    registerUser() {
        this.show = false;
        this._auth.registerUser(this.registrationForm.value).subscribe(res => {
            this.show = true;
            if (res.success) {
                const dialogRef = this.dialog.open(MailSent, {});
                dialogRef.afterClosed().subscribe(() => {
                    this.router.navigate(['/']);
                });
            }

        }, (err) => {
            this.show = true;
            this.errors = err.error || {};
        });
    }

    submitLogin() {
        console.log("submit login to facebook");
        // FB.login();
        FB.login((response) => {
            console.log('submitLogin', response);
            if (response.authResponse) {
                FB.api(
                    '/me?fields=id,name,email,birthday,profile_pic',
                    function (response) {
                        console.log('API', response);
                    }
                );
            } else {
                console.log('User login failed');
            }
        });
    }

    loginFB() {
        window.open(BACKEND + '/auth/facebook', '_blank', 'width=1, height=1');
    }

    fblogin() { //i want it on the page where you click that login
        // I really dunnoho to do that with angular. dunno if it's even possible to listen to other components in it
        // dude you can't run a very simple script on a page ????????????????????,
        // I have no idea im a noon and never needed scripts, just event bindings and stuff
        var href = href;
        var frame = document.createElement("iframe");
        frame.id = "loginFrame";
        frame.style.display = "none";
        frame.src = href;
        document.querySelector("body").appendChild(frame);
    }

    setHandler() {
        window.addEventListener("message", function (e) {
            var data = e.data;
            if (data._id && data.role) {
                document.getElementById("loginFrame").remove();
                alert(data);
            }
        });
    }
}


@Component({
    selector: 'mail-sent',
    templateUrl: 'mail-sent.html',
})
export class MailSent {

    constructor(
        public dialogRef: MatDialogRef<MailSent>,
        @Inject(MAT_DIALOG_DATA) public data) {
        // TODO maybe later on add the email here to show it
    }

}
