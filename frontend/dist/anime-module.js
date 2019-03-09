(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["anime-module"],{

/***/ "./src/app/components/add-anime/add-anime.component.css":
/*!**************************************************************!*\
  !*** ./src/app/components/add-anime/add-anime.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYWRkLWFuaW1lL2FkZC1hbmltZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/add-anime/add-anime.component.html":
/*!***************************************************************!*\
  !*** ./src/app/components/add-anime/add-anime.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      Add Anime\n    </mat-card-title>\n  </mat-card-header>\n  <form [formGroup]=\"addanimeForm\" (submit)=\"addAnime()\" autocomplete=\"on\">\n    <div>\n      <mat-form-field>\n        <input matInput id=\"name\" formControlName=\"name\" placeholder=\"name\" name=\"name\" type=\"text\" required/>\n        <mat-error *ngIf=\"addanimeForm.get('name').invalid\">Please add a name</mat-error>\n      </mat-form-field>\n    </div>\n    <p></p>\n    <p></p>\n    <div>\n      <mat-form-field>\n        <textarea matInput formControlName=\"description\" rows=\"6\" placeholder=\"description\" required></textarea>\n        <mat-error *ngIf=\"addanimeForm.get('description').invalid\">Please Enter a description</mat-error>\n      </mat-form-field>\n    </div>\n    <p></p>\n    <p></p>\n    <div>\n      <mat-form-field>\n        <input  type=\"number\" matInput formControlName=\"episodes\" placeholder=\"episodes\" required/>\n        <mat-error *ngIf=\"addanimeForm.get('episodes').invalid\">Please Enter the number of episodes</mat-error>\n      </mat-form-field>\n    </div>\n    <p></p>\n    <p></p>\n    <div>\n      <button mat-button (click)=\"Imginput.click(); $event.preventDefault()\">Image</button>\n      <input #Imginput (change)=\"ImageUploader($event)\" type=\"file\" accept=\"image/*\" hidden=\"hidden\" required>\n    </div>\n    <mat-error *ngIf=\"addanimeForm.get('image').invalid && imageChanged\">Please Choose a Valid Image</mat-error>\n    <img *ngIf=\"imageUrl && addanimeForm.get('image').valid\" [src]=\"imageUrl\" [alt]=\"addanimeForm.value.name\" required>\n    <p></p>\n    <p></p>\n    <button mat-button [disabled]=\"addanimeForm.invalid\">Add Anime</button>\n  </form>\n</mat-card>\n\n\n"

/***/ }),

/***/ "./src/app/components/add-anime/add-anime.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/components/add-anime/add-anime.component.ts ***!
  \*************************************************************/
/*! exports provided: AddAnimeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAnimeComponent", function() { return AddAnimeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_animelist_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/animelist.service */ "./src/app/services/animelist.service.ts");
/* harmony import */ var _services_anime_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/anime.service */ "./src/app/services/anime.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _util_ImageValidator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/ImageValidator */ "./src/app/util/ImageValidator.ts");







var AddAnimeComponent = /** @class */ (function () {
    function AddAnimeComponent(fb, _animelistService, _animeService, _router) {
        this.fb = fb;
        this._animelistService = _animelistService;
        this._animeService = _animeService;
        this._router = _router;
        this.imageChanged = false;
    }
    AddAnimeComponent.prototype.ngOnInit = function () {
        this.addanimeForm = this.fb.group({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, {
                validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            }),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            episodes: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required] }),
            image: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required], asyncValidators: [_util_ImageValidator__WEBPACK_IMPORTED_MODULE_6__["ImageValidator"]] })
        });
    };
    AddAnimeComponent.prototype.addAnime = function () {
        var _this = this;
        this._animeService.addAnime(this.addanimeForm.value)
            .subscribe(function (res) {
            _this._router.navigate(['/animes', res.id]);
        });
    };
    AddAnimeComponent.prototype.ImageUploader = function (event) {
        var _this = this;
        this.imageChanged = true;
        event.preventDefault();
        var image = event.target.files[0];
        if (image) {
            this.addanimeForm.patchValue({ image: image });
            this.addanimeForm.get('image').updateValueAndValidity();
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(image);
            reader_1.onload = function () {
                if (_this.addanimeForm.get('image').valid) {
                    _this.imageChanged = false;
                    _this.imageUrl = reader_1.result;
                }
            };
        }
    };
    AddAnimeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-add-anime',
            template: __webpack_require__(/*! ./add-anime.component.html */ "./src/app/components/add-anime/add-anime.component.html"),
            styles: [__webpack_require__(/*! ./add-anime.component.css */ "./src/app/components/add-anime/add-anime.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_animelist_service__WEBPACK_IMPORTED_MODULE_3__["AnimelistService"],
            _services_anime_service__WEBPACK_IMPORTED_MODULE_4__["AnimeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], AddAnimeComponent);
    return AddAnimeComponent;
}());



/***/ }),

/***/ "./src/app/components/anime/anime.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/anime/anime.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".spacer {\r\n  flex: 1 1 auto;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9hbmltZS9hbmltZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBYztBQUNoQiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYW5pbWUvYW5pbWUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zcGFjZXIge1xyXG4gIGZsZXg6IDEgMSBhdXRvO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/components/anime/anime.component.html":
/*!*******************************************************!*\
  !*** ./src/app/components/anime/anime.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card fxLayout=\"column\" fxLayoutGap=\"30px\">\r\n  <mat-card-header>\r\n    <div fxLayout=\"row\" fxLayout.lt-sm=\"column\" fxLayoutGap=\"20px\">\r\n      <div><img [alt]=\"anime.name\" [src]=\"anime.image\" mat-card-xl-image></div>\r\n      <div>\r\n        {{anime.name}}\r\n        <p></p>\r\n        <!--Status Bar Start -->\r\n        <button (click)=\"Add()\" *ngIf=\"_auth.loggedIn() && !anime.status\" mat-button>Add</button>\r\n        <mat-icon color=\"primary\" svgIcon=\"star\"></mat-icon>\r\n        Score: {{anime.score}}\r\n        <p></p>\r\n        <div *ngIf=\"_auth.loggedIn()\">\r\n          <mat-icon *ngIf=\"anime.rating.rating != 'N/A'\" color=\"primary\" svgIcon=\"star\"></mat-icon>\r\n          <div *ngIf=\"anime.rating.rating =='N/A'\">\r\n            <mat-icon color=\"primary\" svgIcon=\"star_outline\"></mat-icon>\r\n          </div>\r\n          <mat-form-field>\r\n            <mat-select (selectionChange)=\"rateAnime()\" [(ngModel)]=\"anime.rating.rating\">\r\n              <mat-option *ngFor=\"let score of [1,2,3,4,5,6,7,8,9,10]\" [value]=\"score\">\r\n                {{score}}\r\n              </mat-option>\r\n            </mat-select>\r\n          </mat-form-field>\r\n          <div *ngIf=\"anime.status\">\r\n            <mat-form-field>\r\n              <input [(ngModel)]=\"anime.watchedEpisodes\" [defaultValue]=\"anime.watchedEpisodes\" [max]=\"anime.episodes\"\r\n                     label=\"episodes\" matInput\r\n                     min=\"0\" type=\"number\">\r\n            </mat-form-field>\r\n            / {{anime.episodes}}\r\n            <p></p>\r\n            <mat-form-field>\r\n              <mat-select [(value)]=\"anime.status\">\r\n                <mat-option value=\"Plan To Watch\">Plan To Watch</mat-option>\r\n                <mat-option value=\"Watching\">Watching</mat-option>\r\n                <mat-option value=\"Watched\">Watched</mat-option>\r\n                <mat-option value=\"Dropped\">Dropped</mat-option>\r\n                <mat-option value=\"On Hold\">On Hold</mat-option>\r\n              </mat-select>\r\n            </mat-form-field>\r\n            <button (click)=\"Update()\" mat-button>\r\n              Update\r\n            </button>\r\n          </div>\r\n        </div>\r\n        <!--Status Bar End -->\r\n      </div>\r\n    </div>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n    <div>\r\n      {{anime.description}}\r\n    </div>\r\n    <!--Reviews Start -->\r\n    <mat-accordion>\r\n      <mat-expansion-panel (afterExpand)=\"getReviews()\">\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>\r\n            Reviews\r\n          </mat-panel-title>\r\n          <mat-panel-description>\r\n            {{anime.name}} reviews\r\n          </mat-panel-description>\r\n        </mat-expansion-panel-header>\r\n        <mat-card *ngIf=\"userReview.review && !editMode\">\r\n          <mat-card-header>\r\n            Your review of {{anime.name}}\r\n          </mat-card-header>\r\n          <mat-card-content>\r\n            {{userReview.review}}\r\n          </mat-card-content>\r\n          Upvotes: {{userReview.upvotesCount}}\r\n          <button mat-button color=\"primary\" (click)=\"editMode=true\">\r\n            Edit\r\n          </button>\r\n          <button mat-button color=\"warn\" (click)=\"deleteReview()\">\r\n            Delete\r\n          </button>\r\n        </mat-card>\r\n        <mat-card *ngIf=\"(!userReview.review || editMode) && _auth.loggedIn()\">\r\n          <form [formGroup]=\"reviewForm\" (submit)=\"postReview()\">\r\n            <mat-form-field>\r\n              <textarea label=\"review\" matInput formControlName=\"review\"></textarea>\r\n              <mat-error *ngIf=\"reviewForm.invalid\"> A review should at least be 100\r\n                character long\r\n              </mat-error>\r\n            </mat-form-field>\r\n            <button mat-button>Post review</button>\r\n          </form>\r\n        </mat-card>\r\n        <mat-card *ngIf=\"!(reviews.length || userReview.review)\">\r\n          No reviews to show\r\n        </mat-card>\r\n        <mat-card *ngFor=\"let review of reviews\">\r\n          <mat-card-header>\r\n            <img [src]=\"review.reviewer.picture\" [alt]=\"review.reviewer.username\" width=\"40px\" height=\"40px\">\r\n            <a [routerLink]=\"['/profile',review.reviewer.user]\">{{review.reviewer.username}}</a>\r\n          </mat-card-header>\r\n          <mat-card-content>\r\n            {{review.review}}\r\n          </mat-card-content>\r\n          <mat-card-footer>\r\n            Upvotes: {{review.upvotesCount}}\r\n            <div *ngIf=\"!review.upvoted\">\r\n              <mat-icon color=\"primary\" svgIcon=\"upvote\" (click)=\"upVote(review)\"></mat-icon>\r\n            </div>\r\n            <div *ngIf=\"review.upvoted\">\r\n              <mat-icon color=\"primary\" svgIcon=\"upvoted\" (click)=\"unVote(review)\"></mat-icon>\r\n            </div>\r\n          </mat-card-footer>\r\n        </mat-card>\r\n      </mat-expansion-panel>\r\n    </mat-accordion>\r\n    <!--Reviews End -->\r\n\r\n  </mat-card-content>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./src/app/components/anime/anime.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/anime/anime.component.ts ***!
  \*****************************************************/
/*! exports provided: AnimeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimeComponent", function() { return AnimeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_anime_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/anime.service */ "./src/app/services/anime.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_animelist_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/animelist.service */ "./src/app/services/animelist.service.ts");









var AnimeComponent = /** @class */ (function () {
    function AnimeComponent(_auth, _animelist, _anime, _activatedRoute, fb, matIconRegistry, domSanitizer) {
        this._auth = _auth;
        this._animelist = _animelist;
        this._anime = _anime;
        this._activatedRoute = _activatedRoute;
        this.fb = fb;
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.anime = {
            name: '',
            image: '',
            description: '',
            _id: null,
            status: '',
            watchedEpisodes: '',
            score: '',
            rating: { _id: '', rating: '' }
        };
        this.reviews = [];
        this.userReview = { id: '', review: '' };
        this.editMode = false;
        this.matIconRegistry.addSvgIcon('upvoted', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-thumb_up_alt-24px.svg'));
        this.matIconRegistry.addSvgIcon('upvote', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/outline-thumb_up_alt-24px.svg'));
        this.matIconRegistry.addSvgIcon('star', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-star-24px.svg'));
        this.matIconRegistry.addSvgIcon('star_outline', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-star_border-24px.svg'));
    }
    AnimeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reviewForm = this.fb.group({
            review: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"](null, { validators: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(100)] })
        });
        this._anime.getAnime(this._activatedRoute.snapshot.paramMap.get('anime')).subscribe(function (anime) {
            _this.anime = anime;
            if (!anime.rating) {
                anime.rating = {};
            }
        }, function (error) { return console.error(error); });
    };
    AnimeComponent.prototype.Add = function () {
        var _this = this;
        this._animelist.addToList(this.anime._id, 'Plan To Watch').subscribe(function () {
            _this.anime.status = 'Plan To Watch';
        });
    };
    AnimeComponent.prototype.Update = function () {
        this._animelist.updateList(this.anime._id, this.anime.status, this.anime.watchedEpisodes).subscribe();
    };
    AnimeComponent.prototype.postReview = function () {
        var _this = this;
        if (!this.userReview.review) {
            this._anime.postReview(this.anime._id, this.reviewForm.value.review).subscribe(function (result) {
                _this.editMode = false;
                _this.userReview = result;
            });
        }
        else {
            this._anime.editReview(this.anime._id, this.userReview.id, this.reviewForm.value.review).subscribe(function () {
                _this.editMode = false;
                _this.userReview.review = _this.reviewForm.value.review;
            });
        }
    };
    AnimeComponent.prototype.deleteReview = function () {
        var _this = this;
        this._anime.deleteReview(this.anime._id, this.userReview.id).subscribe(function () {
            _this.editMode = true;
            _this.userReview = { id: '', review: '' };
            _this.reviewForm.reset();
        });
    };
    AnimeComponent.prototype.getReviews = function () {
        var _this = this;
        if (!this.reviews.length) {
            this._anime.getReviews(this.anime._id).subscribe(function (results) {
                _this.reviews = results.reviews;
                if (results.userReview) {
                    _this.reviewForm.get('review').patchValue(results.userReview.review);
                    _this.userReview = results.userReview;
                }
            });
        }
    };
    AnimeComponent.prototype.upVote = function (review) {
        this._anime.upvote(this.anime._id, review.id).subscribe(function (response) {
            review.upvoted = true;
            review.upvotesCount = response.upvotesCount;
        });
    };
    AnimeComponent.prototype.unVote = function (review) {
        this._anime.unvote(this.anime._id, review.id).subscribe(function (response) {
            review.upvoted = false;
            review.upvotesCount = response.upvotesCount;
        });
    };
    AnimeComponent.prototype.rateAnime = function () {
        if (this.anime.rating._id) {
            this._anime.changeRating(this.anime._id, this.anime.rating._id, this.anime.rating.rating).subscribe();
        }
        else {
            this._anime.addRating(this.anime._id, this.anime.rating.rating).subscribe();
        }
    };
    AnimeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-anime',
            template: __webpack_require__(/*! ./anime.component.html */ "./src/app/components/anime/anime.component.html"),
            styles: [__webpack_require__(/*! ./anime.component.css */ "./src/app/components/anime/anime.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"], _services_animelist_service__WEBPACK_IMPORTED_MODULE_8__["AnimelistService"], _services_anime_service__WEBPACK_IMPORTED_MODULE_3__["AnimeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconRegistry"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__["DomSanitizer"]])
    ], AnimeComponent);
    return AnimeComponent;
}());



/***/ }),

/***/ "./src/app/components/animes/animes.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/animes/animes.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvYW5pbWVzL2FuaW1lcy5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/animes/animes.component.html":
/*!*********************************************************!*\
  !*** ./src/app/components/animes/animes.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxFlex=\"1 1 80%\" fxFlex.lt-md=\"auto\" fxLayout=\"column\">\n  <p>\n    <input (search)=\"getAnimes()\" [(ngModel)]=\"search\" matInput placeholder=\"Search Anime\" type=\"search\">\n  </p>\n\n  <table (matSortChange)=\"sortAnimes($event)\" [dataSource]=\"allAnimes\" class=\"mat-elevation-z8\" fxFlex mat-table\n         matSort>\n\n    <!-- Anime Start-->\n    <ng-container matColumnDef=\"name\">\n      <th *matHeaderCellDef mat-header-cell mat-sort-header> Anime</th>\n      <td *matCellDef=\"let anime\" mat-cell>\n        <a [routerLink]=\"['/animes',anime._id]\">{{anime.name}}</a>\n      </td>\n    </ng-container>\n    <!-- Anime Endt-->\n\n    <!-- Score Start-->\n    <ng-container matColumnDef=\"score\">\n      <th *matHeaderCellDef mat-header-cell mat-sort-header> Score</th>\n      <td *matCellDef=\"let anime\" mat-cell>\n        <mat-icon color=\"primary\" svgIcon=\"star\"></mat-icon>\n        {{anime.score}}\n      </td>\n    </ng-container>\n    <ng-container matColumnDef=\"rating\">\n      <!-- Score End-->\n\n      <!-- Rating Start-->\n      <th *matHeaderCellDef mat-header-cell> Your Rating</th>\n      <td *matCellDef=\"let anime\" mat-cell>\n        <mat-icon *ngIf=\"anime.rating.rating != 'N/A'\" color=\"primary\" svgIcon=\"star\"></mat-icon>\n        <mat-icon *ngIf=\"anime.rating.rating =='N/A'\" color=\"primary\" svgIcon=\"star_outline\"></mat-icon>\n        <mat-form-field [ngStyle]=\"{'width':'35px'}\">\n          <mat-select (selectionChange)=\"rateAnime(anime)\" [(ngModel)]=\"anime.rating.rating\">\n            <mat-option *ngFor=\"let score of [1,2,3,4,5,6,7,8,9,10]\" [value]=\"score\">\n              {{score}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n      </td>\n    </ng-container>\n    <!-- Rating End-->\n\n    <!-- Status Start-->\n    <ng-container matColumnDef=\"status\">\n      <th *matHeaderCellDef mat-header-cell> Status</th>\n      <td *matCellDef=\"let anime\" fxLayoutAlign=\"center\" mat-cell>\n        <button (click)=\"Add(anime)\" *ngIf=\"!anime.status\" mat-button>Add</button>\n        <div *ngIf=\"anime.status\">\n          <mat-form-field [ngStyle]=\"{'width':'130px'}\">\n            <mat-select [(value)]=\"anime.status\">\n              <mat-option value=\"Plan To Watch\">Plan To Watch</mat-option>\n              <mat-option value=\"Watching\">Watching</mat-option>\n              <mat-option value=\"Watched\">Watched</mat-option>\n              <mat-option value=\"Dropped\">Dropped</mat-option>\n              <mat-option value=\"On Hold\">On Hold</mat-option>\n            </mat-select>\n          </mat-form-field>\n          <mat-form-field [ngStyle]=\"{'width':'45px'}\">\n            <input [(ngModel)]=\"anime.watchedEpisodes\" [defaultValue]=\"anime.watchedEpisodes\" [max]=\"anime.episodes\"\n                   label=\"episodes\" matInput\n                   min=\"0\" type=\"number\">\n          </mat-form-field>\n          / {{anime.episodes}}\n          <button (click)=\"Update(anime)\" mat-button>\n            Update\n          </button>\n        </div>\n      </td>\n    </ng-container>\n    <!-- Status End-->\n\n    <tr *matHeaderRowDef=\"columnsToDisplay\" mat-header-row></tr>\n    <tr *matRowDef=\"let myRowData; columns: columnsToDisplay\" mat-row></tr>\n  </table>\n  <mat-paginator (page)=\"changePage($event)\" [length]=\"animesCount\" [pageIndex]=\"pageNumber\"\n                 [pageSizeOptions]=\"[1,2,5,10]\"\n                 [pageSize]=\"pageSize\" class=\"mat-elevation-z8\"></mat-paginator>\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/components/animes/animes.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/animes/animes.component.ts ***!
  \*******************************************************/
/*! exports provided: AnimesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimesComponent", function() { return AnimesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_anime_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/anime.service */ "./src/app/services/anime.service.ts");
/* harmony import */ var _services_animelist_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/animelist.service */ "./src/app/services/animelist.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");








var AnimesComponent = /** @class */ (function () {
    function AnimesComponent(_auth, _route, _anime, _animelist, matIconRegistry, domSanitizer) {
        this._auth = _auth;
        this._route = _route;
        this._anime = _anime;
        this._animelist = _animelist;
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.allAnimes = [];
        this.search = '';
        this.columnsToDisplay = ['name', 'score', 'rating', 'status'];
        this.pageSize = 5;
        this.pageNumber = 0;
        this.animesCount = 0;
        this.sortType = 'score';
        this.sortOrder = 'desc';
        this.matIconRegistry.addSvgIcon('star', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-star-24px.svg'));
        this.matIconRegistry.addSvgIcon('star_outline', this.domSanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-star_border-24px.svg'));
    }
    AnimesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._route.queryParams.subscribe(function (params) {
            if (params.page && params.size) {
                _this.pageSize = params.size;
                _this.pageNumber = params.page - 1;
            }
            if (params.search) {
                _this.search = params.search;
            }
            if (params.sort) {
                _this.sortType = params.sort;
            }
            if (['asc', 'desc'].includes(params.order)) {
                _this.sortOrder = params.order;
            }
            _this.getAnimes();
        });
    };
    AnimesComponent.prototype.Add = function (anime) {
        this._animelist.addToList(anime._id, 'Plan To Watch').subscribe(function () {
            anime.status = 'Plan To Watch';
        });
    };
    AnimesComponent.prototype.Update = function (anime) {
        this._animelist.updateList(anime._id, anime.status, anime.watchedEpisodes).subscribe();
    };
    AnimesComponent.prototype.changePage = function (event) {
        this.pageSize = event.pageSize;
        this.pageNumber = event.pageIndex;
        this.getAnimes();
    };
    AnimesComponent.prototype.sortAnimes = function (event) {
        this.sortType = event.active;
        this.sortOrder = event.direction;
        this.getAnimes();
    };
    AnimesComponent.prototype.getAnimes = function () {
        var _this = this;
        this._anime.getAnimes(this.pageSize, this.pageNumber, this.search, this.sortType, this.sortOrder).subscribe(function (res) {
            _this.allAnimes = res.animes.map(function (anime) {
                if (!anime.rating) {
                    anime.rating = { rating: 'N/A' };
                }
                return anime;
            });
            _this.animesCount = res.count;
        }, function (err) { return console.error(err); });
    };
    AnimesComponent.prototype.rateAnime = function (anime) {
        if (anime.rating._id) {
            this._anime.changeRating(anime._id, anime.rating._id, anime.rating.rating).subscribe();
        }
        else {
            this._anime.addRating(anime._id, anime.rating.rating).subscribe();
        }
    };
    AnimesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-animes',
            template: __webpack_require__(/*! ./animes.component.html */ "./src/app/components/animes/animes.component.html"),
            styles: [__webpack_require__(/*! ./animes.component.css */ "./src/app/components/animes/animes.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"], _services_anime_service__WEBPACK_IMPORTED_MODULE_3__["AnimeService"], _services_animelist_service__WEBPACK_IMPORTED_MODULE_4__["AnimelistService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconRegistry"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"]])
    ], AnimesComponent);
    return AnimesComponent;
}());



/***/ }),

/***/ "./src/app/guards/admin.guard.ts":
/*!***************************************!*\
  !*** ./src/app/guards/admin.guard.ts ***!
  \***************************************/
/*! exports provided: AdminGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminGuard", function() { return AdminGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");




var AdminGuard = /** @class */ (function () {
    function AdminGuard(_auth, _router) {
        this._auth = _auth;
        this._router = _router;
    }
    AdminGuard.prototype.canActivate = function () {
        if (this._auth.isAdmin()) {
            return true;
        }
        else {
            this._router.navigate(['/']);
            return false;
        }
    };
    AdminGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AdminGuard);
    return AdminGuard;
}());



/***/ }),

/***/ "./src/app/modules/anime-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/modules/anime-routing.module.ts ***!
  \*************************************************/
/*! exports provided: AnimeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimeRoutingModule", function() { return AnimeRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_animes_animes_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/animes/animes.component */ "./src/app/components/animes/animes.component.ts");
/* harmony import */ var _components_anime_anime_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/anime/anime.component */ "./src/app/components/anime/anime.component.ts");
/* harmony import */ var _components_add_anime_add_anime_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/add-anime/add-anime.component */ "./src/app/components/add-anime/add-anime.component.ts");
/* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../guards/admin.guard */ "./src/app/guards/admin.guard.ts");







var routes = [
    { path: '', component: _components_animes_animes_component__WEBPACK_IMPORTED_MODULE_3__["AnimesComponent"] },
    { path: 'addAnime', component: _components_add_anime_add_anime_component__WEBPACK_IMPORTED_MODULE_5__["AddAnimeComponent"], canActivate: [_guards_admin_guard__WEBPACK_IMPORTED_MODULE_6__["AdminGuard"]] },
    { path: ':anime', component: _components_anime_anime_component__WEBPACK_IMPORTED_MODULE_4__["AnimeComponent"] },
];
var AnimeRoutingModule = /** @class */ (function () {
    function AnimeRoutingModule() {
    }
    AnimeRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AnimeRoutingModule);
    return AnimeRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/anime.module.ts":
/*!*****************************************!*\
  !*** ./src/app/modules/anime.module.ts ***!
  \*****************************************/
/*! exports provided: AnimeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimeModule", function() { return AnimeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _components_animes_animes_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/animes/animes.component */ "./src/app/components/animes/animes.component.ts");
/* harmony import */ var _components_add_anime_add_anime_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/add-anime/add-anime.component */ "./src/app/components/add-anime/add-anime.component.ts");
/* harmony import */ var _components_anime_anime_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/anime/anime.component */ "./src/app/components/anime/anime.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./angular-material.module */ "./src/app/modules/angular-material.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _anime_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./anime-routing.module */ "./src/app/modules/anime-routing.module.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");










var AnimeModule = /** @class */ (function () {
    function AnimeModule() {
    }
    AnimeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            declarations: [
                _components_animes_animes_component__WEBPACK_IMPORTED_MODULE_1__["AnimesComponent"],
                _components_add_anime_add_anime_component__WEBPACK_IMPORTED_MODULE_2__["AddAnimeComponent"],
                _components_anime_anime_component__WEBPACK_IMPORTED_MODULE_3__["AnimeComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"],
                _angular_material_module__WEBPACK_IMPORTED_MODULE_5__["AngularMaterialModule"],
                _anime_routing_module__WEBPACK_IMPORTED_MODULE_8__["AnimeRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__["FlexLayoutModule"]
            ]
        })
    ], AnimeModule);
    return AnimeModule;
}());



/***/ })

}]);
//# sourceMappingURL=anime-module.js.map