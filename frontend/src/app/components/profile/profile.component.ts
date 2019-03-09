import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageValidator} from '../../validators/ImageValidator';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AuthService} from '../../services/auth.service';
import {environment} from 'src/environments/environment';

const BACKEND = environment.backend;

export class Profile {
    username: string;
    bio: string;
    birthdate: string;
    picture: string | ArrayBuffer;
    location: string;
    gender: string;
    friendship: string;
    me: boolean
}

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
    },
};

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class ProfileComponent implements OnInit {

    loaded = false;
    errors = {};
    userId;
    profile = new Profile();
    profileForm: FormGroup;
    imageUrl: string | ArrayBuffer = BACKEND + '/images/profiles/default.jpg';

    //booleans for rendering
    myProfile: boolean = false;
    editUsername: boolean = false;
    editProfile: boolean = false;
    imageChanged: boolean = false;

    constructor(private _profile: ProfileService, private _auth: AuthService, private _router: Router, private _activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.userId = this._activatedRoute.snapshot.paramMap.get('user');
        if (this.userId) {
            this._profile.getProfile(this.userId).subscribe(res => {
                this.profile = res;
                this.imageUrl = this.profile.picture;
                this.loaded = true;
            });
        } else {
            this.myProfile = true;
            this._profile.getMyProfile().subscribe(res => {
                this.loaded = true;
                this.profile = res;
                this.imageUrl = this.profile.picture;
                this.profileForm = this.fb.group({
                    username: new FormControl(this.profile.username, {validators: [Validators.required]}),
                    bio: new FormControl(this.profile.bio, {}),
                    picture: new FormControl(this.profile.picture, {asyncValidators: [ImageValidator]}),
                    birthdate: new FormControl(this.profile.birthdate, {validators: []}),
                    location: new FormControl(this.profile.location, {}),
                    gender: new FormControl(this.profile.gender, {}),
                });
            });
        }
    }

    ImageUploader(event: Event) {
        this.imageChanged = true;
        event.preventDefault();
        const image = (event.target as HTMLInputElement).files[0];
        if (image) {
            this.profileForm.patchValue({picture: image});
            this.profileForm.get('picture').updateValueAndValidity();
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                if (this.profileForm.get('picture').valid) {
                    this.imageChanged = true;
                    this.imageUrl = reader.result;
                }
            };
        }
    }

    saveImage() {
        this._profile.changePicture(this.profileForm.value.picture).subscribe(() => this.imageChanged = false);
    }

    changeUsername() {
        if (this.profileForm.value.username !== this.profile.username) {
            this._profile.changeUsername(this.profileForm.value.username).subscribe(() => {
                this.profile.username = this.profileForm.value.username;
                this.editUsername = false;
            }, err => this.errors = err.error);
        } else {
            this.editUsername = false;
        }
    }

    updateProfile() {
        let {birthdate, username, picture, ...bio} = this.profileForm.value;
        if (birthdate) {
            birthdate = birthdate.toISOString();
        }
        return this._profile.updateProfile({birthdate: birthdate, ...bio}).subscribe(res => {
            this.profile = res;
            this.editProfile = false;
        });

    }

    addFriend() {
        return this._profile.addFriend(this.userId).subscribe();
    }

    banUser() {
        return this._profile.banUser(this.userId).subscribe(() => this._router.navigate(['/']));
    }

    currentDay() {
        return new Date();
    }

    sendMessage() {
        this._router.navigate(['/profile/mails/create'], {queryParams: {recipient: this.userId}});
    }

}

