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
var vg_api_1 = require("../services/vg-api");
var vg_fullscreen_api_1 = require("../services/vg-fullscreen-api");
var vg_utils_1 = require("../services/vg-utils");
var vg_media_1 = require("../vg-media/vg-media");
var vg_controls_hidden_1 = require("../services/vg-controls-hidden");
var VgPlayer = /** @class */ (function () {
    function VgPlayer(ref, api, fsAPI, controlsHidden) {
        this.api = api;
        this.fsAPI = fsAPI;
        this.controlsHidden = controlsHidden;
        this.isFullscreen = false;
        this.isNativeFullscreen = false;
        this.areControlsHidden = false;
        this.onPlayerReady = new core_1.EventEmitter();
        this.onMediaReady = new core_1.EventEmitter();
        this.subscriptions = [];
        this.elem = ref.nativeElement;
        this.api.registerElement(this.elem);
    }
    VgPlayer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.medias.toArray().forEach(function (media) {
            _this.api.registerMedia(media);
        });
        this.fsAPI.init(this.elem, this.medias);
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
        this.api.onPlayerReady(this.fsAPI);
        this.onPlayerReady.emit(this.api);
    };
    VgPlayer.prototype.onChangeFullscreen = function (fsState) {
        if (!this.fsAPI.nativeFullscreen) {
            this.isFullscreen = fsState;
            this.zIndex = fsState ? vg_utils_1.VgUtils.getZIndex().toString() : 'auto';
        }
        else {
            this.isNativeFullscreen = fsState;
        }
    };
    VgPlayer.prototype.onHideControls = function (hidden) {
        this.areControlsHidden = hidden;
    };
    VgPlayer.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate([
        core_1.HostBinding('class.fullscreen'),
        __metadata("design:type", Object)
    ], VgPlayer.prototype, "isFullscreen", void 0);
    __decorate([
        core_1.HostBinding('class.native-fullscreen'),
        __metadata("design:type", Object)
    ], VgPlayer.prototype, "isNativeFullscreen", void 0);
    __decorate([
        core_1.HostBinding('class.controls-hidden'),
        __metadata("design:type", Object)
    ], VgPlayer.prototype, "areControlsHidden", void 0);
    __decorate([
        core_1.HostBinding('style.z-index'),
        __metadata("design:type", String)
    ], VgPlayer.prototype, "zIndex", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VgPlayer.prototype, "onPlayerReady", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VgPlayer.prototype, "onMediaReady", void 0);
    __decorate([
        core_1.ContentChildren(vg_media_1.VgMedia),
        __metadata("design:type", core_1.QueryList)
    ], VgPlayer.prototype, "medias", void 0);
    VgPlayer = __decorate([
        core_1.Component({
            selector: 'vg-player',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "<ng-content></ng-content>",
            styles: ["\n        vg-player {\n            font-family: 'videogular';\n            position: relative;\n            display: flex;\n            width: 100%;\n            height: 100%;\n            overflow: hidden;\n            background-color: black;\n        }\n\n        vg-player.fullscreen {\n            position: fixed;\n            left: 0;\n            top: 0;\n        }\n\n        vg-player.native-fullscreen.controls-hidden {\n            cursor: none;\n        }\n    "],
            providers: [vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_controls_hidden_1.VgControlsHidden]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, vg_api_1.VgAPI, vg_fullscreen_api_1.VgFullscreenAPI, vg_controls_hidden_1.VgControlsHidden])
    ], VgPlayer);
    return VgPlayer;
}());
exports.VgPlayer = VgPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvcmUvdmctcGxheWVyL3ZnLXBsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQVN1QjtBQUN2Qiw2Q0FBMkM7QUFDM0MsbUVBQWdFO0FBQ2hFLGlEQUErQztBQUMvQyxpREFBK0M7QUFFL0MscUVBQWtFO0FBNkJsRTtJQW1CSSxrQkFBWSxHQUFlLEVBQVMsR0FBVSxFQUFTLEtBQXNCLEVBQVUsY0FBZ0M7UUFBbkYsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUFTLFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWtCO1FBaEJ0RixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNkLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUM3QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFJaEUsa0JBQWEsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFHdEQsaUJBQVksR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFLckQsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELHFDQUFrQixHQUFsQjtRQUFBLGlCQVlDO1FBWEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQ2hDLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxxQ0FBa0IsR0FBbEIsVUFBbUIsT0FBZ0I7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLGtCQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNuRTthQUFNO1lBQ0gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE9BQU8sQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsTUFBZTtRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQW5EZ0M7UUFBaEMsa0JBQVcsQ0FBQyxrQkFBa0IsQ0FBQzs7a0RBQXNCO0lBQ2Q7UUFBdkMsa0JBQVcsQ0FBQyx5QkFBeUIsQ0FBQzs7d0RBQTRCO0lBQzdCO1FBQXJDLGtCQUFXLENBQUMsdUJBQXVCLENBQUM7O3VEQUEyQjtJQUNsQztRQUE3QixrQkFBVyxDQUFDLGVBQWUsQ0FBQzs7NENBQWdCO0lBRzdDO1FBREMsYUFBTSxFQUFFO2tDQUNNLG1CQUFZO21EQUEyQjtJQUd0RDtRQURDLGFBQU0sRUFBRTtrQ0FDSyxtQkFBWTtrREFBMkI7SUFHckQ7UUFEQyxzQkFBZSxDQUFDLGtCQUFPLENBQUM7a0NBQ2pCLGdCQUFTOzRDQUFVO0lBZmxCLFFBQVE7UUEzQnBCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsV0FBVztZQUNyQixhQUFhLEVBQUUsd0JBQWlCLENBQUMsSUFBSTtZQUNyQyxRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLE1BQU0sRUFBRSxDQUFFLDRkQW9CVCxDQUFFO1lBQ0gsU0FBUyxFQUFFLENBQUUsY0FBSyxFQUFFLG1DQUFlLEVBQUUscUNBQWdCLENBQUU7U0FDMUQsQ0FBQzt5Q0FvQm1CLGlCQUFVLEVBQWMsY0FBSyxFQUFnQixtQ0FBZSxFQUEwQixxQ0FBZ0I7T0FuQjlHLFFBQVEsQ0F1RHBCO0lBQUQsZUFBQztDQUFBLEFBdkRELElBdURDO0FBdkRZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBPdXRwdXQsXG4gICAgQ29tcG9uZW50LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbnRlbnRDaGlsZHJlbiwgVmlld0VuY2Fwc3VsYXRpb24sIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IFZnRnVsbHNjcmVlbkFQSSB9IGZyb20gJy4uL3NlcnZpY2VzL3ZnLWZ1bGxzY3JlZW4tYXBpJztcbmltcG9ydCB7IFZnVXRpbHMgfSBmcm9tICcuLi9zZXJ2aWNlcy92Zy11dGlscyc7XG5pbXBvcnQgeyBWZ01lZGlhIH0gZnJvbSAnLi4vdmctbWVkaWEvdmctbWVkaWEnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBWZ0NvbnRyb2xzSGlkZGVuIH0gZnJvbSAnLi4vc2VydmljZXMvdmctY29udHJvbHMtaGlkZGVuJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy1wbGF5ZXInLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgdGVtcGxhdGU6IGA8bmctY29udGVudD48L25nLWNvbnRlbnQ+YCxcbiAgICBzdHlsZXM6IFsgYFxuICAgICAgICB2Zy1wbGF5ZXIge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICd2aWRlb2d1bGFyJztcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZnLXBsYXllci5mdWxsc2NyZWVuIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2Zy1wbGF5ZXIubmF0aXZlLWZ1bGxzY3JlZW4uY29udHJvbHMtaGlkZGVuIHtcbiAgICAgICAgICAgIGN1cnNvcjogbm9uZTtcbiAgICAgICAgfVxuICAgIGAgXSxcbiAgICBwcm92aWRlcnM6IFsgVmdBUEksIFZnRnVsbHNjcmVlbkFQSSwgVmdDb250cm9sc0hpZGRlbiBdXG59KVxuZXhwb3J0IGNsYXNzIFZnUGxheWVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBlbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZnVsbHNjcmVlbicpIGlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MubmF0aXZlLWZ1bGxzY3JlZW4nKSBpc05hdGl2ZUZ1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNvbnRyb2xzLWhpZGRlbicpIGFyZUNvbnRyb2xzSGlkZGVuID0gZmFsc2U7XG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS56LWluZGV4JykgekluZGV4OiBzdHJpbmc7XG5cbiAgICBAT3V0cHV0KClcbiAgICBvblBsYXllclJlYWR5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIG9uTWVkaWFSZWFkeTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFZnTWVkaWEpXG4gICAgbWVkaWFzOiBRdWVyeUxpc3Q8VmdNZWRpYT47XG5cbiAgICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocmVmOiBFbGVtZW50UmVmLCBwdWJsaWMgYXBpOiBWZ0FQSSwgcHVibGljIGZzQVBJOiBWZ0Z1bGxzY3JlZW5BUEksIHByaXZhdGUgY29udHJvbHNIaWRkZW46IFZnQ29udHJvbHNIaWRkZW4pIHtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy5hcGkucmVnaXN0ZXJFbGVtZW50KHRoaXMuZWxlbSk7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLm1lZGlhcy50b0FycmF5KCkuZm9yRWFjaCgobWVkaWEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBpLnJlZ2lzdGVyTWVkaWEobWVkaWEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZzQVBJLmluaXQodGhpcy5lbGVtLCB0aGlzLm1lZGlhcyk7XG5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5mc0FQSS5vbkNoYW5nZUZ1bGxzY3JlZW4uc3Vic2NyaWJlKHRoaXMub25DaGFuZ2VGdWxsc2NyZWVuLmJpbmQodGhpcykpKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy5jb250cm9sc0hpZGRlbi5pc0hpZGRlbi5zdWJzY3JpYmUodGhpcy5vbkhpZGVDb250cm9scy5iaW5kKHRoaXMpKSk7XG5cbiAgICAgICAgdGhpcy5hcGkub25QbGF5ZXJSZWFkeSh0aGlzLmZzQVBJKTtcbiAgICAgICAgdGhpcy5vblBsYXllclJlYWR5LmVtaXQodGhpcy5hcGkpO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlRnVsbHNjcmVlbihmc1N0YXRlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghdGhpcy5mc0FQSS5uYXRpdmVGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzRnVsbHNjcmVlbiA9IGZzU3RhdGU7XG4gICAgICAgICAgICB0aGlzLnpJbmRleCA9IGZzU3RhdGUgPyBWZ1V0aWxzLmdldFpJbmRleCgpLnRvU3RyaW5nKCkgOiAnYXV0byc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTmF0aXZlRnVsbHNjcmVlbiA9IGZzU3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkhpZGVDb250cm9scyhoaWRkZW46IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5hcmVDb250cm9sc0hpZGRlbiA9IGhpZGRlbjtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xuICAgIH1cbn1cbiJdfQ==