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
var VgTrackSelector = /** @class */ (function () {
    function VgTrackSelector(ref, API) {
        this.API = API;
        this.subscriptions = [];
        this.elem = ref.nativeElement;
    }
    VgTrackSelector.prototype.ngOnInit = function () {
        var _this = this;
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe(function () { return _this.onPlayerReady(); }));
        }
    };
    VgTrackSelector.prototype.onPlayerReady = function () {
        this.target = this.API.getMediaById(this.vgFor);
        var subs = Array.from(this.API.getMasterMedia().elem.children)
            .filter(function (item) { return item.tagName === 'TRACK'; })
            .filter(function (item) { return item.kind === 'subtitles'; })
            .map(function (item) { return ({
            label: item.label,
            selected: item.default === true,
            id: item.srclang
        }); });
        this.tracks = subs.concat([
            {
                id: null,
                label: 'Off',
                selected: subs.every(function (item) { return item.selected === false; })
            }
        ]);
        var track = this.tracks.filter(function (item) { return item.selected === true; })[0];
        this.trackSelected = track.id;
        this.ariaValue = track.label;
    };
    VgTrackSelector.prototype.selectTrack = function (trackId) {
        var _this = this;
        this.trackSelected = (trackId === 'null') ? null : trackId;
        this.ariaValue = 'No track selected';
        Array.from(this.API.getMasterMedia().elem.textTracks)
            .forEach(function (item) {
            if (item.language === trackId) {
                _this.ariaValue = item.label;
                item.mode = 'showing';
            }
            else {
                item.mode = 'hidden';
            }
        });
    };
    VgTrackSelector.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], VgTrackSelector.prototype, "vgFor", void 0);
    VgTrackSelector = __decorate([
        core_1.Component({
            selector: 'vg-track-selector',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n        <div class=\"container\">\n            <div class=\"track-selected\"\n                 [class.vg-icon-closed_caption]=\"!trackSelected\">\n                {{ trackSelected || '' }}\n            </div>\n            \n            <select class=\"trackSelector\" \n                    (change)=\"selectTrack($event.target.value)\"\n                    tabindex=\"0\"\n                    aria-label=\"track selector\"\n                    [attr.aria-valuetext]=\"ariaValue\">\n                <option \n                    *ngFor=\"let track of tracks\"\n                    [value]=\"track.id\"\n                    [selected]=\"track.selected === true\">\n                    {{ track.label }}\n                </option>\n            </select>\n        </div>\n    ",
            styles: ["\n        vg-track-selector {\n            -webkit-touch-callout: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            display: flex;\n            justify-content: center;\n            width: 50px;\n            height: 50px;\n            cursor: pointer;\n            color: white;\n            line-height: 50px;\n        }\n        vg-track-selector .container {\n            position: relative;\n            display: flex;\n            flex-grow: 1;\n            align-items: center;\n            \n            padding: 0;\n            margin: 5px;\n        }\n        vg-track-selector select.trackSelector {\n            width: 50px;\n            padding: 5px 8px;\n            border: none;\n            background: none;\n            -webkit-appearance: none;\n            -moz-appearance: none;\n            appearance: none;\n            color: transparent;\n            font-size: 16px;\n        }\n        vg-track-selector select.trackSelector::-ms-expand {\n            display: none;\n        }\n        vg-track-selector select.trackSelector option {\n            color: #000;\n        }\n        vg-track-selector .track-selected {\n            position: absolute;\n            width: 100%;\n            height: 50px;\n            top: -6px;\n            text-align: center;\n            text-transform: uppercase;\n            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;\n            padding-top: 2px;\n            pointer-events: none;\n        }\n        vg-track-selector .vg-icon-closed_caption:before {\n            width: 100%;\n        }\n    "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, vg_api_1.VgAPI])
    ], VgTrackSelector);
    return VgTrackSelector;
}());
exports.VgTrackSelector = VgTrackSelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdHJhY2stc2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbHMvdmctdHJhY2stc2VsZWN0b3IvdmctdHJhY2stc2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUc7QUFDbkcscURBQW1EO0FBMEZuRDtJQVlJLHlCQUFZLEdBQWUsRUFBUyxHQUFVO1FBQVYsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUo5QyxrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFLL0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQUEsaUJBT0M7UUFORyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjthQUNJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLENBQUM7U0FDNUY7SUFDTCxDQUFDO0lBRUQsdUNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWhELElBQU0sSUFBSSxHQUFrQixLQUFLLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBeUIsQ0FBQyxRQUFRLENBQUM7YUFDaEcsTUFBTSxDQUFDLFVBQUMsSUFBaUIsSUFBSyxPQUFBLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUF4QixDQUF3QixDQUFDO2FBQ3ZELE1BQU0sQ0FBQyxVQUFDLElBQXNCLElBQUssT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBekIsQ0FBeUIsQ0FBQzthQUM3RCxHQUFHLENBQUMsVUFBQyxJQUFzQixJQUFLLE9BQUEsQ0FBQztZQUM5QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSTtZQUMvQixFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDbkIsQ0FBQyxFQUorQixDQUkvQixDQUFDLENBQUM7UUFFUixJQUFJLENBQUMsTUFBTSxHQUNKLElBQUk7WUFDUDtnQkFDSSxFQUFFLEVBQUUsSUFBSTtnQkFDUixLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFDLElBQVksSUFBSyxPQUFBLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUF2QixDQUF1QixDQUFDO2FBQ2xFO1VBQ0osQ0FBQztRQUVGLElBQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBWSxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQXRCLENBQXNCLENBQUMsQ0FBRSxDQUFDLENBQUUsQ0FBQztRQUN4RixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQVksT0FBZTtRQUEzQixpQkFjQztRQWJHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRTNELElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7UUFFckMsS0FBSyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQXlCLENBQUMsVUFBVSxDQUFDO2FBQ3RFLE9BQU8sQ0FBQyxVQUFDLElBQWU7WUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtnQkFDM0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM1QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUN4QjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBcEVRO1FBQVIsWUFBSyxFQUFFOztrREFBZTtJQURkLGVBQWU7UUFqRjNCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLGFBQWEsRUFBRSx3QkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLFFBQVEsRUFBRSx3d0JBb0JUO1lBQ0QsTUFBTSxFQUFFLENBQUUsK3BEQXVEVCxDQUFFO1NBQ04sQ0FBQzt5Q0FhbUIsaUJBQVUsRUFBYyxjQUFLO09BWnJDLGVBQWUsQ0FzRTNCO0lBQUQsc0JBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdBUEkgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBPcHRpb24ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd2Zy10cmFjay1zZWxlY3RvcicsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHJhY2stc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICBbY2xhc3MudmctaWNvbi1jbG9zZWRfY2FwdGlvbl09XCIhdHJhY2tTZWxlY3RlZFwiPlxuICAgICAgICAgICAgICAgIHt7IHRyYWNrU2VsZWN0ZWQgfHwgJycgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwidHJhY2tTZWxlY3RvclwiIFxuICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInNlbGVjdFRyYWNrKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cInRyYWNrIHNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZXRleHRdPVwiYXJpYVZhbHVlXCI+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBcbiAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRyYWNrIG9mIHRyYWNrc1wiXG4gICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJ0cmFjay5pZFwiXG4gICAgICAgICAgICAgICAgICAgIFtzZWxlY3RlZF09XCJ0cmFjay5zZWxlY3RlZCA9PT0gdHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7eyB0cmFjay5sYWJlbCB9fVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgc3R5bGVzOiBbIGBcbiAgICAgICAgdmctdHJhY2stc2VsZWN0b3Ige1xuICAgICAgICAgICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAgICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDUwcHg7XG4gICAgICAgIH1cbiAgICAgICAgdmctdHJhY2stc2VsZWN0b3IgLmNvbnRhaW5lciB7XG4gICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgIG1hcmdpbjogNXB4O1xuICAgICAgICB9XG4gICAgICAgIHZnLXRyYWNrLXNlbGVjdG9yIHNlbGVjdC50cmFja1NlbGVjdG9yIHtcbiAgICAgICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDhweDtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgICAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgICAgICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgICAgICAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgICAgICAgICAgY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICB9XG4gICAgICAgIHZnLXRyYWNrLXNlbGVjdG9yIHNlbGVjdC50cmFja1NlbGVjdG9yOjotbXMtZXhwYW5kIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgdmctdHJhY2stc2VsZWN0b3Igc2VsZWN0LnRyYWNrU2VsZWN0b3Igb3B0aW9uIHtcbiAgICAgICAgICAgIGNvbG9yOiAjMDAwO1xuICAgICAgICB9XG4gICAgICAgIHZnLXRyYWNrLXNlbGVjdG9yIC50cmFjay1zZWxlY3RlZCB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHRvcDogLTZweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgICBmb250LWZhbWlseTogSGVsdmV0aWNhIE5ldWUsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMnB4O1xuICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgdmctdHJhY2stc2VsZWN0b3IgLnZnLWljb24tY2xvc2VkX2NhcHRpb246YmVmb3JlIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgYCBdXG59KVxuZXhwb3J0IGNsYXNzIFZnVHJhY2tTZWxlY3RvciBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSB2Z0Zvcjogc3RyaW5nO1xuXG4gICAgZWxlbTogSFRNTEVsZW1lbnQ7XG4gICAgdGFyZ2V0OiBhbnk7XG4gICAgdHJhY2tzOiBBcnJheTxPcHRpb24+O1xuICAgIHRyYWNrU2VsZWN0ZWQ6IHN0cmluZztcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBhcmlhVmFsdWU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHJlZjogRWxlbWVudFJlZiwgcHVibGljIEFQSTogVmdBUEkpIHtcbiAgICAgICAgdGhpcy5lbGVtID0gcmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLkFQSS5pc1BsYXllclJlYWR5KSB7XG4gICAgICAgICAgICB0aGlzLm9uUGxheWVyUmVhZHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuQVBJLnBsYXllclJlYWR5RXZlbnQuc3Vic2NyaWJlKCgpID0+IHRoaXMub25QbGF5ZXJSZWFkeSgpKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBsYXllclJlYWR5KCkge1xuICAgICAgICB0aGlzLnRhcmdldCA9IHRoaXMuQVBJLmdldE1lZGlhQnlJZCh0aGlzLnZnRm9yKTtcblxuICAgICAgICBjb25zdCBzdWJzOiBBcnJheTxPcHRpb24+ID0gQXJyYXkuZnJvbSgodGhpcy5BUEkuZ2V0TWFzdGVyTWVkaWEoKS5lbGVtIGFzIEhUTUxNZWRpYUVsZW1lbnQpLmNoaWxkcmVuKVxuICAgICAgICAgICAgLmZpbHRlcigoaXRlbTogSFRNTEVsZW1lbnQpID0+IGl0ZW0udGFnTmFtZSA9PT0gJ1RSQUNLJylcbiAgICAgICAgICAgIC5maWx0ZXIoKGl0ZW06IEhUTUxUcmFja0VsZW1lbnQpID0+IGl0ZW0ua2luZCA9PT0gJ3N1YnRpdGxlcycpXG4gICAgICAgICAgICAubWFwKChpdGVtOiBIVE1MVHJhY2tFbGVtZW50KSA9PiAoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBpdGVtLmxhYmVsLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBpdGVtLmRlZmF1bHQgPT09IHRydWUsXG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW0uc3JjbGFuZ1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIHRoaXMudHJhY2tzID0gW1xuICAgICAgICAgICAgLi4uc3VicyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ09mZicsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHN1YnMuZXZlcnkoKGl0ZW06IE9wdGlvbikgPT4gaXRlbS5zZWxlY3RlZCA9PT0gZmFsc2UpXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgdHJhY2s6IE9wdGlvbiA9IHRoaXMudHJhY2tzLmZpbHRlcigoaXRlbTogT3B0aW9uKSA9PiBpdGVtLnNlbGVjdGVkID09PSB0cnVlKVsgMCBdO1xuICAgICAgICB0aGlzLnRyYWNrU2VsZWN0ZWQgPSB0cmFjay5pZDtcbiAgICAgICAgdGhpcy5hcmlhVmFsdWUgPSB0cmFjay5sYWJlbDtcbiAgICB9XG5cbiAgICBzZWxlY3RUcmFjayh0cmFja0lkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50cmFja1NlbGVjdGVkID0gKHRyYWNrSWQgPT09ICdudWxsJykgPyBudWxsIDogdHJhY2tJZDtcblxuICAgICAgICB0aGlzLmFyaWFWYWx1ZSA9ICdObyB0cmFjayBzZWxlY3RlZCc7XG5cbiAgICAgICAgQXJyYXkuZnJvbSgodGhpcy5BUEkuZ2V0TWFzdGVyTWVkaWEoKS5lbGVtIGFzIEhUTUxNZWRpYUVsZW1lbnQpLnRleHRUcmFja3MpXG4gICAgICAgICAgICAuZm9yRWFjaCgoaXRlbTogVGV4dFRyYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGFuZ3VhZ2UgPT09IHRyYWNrSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcmlhVmFsdWUgPSBpdGVtLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm1vZGUgPSAnc2hvd2luZyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5tb2RlID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG59XG4iXX0=