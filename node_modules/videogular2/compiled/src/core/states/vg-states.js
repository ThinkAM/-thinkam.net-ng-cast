"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var VgStates = /** @class */ (function () {
    function VgStates() {
    }
    VgStates.VG_ENDED = 'ended';
    VgStates.VG_PAUSED = 'paused';
    VgStates.VG_PLAYING = 'playing';
    VgStates.VG_LOADING = 'waiting';
    VgStates = __decorate([
        core_1.Injectable()
    ], VgStates);
    return VgStates;
}());
exports.VgStates = VgStates;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc3RhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvc3RhdGVzL3ZnLXN0YXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5QztBQUd6QztJQUFBO0lBS0EsQ0FBQztJQUpVLGlCQUFRLEdBQUcsT0FBTyxDQUFDO0lBQ25CLGtCQUFTLEdBQUcsUUFBUSxDQUFDO0lBQ3JCLG1CQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ3ZCLG1CQUFVLEdBQUcsU0FBUyxDQUFDO0lBSnJCLFFBQVE7UUFEcEIsaUJBQVUsRUFBRTtPQUNBLFFBQVEsQ0FLcEI7SUFBRCxlQUFDO0NBQUEsQUFMRCxJQUtDO0FBTFksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVmdTdGF0ZXMge1xuICAgIHN0YXRpYyBWR19FTkRFRCA9ICdlbmRlZCc7XG4gICAgc3RhdGljIFZHX1BBVVNFRCA9ICdwYXVzZWQnO1xuICAgIHN0YXRpYyBWR19QTEFZSU5HID0gJ3BsYXlpbmcnO1xuICAgIHN0YXRpYyBWR19MT0FESU5HID0gJ3dhaXRpbmcnO1xufVxuIl19