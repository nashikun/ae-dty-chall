import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {MatTabChangeEvent, PageEvent} from '@angular/material';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
  selected = 0;
  sent = [];
  received = [];
  pageSize = 5;
  pageNumber = 0;
  sentCount = 0;
  receivedCount = 0;

  constructor(private _profile: ProfileService) {
  }

  ngOnInit() {
    this.getMails();
  }

  changePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getMails();
  }

  tabChange(event: MatTabChangeEvent) {
    this.selected = event.index;
    this.getMails();
  }

  getMails() {
    if (this.selected) {
      this._profile.getSentMails(this.pageSize, this.pageNumber).subscribe(res => {
        this.sent = res.sent;
        this.sentCount = res.sentCount;
      });
    } else {
      this._profile.getReceivedMails(this.pageSize, this.pageNumber).subscribe(res => {
        this.received = res.received;
        this.receivedCount = res.receivedCount;
      });
    }
  }


}
