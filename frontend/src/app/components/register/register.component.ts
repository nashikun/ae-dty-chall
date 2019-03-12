import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../validators/EmailValidator';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {environment} from '../../../environments/environment'

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
                private _router: Router,
                private fb: FormBuilder,
                private emailValidator: EmailValidator,
                private dialog: MatDialog) {
    }

    ngOnInit() {

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
                    this._router.navigate(['/']);
                });
            }

        }, (err) => {
            this.show = true;
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
        // TODO maybe later on add the email here to show it
    }

}
