(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/services/animelist.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/animelist.service.ts ***!
  \***********************************************/
/*! exports provided: AnimelistService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimelistService", function() { return AnimelistService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");




var AnimelistService = /** @class */ (function () {
    function AnimelistService(http, _auth) {
        this.http = http;
        this._auth = _auth;
    }
    AnimelistService.prototype.getMyList = function () {
        return this.http.get("https://localhost:3000/users/" + this._auth.getId() + "/list");
    };
    AnimelistService.prototype.getList = function (user) {
        return this.http.get("https://localhost:3000/users/" + user + "/list");
    };
    AnimelistService.prototype.addToList = function (animeId, status) {
        return this.http.post("https://localhost:3000/users/" + this._auth.getId() + "/list", {
            id: animeId,
            status: status
        });
    };
    AnimelistService.prototype.updateList = function (animeId, status, watchedEpisodes) {
        return this.http.put("https://localhost:3000/users/" + this._auth.getId() + "/list/" + animeId, {
            id: animeId,
            status: status,
            watchedEpisodes: watchedEpisodes
        });
    };
    AnimelistService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], AnimelistService);
    return AnimelistService;
}());



/***/ }),

/***/ "./src/app/util/ImageValidator.ts":
/*!****************************************!*\
  !*** ./src/app/util/ImageValidator.ts ***!
  \****************************************/
/*! exports provided: ImageValidator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageValidator", function() { return ImageValidator; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

var ImageValidator = function (control) {
    var file = control.value;
    if (typeof (file) === 'string') {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(null);
    }
    var reader = new FileReader();
    var isValid = false;
    reader.readAsArrayBuffer(file);
    return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].create(function (obs) {
        reader.addEventListener('loadend', function () {
            var fileHeader = '';
            // @ts-ignore
            var arr = new Uint8Array(reader.result).subarray(0, 4);
            for (var i = 0; i < 4; i++) {
                fileHeader += arr[i].toString(16);
            }
            switch (fileHeader) {
                case '89504e47':
                case 'ffd8ffe0':
                case 'ffd8ffe1':
                case 'ffd8ffe2':
                case 'ffd8ffe3':
                case 'ffd8ffe8':
                    isValid = true;
                    break;
                default:
                    isValid = false;
                    break;
            }
            if (isValid) {
                obs.next(null);
            }
            else {
                obs.next({ invalidFormat: true });
            }
            obs.complete();
        });
    });
};


/***/ })

}]);
//# sourceMappingURL=common.js.map