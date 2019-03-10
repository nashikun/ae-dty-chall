import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessagesService} from '../../services/messages.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  mailId = '';
  mail = {title: '', senderId: '', recipientId: '', message: '', sender: {username: ''}, recipient: {username: ''}};

  constructor(private _activatedRoute: ActivatedRoute, private messages: MessagesService, public _auth: AuthService) {
  }

  ngOnInit() {
    this.mailId = this._activatedRoute.snapshot.paramMap.get('mail');
    this.messages.getMail(this.mailId).subscribe(res => {
      this.mail = res;
      console.log(res);
      if (!res.read && this.mail.recipientId == this._auth.getId()) {
        this.messages.markMailRead(this.mailId).subscribe();
      }
    });
  }

}
