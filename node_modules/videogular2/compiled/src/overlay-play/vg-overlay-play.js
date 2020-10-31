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
var vg_api_1 = require("../core/services/vg-api");
var vg_states_1 = require("../core/states/vg-states");
var vg_fullscreen_api_1 = require("../core/services/vg-fullscreen-api");
var vg_controls_hidden_1 = require("../core/services/vg-controls-hidden");
var VgOverlayPlay = /** @class */ (function () {
    function VgOverlayPlay(ref, API, fsAPI, controlsHidden) {
        this.API = API;
        this.fsAPI = fsAPI;
        this.controlsHidden = controlsHidden;
        this.isNativeFullscreen = false;
        this.areControlsHidden = false;
        this.subscriptions = [];
        this.isBuffering = false;
        this.elem = ref.nativeElement;
    }
    VgOverlayPlay.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgOverlayPlay.prototype.onPlayerReady = function () {
        var _this = this;
        this.target = this.API.getMediaById(this.vgFor);
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
        this.subscriptions.push(this.target.subscriptions.bufferDetected.subscribe(function (isBuffering) { return _this.onUpdateBuffer(isBuffering); }));
    };
    VgOverlayPlay.prototype.onUpdateBuffer = function (isBuffering) {
        this.isBuffering = isBuffering;
    };
    VgOverlayPlay.prototype.onChangeFullscreen = function (fsState) {
        if (this.fsAPI.nativeFullscreen) {
            this.isNativeFullscreen = fsState;
        }
    };
    VgOverlayPlay.prototype.onHideControls = function (hidden) {
        this.areControlsHidden = hidden;
    };
    VgOverlayPlay.prototype.onClick = function () {
        var state = this.getState();
        switch (state) {
            case vg_states_1.VgStates.VG_PLAYING:
                this.target.pause();
                break;
            case vg_states_1.VgStates.VG_PAUSED:
            case vg_states_1.VgStates.VG_ENDED:
                this.target.play();
                break;
        }
    };
    VgOverlayPlay.prototype.getState = function () {
        var state = vg_states_1.VgStates.VG_PAUSED;
        if (this.target) {
            if (this.target.state instanceof Array) {
                for (var i = 0, l = this.target.state.length; i < l; i++) {
                    if (this.target.state[i] === vg_states_1.VgStates.VG_PLAYING) {
                        state = vg_states_1.VgStates.VG_PLAYING;
                        break;
                    }
                }
            }
            else {
                state = this.target.state;
            }
        }
        return state;
    };
    VgOverlayPlay.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VgOverlayPlay.prototype, "vgFor", void 0);
    __decorate([
        core_1.HostBinding('class.is-buffering'),
        __metadata("design:type", Object)
    ], VgOverlayPlay.prototype, "isBuffering", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], VgOverlayPlay.prototype, "onClick", null);
    VgOverlayPlay = __decorate([
        core_1.Component({
            selector: 'vg-overlay-play',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "<div class=\"vg-overlay-play\"\n                    [class.native-fullscreen]=\"isNativeFullscreen\"\n                    [class.controls-hidden]=\"areControlsHidden\">\n                   <div class=\"overlay-play-container\"\n                        [class.vg-icon-play_arrow]=\"getState() !== 'playing'\">\n                   </div>\n               </div>",
            styles: ["\n        vg-overlay-play {\n            z-index: 200;\n        }\n\n        vg-overlay-play.is-buffering {\n            display: none;\n        }\n\n        vg-overlay-play .vg-overlay-play {\n            transition: all 0.5s;\n            cursor: pointer;\n            position: absolute;\n            display: block;\n            color: white;\n            width: 100%;\n            height: 100%;\n            font-size: 80px;\n            filter: alpha(opacity=60);\n            opacity: 0.6;\n        }\n\n        vg-overlay-play .vg-overlay-play.native-fullscreen.controls-hidden {\n            cursor: none;\n        }\n\n        vg-overlay-play .vg-overlay-play .overlay-play-container.vg-icon-play_arrow {\n            pointer-events: none;\n            width: 100%;\n            height: 100%;\n            position: absolute;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 80px;\n        }\n\n        vg-overlay-play .vg-overlay-play:hover {\n            filter: alpha(opacity=100);\n            opacity: 1;\n        }\n\n        vg-overlay-play .vg-overlay-play:hover .overlay-play-container.vg-icon-play_arrow:before {\n            transform: scale(1.2);\n        }\n    "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_controls_hidden_1.VgControlsHidden])
    ], VgOverlayPlay);
    return VgOverlayPlay;
}());
exports.VgOverlayPlay = VgOverlayPlay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctb3ZlcmxheS1wbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL292ZXJsYXktcGxheS92Zy1vdmVybGF5LXBsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FHdUI7QUFDdkIsa0RBQWdEO0FBQ2hELHNEQUFvRDtBQUVwRCx3RUFBcUU7QUFDckUsMEVBQXVFO0FBMkR2RTtJQVlJLHVCQUFZLEdBQWUsRUFBUyxHQUFVLEVBQVMsS0FBc0IsRUFBVSxjQUFnQztRQUFuRixRQUFHLEdBQUgsR0FBRyxDQUFPO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFQdkgsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUUxQixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFFQSxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUduRCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDbEMsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFBQSxpQkFPQztRQU5HLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQztTQUM1RjtJQUNMLENBQUM7SUFFRCxxQ0FBYSxHQUFiO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUM5QyxVQUFBLFdBQVcsSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQWhDLENBQWdDLENBQ2xELENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxzQ0FBYyxHQUFkLFVBQWUsV0FBVztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMENBQWtCLEdBQWxCLFVBQW1CLE9BQWdCO1FBQy9CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtZQUM3QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQUVELHNDQUFjLEdBQWQsVUFBZSxNQUFlO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7SUFDcEMsQ0FBQztJQUdELCtCQUFPLEdBQVA7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFNUIsUUFBUSxLQUFLLEVBQUU7WUFDWCxLQUFLLG9CQUFRLENBQUMsVUFBVTtnQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsTUFBTTtZQUVWLEtBQUssb0JBQVEsQ0FBQyxTQUFTLENBQUM7WUFDeEIsS0FBSyxvQkFBUSxDQUFDLFFBQVE7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25CLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxLQUFLLEdBQUcsb0JBQVEsQ0FBQyxTQUFTLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7Z0JBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQUUsS0FBSyxvQkFBUSxDQUFDLFVBQVUsRUFBRTt3QkFDaEQsS0FBSyxHQUFHLG9CQUFRLENBQUMsVUFBVSxDQUFDO3dCQUM1QixNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7aUJBQ0k7Z0JBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQzdCO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUF2RlE7UUFBUixZQUFLLEVBQUU7O2dEQUFlO0lBU1k7UUFBbEMsa0JBQVcsQ0FBQyxvQkFBb0IsQ0FBQzs7c0RBQXFCO0lBeUN2RDtRQURDLG1CQUFZLENBQUMsT0FBTyxDQUFDOzs7O2dEQWNyQjtJQWhFUSxhQUFhO1FBekR6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxRQUFRLEVBQUUsd1dBTVE7WUFDbEIsTUFBTSxFQUFFLENBQUUsOHVDQTZDVCxDQUFFO1NBQ04sQ0FBQzt5Q0FhbUIsaUJBQVUsRUFBYyxjQUFLLEVBQWdCLG1DQUFlLEVBQTBCLHFDQUFnQjtPQVo5RyxhQUFhLENBeUZ6QjtJQUFELG9CQUFDO0NBQUEsQUF6RkQsSUF5RkM7QUF6Rlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBWaWV3RW5jYXBzdWxhdGlvbiwgT25EZXN0cm95LFxuICAgIEhvc3RCaW5kaW5nXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBWZ1N0YXRlcyB9IGZyb20gJy4uL2NvcmUvc3RhdGVzL3ZnLXN0YXRlcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFZnRnVsbHNjcmVlbkFQSSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdmctZnVsbHNjcmVlbi1hcGknO1xuaW1wb3J0IHsgVmdDb250cm9sc0hpZGRlbiB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdmctY29udHJvbHMtaGlkZGVuJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1vdmVybGF5LXBsYXknLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmctb3ZlcmxheS1wbGF5XCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzLm5hdGl2ZS1mdWxsc2NyZWVuXT1cImlzTmF0aXZlRnVsbHNjcmVlblwiXG4gICAgICAgICAgICAgICAgICAgIFtjbGFzcy5jb250cm9scy1oaWRkZW5dPVwiYXJlQ29udHJvbHNIaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3ZlcmxheS1wbGF5LWNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbY2xhc3MudmctaWNvbi1wbGF5X2Fycm93XT1cImdldFN0YXRlKCkgIT09ICdwbGF5aW5nJ1wiPlxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgPC9kaXY+YCxcbiAgICBzdHlsZXM6IFsgYFxuICAgICAgICB2Zy1vdmVybGF5LXBsYXkge1xuICAgICAgICAgICAgei1pbmRleDogMjAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctb3ZlcmxheS1wbGF5LmlzLWJ1ZmZlcmluZyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctb3ZlcmxheS1wbGF5IC52Zy1vdmVybGF5LXBsYXkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgZm9udC1zaXplOiA4MHB4O1xuICAgICAgICAgICAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTYwKTtcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLW92ZXJsYXktcGxheSAudmctb3ZlcmxheS1wbGF5Lm5hdGl2ZS1mdWxsc2NyZWVuLmNvbnRyb2xzLWhpZGRlbiB7XG4gICAgICAgICAgICBjdXJzb3I6IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1vdmVybGF5LXBsYXkgLnZnLW92ZXJsYXktcGxheSAub3ZlcmxheS1wbGF5LWNvbnRhaW5lci52Zy1pY29uLXBsYXlfYXJyb3cge1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBmb250LXNpemU6IDgwcHg7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1vdmVybGF5LXBsYXkgLnZnLW92ZXJsYXktcGxheTpob3ZlciB7XG4gICAgICAgICAgICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MTAwKTtcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1vdmVybGF5LXBsYXkgLnZnLW92ZXJsYXktcGxheTpob3ZlciAub3ZlcmxheS1wbGF5LWNvbnRhaW5lci52Zy1pY29uLXBsYXlfYXJyb3c6YmVmb3JlIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbiAgICAgICAgfVxuICAgIGAgXVxufSlcbmV4cG9ydCBjbGFzcyBWZ092ZXJsYXlQbGF5IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHZnRm9yOiBzdHJpbmc7XG4gICAgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgdGFyZ2V0OiBhbnk7XG5cbiAgICBpc05hdGl2ZUZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICBhcmVDb250cm9sc0hpZGRlbiA9IGZhbHNlO1xuXG4gICAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaXMtYnVmZmVyaW5nJykgaXNCdWZmZXJpbmcgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgcHVibGljIEFQSTogVmdBUEksIHB1YmxpYyBmc0FQSTogVmdGdWxsc2NyZWVuQVBJLCBwcml2YXRlIGNvbnRyb2xzSGlkZGVuOiBWZ0NvbnRyb2xzSGlkZGVuKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuaXNQbGF5ZXJSZWFkeSkge1xuICAgICAgICAgICAgdGhpcy5vblBsYXllclJlYWR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLkFQSS5wbGF5ZXJSZWFkeUV2ZW50LnN1YnNjcmliZSgoKSA9PiB0aGlzLm9uUGxheWVyUmVhZHkoKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5ZXJSZWFkeSgpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLkFQSS5nZXRNZWRpYUJ5SWQodGhpcy52Z0Zvcik7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuZnNBUEkub25DaGFuZ2VGdWxsc2NyZWVuLnN1YnNjcmliZSh0aGlzLm9uQ2hhbmdlRnVsbHNjcmVlbi5iaW5kKHRoaXMpKSk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuY29udHJvbHNIaWRkZW4uaXNIaWRkZW4uc3Vic2NyaWJlKHRoaXMub25IaWRlQ29udHJvbHMuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnN1YnNjcmlwdGlvbnMuYnVmZmVyRGV0ZWN0ZWQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIGlzQnVmZmVyaW5nID0+IHRoaXMub25VcGRhdGVCdWZmZXIoaXNCdWZmZXJpbmcpXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb25VcGRhdGVCdWZmZXIoaXNCdWZmZXJpbmcpIHtcbiAgICAgICAgdGhpcy5pc0J1ZmZlcmluZyA9IGlzQnVmZmVyaW5nO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlRnVsbHNjcmVlbihmc1N0YXRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmZzQVBJLm5hdGl2ZUZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuaXNOYXRpdmVGdWxsc2NyZWVuID0gZnNTdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSGlkZUNvbnRyb2xzKGhpZGRlbjogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmFyZUNvbnRyb2xzSGlkZGVuID0gaGlkZGVuO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgICBvbkNsaWNrKCkge1xuICAgICAgICBsZXQgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG5cbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBWZ1N0YXRlcy5WR19QTEFZSU5HOlxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVmdTdGF0ZXMuVkdfUEFVU0VEOlxuICAgICAgICAgICAgY2FzZSBWZ1N0YXRlcy5WR19FTkRFRDpcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTdGF0ZSgpIHtcbiAgICAgICAgbGV0IHN0YXRlID0gVmdTdGF0ZXMuVkdfUEFVU0VEO1xuXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFyZ2V0LnN0YXRlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMudGFyZ2V0LnN0YXRlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50YXJnZXQuc3RhdGVbIGkgXSA9PT0gVmdTdGF0ZXMuVkdfUExBWUlORykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSBWZ1N0YXRlcy5WR19QTEFZSU5HO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHRoaXMudGFyZ2V0LnN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgfVxufVxuIl19