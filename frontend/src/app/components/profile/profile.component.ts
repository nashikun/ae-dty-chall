import {Component, HostListener, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ImageValidator} from '../../validators/ImageValidator';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {AuthenticationService} from '../../services/authentication.service';

export class Profile {
    username: string;
    bio: string;
    birthdate: string;
    picture: string | ArrayBuffer;
    location: string;
    gender: string;
    friendship: string
}

// date Format
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
    imageUrl: string | ArrayBuffer;

    //booleans for rendering
    myProfile: boolean = false;
    editUsername: boolean = false;
    editProfile: boolean = false;
    imageChanged: boolean = false;

    // TODO ngx-editor's color picker is not user friendly. should change it later with https://www.npmjs.com/package/ngx-color-picker or something similar

    //Toolbar Options
    toolbarOptions: Object = {
        "editable": true,
        "spellcheck": true,
        "height": "auto",
        "minHeight": "0",
        "width": "auto",
        "minWidth": "0",
        "translate": "yes",
        "enableToolbar": true,
        "showToolbar": true,
        "placeholder": "Enter text here...",
        "imageEndPoint": ""
    };

    //toolbars by size
    buttons = [["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"], ["fontName", "fontSize", "color"], ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"], ["undo", "redo"], ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"], ["link", "unlink", "image", "video"]];
    buttons_md = [["bold", "italic", "underline"], ["strikeThrough", "superscript", "subscript"], ["fontName", "fontSize", "color"], ["justifyLeft", "justifyCenter", "justifyRight"], ["removeFormat", "undo", "redo"], ["horizontalLine", "orderedList", "unorderedList"], ["link", "unlink", "image", "video"]];
    buttons_sm = [["bold", "italic", "underline"], ["fontName", "fontSize", "color"], ["justifyLeft", "justifyCenter", "justifyRight"], ["removeFormat", "undo", "redo"], ["link", "unlink", "image", "video"]];

    constructor(private profileService: ProfileService, private auth: AuthenticationService, private router: Router,
                private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    }

    ngOnInit() {
        const innerWidth = window.innerWidth;
        if (innerWidth >= 1000) {
            this.toolbarOptions["toolbar"] = this.buttons;
        } else if (innerWidth >= 600) {
            this.toolbarOptions["toolbar"] = this.buttons_md;
        } else {
            this.toolbarOptions["toolbar"] = this.buttons_sm;
        }
        this.userId = this.activatedRoute.snapshot.paramMap.get('user');
        if (this.userId && this.userId != this.auth.getId()) {
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
                this.imageUrl = this.profile.picture;
                this.profileForm = this.fb.group({
                    username: new FormControl(this.profile.username, {validators: [Validators.required]}),
                    bio: new FormControl(this.profile.bio, {}),
                    // Thought about adding a validator to prevent xss attacks, but apparently
                    // input is escaped  in the plugin already
                    picture: new FormControl(this.profile.picture, {asyncValidators: [ImageValidator]}),
                    birthdate: new FormControl(this.profile.birthdate, {validators: []}),
                    location: new FormControl(this.profile.location, {}),
                    gender: new FormControl(this.profile.gender, {}),
                });
            });
        }
    }

    // Changing Toolbar buttons on resize
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const newWidth = event.target.innerWidth;
        if (newWidth >= 1000) {
            this.toolbarOptions["toolbar"] = this.buttons;
        } else if (newWidth >= 600) {
            this.toolbarOptions["toolbar"] = this.buttons_md;
        } else {
            this.toolbarOptions["toolbar"] = this.buttons_sm;
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
            birthdate = birthdate.toISOStringp();
        }
        this.profileService.updateProfile({birthdate: birthdate, ...bio}).subscribe(() => {
            this.editProfile = false;
        });
    }

    addFriend() {
        this.profileService.addFriend(this.userId).subscribe(res => {
            console.log(res);
            this.profile.friendship = this.profile.friendship ? "pending" : "accepted";
        });
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

