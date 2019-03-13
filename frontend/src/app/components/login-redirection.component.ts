import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-redirection',
    template: ''
})

export class LoginRedirectionComponent implements OnInit {

    constructor(private ActivatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.ActivatedRoute.queryParams.subscribe(params => {
            localStorage.setItem('id', params.id);
            localStorage.setItem('role', params.role);
            window.close()
        });
    }


}
