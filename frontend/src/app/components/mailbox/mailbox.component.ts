import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {MatTabChangeEvent, PageEvent} from '@angular/material';
import {Message} from "../../interfaces/message";

@Component({
    selector: 'app-mailbox',
    templateUrl: './mailbox.component.html',
    styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit {
    selected: number = 0;
    sent: Message[] = [];
    received: Message[] = [];
    pageSize: number = 5;
    pageNumber: number = 0;
    sentCount: number = 0;
    receivedCount: number = 0;

    constructor(private _messages: MessagesService) {
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
            this._messages.getSentMails(this.pageSize, this.pageNumber).subscribe(res => {
                this.sentCount = res.sentCount;
                this.sent = res.sent;
            });
        } else {
            this._messages.getReceivedMails(this.pageSize, this.pageNumber).subscribe(res => {
                this.received = res.received;
                this.receivedCount = res.receivedCount;
            });
        }
    }


}
