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
    userId: string;
    profile = new Profile();
    profileForm: FormGroup;
    imageUrl: string | ArrayBuffer = BACKEND + '/images/profiles/default.jpg';

    //booleans for rendering
    myProfile: boolean = false;
    editUsername: boolean = false;
    editProfile: boolean = false;
    imageChanged: boolean = false;

    editorOptions: Object = {
        charCounterCount: false,
        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertTable', '|', 'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'undo', 'redo']
    };

    constructor(private profileService: ProfileService, private auth: AuthService, private router: Router,
                private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.userId = this.activatedRoute.snapshot.paramMap.get('user');
        if (this.userId) {
            this.profileService.getProfile(this.userId).subscribe(res => {
                this.profile = res;
                this.imageUrl = this.profile.picture;
                this.loaded = true;
            });
        } else {
            this.myProfile = true;
            this.profileService.getMyProfile().subscribe(res => {
                this.loaded = true;
                this.profile = res;
                console.log(res);
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
        this.profileService.changePicture(this.profileForm.value.picture).subscribe(() => this.imageChanged = false);
    }

    changeUsername() {
        if (this.profileForm.value.username !== this.profile.username) {
            this.profileService.changeUsername(this.profileForm.value.username).subscribe(() => {
                this.profile.username = this.profileForm.value.username;
                this.editUsername = false;
            }, err => this.errors = err.error);
        } else {
            this.editUsername = false;
        }
    }

    updateProfile() {
        let {birthdate, username, picture, ...bio} = this.profileForm.value;
        if (birthdate && birthdate != this.profile.birthdate) {
            birthdate = birthdate.toISOString();
        }
        this.profileService.updateProfile({birthdate: birthdate, ...bio}).subscribe(res => {
            this.profile = res;
            this.editProfile = false;
        });
    }

    addFriend() {
        this.profileService.addFriend(this.userId).subscribe();
    }

    banUser() {
        this.profileService.banUser(this.userId).subscribe(() => this.router.navigate(['/']));
    }

    currentDay() {
        return new Date();
    }

    sendMessage() {
        this.router.navigate(['/profile/mails/create'], {queryParams: {recipient: this.userId}});
    }

}

