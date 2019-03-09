(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./anime.module": [
		"./src/app/modules/anime.module.ts",
		"common",
		"anime-module"
	],
	"./profile.module": [
		"./src/app/modules/profile.module.ts",
		"common",
		"profile-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-guest-header *ngIf=\"!_auth.loggedIn()\"></app-guest-header>\r\n<app-user-header *ngIf=\"_auth.loggedIn()\"></app-user-header>\r\n<router-outlet></router-outlet>\r\n\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");



var AppComponent = /** @class */ (function () {
    function AppComponent(_auth) {
        this._auth = _auth;
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/components/errors/page-not-found.component.css":
/*!****************************************************************!*\
  !*** ./src/app/components/errors/page-not-found.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZXJyb3JzL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/errors/page-not-found.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/errors/page-not-found.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "404 Page not found\n"

/***/ }),

/***/ "./src/app/components/errors/page-not-found.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/errors/page-not-found.component.ts ***!
  \***************************************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-page-not-found',
            template: __webpack_require__(/*! ./page-not-found.component.html */ "./src/app/components/errors/page-not-found.component.html"),
            styles: [__webpack_require__(/*! ./page-not-found.component.css */ "./src/app/components/errors/page-not-found.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "./src/app/components/header/guest-header.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/header/guest-header.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\r\n  flex: 1 1 auto;\r\n}\r\n\r\n.dropdown-menu{\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9oZWFkZXIvZ3Vlc3QtaGVhZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaGVhZGVyL2d1ZXN0LWhlYWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNwYWNlciB7XHJcbiAgZmxleDogMSAxIGF1dG87XHJcbn1cclxuXHJcbi5kcm9wZG93bi1tZW51e1xyXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/header/guest-header.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/header/guest-header.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n <span>\n     <button mat-button routerLink=\"\">My List</button>\n  </span>\n  <span class=\"spacer\">  </span>\n\n  <!-- Menu Start -->\n  <button mat-button routerLink=\"/animes\">Animes</button>\n  <button *ngIf=\"!_auth.loggedIn()\" [matMenuTriggerFor]=\"menu\" mat-button>\n    <mat-icon>more_vert</mat-icon>\n  </button>\n  <mat-menu #menu>\n    <div>\n      <button mat-button routerLink=\"/register\">Register</button>\n    </div>\n    <div>\n      <button mat-button routerLink=\"/login\">Login</button>\n    </div>\n  </mat-menu>\n  <!-- Menu End -->\n\n</mat-toolbar>\n\n"

/***/ }),

/***/ "./src/app/components/header/guest-header.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/header/guest-header.component.ts ***!
  \*************************************************************/
/*! exports provided: GuestHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuestHeaderComponent", function() { return GuestHeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var GuestHeaderComponent = /** @class */ (function () {
    function GuestHeaderComponent(_router, _auth) {
        this._router = _router;
        this._auth = _auth;
    }
    GuestHeaderComponent.prototype.ngOnInit = function () {
    };
    GuestHeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-guest-header',
            template: __webpack_require__(/*! ./guest-header.component.html */ "./src/app/components/header/guest-header.component.html"),
            styles: [__webpack_require__(/*! ./guest-header.component.css */ "./src/app/components/header/guest-header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], GuestHeaderComponent);
    return GuestHeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/home/home.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/home/home.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-container {\r\n  position: relative;\r\n\r\n  overflow: auto;\r\n  height: 300px;\r\n  min-height: 0;\r\n  margin: 8px 16px;\r\n  border-radius: 4px;\r\n\r\n}\r\n\r\n.action-button {\r\n  box-sizing: border-box;\r\n  width: calc(100% - 16px);\r\n  min-height: 35px;\r\n  padding: 4px 16px;\r\n  margin: 8px;\r\n  border: 1px solid #555;\r\n  border-radius: 4px;\r\n\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  font-weight: bold;\r\n  line-height: 14px;\r\n  text-align: center;\r\n}\r\n\r\n.swiper-container {\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n}\r\n\r\n.swiper-slide {\r\n  color: #aaa;\r\n  background-color: #eee;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFrQjs7RUFFbEIsY0FBYztFQUNkLGFBQWE7RUFDYixhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGtCQUFrQjs7QUFFcEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsd0JBQXdCO0VBQ3hCLGdCQUFnQjtFQUNoQixpQkFBaUI7RUFDakIsV0FBVztFQUNYLHNCQUFzQjtFQUN0QixrQkFBa0I7O0VBRWxCLGVBQWU7RUFDZixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLFFBQVE7RUFDUixTQUFTO0VBQ1QsT0FBTztBQUNUOztBQUVBO0VBQ0UsV0FBVztFQUNYLHNCQUFzQjtBQUN4QiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaG9tZS9ob21lLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGVudC1jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcbiAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgaGVpZ2h0OiAzMDBweDtcclxuICBtaW4taGVpZ2h0OiAwO1xyXG4gIG1hcmdpbjogOHB4IDE2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG5cclxufVxyXG5cclxuLmFjdGlvbi1idXR0b24ge1xyXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDE2cHgpO1xyXG4gIG1pbi1oZWlnaHQ6IDM1cHg7XHJcbiAgcGFkZGluZzogNHB4IDE2cHg7XHJcbiAgbWFyZ2luOiA4cHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcblxyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uc3dpcGVyLWNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbiAgbGVmdDogMDtcclxufVxyXG5cclxuLnN3aXBlci1zbGlkZSB7XHJcbiAgY29sb3I6ICNhYWE7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/home/home.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/home/home.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div [ngStyle.lt-sm]=\"'min-height: 300px;'\" fxLayout=\"column\">\r\n  <div fxFlex=\"100%\" fxLayout=\"column\" fxLayoutAlign=\"stretch\">\r\n    <div>Latest Animes</div>\r\n    <div class=\"content-container\" fxFlex=\"auto\" fxLayout=\"column\" fxLayoutAlign=\"stretch\">\r\n      <swiper *ngIf=\"show\" [config]=\"config\" class=\"swiper-container\" fxFlex=\"auto\">\r\n        <div *ngFor=\"let anime of latestAnimes\" class=\"swiper-slide\">\r\n          <div fxFlexFill fxLayout=\"column\" fxLayoutAlign=\"center center\">\r\n            <img [alt]=\"anime.name\" [routerLink]=\"['/animes',anime._id]\" [src]=\"anime.image\" height=\"100%\" width=\"80%\">\r\n          </div>\r\n        </div>\r\n      </swiper>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/home/home.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_anime_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/anime.service */ "./src/app/services/anime.service.ts");



var HomeComponent = /** @class */ (function () {
    function HomeComponent(animeService) {
        this.animeService = animeService;
        this.latestAnimes = [];
        this.show = false;
        this.config = {
            direction: 'horizontal',
            slidesPerView: 4,
            keyboard: true,
            mousewheel: true,
            scrollbar: false,
            navigation: true,
            pagination: false
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var innerWidth = window.innerWidth;
        if (innerWidth >= 1024) {
            this.config.slidesPerView = 4;
        }
        else if (innerWidth >= 800) {
            this.config.slidesPerView = 3;
        }
        else if (innerWidth >= 500) {
            this.config.slidesPerView = 2;
        }
        else {
            this.config.slidesPerView = 1;
        }
        this.animeService.getLatest().subscribe(function (res) {
            _this.latestAnimes = res;
            _this.show = true;
        });
    };
    HomeComponent.prototype.onResize = function (event) {
        var newWidth = event.target.innerWidth;
        if (newWidth >= 1024) {
            this.config.slidesPerView = 4;
        }
        else if (newWidth >= 800) {
            this.config.slidesPerView = 3;
        }
        else if (newWidth >= 500) {
            this.config.slidesPerView = 2;
        }
        else {
            this.config.slidesPerView = 1;
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:resize', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], HomeComponent.prototype, "onResize", null);
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/components/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/components/home/home.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_anime_service__WEBPACK_IMPORTED_MODULE_2__["AnimeService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/components/login/login.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/login/login.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/login/login.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/login/login.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      Login\n    </mat-card-title>\n  </mat-card-header>\n  <form class=\"form\" [formGroup]=\"loginForm\" (submit)=\"loginUser()\" autocomplete=\"on\">\n    <div>\n      <mat-form-field>\n        <input matInput formControlName=\"email\" placeholder=\"email\" name=\"email\" type=\"text\" class=\"form-control rounded-0\"\n               autocomplete=\"email\" required/>\n        <mat-error *ngIf=\"loginForm.get('email').invalid\">\n          Invalid email\n        </mat-error>\n      </mat-form-field>\n    </div>\n    <p></p>\n    <p></p>\n    <div>\n      <mat-form-field>\n        <input matInput formControlName=\"password\" placeholder=\"password\" name=\"password\" type=\"password\"\n               class=\"form-control rounded-0\"\n               autocomplete=\"new-password\" required/>\n        <mat-error *ngIf=\"loginForm.get('password').invalid\">\n          Invalid password\n        </mat-error>\n      </mat-form-field>\n    </div>\n    <p></p>\n    <p></p>\n    <button [disabled]=\"loginForm.invalid\" mat-button>Login</button>\n    <mat-error *ngIf=\"errors.MAX_ATTEMPTS\" class=\"alert alert-warning\" role=\"alert\"> Too many login attempts, this\n      account has been locked. Please wait 1h before attempting again.\n    </mat-error>\n    <mat-error *ngIf=\"errors.WRONG_CREDITENTIALS\" class=\"alert alert-warning\" role=\"alert\"> Username and/or password\n      is incorrect. Please try again.\n    </mat-error>\n  </form>\n</mat-card>\n\n\n"

/***/ }),

/***/ "./src/app/components/login/login.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");





var LoginComponent = /** @class */ (function () {
    function LoginComponent(_auth, _router, fb) {
        this._auth = _auth;
        this._router = _router;
        this.fb = fb;
        this.errors = { MAX_ATTEMPTS: false, WRONG_CREDITENTIALS: false };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            }),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,20}$')
                ]
            })
        });
    };
    LoginComponent.prototype.loginUser = function () {
        var _this = this;
        this._auth.loginUser(this.loginForm.value).subscribe(function () {
            _this._router.navigate(["/profile/animelist"]);
        }, function (err) {
            _this.errors = err.error;
        });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/components/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/components/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/components/register/mail-sent.html":
/*!****************************************************!*\
  !*** ./src/app/components/register/mail-sent.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "Verification mail sent to the specified email adress.\r\n"

/***/ }),

/***/ "./src/app/components/register/register.component.css":
/*!************************************************************!*\
  !*** ./src/app/components/register/register.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/components/register/register.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/register/register.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n    <mat-card-title>\r\n      Register\r\n    </mat-card-title>\r\n  </mat-card-header>\r\n  <form class=\"form\" [formGroup]=\"registrationForm\" (submit)=\"registerUser()\" autocomplete=\"on\">\r\n    <div>\r\n      <mat-form-field>\r\n        <input matInput formControlName=\"email\" placeholder=\"email\" name=\"email\" type=\"text\"\r\n               class=\"form-control rounded-0\"\r\n               autocomplete=\"email\" required/>\r\n        <mat-error *ngIf=\"registrationForm.get('email').hasError('required')\">Please Enter an email</mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n    <p></p>\r\n    <p></p>\r\n    <div>\r\n      <mat-form-field>\r\n        <input matInput formControlName=\"password\" placeholder=\"password\" name=\"password\" type=\"password\"\r\n               class=\"form-control rounded-0\"\r\n               autocomplete=\"new-password\" required/>\r\n        <mat-error *ngIf=\"registrationForm.get('password').hasError('required')\">Please Enter a password</mat-error>\r\n        <mat-error *ngIf=\"registrationForm.get('password').hasError('pattern')\">Password should be between 6 and 20\r\n          character long, contain at least a lower case letter, an upper case letter nd a digit\r\n        </mat-error>\r\n      </mat-form-field>\r\n    </div>\r\n    <p></p>\r\n    <p></p>\r\n    <div>\r\n    </div>\r\n    <p></p>\r\n    <re-captcha formControlName=\"recaptcha\"\r\n                siteKey=\"6LeU3JIUAAAAAIwinZbgOSQ0rm8ALqyrfjfN8h5I\"></re-captcha>\r\n    <p></p>\r\n    <button mat-button [disabled]=\"registrationForm.invalid\">Register</button>\r\n    <div *ngIf=\"errors.emailExists\"> Email already taken. Please choose an other one</div>\r\n\r\n  </form>\r\n</mat-card>\r\n\r\n"

/***/ }),

/***/ "./src/app/components/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent, MailSent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailSent", function() { return MailSent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _util_UsernameValidator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/UsernameValidator */ "./src/app/util/UsernameValidator.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");







var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_auth, _router, fb, usernameValidator, dialog) {
        this._auth = _auth;
        this._router = _router;
        this.fb = fb;
        this.usernameValidator = usernameValidator;
        this.dialog = dialog;
        this.errors = { emailExists: false };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registrationForm = this.fb.group({
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern('(?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+).{6,20}$')
                ]
            }),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern('([!#-\'*+/-9=?A-Z^-~-]+(\\.[!#-\'*+/-9=?A-Z^-~-]+)*|"([]!#-[^-~ \\t]' +
                        '|(\\\\[\\t -~]))+")@([!#-\'*+/-9=?A-Z^-~-]+(\\.[!#-\'*+/-9=?A-Z^-~-]+)*|\\[[\\t -Z^-~]*])')
                ]
            }),
            recaptcha: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required] })
        });
    };
    RegisterComponent.prototype.registerUser = function () {
        var _this = this;
        this._auth.registerUser(this.registrationForm.value).subscribe(function (res) {
            if (res.success) {
                var dialogRef = _this.dialog.open(MailSent, {});
                dialogRef.afterClosed().subscribe(function () {
                    _this._router.navigate(['/']);
                });
            }
        }, function (err) {
            console.error(err);
            _this.errors = err.error || {};
        });
    };
    RegisterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/components/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/components/register/register.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _util_UsernameValidator__WEBPACK_IMPORTED_MODULE_4__["UsernameValidator"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialog"]])
    ], RegisterComponent);
    return RegisterComponent;
}());

var MailSent = /** @class */ (function () {
    function MailSent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        // TODO maybe later on add the emai; jere to show it
    }
    MailSent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'mail-sent',
            template: __webpack_require__(/*! ./mail-sent.html */ "./src/app/components/register/mail-sent.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogRef"], Object])
    ], MailSent);
    return MailSent;
}());



/***/ }),

/***/ "./src/app/components/user-header/user-header.component.css":
/*!******************************************************************!*\
  !*** ./src/app/components/user-header/user-header.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\r\n  flex: 1 1 auto;\r\n}\r\n\r\n.dropdown-menu {\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy91c2VyLWhlYWRlci91c2VyLWhlYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL3VzZXItaGVhZGVyL3VzZXItaGVhZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3BhY2VyIHtcclxuICBmbGV4OiAxIDEgYXV0bztcclxufVxyXG5cclxuLmRyb3Bkb3duLW1lbnUge1xyXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xyXG4gIG92ZXJmbG93LXk6IGF1dG87XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/user-header/user-header.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/components/user-header/user-header.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n <span>\n     <button mat-button routerLink=\"\">My List</button>\n  </span>\n  <span class=\"spacer\">  </span>\n\n  <!--Unread Messages Starts -->\n  <button *ngIf=\"_auth.loggedIn()\" [matBadge]=\"nMessages?nMessages:null\" mat-button matBadgeColor=\"warn\"\n          routerLink=\"/profile/mails/received\">\n    <mat-icon>email</mat-icon>\n  </button>\n  <!--Unread Messages End-->\n\n  <!--Friend Requests Starts -->\n  <button mat-button [matBadge]=\"nfriendRequests?nfriendRequests:null\" matBadgeColor=\"warn\"\n          [matMenuTriggerFor]=\"friends\">\n    <mat-icon svgIcon=\"friends\" [ngStyle]=\"{'color': '#ffffff'}\"></mat-icon>\n  </button>\n  <mat-menu #friends=\"matMenu\" class=\"dropdown-menu\">\n    <div mat-menu-item *ngFor=\"let fr of friendRequests\">\n      <img [src]=\"fr.friend.picture\" height=\"20px\" width=\"20px\"> {{fr.friend.username}}\n      <button mat-button color=\"accent\" (click)=\"acceptFriend(fr)\"> Accept Request</button>\n    </div>\n    <div mat-menu-item *ngIf=\"!nfriendRequests\">\n      No Friend Requests To Show\n    </div>\n  </mat-menu>\n  <!--Friend Requests End-->\n\n  <button *ngIf=\"_auth.isAdmin()\" mat-button routerLink=\"/animes/addAnime\">Add Anime</button>\n  <button fxHide.lt-sm fxShow.gt-sm mat-button routerLink=\"/animes\">Animes</button>\n  <button [matMenuTriggerFor]=\"profile\" mat-button>Menu</button>\n  <mat-menu #profile>\n    <div>\n      <button mat-button routerLink=\"/profile/animelist\">Anime List</button>\n    </div>\n    <div>\n      <button mat-button routerLink=\"/profile\">Profile</button>\n    </div>\n    <div fxHide fxShow.lt-sm>\n      <button mat-button routerLink=\"/animes\">Animes</button>\n    </div>\n    <div>\n      <button mat-button style=\"cursor: pointer\" (click)=\"_auth.logOut()\">Logout</button>\n    </div>\n  </mat-menu>\n</mat-toolbar>\n\n"

/***/ }),

/***/ "./src/app/components/user-header/user-header.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/user-header/user-header.component.ts ***!
  \*****************************************************************/
/*! exports provided: UserHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserHeaderComponent", function() { return UserHeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _services_profile_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/profile.service */ "./src/app/services/profile.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");









var UserHeaderComponent = /** @class */ (function () {
    function UserHeaderComponent(_router, _auth, _profile, matIconRegistry, domSanitizer) {
        this._router = _router;
        this._auth = _auth;
        this._profile = _profile;
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.friendRequests = [];
        this.nfriendRequests = 0;
        this.nMessages = 0;
        this.matIconRegistry.addSvgIcon('friends', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/friends-24px.svg'));
    }
    UserHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerEvents = this._router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (e) { return _this._auth.loggedIn() && (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterEvent"]); }))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["debounce"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["timer"])(1000); }));
        this.routerEvents.subscribe(function () {
            _this._profile.getFriendRequests().subscribe(function (res) {
                _this.friendRequests = res;
                _this.nfriendRequests = res.length;
            });
            _this._profile.getMessagesCount().subscribe(function (res) { return _this.nMessages = res.count; });
        });
    };
    UserHeaderComponent.prototype.ngOnDestroy = function () {
        this.routerEvents.unsubscribe();
    };
    UserHeaderComponent.prototype.acceptFriend = function (fr) {
        var _this = this;
        return this._profile.addFriend(fr._id).subscribe(function () {
            var index = _this.friendRequests.indexOf(fr);
            _this.friendRequests.splice(index, 1);
            _this.nfriendRequests--;
        });
    };
    UserHeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-user-header',
            template: __webpack_require__(/*! ./user-header.component.html */ "./src/app/components/user-header/user-header.component.html"),
            styles: [__webpack_require__(/*! ./user-header.component.css */ "./src/app/components/user-header/user-header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _services_profile_service__WEBPACK_IMPORTED_MODULE_5__["ProfileService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatIconRegistry"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["DomSanitizer"]])
    ], UserHeaderComponent);
    return UserHeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/verification/verification.component.css":
/*!********************************************************************!*\
  !*** ./src/app/components/verification/verification.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvdmVyaWZpY2F0aW9uL3ZlcmlmaWNhdGlvbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/verification/verification.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/components/verification/verification.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"show\"> Please choose a username to finish the verification\r\n  <p>\r\n  </p>\r\n  <form (submit)=\"saveUsername()\">\r\n    <mat-form-field>\r\n      <input matInput name=\"username\" placeholder=\"Username\" [(ngModel)]=\"username\" required>\r\n    </mat-form-field>\r\n    <button mat-button type=\"submit\"> Save username</button>\r\n    <mat-error *ngIf=\"errors.verified\" class=\"alert alert-warning\" role=\"alert\">\r\n      The user is already verified.\r\n    </mat-error>\r\n    <mat-error *ngIf=\"errors.wrongLink\" class=\"alert alert-warning\" role=\"alert\">\r\n      Wrong verification link.\r\n    </mat-error>\r\n    <mat-error *ngIf=\"errors.usernameExists\" class=\"alert alert-warning\" role=\"alert\">\r\n      Username already taken\r\n    </mat-error>\r\n  </form>\r\n</div>\r\n<div *ngIf=\"verified\">\r\n  Verification complete. You can now login\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/verification/verification.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/verification/verification.component.ts ***!
  \*******************************************************************/
/*! exports provided: VerificationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerificationComponent", function() { return VerificationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var VerificationComponent = /** @class */ (function () {
    function VerificationComponent(_auth, _activatedRoute) {
        this._auth = _auth;
        this._activatedRoute = _activatedRoute;
        this.Url = '';
        this.username = '';
        this.show = false;
        this.errors = {};
        this.verified = false;
    }
    VerificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.Url = this._activatedRoute.snapshot.paramMap.get('Url');
        this._auth.verifyUser(this.Url).subscribe(function (id) {
            _this.userId = id.id;
            _this.show = true;
        });
    };
    VerificationComponent.prototype.saveUsername = function () {
        var _this = this;
        this._auth.addUsername(this.userId, this.Url, this.username).subscribe(function (res) {
            if (res.success) {
                _this.verified = true;
                _this.show = false;
            }
        }, function (err) {
            _this.errors = err.error;
        });
    };
    VerificationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-verification',
            template: __webpack_require__(/*! ./verification.component.html */ "./src/app/components/verification/verification.component.html"),
            styles: [__webpack_require__(/*! ./verification.component.css */ "./src/app/components/verification/verification.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], VerificationComponent);
    return VerificationComponent;
}());

/*
* () => {
      this._router.navigate([`/animelist`]);
    }*/


/***/ }),

/***/ "./src/app/error-interceptor.ts":
/*!**************************************!*\
  !*** ./src/app/error-interceptor.ts ***!
  \**************************************/
/*! exports provided: ErrorInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");






var ErrorInterceptor = /** @class */ (function () {
    function ErrorInterceptor(dialog, router) {
        this.dialog = dialog;
        this.router = router;
    }
    ErrorInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next
            .handle(req)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (error) {
            if (error.status == 404) {
                _this.router.navigate(['/page-not-found']);
            }
            if (error.status == 401) {
                _this.router.navigate(['/login']);
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
        }));
    };
    ErrorInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], ErrorInterceptor);
    return ErrorInterceptor;
}());



/***/ }),

/***/ "./src/app/modules/angular-material.module.ts":
/*!****************************************************!*\
  !*** ./src/app/modules/angular-material.module.ts ***!
  \****************************************************/
/*! exports provided: AngularMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularMaterialModule", function() { return AngularMaterialModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");



var AngularMaterialModule = /** @class */ (function () {
    function AngularMaterialModule() {
    }
    AngularMaterialModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBadgeModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginatorModule"]
            ]
        })
    ], AngularMaterialModule);
    return AngularMaterialModule;
}());



/***/ }),

/***/ "./src/app/modules/app-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/modules/app-routing.module.ts ***!
  \***********************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/register/register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _components_verification_verification_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/verification/verification.component */ "./src/app/components/verification/verification.component.ts");
/* harmony import */ var _components_errors_page_not_found_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/errors/page-not-found.component */ "./src/app/components/errors/page-not-found.component.ts");








var routes = [
    { path: '', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"], pathMatch: 'full' },
    { path: 'login', component: _components_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
    { path: 'register', component: _components_register_register_component__WEBPACK_IMPORTED_MODULE_4__["RegisterComponent"] },
    { path: 'verify/:Url', component: _components_verification_verification_component__WEBPACK_IMPORTED_MODULE_6__["VerificationComponent"] },
    { path: 'profile', loadChildren: './profile.module#ProfileModule' },
    { path: 'animes', loadChildren: './anime.module#AnimeModule' },
    { path: '**', component: _components_errors_page_not_found_component__WEBPACK_IMPORTED_MODULE_7__["PageNotFoundComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/app.module.ts":
/*!***************************************!*\
  !*** ./src/app/modules/app.module.ts ***!
  \***************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/modules/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/home/home.component */ "./src/app/components/home/home.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _token_interceptor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../token-interceptor */ "./src/app/token-interceptor.ts");
/* harmony import */ var _error_interceptor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../error-interceptor */ "./src/app/error-interceptor.ts");
/* harmony import */ var _services_anime_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/anime.service */ "./src/app/services/anime.service.ts");
/* harmony import */ var _util_UsernameValidator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../util/UsernameValidator */ "./src/app/util/UsernameValidator.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _components_errors_page_not_found_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/errors/page-not-found.component */ "./src/app/components/errors/page-not-found.component.ts");
/* harmony import */ var _angular_material_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./angular-material.module */ "./src/app/modules/angular-material.module.ts");
/* harmony import */ var _auth_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./auth.module */ "./src/app/modules/auth.module.ts");
/* harmony import */ var ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-swiper-wrapper */ "./node_modules/ngx-swiper-wrapper/dist/ngx-swiper-wrapper.es5.js");



















var DEFAULT_SWIPER_CONFIG = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"],
                _components_errors_page_not_found_component__WEBPACK_IMPORTED_MODULE_15__["PageNotFoundComponent"],
            ],
            imports: [
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _angular_material_module__WEBPACK_IMPORTED_MODULE_16__["AngularMaterialModule"],
                _auth_module__WEBPACK_IMPORTED_MODULE_17__["AuthModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_14__["FlexLayoutModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__["BrowserAnimationsModule"],
                ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_18__["SwiperModule"]
            ],
            providers: [
                _services_auth_service__WEBPACK_IMPORTED_MODULE_8__["AuthService"],
                _services_anime_service__WEBPACK_IMPORTED_MODULE_11__["AnimeService"],
                {
                    provide: ngx_swiper_wrapper__WEBPACK_IMPORTED_MODULE_18__["SWIPER_CONFIG"],
                    useValue: DEFAULT_SWIPER_CONFIG
                },
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"],
                    useClass: _token_interceptor__WEBPACK_IMPORTED_MODULE_9__["TokenInterceptor"],
                    multi: true
                }, {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"],
                    useClass: _error_interceptor__WEBPACK_IMPORTED_MODULE_10__["ErrorInterceptor"],
                    multi: true
                },
                _util_UsernameValidator__WEBPACK_IMPORTED_MODULE_12__["UsernameValidator"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());

//TODO ADD TYPE INTERFACES,
// fix the stupid css thing a bit more


/***/ }),

/***/ "./src/app/modules/auth.module.ts":
/*!****************************************!*\
  !*** ./src/app/modules/auth.module.ts ***!
  \****************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/login/login.component */ "./src/app/components/login/login.component.ts");
/* harmony import */ var _components_register_register_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/register/register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _components_header_guest_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/header/guest-header.component */ "./src/app/components/header/guest-header.component.ts");
/* harmony import */ var _components_user_header_user_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/user-header/user-header.component */ "./src/app/components/user-header/user-header.component.ts");
/* harmony import */ var _components_verification_verification_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/verification/verification.component */ "./src/app/components/verification/verification.component.ts");
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng-recaptcha */ "./node_modules/ng-recaptcha/index.js");
/* harmony import */ var ng_recaptcha__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ng_recaptcha__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ng_recaptcha_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng-recaptcha/forms */ "./node_modules/ng-recaptcha/forms.js");
/* harmony import */ var ng_recaptcha_forms__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ng_recaptcha_forms__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _angular_material_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./angular-material.module */ "./src/app/modules/angular-material.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");














var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _components_header_guest_header_component__WEBPACK_IMPORTED_MODULE_4__["GuestHeaderComponent"],
                _components_user_header_user_header_component__WEBPACK_IMPORTED_MODULE_5__["UserHeaderComponent"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
                _components_register_register_component__WEBPACK_IMPORTED_MODULE_3__["RegisterComponent"],
                _components_verification_verification_component__WEBPACK_IMPORTED_MODULE_6__["VerificationComponent"],
                _components_register_register_component__WEBPACK_IMPORTED_MODULE_3__["MailSent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_11__["CommonModule"],
                _angular_material_module__WEBPACK_IMPORTED_MODULE_9__["AngularMaterialModule"],
                ng_recaptcha__WEBPACK_IMPORTED_MODULE_7__["RecaptchaModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
                ng_recaptcha_forms__WEBPACK_IMPORTED_MODULE_8__["RecaptchaFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_13__["FlexLayoutModule"]
            ],
            exports: [
                _components_header_guest_header_component__WEBPACK_IMPORTED_MODULE_4__["GuestHeaderComponent"],
                _components_user_header_user_header_component__WEBPACK_IMPORTED_MODULE_5__["UserHeaderComponent"],
                _components_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
                _components_register_register_component__WEBPACK_IMPORTED_MODULE_3__["RegisterComponent"],
                _components_verification_verification_component__WEBPACK_IMPORTED_MODULE_6__["VerificationComponent"],
                _components_register_register_component__WEBPACK_IMPORTED_MODULE_3__["MailSent"]
            ],
            entryComponents: [_components_register_register_component__WEBPACK_IMPORTED_MODULE_3__["MailSent"]]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/services/anime.service.ts":
/*!*******************************************!*\
  !*** ./src/app/services/anime.service.ts ***!
  \*******************************************/
/*! exports provided: AnimeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimeService", function() { return AnimeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");




var AnimeService = /** @class */ (function () {
    function AnimeService(http, _auth) {
        this.http = http;
        this._auth = _auth;
        this._animesUrl = 'https://localhost:3000/animes/';
    }
    AnimeService.prototype.getAnimes = function (PageSize, PageNumber, Search, SortType, SortOrder) {
        return this.http.get("https://localhost:3000/animes/?page=" + PageNumber + "&size=" + PageSize + "&search=" + Search + "&sort=" + SortType + "&order=" + SortOrder);
    };
    AnimeService.prototype.getAnime = function (anime) {
        return this.http.get("https://localhost:3000/animes/" + anime);
    };
    AnimeService.prototype.addAnime = function (anime) {
        // const image = imageUrl.split(',')[1];
        var postData = new FormData();
        postData.append('name', anime.name);
        postData.append('description', anime.description);
        postData.append('episodes', anime.episodes);
        postData.append('image', anime.image, anime.name);
        return this.http.post(this._animesUrl, postData);
    };
    AnimeService.prototype.getReviews = function (anime) {
        return this.http.get("https://localhost:3000/animes/" + anime + "/reviews");
    };
    AnimeService.prototype.postReview = function (anime, review) {
        return this.http.post("https://localhost:3000/animes/" + anime + "/reviews", { review: review });
    };
    AnimeService.prototype.editReview = function (anime, reviewId, review) {
        return this.http.patch("https://localhost:3000/animes/" + anime + "/reviews/" + reviewId, { review: review });
    };
    AnimeService.prototype.deleteReview = function (anime, reviewId) {
        return this.http.delete("https://localhost:3000/animes/" + anime + "/reviews/" + reviewId);
    };
    AnimeService.prototype.upvote = function (anime, reviewId) {
        return this.http.post("https://localhost:3000/animes/" + anime + "/reviews/" + reviewId + "/upvotes", {});
    };
    AnimeService.prototype.unvote = function (anime, reviewId) {
        return this.http.delete("https://localhost:3000/animes/" + anime + "/reviews/" + reviewId + "/upvotes/" + this._auth.getId(), {});
    };
    AnimeService.prototype.addRating = function (anime, rating) {
        return this.http.post("https://localhost:3000/animes/" + anime + "/ratings", { rating: rating });
    };
    AnimeService.prototype.changeRating = function (anime, ratingId, rating) {
        return this.http.put("https://localhost:3000/animes/" + anime + "/ratings/" + ratingId, { rating: rating });
    };
    AnimeService.prototype.getLatest = function () {
        return this.http.get('https://localhost:3000/animes/latest');
    };
    AnimeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], AnimeService);
    return AnimeService;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");





var AuthService = /** @class */ (function () {
    function AuthService(http, _router) {
        var _this = this;
        this.http = http;
        this._router = _router;
        this.username = '';
        this.logOut = function () {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            _this._router.navigate(['/']);
        };
        this.isAdmin = function () { return localStorage.getItem('role') === 'admin'; };
        this.loggedIn = function () { return !!localStorage.getItem('token'); };
        this.getToken = function () { return localStorage.getItem('token'); };
        this.getId = function () { return localStorage.getItem('id'); };
    }
    AuthService.prototype.existingUser = function (user) {
        return this.http.get("https://localhost:3000/users/" + user);
    };
    AuthService.prototype.registerUser = function (user) {
        return this.http.post("https://localhost:3000/users", user);
    };
    AuthService.prototype.loginUser = function (user) {
        return this.http.post('https://localhost:3000/users/login', user).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', res.id);
            localStorage.setItem('role', res.role);
            return res;
        }));
    };
    AuthService.prototype.verifyUser = function (Url) {
        return this.http.get("https://localhost:3000/users/verify/" + Url);
    };
    AuthService.prototype.addUsername = function (userId, url, username) {
        return this.http.post("https://localhost:3000/users/" + userId + "/profile/username", { url: url, username: username });
    };
    AuthService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/services/profile.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/profile.service.ts ***!
  \*********************************************/
/*! exports provided: ProfileService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileService", function() { return ProfileService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");




var ProfileService = /** @class */ (function () {
    function ProfileService(http, _auth) {
        this.http = http;
        this._auth = _auth;
    }
    ProfileService.prototype.getProfile = function (userId) {
        return this.http.get("https://localhost:3000/users/" + userId + "/profile");
    };
    ProfileService.prototype.getMyProfile = function () {
        return this.http.get("https://localhost:3000/users/" + this._auth.getId() + "/profile");
    };
    ProfileService.prototype.changePicture = function (picture) {
        var pictureData = new FormData();
        pictureData.append('picture', picture);
        return this.http.put("https://localhost:3000/users/" + this._auth.getId() + "/profile/picture", pictureData);
    };
    ProfileService.prototype.changeUsername = function (username) {
        return this.http.put("https://localhost:3000/users/" + this._auth.getId() + "/profile/username", { username: username });
    };
    ProfileService.prototype.getUsername = function (userId) {
        return this.http.get("https://localhost:3000/users/" + userId + "/profile/username");
    };
    ProfileService.prototype.updateProfile = function (profile) {
        return this.http.put("https://localhost:3000/users/" + this._auth.getId() + "/profile/bio", profile);
    };
    ProfileService.prototype.addFriend = function (friend) {
        return this.http.post("https://localhost:3000/users/" + this._auth.getId() + "/profile/friends", { friend: friend });
    };
    ProfileService.prototype.getFriendRequests = function () {
        return this.http.get("https://localhost:3000/users/" + this._auth.getId() + "/profile/friends/requested");
    };
    ProfileService.prototype.sendMessage = function (userId, message) {
        return this.http.post("https://localhost:3000/users/" + userId + "/profile/messages", message);
    };
    ProfileService.prototype.getMessagesCount = function () {
        return this.http.get("https://localhost:3000/users/" + this._auth.getId() + "/profile/messages/unread-count");
    };
    ProfileService.prototype.getSentMails = function (PageSize, PageNumber) {
        return this.http.get("https://localhost:3000/users/" + this._auth.getId() + "/profile/messages/sent?page=" + PageNumber + "&size=" + PageSize);
    };
    ProfileService.prototype.getReceivedMails = function (PageSize, PageNumber) {
        return this.http.get("https://localhost:3000/users/" + this._auth.getId() + "/profile/messages/received?page=" + PageNumber + "&size=" + PageSize);
    };
    ProfileService.prototype.getMail = function (messageId) {
        return this.http.get("https://localhost:3000/users/" + this._auth.getId() + "/profile/messages/" + messageId);
    };
    ProfileService.prototype.markMailRead = function (messageId) {
        return this.http.post("https://localhost:3000/users/" + this._auth.getId() + "/profile/messages/" + messageId + "/set-read", {});
    };
    ProfileService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], ProfileService);
    return ProfileService;
}());



/***/ }),

/***/ "./src/app/token-interceptor.ts":
/*!**************************************!*\
  !*** ./src/app/token-interceptor.ts ***!
  \**************************************/
/*! exports provided: TokenInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenInterceptor", function() { return TokenInterceptor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");



var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(injector) {
        this.injector = injector;
    }
    TokenInterceptor.prototype.intercept = function (req, next) {
        var authService = this.injector.get(_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]);
        var tokenizedRequest = req.clone({ setHeaders: { Authorization: "Bearer " + authService.getToken() } });
        return next.handle(tokenizedRequest);
    };
    TokenInterceptor = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injector"]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./src/app/util/UsernameValidator.ts":
/*!*******************************************!*\
  !*** ./src/app/util/UsernameValidator.ts ***!
  \*******************************************/
/*! exports provided: UsernameValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsernameValidator", function() { return UsernameValidator; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");



var UsernameValidator = /** @class */ (function () {
    function UsernameValidator(_auth) {
        this._auth = _auth;
    }
    UsernameValidator.prototype.available = function (control) {
        var _this = this;
        clearTimeout(this.timer);
        return new Promise(function (resolve) {
            _this.timer = setTimeout(function () {
                _this._auth.existingUser(control.value).subscribe(function (res) {
                    if (res.exists) {
                        resolve({ 'username exists': true });
                    }
                    else {
                        resolve(null);
                    }
                }, function (err) { return console.error(err); });
            }, 1000);
        });
    };
    UsernameValidator = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], UsernameValidator);
    return UsernameValidator;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_modules_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/modules/app.module */ "./src/app/modules/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_modules_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\DTY project\frontend\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map