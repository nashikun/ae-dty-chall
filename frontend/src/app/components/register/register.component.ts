import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsernameValidator} from '../../util/UsernameValidator';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {environment} from '../../../environments/environment'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    captcha_key : string = environment.captcha_key;
    registrationForm: FormGroup;
    errors = {emailExists: false};

    constructor(private _auth: AuthService, private _router: Router, private fb: FormBuilder, private usernameValidator: UsernameValidator,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        console.log(this.captcha_key);
        this.registrationForm = this.fb.group({
            password: new FormControl(null, {
                validators: [Validators.required, Validators.pattern('(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,20}$')
                ]
            }),
            email: new FormControl(null, {
                validators: [Validators.required, Validators.pattern('([!#-\'*+/-9=?A-Z^-~-]+(\\.[!#-\'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \\t]' +
                    '|(\\\\[\\t -~]))+")@([!#-\'*+/-9=?A-Z^-~-]+(\\.[!#-\'*+/-9=?A-Z^-~-]+)*|\\[[\\t -Z^-~]*])')
                ]
            }),
            recaptcha: new FormControl(null, {validators: [Validators.required]})
        });
    }

    registerUser() {
        this._auth.registerUser(this.registrationForm.value).subscribe(res => {
            if (res.success) {
                const dialogRef = this.dialog.open(MailSent, {});
                dialogRef.afterClosed().subscribe(() => {
                    this._router.navigate(['/']);
                });
            }

        }, (err) => {
            console.error(err);
            this.errors = err.error || {};
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
        // TODO maybe later on add the emai; jere to show it
    }

}
