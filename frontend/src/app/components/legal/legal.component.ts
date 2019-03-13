import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-users',
    template: '<div [innerHtml]="pageTemplate"></div>',
})

// This comoonent is for terms of service, privacy policy etc. New pages need to be added in the asse folder and in the routing with their name as data

export class LegalComponent implements OnInit {

    pageTemplate;

    constructor(private route: ActivatedRoute, private http: HttpClient) {
    }

    ngOnInit() {
        this.route.data.subscribe((data => {
            console.log(data);
            this.http.get('assets/' + data.page, {observe: 'response', responseType: 'text'}).subscribe(res => {
                this.pageTemplate = res.body;
            })
        }));
    }


}
