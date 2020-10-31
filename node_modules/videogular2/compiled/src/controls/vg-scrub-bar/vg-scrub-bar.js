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
var vg_controls_hidden_1 = require("./../../core/services/vg-controls-hidden");
var vg_states_1 = require("../../core/states/vg-states");
var VgScrubBar = /** @class */ (function () {
    function VgScrubBar(ref, API, vgControlsHiddenState) {
        var _this = this;
        this.API = API;
        this.hideScrubBar = false;
        this.vgSlider = true;
        this.isSeeking = false;
        this.wasPlaying = false;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.subscriptions.push(vgControlsHiddenState.isHidden.subscribe(function (hide) { return _this.onHideScrubBar(hide); }));
    }
    VgScrubBar.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgScrubBar.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
    };
    VgScrubBar.prototype.seekStart = function () {
        if (this.target.canPlay) {
            this.isSeeking = true;
            if (this.target.state === vg_states_1.VgStates.VG_PLAYING) {
                this.wasPlaying = true;
            }
            this.target.pause();
        }
    };
    VgScrubBar.prototype.seekMove = function (offset) {
        if (this.isSeeking) {
            var percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
            this.target.time.current = percentage * this.target.time.total / 100;
            this.target.seekTime(percentage, true);
        }
    };
    VgScrubBar.prototype.seekEnd = function (offset) {
        this.isSeeking = false;
        if (this.target.canPlay) {
            var percentage = Math.max(Math.min(offset * 100 / this.elem.scrollWidth, 99.9), 0);
            this.target.seekTime(percentage, true);
            if (this.wasPlaying) {
                this.wasPlaying = false;
                this.target.play();
            }
        }
    };
    VgScrubBar.prototype.touchEnd = function () {
        this.isSeeking = false;
        if (this.wasPlaying) {
            this.wasPlaying = false;
            this.target.play();
        }
    };
    VgScrubBar.prototype.getTouchOffset = function (event) {
        var offsetLeft = 0;
        var element = event.target;
        while (element) {
            offsetLeft += element.offsetLeft;
            element = element.offsetParent;
        }
        return event.touches[0].pageX - offsetLeft;
    };
    VgScrubBar.prototype.onMouseDownScrubBar = function ($event) {
        if (this.target) {
            if (!this.target.isLive) {
                if (!this.vgSlider) {
                    this.seekEnd($event.offsetX);
                }
                else {
                    this.seekStart();
                }
            }
        }
    };
    VgScrubBar.prototype.onMouseMoveScrubBar = function ($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekMove($event.offsetX);
            }
        }
    };
    VgScrubBar.prototype.onMouseUpScrubBar = function ($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekEnd($event.offsetX);
            }
        }
    };
    VgScrubBar.prototype.onTouchStartScrubBar = function ($event) {
        if (this.target) {
            if (!this.target.isLive) {
                if (!this.vgSlider) {
                    this.seekEnd(this.getTouchOffset($event));
                }
                else {
                    this.seekStart();
                }
            }
        }
    };
    VgScrubBar.prototype.onTouchMoveScrubBar = function ($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.seekMove(this.getTouchOffset($event));
            }
        }
    };
    // @ts-ignore
    VgScrubBar.prototype.onTouchCancelScrubBar = function ($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.touchEnd();
            }
        }
    };
    // @ts-ignore
    VgScrubBar.prototype.onTouchEndScrubBar = function ($event) {
        if (this.target) {
            if (!this.target.isLive && this.vgSlider && this.isSeeking) {
                this.touchEnd();
            }
        }
    };
    VgScrubBar.prototype.arrowAdjustVolume = function (event) {
        if (this.target) {
            if (event.keyCode === 38 || event.keyCode === 39) {
                event.preventDefault();
                this.target.seekTime((this.target.time.current + 5000) / 1000, false);
            }
            else if (event.keyCode === 37 || event.keyCode === 40) {
                event.preventDefault();
                this.target.seekTime((this.target.time.current - 5000) / 1000, false);
            }
        }
    };
    VgScrubBar.prototype.getPercentage = function () {
        return this.target ? ((this.target.time.current * 100) / this.target.time.total) + '%' : '0%';
    };
    VgScrubBar.prototype.onHideScrubBar = function (hide) {
        this.hideScrubBar = hide;
    };
    VgScrubBar.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate([
        core_1.HostBinding('class.hide'),
        __metadata("design:type", Object)
    ], VgScrubBar.prototype, "hideScrubBar", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VgScrubBar.prototype, "vgFor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VgScrubBar.prototype, "vgSlider", void 0);
    __decorate([
        core_1.HostListener('mousedown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgScrubBar.prototype, "onMouseDownScrubBar", null);
    __decorate([
        core_1.HostListener('document:mousemove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgScrubBar.prototype, "onMouseMoveScrubBar", null);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgScrubBar.prototype, "onMouseUpScrubBar", null);
    __decorate([
        core_1.HostListener('touchstart', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgScrubBar.prototype, "onTouchStartScrubBar", null);
    __decorate([
        core_1.HostListener('document:touchmove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgScrubBar.prototype, "onTouchMoveScrubBar", null);
    __decorate([
        core_1.HostListener('document:touchcancel', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgScrubBar.prototype, "onTouchCancelScrubBar", null);
    __decorate([
        core_1.HostListener('document:touchend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], VgScrubBar.prototype, "onTouchEndScrubBar", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], VgScrubBar.prototype, "arrowAdjustVolume", null);
    VgScrubBar = __decorate([
        core_1.Component({
            selector: 'vg-scrub-bar',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n        <div class=\"scrubBar\"\n             tabindex=\"0\"\n             role=\"slider\"\n             aria-label=\"scrub bar\"\n             aria-level=\"polite\"\n             [attr.aria-valuenow]=\"getPercentage()\"\n             aria-valuemin=\"0\"\n             aria-valuemax=\"100\"\n             [attr.aria-valuetext]=\"getPercentage() + '%'\">\n            <ng-content></ng-content>\n        </div>\n\n    ",
            styles: ["\n        vg-scrub-bar {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            position: absolute;\n            width: 100%;\n            height: 5px;\n            bottom: 50px;\n            margin: 0;\n            cursor: pointer;\n            align-items: center;\n            background: rgba(0, 0, 0, 0.75);\n            z-index: 250;\n            -webkit-transition: bottom 1s, opacity 0.5s;\n            -khtml-transition: bottom 1s, opacity 0.5s;\n            -moz-transition: bottom 1s, opacity 0.5s;\n            -ms-transition: bottom 1s, opacity 0.5s;\n            transition: bottom 1s, opacity 0.5s;\n        }\n\n        vg-scrub-bar .scrubBar {\n            position: relative;\n            display: flex;\n            flex-grow: 1;\n            align-items: center;\n            height: 100%;\n        }\n\n        vg-controls vg-scrub-bar {\n            position: relative;\n            bottom: 0;\n            background: transparent;\n            height: 50px;\n            flex-grow: 1;\n            flex-basis: 0;\n            margin: 0 10px;\n            -webkit-transition: initial;\n            -khtml-transition: initial;\n            -moz-transition: initial;\n            -ms-transition: initial;\n            transition: initial;\n        }\n\n        vg-scrub-bar.hide {\n            bottom: 0;\n            opacity: 0;\n        }\n\n        vg-controls vg-scrub-bar.hide {\n            bottom: initial;\n            opacity: initial;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, vg_api_1.VgAPI, vg_controls_hidden_1.VgControlsHidden])
    ], VgScrubBar);
    return VgScrubBar;
}());
exports.VgScrubBar = VgScrubBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRyb2xzL3ZnLXNjcnViLWJhci92Zy1zY3J1Yi1iYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FHdUI7QUFDdkIscURBQW1EO0FBQ25ELCtFQUE0RTtBQUM1RSx5REFBdUQ7QUE2RXZEO0lBYUksb0JBQVksR0FBZSxFQUFTLEdBQVUsRUFBRSxxQkFBdUM7UUFBdkYsaUJBR0M7UUFIbUMsUUFBRyxHQUFILEdBQUcsQ0FBTztRQVpuQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUd2QyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBSXpCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUVuQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFHL0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO1FBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7YUFDSTtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxDQUFDO1NBQzVGO0lBQ0wsQ0FBQztJQUVELGtDQUFhLEdBQWI7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RUFBRSxDQUFFLFFBQVEsQ0FBRSxDQUFDOzs7OzBEQVl4QztJQUdEO1FBREMsbUJBQVksQ0FBQyxvQkFBb0IsRUFBRSxDQUFFLFFBQVEsQ0FBRSxDQUFDOzs7O3lEQU9oRDtJQUVtRDtRQUFuRCxtQkFBWSxDQUFDLHNCQUFzQixFQUFFLENBQUUsUUFBUSxDQUFFLENBQUM7Ozs7MkRBTWxEO0lBRWdEO1FBQWhELG1CQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBRSxRQUFRLENBQUUsQ0FBQzs7Ozt3REFNL0M7SUFHRDtRQURDLG1CQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7O3lDQUNYLGFBQWE7O3VEQVdyQztJQWxLUSxVQUFVO1FBMUV0QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsYUFBYSxFQUFFLHdCQUFpQixDQUFDLElBQUk7WUFDckMsUUFBUSxFQUFFLG9hQWFUO1lBQ0QsTUFBTSxFQUFFLENBQUUsNGxEQXVEVCxDQUFFO1NBQ04sQ0FBQzt5Q0FjbUIsaUJBQVUsRUFBYyxjQUFLLEVBQXlCLHFDQUFnQjtPQWI5RSxVQUFVLENBK0t0QjtJQUFELGlCQUFDO0NBQUEsQUEvS0QsSUErS0M7QUEvS1ksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIEhvc3RMaXN0ZW5lciwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgSG9zdEJpbmRpbmcsXG4gICAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzSGlkZGVuIH0gZnJvbSAnLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5pbXBvcnQgeyBWZ1N0YXRlcyB9IGZyb20gJy4uLy4uL2NvcmUvc3RhdGVzL3ZnLXN0YXRlcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1zY3J1Yi1iYXInLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNjcnViQmFyXCJcbiAgICAgICAgICAgICB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgIHJvbGU9XCJzbGlkZXJcIlxuICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJzY3J1YiBiYXJcIlxuICAgICAgICAgICAgIGFyaWEtbGV2ZWw9XCJwb2xpdGVcIlxuICAgICAgICAgICAgIFthdHRyLmFyaWEtdmFsdWVub3ddPVwiZ2V0UGVyY2VudGFnZSgpXCJcbiAgICAgICAgICAgICBhcmlhLXZhbHVlbWluPVwiMFwiXG4gICAgICAgICAgICAgYXJpYS12YWx1ZW1heD1cIjEwMFwiXG4gICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZXRleHRdPVwiZ2V0UGVyY2VudGFnZSgpICsgJyUnXCI+XG4gICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgYCxcbiAgICBzdHlsZXM6IFsgYFxuICAgICAgICB2Zy1zY3J1Yi1iYXIge1xuICAgICAgICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1cHg7XG4gICAgICAgICAgICBib3R0b206IDUwcHg7XG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjc1KTtcbiAgICAgICAgICAgIHotaW5kZXg6IDI1MDtcbiAgICAgICAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYm90dG9tIDFzLCBvcGFjaXR5IDAuNXM7XG4gICAgICAgICAgICAta2h0bWwtdHJhbnNpdGlvbjogYm90dG9tIDFzLCBvcGFjaXR5IDAuNXM7XG4gICAgICAgICAgICAtbW96LXRyYW5zaXRpb246IGJvdHRvbSAxcywgb3BhY2l0eSAwLjVzO1xuICAgICAgICAgICAgLW1zLXRyYW5zaXRpb246IGJvdHRvbSAxcywgb3BhY2l0eSAwLjVzO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYm90dG9tIDFzLCBvcGFjaXR5IDAuNXM7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1zY3J1Yi1iYXIgLnNjcnViQmFyIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctY29udHJvbHMgdmctc2NydWItYmFyIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgZmxleC1iYXNpczogMDtcbiAgICAgICAgICAgIG1hcmdpbjogMCAxMHB4O1xuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBpbml0aWFsO1xuICAgICAgICAgICAgLWtodG1sLXRyYW5zaXRpb246IGluaXRpYWw7XG4gICAgICAgICAgICAtbW96LXRyYW5zaXRpb246IGluaXRpYWw7XG4gICAgICAgICAgICAtbXMtdHJhbnNpdGlvbjogaW5pdGlhbDtcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGluaXRpYWw7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1zY3J1Yi1iYXIuaGlkZSB7XG4gICAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctY29udHJvbHMgdmctc2NydWItYmFyLmhpZGUge1xuICAgICAgICAgICAgYm90dG9tOiBpbml0aWFsO1xuICAgICAgICAgICAgb3BhY2l0eTogaW5pdGlhbDtcbiAgICAgICAgfVxuICAgIGAgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ1NjcnViQmFyIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaGlkZScpIGhpZGVTY3J1YkJhciA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgdmdGb3I6IHN0cmluZztcbiAgICBASW5wdXQoKSB2Z1NsaWRlciA9IHRydWU7XG5cbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICB0YXJnZXQ6IGFueTtcbiAgICBpc1NlZWtpbmcgPSBmYWxzZTtcbiAgICB3YXNQbGF5aW5nID0gZmFsc2U7XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocmVmOiBFbGVtZW50UmVmLCBwdWJsaWMgQVBJOiBWZ0FQSSwgdmdDb250cm9sc0hpZGRlblN0YXRlOiBWZ0NvbnRyb2xzSGlkZGVuKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh2Z0NvbnRyb2xzSGlkZGVuU3RhdGUuaXNIaWRkZW4uc3Vic2NyaWJlKGhpZGUgPT4gdGhpcy5vbkhpZGVTY3J1YkJhcihoaWRlKSkpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlZWtTdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0LmNhblBsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTZWVraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC5zdGF0ZSA9PT0gVmdTdGF0ZXMuVkdfUExBWUlORykge1xuICAgICAgICAgICAgICAgIHRoaXMud2FzUGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlZWtNb3ZlKG9mZnNldDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2Vla2luZykge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLm1heChNYXRoLm1pbihvZmZzZXQgKiAxMDAgLyB0aGlzLmVsZW0uc2Nyb2xsV2lkdGgsIDk5LjkpLCAwKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnRpbWUuY3VycmVudCA9IHBlcmNlbnRhZ2UgKiB0aGlzLnRhcmdldC50aW1lLnRvdGFsIC8gMTAwO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuc2Vla1RpbWUocGVyY2VudGFnZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2Vla0VuZChvZmZzZXQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy50YXJnZXQuY2FuUGxheSkge1xuICAgICAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSBNYXRoLm1heChNYXRoLm1pbihvZmZzZXQgKiAxMDAgLyB0aGlzLmVsZW0uc2Nyb2xsV2lkdGgsIDk5LjkpLCAwKTtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNlZWtUaW1lKHBlcmNlbnRhZ2UsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMud2FzUGxheWluZykge1xuICAgICAgICAgICAgICAgIHRoaXMud2FzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b3VjaEVuZCgpIHtcbiAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMud2FzUGxheWluZykge1xuICAgICAgICAgICAgdGhpcy53YXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5wbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0VG91Y2hPZmZzZXQoZXZlbnQ6IGFueSkge1xuICAgICAgICBsZXQgb2Zmc2V0TGVmdCA9IDA7XG4gICAgICAgIGxldCBlbGVtZW50OiBhbnkgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICAgICAgICBvZmZzZXRMZWZ0ICs9IGVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gb2Zmc2V0TGVmdDtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbICckZXZlbnQnIF0pXG4gICAgb25Nb3VzZURvd25TY3J1YkJhcigkZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50YXJnZXQuaXNMaXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZnU2xpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vla0VuZCgkZXZlbnQub2Zmc2V0WCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlZWtTdGFydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNlbW92ZScsIFsgJyRldmVudCcgXSlcbiAgICBvbk1vdXNlTW92ZVNjcnViQmFyKCRldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5pc0xpdmUgJiYgdGhpcy52Z1NsaWRlciAmJiB0aGlzLmlzU2Vla2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vla01vdmUoJGV2ZW50Lm9mZnNldFgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2V1cCcsIFsgJyRldmVudCcgXSlcbiAgICBvbk1vdXNlVXBTY3J1YkJhcigkZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50YXJnZXQuaXNMaXZlICYmIHRoaXMudmdTbGlkZXIgJiYgdGhpcy5pc1NlZWtpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlZWtFbmQoJGV2ZW50Lm9mZnNldFgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigndG91Y2hzdGFydCcsIFsgJyRldmVudCcgXSlcbiAgICBvblRvdWNoU3RhcnRTY3J1YkJhcigkZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50YXJnZXQuaXNMaXZlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZnU2xpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vla0VuZCh0aGlzLmdldFRvdWNoT2Zmc2V0KCRldmVudCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWVrU3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaG1vdmUnLCBbICckZXZlbnQnIF0pXG4gICAgb25Ub3VjaE1vdmVTY3J1YkJhcigkZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50YXJnZXQuaXNMaXZlICYmIHRoaXMudmdTbGlkZXIgJiYgdGhpcy5pc1NlZWtpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlZWtNb3ZlKHRoaXMuZ2V0VG91Y2hPZmZzZXQoJGV2ZW50KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnRvdWNoY2FuY2VsJywgWyAnJGV2ZW50JyBdKSBvblRvdWNoQ2FuY2VsU2NydWJCYXIoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudGFyZ2V0LmlzTGl2ZSAmJiB0aGlzLnZnU2xpZGVyICYmIHRoaXMuaXNTZWVraW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaGVuZCcsIFsgJyRldmVudCcgXSkgb25Ub3VjaEVuZFNjcnViQmFyKCRldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRhcmdldC5pc0xpdmUgJiYgdGhpcy52Z1NsaWRlciAmJiB0aGlzLmlzU2Vla2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hFbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIGFycm93QWRqdXN0Vm9sdW1lKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM4IHx8IGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5zZWVrVGltZSgodGhpcy50YXJnZXQudGltZS5jdXJyZW50ICsgNTAwMCkgLyAxMDAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSA0MCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuc2Vla1RpbWUoKHRoaXMudGFyZ2V0LnRpbWUuY3VycmVudCAtIDUwMDApIC8gMTAwMCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UGVyY2VudGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0ID8gKCh0aGlzLnRhcmdldC50aW1lLmN1cnJlbnQgKiAxMDApIC8gdGhpcy50YXJnZXQudGltZS50b3RhbCkgKyAnJScgOiAnMCUnO1xuICAgIH1cblxuICAgIG9uSGlkZVNjcnViQmFyKGhpZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5oaWRlU2NydWJCYXIgPSBoaWRlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19