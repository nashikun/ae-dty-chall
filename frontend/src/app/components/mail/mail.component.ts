import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  mailId = '';
  mail = {title: '', senderId: '', recipientId: '', message: '', sender: {username: ''}, recipient: {username: ''}};

  constructor(private _activatedRoute: ActivatedRoute, private _profile: ProfileService, public _auth: AuthService) {
  }

  ngOnInit() {
    this.mailId = this._activatedRoute.snapshot.paramMap.get('mail');
    this._profile.getMail(this.mailId).subscribe(res => {
      this.mail = res;
      if (!res.read && this.mail.recipientId == this._auth.getId()) {
        this._profile.markMailRead(this.mailId).subscribe();
      }
    });
  }

}
