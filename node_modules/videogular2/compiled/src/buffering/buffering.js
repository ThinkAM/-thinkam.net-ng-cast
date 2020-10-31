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
var vg_buffering_1 = require("./vg-buffering");
var VgBufferingModule = /** @class */ (function () {
    function VgBufferingModule() {
    }
    VgBufferingModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                vg_buffering_1.VgBuffering
            ],
            exports: [
                vg_buffering_1.VgBuffering
            ]
        })
    ], VgBufferingModule);
    return VgBufferingModule;
}());
exports.VgBufferingModule = VgBufferingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVmZmVyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2J1ZmZlcmluZy9idWZmZXJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMsMENBQStDO0FBRS9DLCtDQUE2QztBQVc3QztJQUFBO0lBQ0EsQ0FBQztJQURZLGlCQUFpQjtRQVQ3QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBRSxxQkFBWSxDQUFFO1lBQ3pCLFlBQVksRUFBRTtnQkFDViwwQkFBVzthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLDBCQUFXO2FBQ2Q7U0FDSixDQUFDO09BQ1csaUJBQWlCLENBQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQURELElBQ0M7QUFEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgVmdCdWZmZXJpbmcgfSBmcm9tICcuL3ZnLWJ1ZmZlcmluZyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVmdCdWZmZXJpbmdcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVmdCdWZmZXJpbmdcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFZnQnVmZmVyaW5nTW9kdWxlIHtcbn1cbiJdfQ==