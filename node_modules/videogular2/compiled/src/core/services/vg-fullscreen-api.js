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
var vg_utils_1 = require("./vg-utils");
var rxjs_1 = require("rxjs");
var VgFullscreenAPI = /** @class */ (function () {
    function VgFullscreenAPI() {
        this.nativeFullscreen = true;
        this.isFullscreen = false;
        this.onChangeFullscreen = new core_1.EventEmitter();
    }
    VgFullscreenAPI.prototype.init = function (elem, medias) {
        var _this = this;
        this.videogularElement = elem;
        this.medias = medias;
        var APIs = {
            w3: {
                enabled: 'fullscreenEnabled',
                element: 'fullscreenElement',
                request: 'requestFullscreen',
                exit: 'exitFullscreen',
                onchange: 'fullscreenchange',
                onerror: 'fullscreenerror'
            },
            newWebkit: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitRequestFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            oldWebkit: {
                enabled: 'webkitIsFullScreen',
                element: 'webkitCurrentFullScreenElement',
                request: 'webkitRequestFullScreen',
                exit: 'webkitCancelFullScreen',
                onchange: 'webkitfullscreenchange',
                onerror: 'webkitfullscreenerror'
            },
            moz: {
                enabled: 'mozFullScreen',
                element: 'mozFullScreenElement',
                request: 'mozRequestFullScreen',
                exit: 'mozCancelFullScreen',
                onchange: 'mozfullscreenchange',
                onerror: 'mozfullscreenerror'
            },
            ios: {
                enabled: 'webkitFullscreenEnabled',
                element: 'webkitFullscreenElement',
                request: 'webkitEnterFullscreen',
                exit: 'webkitExitFullscreen',
                onchange: 'webkitendfullscreen',
                onerror: 'webkitfullscreenerror'
            },
            ms: {
                enabled: 'msFullscreenEnabled',
                element: 'msFullscreenElement',
                request: 'msRequestFullscreen',
                exit: 'msExitFullscreen',
                onchange: 'MSFullscreenChange',
                onerror: 'MSFullscreenError'
            }
        };
        for (var browser in APIs) {
            if (APIs[browser].enabled in document) {
                this.polyfill = APIs[browser];
                break;
            }
        }
        if (vg_utils_1.VgUtils.isiOSDevice()) {
            this.polyfill = APIs.ios;
        }
        this.isAvailable = (this.polyfill != null);
        if (this.polyfill == null) {
            return;
        }
        var fsElemDispatcher;
        switch (this.polyfill.onchange) {
            // Mozilla dispatches the fullscreen change event from document, not the element
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=724816#c3
            case 'mozfullscreenchange':
                fsElemDispatcher = document;
                break;
            // iOS dispatches the fullscreen change event from video element
            case 'webkitendfullscreen':
                fsElemDispatcher = this.medias.toArray()[0].elem;
                break;
            // HTML5 implementation dispatches the fullscreen change event from the element
            default:
                fsElemDispatcher = elem;
        }
        this.fsChangeSubscription = rxjs_1.fromEvent(fsElemDispatcher, this.polyfill.onchange).subscribe(function () {
            _this.onFullscreenChange();
        });
    };
    VgFullscreenAPI.prototype.onFullscreenChange = function () {
        this.isFullscreen = !!document[this.polyfill.element];
        this.onChangeFullscreen.emit(this.isFullscreen);
    };
    VgFullscreenAPI.prototype.toggleFullscreen = function (element) {
        if (element === void 0) { element = null; }
        if (this.isFullscreen) {
            this.exit();
        }
        else {
            this.request(element);
        }
    };
    VgFullscreenAPI.prototype.request = function (elem) {
        if (!elem) {
            elem = this.videogularElement;
        }
        this.isFullscreen = true;
        this.onChangeFullscreen.emit(true);
        // Perform native full screen support
        if (this.isAvailable && this.nativeFullscreen) {
            // Fullscreen for mobile devices
            if (vg_utils_1.VgUtils.isMobileDevice()) {
                // We should make fullscreen the video object if it doesn't have native fullscreen support
                // Fallback! We can't set vg-player on fullscreen, only video/audio objects
                if ((!this.polyfill.enabled && elem === this.videogularElement) || vg_utils_1.VgUtils.isiOSDevice()) {
                    elem = this.medias.toArray()[0].elem;
                }
                this.enterElementInFullScreen(elem);
            }
            else {
                this.enterElementInFullScreen(this.videogularElement);
            }
        }
    };
    VgFullscreenAPI.prototype.enterElementInFullScreen = function (elem) {
        elem[this.polyfill.request]();
    };
    VgFullscreenAPI.prototype.exit = function () {
        this.isFullscreen = false;
        this.onChangeFullscreen.emit(false);
        // Exit from native fullscreen
        if (this.isAvailable && this.nativeFullscreen) {
            document[this.polyfill.exit]();
        }
    };
    VgFullscreenAPI = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], VgFullscreenAPI);
    return VgFullscreenAPI;
}());
exports.VgFullscreenAPI = VgFullscreenAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZnVsbHNjcmVlbi1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFvRTtBQUNwRSx1Q0FBcUM7QUFFckMsNkJBQStDO0FBRy9DO0lBYUk7UUFUQSxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFNckIsdUJBQWtCLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO0lBRzNELENBQUM7SUFFRCw4QkFBSSxHQUFKLFVBQUssSUFBaUIsRUFBRSxNQUEwQjtRQUFsRCxpQkE4RkM7UUE3RkcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFNLElBQUksR0FBRztZQUNULEVBQUUsRUFBRTtnQkFDQSxPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixPQUFPLEVBQUUsaUJBQWlCO2FBQzdCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLE9BQU8sRUFBRSx5QkFBeUI7Z0JBQ2xDLElBQUksRUFBRSxzQkFBc0I7Z0JBQzVCLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLE9BQU8sRUFBRSx1QkFBdUI7YUFDbkM7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLG9CQUFvQjtnQkFDN0IsT0FBTyxFQUFFLGdDQUFnQztnQkFDekMsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsSUFBSSxFQUFFLHdCQUF3QjtnQkFD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LENBQUMsUUFBUSxDQUFDLElBQUksQ0FBRSxFQUFFLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBcEtRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTs7T0FDQSxlQUFlLENBcUszQjtJQUFELHNCQUFDO0NBQUEsQUFyS0QsSUFxS0M7QUFyS1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdVdGlscyB9IGZyb20gJy4vdmctdXRpbHMnO1xuaW1wb3J0IHsgVmdNZWRpYSB9IGZyb20gJy4uL3ZnLW1lZGlhL3ZnLW1lZGlhJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWZ0Z1bGxzY3JlZW5BUEkge1xuICAgIHBvbHlmaWxsOiBhbnk7XG4gICAgb25jaGFuZ2U6IHN0cmluZztcbiAgICBvbmVycm9yOiBzdHJpbmc7XG4gICAgbmF0aXZlRnVsbHNjcmVlbiA9IHRydWU7XG4gICAgaXNGdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgaXNBdmFpbGFibGU6IGJvb2xlYW47XG4gICAgdmlkZW9ndWxhckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIG1lZGlhczogUXVlcnlMaXN0PFZnTWVkaWE+O1xuXG4gICAgZnNDaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBvbkNoYW5nZUZ1bGxzY3JlZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgaW5pdChlbGVtOiBIVE1MRWxlbWVudCwgbWVkaWFzOiBRdWVyeUxpc3Q8VmdNZWRpYT4pIHtcbiAgICAgICAgdGhpcy52aWRlb2d1bGFyRWxlbWVudCA9IGVsZW07XG4gICAgICAgIHRoaXMubWVkaWFzID0gbWVkaWFzO1xuXG4gICAgICAgIGNvbnN0IEFQSXMgPSB7XG4gICAgICAgICAgICB3Mzoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICdmdWxsc2NyZWVuRW5hYmxlZCcsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ2Z1bGxzY3JlZW5FbGVtZW50JyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiAncmVxdWVzdEZ1bGxzY3JlZW4nLFxuICAgICAgICAgICAgICAgIGV4aXQ6ICdleGl0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgb25jaGFuZ2U6ICdmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICAgICBvbmVycm9yOiAnZnVsbHNjcmVlbmVycm9yJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5ld1dlYmtpdDoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICd3ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCcsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ3dlYmtpdEZ1bGxzY3JlZW5FbGVtZW50JyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiAnd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4nLFxuICAgICAgICAgICAgICAgIGV4aXQ6ICd3ZWJraXRFeGl0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgb25jaGFuZ2U6ICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICAgICBvbmVycm9yOiAnd2Via2l0ZnVsbHNjcmVlbmVycm9yJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9sZFdlYmtpdDoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6ICd3ZWJraXRJc0Z1bGxTY3JlZW4nLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6ICd3ZWJraXRDdXJyZW50RnVsbFNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6ICd3ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbicsXG4gICAgICAgICAgICAgICAgZXhpdDogJ3dlYmtpdENhbmNlbEZ1bGxTY3JlZW4nLFxuICAgICAgICAgICAgICAgIG9uY2hhbmdlOiAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAgICAgb25lcnJvcjogJ3dlYmtpdGZ1bGxzY3JlZW5lcnJvcidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb3o6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAnbW96RnVsbFNjcmVlbicsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ21vekZ1bGxTY3JlZW5FbGVtZW50JyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0OiAnbW96UmVxdWVzdEZ1bGxTY3JlZW4nLFxuICAgICAgICAgICAgICAgIGV4aXQ6ICdtb3pDYW5jZWxGdWxsU2NyZWVuJyxcbiAgICAgICAgICAgICAgICBvbmNoYW5nZTogJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgICAgIG9uZXJyb3I6ICdtb3pmdWxsc2NyZWVuZXJyb3InXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW9zOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogJ3dlYmtpdEZ1bGxzY3JlZW5FbmFibGVkJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiAnd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6ICd3ZWJraXRFbnRlckZ1bGxzY3JlZW4nLFxuICAgICAgICAgICAgICAgIGV4aXQ6ICd3ZWJraXRFeGl0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgb25jaGFuZ2U6ICd3ZWJraXRlbmRmdWxsc2NyZWVuJywgLy8gSGFjayBmb3IgaU9TOiB3ZWJraXRmdWxsc2NyZWVuY2hhbmdlIGl0J3Mgbm90IGZpcmluZ1xuICAgICAgICAgICAgICAgIG9uZXJyb3I6ICd3ZWJraXRmdWxsc2NyZWVuZXJyb3InXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXM6IHtcbiAgICAgICAgICAgICAgICBlbmFibGVkOiAnbXNGdWxsc2NyZWVuRW5hYmxlZCcsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogJ21zRnVsbHNjcmVlbkVsZW1lbnQnLFxuICAgICAgICAgICAgICAgIHJlcXVlc3Q6ICdtc1JlcXVlc3RGdWxsc2NyZWVuJyxcbiAgICAgICAgICAgICAgICBleGl0OiAnbXNFeGl0RnVsbHNjcmVlbicsXG4gICAgICAgICAgICAgICAgb25jaGFuZ2U6ICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLFxuICAgICAgICAgICAgICAgIG9uZXJyb3I6ICdNU0Z1bGxzY3JlZW5FcnJvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBicm93c2VyIGluIEFQSXMpIHtcbiAgICAgICAgICAgIGlmIChBUElzWyBicm93c2VyIF0uZW5hYmxlZCBpbiBkb2N1bWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9seWZpbGwgPSBBUElzWyBicm93c2VyIF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVmdVdGlscy5pc2lPU0RldmljZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnBvbHlmaWxsID0gQVBJcy5pb3M7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQXZhaWxhYmxlID0gKHRoaXMucG9seWZpbGwgIT0gbnVsbCk7XG5cbiAgICAgICAgaWYgKHRoaXMucG9seWZpbGwgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZzRWxlbURpc3BhdGNoZXI7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnBvbHlmaWxsLm9uY2hhbmdlKSB7XG4gICAgICAgICAgICAvLyBNb3ppbGxhIGRpc3BhdGNoZXMgdGhlIGZ1bGxzY3JlZW4gY2hhbmdlIGV2ZW50IGZyb20gZG9jdW1lbnQsIG5vdCB0aGUgZWxlbWVudFxuICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD03MjQ4MTYjYzNcbiAgICAgICAgICAgIGNhc2UgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnOlxuICAgICAgICAgICAgICAgIGZzRWxlbURpc3BhdGNoZXIgPSBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gaU9TIGRpc3BhdGNoZXMgdGhlIGZ1bGxzY3JlZW4gY2hhbmdlIGV2ZW50IGZyb20gdmlkZW8gZWxlbWVudFxuICAgICAgICAgICAgY2FzZSAnd2Via2l0ZW5kZnVsbHNjcmVlbic6XG4gICAgICAgICAgICAgICAgZnNFbGVtRGlzcGF0Y2hlciA9IHRoaXMubWVkaWFzLnRvQXJyYXkoKVsgMCBdLmVsZW07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIEhUTUw1IGltcGxlbWVudGF0aW9uIGRpc3BhdGNoZXMgdGhlIGZ1bGxzY3JlZW4gY2hhbmdlIGV2ZW50IGZyb20gdGhlIGVsZW1lbnRcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZnNFbGVtRGlzcGF0Y2hlciA9IGVsZW07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZzQ2hhbmdlU3Vic2NyaXB0aW9uID0gZnJvbUV2ZW50KGZzRWxlbURpc3BhdGNoZXIsIHRoaXMucG9seWZpbGwub25jaGFuZ2UpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkZ1bGxzY3JlZW5DaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuaXNGdWxsc2NyZWVuID0gISFkb2N1bWVudFsgdGhpcy5wb2x5ZmlsbC5lbGVtZW50IF07XG4gICAgICAgIHRoaXMub25DaGFuZ2VGdWxsc2NyZWVuLmVtaXQodGhpcy5pc0Z1bGxzY3JlZW4pO1xuICAgIH1cblxuICAgIHRvZ2dsZUZ1bGxzY3JlZW4oZWxlbWVudDogYW55ID0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZXhpdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVxdWVzdChlbGVtOiBhbnkpIHtcbiAgICAgICAgaWYgKCFlbGVtKSB7XG4gICAgICAgICAgICBlbGVtID0gdGhpcy52aWRlb2d1bGFyRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNGdWxsc2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4uZW1pdCh0cnVlKTtcblxuICAgICAgICAvLyBQZXJmb3JtIG5hdGl2ZSBmdWxsIHNjcmVlbiBzdXBwb3J0XG4gICAgICAgIGlmICh0aGlzLmlzQXZhaWxhYmxlICYmIHRoaXMubmF0aXZlRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgLy8gRnVsbHNjcmVlbiBmb3IgbW9iaWxlIGRldmljZXNcbiAgICAgICAgICAgIGlmIChWZ1V0aWxzLmlzTW9iaWxlRGV2aWNlKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBzaG91bGQgbWFrZSBmdWxsc2NyZWVuIHRoZSB2aWRlbyBvYmplY3QgaWYgaXQgZG9lc24ndCBoYXZlIG5hdGl2ZSBmdWxsc2NyZWVuIHN1cHBvcnRcbiAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayEgV2UgY2FuJ3Qgc2V0IHZnLXBsYXllciBvbiBmdWxsc2NyZWVuLCBvbmx5IHZpZGVvL2F1ZGlvIG9iamVjdHNcbiAgICAgICAgICAgICAgICBpZiAoKCF0aGlzLnBvbHlmaWxsLmVuYWJsZWQgJiYgZWxlbSA9PT0gdGhpcy52aWRlb2d1bGFyRWxlbWVudCkgfHwgVmdVdGlscy5pc2lPU0RldmljZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSB0aGlzLm1lZGlhcy50b0FycmF5KClbIDAgXS5lbGVtO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJFbGVtZW50SW5GdWxsU2NyZWVuKGVsZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRlckVsZW1lbnRJbkZ1bGxTY3JlZW4odGhpcy52aWRlb2d1bGFyRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbnRlckVsZW1lbnRJbkZ1bGxTY3JlZW4oZWxlbTogYW55KSB7XG4gICAgICAgIGVsZW1bIHRoaXMucG9seWZpbGwucmVxdWVzdCBdKCk7XG4gICAgfVxuXG4gICAgZXhpdCgpIHtcbiAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZUZ1bGxzY3JlZW4uZW1pdChmYWxzZSk7XG5cbiAgICAgICAgLy8gRXhpdCBmcm9tIG5hdGl2ZSBmdWxsc2NyZWVuXG4gICAgICAgIGlmICh0aGlzLmlzQXZhaWxhYmxlICYmIHRoaXMubmF0aXZlRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgZG9jdW1lbnRbIHRoaXMucG9seWZpbGwuZXhpdCBdKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=