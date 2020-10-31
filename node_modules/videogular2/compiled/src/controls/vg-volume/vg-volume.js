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
var core_1 = require("@angular/core");
var vg_api_1 = require("../../core/services/vg-api");
var VgVolume = /** @class */ (function () {
    function VgVolume(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.isDragging = false;
    }
    VgVolume.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgVolume.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        this.ariaValue = this.getVolume() * 100;
    };
    VgVolume.prototype.onClick = function (event) {
        this.setVolume(this.calculateVolume(event.clientX));
    };
    VgVolume.prototype.onMouseDown = function (event) {
        this.mouseDownPosX = event.clientX;
        this.isDragging = true;
    };
    VgVolume.prototype.onDrag = function (event) {
        if (this.isDragging) {
            this.setVolume(this.calculateVolume(event.clientX));
        }
    };
    VgVolume.prototype.onStopDrag = function (event) {
        if (this.isDragging) {
            this.isDragging = false;
            if (this.mouseDownPosX === event.clientX) {
                this.setVolume(this.calculateVolume(event.clientX));
            }
        }
    };
    VgVolume.prototype.arrowAdjustVolume = function (event) {
        if (event.keyCode === 38 || event.keyCode === 39) {
            event.preventDefault();
            this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 + 10)));
        }
        else if (event.keyCode === 37 || event.keyCode === 40) {
            event.preventDefault();
            this.setVolume(Math.max(0, Math.min(100, this.getVolume() * 100 - 10)));
        }
    };
    VgVolume.prototype.calculateVolume = function (mousePosX) {
        var recObj = this.volumeBarRef.nativeElement.getBoundingClientRect();
        var volumeBarOffsetLeft = recObj.left;
        var volumeBarWidth = recObj.width;
        return (mousePosX - volumeBarOffsetLeft) / volumeBarWidth * 100;
    };
    VgVolume.prototype.setVolume = function (vol) {
        this.target.volume = Math.max(0, Math.min(1, vol / 100));
        this.ariaValue = this.target.volume * 100;
    };
    VgVolume.prototype.getVolume = function () {
        return this.target ? this.target.volume : 0;
    };
    VgVolume.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VgVolume.prototype, "vgFor", void 0);
    __decorate([
        core_1.ViewChild('volumeBar', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], VgVolume.prototype, "volumeBarRef", void 0);
    __decorate([
        core_1.HostListener('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgVolume.prototype, "onDrag", null);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgVolume.prototype, "onStopDrag", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], VgVolume.prototype, "arrowAdjustVolume", null);
    VgVolume = __decorate([
        core_1.Component({
            selector: 'vg-volume',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n        <div\n            #volumeBar\n            class=\"volumeBar\"\n            tabindex=\"0\"\n            role=\"slider\"\n            aria-label=\"volume level\"\n            aria-level=\"polite\"\n            [attr.aria-valuenow]=\"ariaValue\"\n            aria-valuemin=\"0\"\n            aria-valuemax=\"100\"\n            aria-orientation=\"horizontal\"\n            [attr.aria-valuetext]=\"ariaValue + '%'\"\n            (click)=\"onClick($event)\"\n            (mousedown)=\"onMouseDown($event)\">\n            <div class=\"volumeBackground\" [ngClass]=\"{dragging: isDragging}\">\n                <div class=\"volumeValue\" [style.width]=\"(getVolume() * (100-15)) + '%'\"></div>\n                <div class=\"volumeKnob\" [style.left]=\"(getVolume() * (100-15)) + '%'\"></div>\n            </div>\n        </div>\n    ",
            styles: [
                "\n        vg-volume {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            height: 50px;\n            width: 100px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n        vg-volume .volumeBar {\n            position: relative;\n            display: flex;\n            flex-grow: 1;\n            align-items: center;\n        }\n        vg-volume .volumeBackground {\n            display: flex;\n            flex-grow: 1;\n            height: 5px;\n            pointer-events: none;\n            background-color: #333;\n        }\n        vg-volume .volumeValue {\n            display: flex;\n            height: 5px;\n            pointer-events: none;\n            background-color: #FFF;\n            transition:all 0.2s ease-out;\n        }\n        vg-volume .volumeKnob {\n            position: absolute;\n            width: 15px; height: 15px;\n            left: 0; top: 50%;\n            transform: translateY(-50%);\n            border-radius: 15px;\n            pointer-events: none;\n            background-color: #FFF;\n            transition:all 0.2s ease-out;\n        }\n        vg-volume .volumeBackground.dragging .volumeValue,\n        vg-volume .volumeBackground.dragging .volumeKnob {\n            transition: none;\n        }\n    "
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgVolume);
    return VgVolume;
}());
exports.VgVolume = VgVolume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRyb2xzL3ZnLXZvbHVtZS92Zy12b2x1bWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FTdUI7QUFDdkIscURBQW1EO0FBZ0ZuRDtJQWFFLGtCQUFZLEdBQWUsRUFBUyxHQUFVO1FBQVYsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUY5QyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFHakMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCwyQkFBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FDaEUsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELGdDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDMUMsQ0FBQztJQUVELDBCQUFPLEdBQVAsVUFBUSxLQUEwQjtRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELDhCQUFXLEdBQVgsVUFBWSxLQUEwQjtRQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUdELHlCQUFNLEdBQU4sVUFBTyxLQUEwQjtRQUMvQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQUdELDZCQUFVLEdBQVYsVUFBVyxLQUEwQjtRQUNuQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNyRDtTQUNGO0lBQ0gsQ0FBQztJQUdELG9DQUFpQixHQUFqQixVQUFrQixLQUFvQjtRQUNwQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1lBQ2hELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3pFO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtZQUN2RCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RTtJQUNILENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLFNBQWlCO1FBQy9CLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDdkUsSUFBTSxtQkFBbUIsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hELElBQU0sY0FBYyxHQUFXLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDNUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUM7SUFDbEUsQ0FBQztJQUVELDRCQUFTLEdBQVQsVUFBVSxHQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQzVDLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0UsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQXZGUTtRQUFSLFlBQUssRUFBRTs7MkNBQWU7SUFFdkI7UUFEQyxnQkFBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztrQ0FDM0IsaUJBQVU7a0RBQUM7SUF3Q3pCO1FBREMsbUJBQVksQ0FBQyxvQkFBb0IsRUFBRSxDQUFFLFFBQVEsQ0FBRSxDQUFDOzs7OzBDQUtoRDtJQUdEO1FBREMsbUJBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFFLFFBQVEsQ0FBRSxDQUFDOzs7OzhDQVE5QztJQUdEO1FBREMsbUJBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBRSxRQUFRLENBQUUsQ0FBQzs7eUNBQ2IsYUFBYTs7cURBUXJDO0lBcEVVLFFBQVE7UUE3RXBCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxRQUFRLEVBQUUsbzBCQW9CUDtZQUNILE1BQU0sRUFBRTtnQkFDTixnL0NBaURDO2FBQ0Y7U0FDRixDQUFDO3lDQWNpQixpQkFBVSxFQUFjLGNBQUs7T0FibkMsUUFBUSxDQXlGcEI7SUFBRCxlQUFDO0NBQUEsQUF6RkQsSUF5RkM7QUF6RlksNEJBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uSW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDaGlsZCxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndmctdm9sdW1lJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgI3ZvbHVtZUJhclxuICAgICAgICAgICAgY2xhc3M9XCJ2b2x1bWVCYXJcIlxuICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgIHJvbGU9XCJzbGlkZXJcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cInZvbHVtZSBsZXZlbFwiXG4gICAgICAgICAgICBhcmlhLWxldmVsPVwicG9saXRlXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiYXJpYVZhbHVlXCJcbiAgICAgICAgICAgIGFyaWEtdmFsdWVtaW49XCIwXCJcbiAgICAgICAgICAgIGFyaWEtdmFsdWVtYXg9XCIxMDBcIlxuICAgICAgICAgICAgYXJpYS1vcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZXRleHRdPVwiYXJpYVZhbHVlICsgJyUnXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgKG1vdXNlZG93bik9XCJvbk1vdXNlRG93bigkZXZlbnQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lQmFja2dyb3VuZFwiIFtuZ0NsYXNzXT1cIntkcmFnZ2luZzogaXNEcmFnZ2luZ31cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidm9sdW1lVmFsdWVcIiBbc3R5bGUud2lkdGhdPVwiKGdldFZvbHVtZSgpICogKDEwMC0xNSkpICsgJyUnXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZvbHVtZUtub2JcIiBbc3R5bGUubGVmdF09XCIoZ2V0Vm9sdW1lKCkgKiAoMTAwLTE1KSkgKyAnJSdcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgIHZnLXZvbHVtZSB7XG4gICAgICAgICAgICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gICAgICAgICAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMHB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XG4gICAgICAgIH1cbiAgICAgICAgdmctdm9sdW1lIC52b2x1bWVCYXIge1xuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgdmctdm9sdW1lIC52b2x1bWVCYWNrZ3JvdW5kIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICBoZWlnaHQ6IDVweDtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcbiAgICAgICAgfVxuICAgICAgICB2Zy12b2x1bWUgLnZvbHVtZVZhbHVlIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBoZWlnaHQ6IDVweDtcbiAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgICAgICAgICAgIHRyYW5zaXRpb246YWxsIDAuMnMgZWFzZS1vdXQ7XG4gICAgICAgIH1cbiAgICAgICAgdmctdm9sdW1lIC52b2x1bWVLbm9iIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxNXB4OyBoZWlnaHQ6IDE1cHg7XG4gICAgICAgICAgICBsZWZ0OiAwOyB0b3A6IDUwJTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkY7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOmFsbCAwLjJzIGVhc2Utb3V0O1xuICAgICAgICB9XG4gICAgICAgIHZnLXZvbHVtZSAudm9sdW1lQmFja2dyb3VuZC5kcmFnZ2luZyAudm9sdW1lVmFsdWUsXG4gICAgICAgIHZnLXZvbHVtZSAudm9sdW1lQmFja2dyb3VuZC5kcmFnZ2luZyAudm9sdW1lS25vYiB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBub25lO1xuICAgICAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFZnVm9sdW1lIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB2Z0Zvcjogc3RyaW5nO1xuICBAVmlld0NoaWxkKCd2b2x1bWVCYXInLCB7IHN0YXRpYzogdHJ1ZSB9KVxuICB2b2x1bWVCYXJSZWY6IEVsZW1lbnRSZWY7XG5cbiAgZWxlbTogSFRNTEVsZW1lbnQ7XG4gIHRhcmdldDogYW55O1xuICBpc0RyYWdnaW5nOiBib29sZWFuO1xuICBtb3VzZURvd25Qb3NYOiBudW1iZXI7XG4gIGFyaWFWYWx1ZTogbnVtYmVyO1xuXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgY29uc3RydWN0b3IocmVmOiBFbGVtZW50UmVmLCBwdWJsaWMgQVBJOiBWZ0FQSSkge1xuICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuQVBJLmlzUGxheWVyUmVhZHkpIHtcbiAgICAgIHRoaXMub25QbGF5ZXJSZWFkeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgdGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgdGhpcy5hcmlhVmFsdWUgPSB0aGlzLmdldFZvbHVtZSgpICogMTAwO1xuICB9XG5cbiAgb25DbGljayhldmVudDogeyBjbGllbnRYOiBudW1iZXIgfSkge1xuICAgIHRoaXMuc2V0Vm9sdW1lKHRoaXMuY2FsY3VsYXRlVm9sdW1lKGV2ZW50LmNsaWVudFgpKTtcbiAgfVxuXG4gIG9uTW91c2VEb3duKGV2ZW50OiB7IGNsaWVudFg6IG51bWJlciB9KSB7XG4gICAgdGhpcy5tb3VzZURvd25Qb3NYID0gZXZlbnQuY2xpZW50WDtcbiAgICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2Vtb3ZlJywgWyAnJGV2ZW50JyBdKVxuICBvbkRyYWcoZXZlbnQ6IHsgY2xpZW50WDogbnVtYmVyIH0pIHtcbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmNhbGN1bGF0ZVZvbHVtZShldmVudC5jbGllbnRYKSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2V1cCcsIFsgJyRldmVudCcgXSlcbiAgb25TdG9wRHJhZyhldmVudDogeyBjbGllbnRYOiBudW1iZXIgfSkge1xuICAgIGlmICh0aGlzLmlzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMubW91c2VEb3duUG9zWCA9PT0gZXZlbnQuY2xpZW50WCkge1xuICAgICAgICB0aGlzLnNldFZvbHVtZSh0aGlzLmNhbGN1bGF0ZVZvbHVtZShldmVudC5jbGllbnRYKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsgJyRldmVudCcgXSlcbiAgYXJyb3dBZGp1c3RWb2x1bWUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzggfHwgZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNldFZvbHVtZShNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHRoaXMuZ2V0Vm9sdW1lKCkgKiAxMDAgKyAxMCkpKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDQwKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZXRWb2x1bWUoTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB0aGlzLmdldFZvbHVtZSgpICogMTAwIC0gMTApKSk7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlVm9sdW1lKG1vdXNlUG9zWDogbnVtYmVyKSB7XG4gICAgY29uc3QgcmVjT2JqID0gdGhpcy52b2x1bWVCYXJSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2b2x1bWVCYXJPZmZzZXRMZWZ0OiBudW1iZXIgPSByZWNPYmoubGVmdDtcbiAgICBjb25zdCB2b2x1bWVCYXJXaWR0aDogbnVtYmVyID0gcmVjT2JqLndpZHRoO1xuICAgIHJldHVybiAobW91c2VQb3NYIC0gdm9sdW1lQmFyT2Zmc2V0TGVmdCkgLyB2b2x1bWVCYXJXaWR0aCAqIDEwMDtcbiAgfVxuXG4gIHNldFZvbHVtZSh2b2w6IG51bWJlcikge1xuICAgIHRoaXMudGFyZ2V0LnZvbHVtZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHZvbCAvIDEwMCkpO1xuICAgIHRoaXMuYXJpYVZhbHVlID0gdGhpcy50YXJnZXQudm9sdW1lICogMTAwO1xuICB9XG5cbiAgZ2V0Vm9sdW1lKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0ID8gdGhpcy50YXJnZXQudm9sdW1lIDogMDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzKSA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICB9XG59XG4iXX0=