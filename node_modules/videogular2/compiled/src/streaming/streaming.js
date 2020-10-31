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
var vg_dash_1 = require("./vg-dash/vg-dash");
var vg_hls_1 = require("./vg-hls/vg-hls");
var VgStreamingModule = /** @class */ (function () {
    function VgStreamingModule() {
    }
    VgStreamingModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                vg_dash_1.VgDASH, vg_hls_1.VgHLS
            ],
            exports: [
                vg_dash_1.VgDASH, vg_hls_1.VgHLS
            ]
        })
    ], VgStreamingModule);
    return VgStreamingModule;
}());
exports.VgStreamingModule = VgStreamingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3N0cmVhbWluZy9zdHJlYW1pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBOEM7QUFDOUMsMENBQStDO0FBQy9DLDZDQUEyQztBQUMzQywwQ0FBd0M7QUFpQnhDO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixpQkFBaUI7UUFUN0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUUscUJBQVksQ0FBRTtZQUN6QixZQUFZLEVBQUU7Z0JBQ1YsZ0JBQU0sRUFBRSxjQUFLO2FBQ2hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGdCQUFNLEVBQUUsY0FBSzthQUNoQjtTQUNKLENBQUM7T0FDVyxpQkFBaUIsQ0FBRztJQUFELHdCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFZnREFTSCB9IGZyb20gXCIuL3ZnLWRhc2gvdmctZGFzaFwiO1xuaW1wb3J0IHsgVmdITFMgfSBmcm9tIFwiLi92Zy1obHMvdmctaGxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURSTUxpY2Vuc2VTZXJ2ZXIge1xuICAgIFtpbmRleDogc3RyaW5nXToge1xuICAgICAgICBzZXJ2ZXJVUkw6IHN0cmluZztcbiAgICB9O1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFZnREFTSCwgVmdITFNcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVmdEQVNILCBWZ0hMU1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdTdHJlYW1pbmdNb2R1bGUge31cbiJdfQ==