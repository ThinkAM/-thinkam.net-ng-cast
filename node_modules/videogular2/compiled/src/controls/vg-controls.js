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
var vg_controls_hidden_1 = require("./../core/services/vg-controls-hidden");
var vg_states_1 = require("../core/states/vg-states");
var rxjs_1 = require("rxjs");
var VgControls = /** @class */ (function () {
    // @ts-ignore
    function VgControls(API, ref, hidden) {
        this.API = API;
        this.ref = ref;
        this.hidden = hidden;
        this.isAdsPlaying = 'initial';
        this.hideControls = false;
        this.vgAutohide = false;
        this.vgAutohideTime = 3;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    VgControls.prototype.ngOnInit = function () {
        var _this = this;
        this.mouseMove$ = rxjs_1.fromEvent(this.API.videogularElement, 'mousemove');
        this.subscriptions.push(this.mouseMove$.subscribe(this.show.bind(this)));
        this.touchStart$ = rxjs_1.fromEvent(this.API.videogularElement, 'touchstart');
        this.subscriptions.push(this.touchStart$.subscribe(this.show.bind(this)));
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgControls.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        this.subscriptions.push(this.target.subscriptions.play.subscribe(this.onPlay.bind(this)));
        this.subscriptions.push(this.target.subscriptions.pause.subscribe(this.onPause.bind(this)));
        this.subscriptions.push(this.target.subscriptions.startAds.subscribe(this.onStartAds.bind(this)));
        this.subscriptions.push(this.target.subscriptions.endAds.subscribe(this.onEndAds.bind(this)));
    };
    VgControls.prototype.ngAfterViewInit = function () {
        if (this.vgAutohide) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    VgControls.prototype.onPlay = function () {
        if (this.vgAutohide) {
            this.hide();
        }
    };
    VgControls.prototype.onPause = function () {
        clearTimeout(this.timer);
        this.hideControls = false;
        this.hidden.state(false);
    };
    VgControls.prototype.onStartAds = function () {
        this.isAdsPlaying = 'none';
    };
    VgControls.prototype.onEndAds = function () {
        this.isAdsPlaying = 'initial';
    };
    VgControls.prototype.hide = function () {
        if (this.vgAutohide) {
            clearTimeout(this.timer);
            this.hideAsync();
        }
    };
    VgControls.prototype.show = function () {
        clearTimeout(this.timer);
        this.hideControls = false;
        this.hidden.state(false);
        if (this.vgAutohide) {
            this.hideAsync();
        }
    };
    VgControls.prototype.hideAsync = function () {
        var _this = this;
        if (this.API.state === vg_states_1.VgStates.VG_PLAYING) {
            this.timer = setTimeout(function () {
                _this.hideControls = true;
                _this.hidden.state(true);
            }, this.vgAutohideTime * 1000);
        }
    };
    VgControls.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate([
        core_1.HostBinding('style.pointer-events'),
        __metadata("design:type", Object)
    ], VgControls.prototype, "isAdsPlaying", void 0);
    __decorate([
        core_1.HostBinding('class.hide'),
        __metadata("design:type", Object)
    ], VgControls.prototype, "hideControls", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VgControls.prototype, "vgFor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VgControls.prototype, "vgAutohide", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VgControls.prototype, "vgAutohideTime", void 0);
    VgControls = __decorate([
        core_1.Component({
            selector: 'vg-controls',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "<ng-content></ng-content>",
            styles: ["\n        vg-controls {\n            position: absolute;\n            display: flex;\n            width: 100%;\n            height: 50px;\n            z-index: 300;\n            bottom: 0;\n            background-color: rgba(0, 0, 0, 0.5);\n            -webkit-transition: bottom 1s;\n            -khtml-transition: bottom 1s;\n            -moz-transition: bottom 1s;\n            -ms-transition: bottom 1s;\n            transition: bottom 1s;\n        }\n\n        vg-controls.hide {\n            bottom: -50px;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [vg_api_1.VgAPI, core_1.ElementRef, vg_controls_hidden_1.VgControlsHidden])
    ], VgControls);
    return VgControls;
}());
exports.VgControls = VgControls;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbHMvdmctY29udHJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FFdUI7QUFFdkIsa0RBQWdEO0FBQ2hELDRFQUF5RTtBQUV6RSxzREFBb0Q7QUFDcEQsNkJBQStCO0FBMkIvQjtJQWlCSSxhQUFhO0lBQ2Isb0JBQW9CLEdBQVUsRUFBVSxHQUFlLEVBQVUsTUFBd0I7UUFBckUsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQWRwRCxpQkFBWSxHQUFHLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUd2QyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBTzVCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUcvQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDbEMsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFBQSxpQkFhQztRQVpHLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsV0FBVyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNB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LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgQWZ0ZXJWaWV3SW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IFZnQ29udHJvbHNIaWRkZW4gfSBmcm9tICcuLy4uL2NvcmUvc2VydmljZXMvdmctY29udHJvbHMtaGlkZGVuJztcblxuaW1wb3J0IHsgVmdTdGF0ZXMgfSBmcm9tICcuLi9jb3JlL3N0YXRlcy92Zy1zdGF0ZXMnO1xuaW1wb3J0IHtmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3ZnLWNvbnRyb2xzJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PmAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctY29udHJvbHMge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgei1pbmRleDogMzAwO1xuICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgICAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBib3R0b20gMXM7XG4gICAgICAgICAgICAta2h0bWwtdHJhbnNpdGlvbjogYm90dG9tIDFzO1xuICAgICAgICAgICAgLW1vei10cmFuc2l0aW9uOiBib3R0b20gMXM7XG4gICAgICAgICAgICAtbXMtdHJhbnNpdGlvbjogYm90dG9tIDFzO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYm90dG9tIDFzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmctY29udHJvbHMuaGlkZSB7XG4gICAgICAgICAgICBib3R0b206IC01MHB4O1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgVmdDb250cm9scyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcbiAgICB0YXJnZXQ6IGFueTtcblxuICAgIEBIb3N0QmluZGluZygnc3R5bGUucG9pbnRlci1ldmVudHMnKSBpc0Fkc1BsYXlpbmcgPSAnaW5pdGlhbCc7XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5oaWRlJykgaGlkZUNvbnRyb2xzID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSB2Z0Zvcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHZnQXV0b2hpZGUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB2Z0F1dG9oaWRlVGltZSA9IDM7XG5cbiAgICBwcml2YXRlIHRpbWVyOiBhbnk7XG5cbiAgICBtb3VzZU1vdmUkOiBPYnNlcnZhYmxlPGFueT47XG4gICAgdG91Y2hTdGFydCQ6IE9ic2VydmFibGU8YW55PjtcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgQVBJOiBWZ0FQSSwgcHJpdmF0ZSByZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgaGlkZGVuOiBWZ0NvbnRyb2xzSGlkZGVuKSB7XG4gICAgICAgIHRoaXMuZWxlbSA9IHJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm1vdXNlTW92ZSQgPSBmcm9tRXZlbnQodGhpcy5BUEkudmlkZW9ndWxhckVsZW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5tb3VzZU1vdmUkLnN1YnNjcmliZSh0aGlzLnNob3cuYmluZCh0aGlzKSkpO1xuXG4gICAgICAgIHRoaXMudG91Y2hTdGFydCQgPSBmcm9tRXZlbnQodGhpcy5BUEkudmlkZW9ndWxhckVsZW1lbnQsICd0b3VjaHN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMudG91Y2hTdGFydCQuc3Vic2NyaWJlKHRoaXMuc2hvdy5iaW5kKHRoaXMpKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuQVBJLmlzUGxheWVyUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMub25QbGF5ZXJSZWFkeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5BUEkucGxheWVyUmVhZHlFdmVudC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5vblBsYXllclJlYWR5KCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGxheWVyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5BUEkuZ2V0TWVkaWFCeUlkKHRoaXMudmdGb3IpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMudGFyZ2V0LnN1YnNjcmlwdGlvbnMucGxheS5zdWJzY3JpYmUodGhpcy5vblBsYXkuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRhcmdldC5zdWJzY3JpcHRpb25zLnBhdXNlLnN1YnNjcmliZSh0aGlzLm9uUGF1c2UuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRhcmdldC5zdWJzY3JpcHRpb25zLnN0YXJ0QWRzLnN1YnNjcmliZSh0aGlzLm9uU3RhcnRBZHMuYmluZCh0aGlzKSkpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRhcmdldC5zdWJzY3JpcHRpb25zLmVuZEFkcy5zdWJzY3JpYmUodGhpcy5vbkVuZEFkcy5iaW5kKHRoaXMpKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy52Z0F1dG9oaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5KCkge1xuICAgICAgICBpZiAodGhpcy52Z0F1dG9oaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGF1c2UoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgdGhpcy5oaWRlQ29udHJvbHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRkZW4uc3RhdGUoZmFsc2UpO1xuICAgIH1cblxuICAgIG9uU3RhcnRBZHMoKSB7XG4gICAgICAgIHRoaXMuaXNBZHNQbGF5aW5nID0gJ25vbmUnO1xuICAgIH1cblxuICAgIG9uRW5kQWRzKCkge1xuICAgICAgICB0aGlzLmlzQWRzUGxheWluZyA9ICdpbml0aWFsJztcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZiAodGhpcy52Z0F1dG9oaWRlKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgICAgICAgICB0aGlzLmhpZGVBc3luYygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgICAgICB0aGlzLmhpZGVDb250cm9scyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGRlbi5zdGF0ZShmYWxzZSk7XG5cbiAgICAgICAgaWYgKHRoaXMudmdBdXRvaGlkZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlQXN5bmMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGlkZUFzeW5jKCkge1xuICAgICAgICBpZiAodGhpcy5BUEkuc3RhdGUgPT09IFZnU3RhdGVzLlZHX1BMQVlJTkcpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVDb250cm9scyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRkZW4uc3RhdGUodHJ1ZSk7XG4gICAgICAgICAgICB9LCB0aGlzLnZnQXV0b2hpZGVUaW1lICogMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbn1cbiJdfQ==