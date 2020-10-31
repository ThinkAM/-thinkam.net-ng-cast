"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var vg_overlay_play_1 = require("./vg-overlay-play");
var VgOverlayPlayModule = /** @class */ (function () {
    function VgOverlayPlayModule() {
    }
    VgOverlayPlayModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                vg_overlay_play_1.VgOverlayPlay
            ],
            exports: [
                vg_overlay_play_1.VgOverlayPlay
            ]
        })
    ], VgOverlayPlayModule);
    return VgOverlayPlayModule;
}());
exports.VgOverlayPlayModule = VgOverlayPlayModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL292ZXJsYXktcGxheS9vdmVybGF5LXBsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBOEM7QUFDOUMsMENBQStDO0FBRS9DLHFEQUFnRDtBQVdoRDtJQUFBO0lBQWtDLENBQUM7SUFBdEIsbUJBQW1CO1FBVC9CLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFFLHFCQUFZLENBQUU7WUFDekIsWUFBWSxFQUFFO2dCQUNWLCtCQUFhO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLCtCQUFhO2FBQ2hCO1NBQ0osQ0FBQztPQUNXLG1CQUFtQixDQUFHO0lBQUQsMEJBQUM7Q0FBQSxBQUFuQyxJQUFtQztBQUF0QixrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1ZnT3ZlcmxheVBsYXl9IGZyb20gJy4vdmctb3ZlcmxheS1wbGF5JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBWZ092ZXJsYXlQbGF5XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIFZnT3ZlcmxheVBsYXlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFZnT3ZlcmxheVBsYXlNb2R1bGUge31cbiJdfQ==