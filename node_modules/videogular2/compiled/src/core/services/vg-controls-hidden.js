"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var VgControlsHidden = /** @class */ (function () {
    function VgControlsHidden() {
        this.isHiddenSubject = new rxjs_1.Subject();
        this.isHidden = this.isHiddenSubject.asObservable();
    }
    VgControlsHidden.prototype.state = function (hidden) {
        this.isHiddenSubject.next(hidden);
    };
    VgControlsHidden = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], VgControlsHidden);
    return VgControlsHidden;
}());
exports.VgControlsHidden = VgControlsHidden;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY29udHJvbHMtaGlkZGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmljZXMvdmctY29udHJvbHMtaGlkZGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkJBQTZDO0FBQzdDLHNDQUEyQztBQUczQztJQUtJO1FBRlEsb0JBQWUsR0FBcUIsSUFBSSxjQUFPLEVBQVcsQ0FBQztRQUcvRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELGdDQUFLLEdBQUwsVUFBTSxNQUFlO1FBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFYUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTs7T0FDQSxnQkFBZ0IsQ0FZNUI7SUFBRCx1QkFBQztDQUFBLEFBWkQsSUFZQztBQVpZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgLCAgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmdDb250cm9sc0hpZGRlbiB7XG4gICAgaXNIaWRkZW46IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgICBwcml2YXRlIGlzSGlkZGVuU3ViamVjdDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pc0hpZGRlbiA9IHRoaXMuaXNIaWRkZW5TdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHN0YXRlKGhpZGRlbjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmlzSGlkZGVuU3ViamVjdC5uZXh0KGhpZGRlbik7XG4gICAgfVxufVxuIl19