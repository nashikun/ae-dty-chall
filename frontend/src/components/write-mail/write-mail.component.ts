import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-write-mail',
  templateUrl: './write-mail.component.html',
  styleUrls: ['./write-mail.component.css']
})
export class WriteMailComponent implements OnInit {

  mailForm: FormGroup;
  recipient = '';
  userId = '';

  constructor(private _router: Router, private _route: ActivatedRoute, private _profile: ProfileService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (!params.recipient) {
        this._router.navigate(['/']);
      } else {
        this.userId = params.recipient;
        this._profile.getUsername(this.userId).subscribe(res => {
          this.recipient = res.username;
        });
      }
    });
    this.mailForm = this.fb.group({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)],
      }),
      message: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  sendMail() {
    this._profile.sendMessage(this.userId, this.mailForm.value).subscribe(() => this._router.navigate(['/profile/mails/received']));
  }

}
