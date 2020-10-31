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
var vg_events_1 = require("../events/vg-events");
var rxjs_1 = require("rxjs");
var VgCuePoints = /** @class */ (function () {
    function VgCuePoints(ref) {
        this.ref = ref;
        this.onEnterCuePoint = new core_1.EventEmitter();
        this.onUpdateCuePoint = new core_1.EventEmitter();
        this.onExitCuePoint = new core_1.EventEmitter();
        this.onCompleteCuePoint = new core_1.EventEmitter();
        this.subscriptions = [];
        this.cuesSubscriptions = [];
        this.totalCues = 0;
    }
    VgCuePoints.prototype.ngOnInit = function () {
        this.onLoad$ = rxjs_1.fromEvent(this.ref.nativeElement, vg_events_1.VgEvents.VG_LOAD);
        this.subscriptions.push(this.onLoad$.subscribe(this.onLoad.bind(this)));
    };
    VgCuePoints.prototype.onLoad = function (event) {
        var cues = event.target.track.cues;
        this.ref.nativeElement.cues = cues;
        this.updateCuePoints(cues);
    };
    VgCuePoints.prototype.updateCuePoints = function (cues) {
        this.cuesSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        for (var i = 0, l = cues.length; i < l; i++) {
            this.onEnter$ = rxjs_1.fromEvent(cues[i], vg_events_1.VgEvents.VG_ENTER);
            this.cuesSubscriptions.push(this.onEnter$.subscribe(this.onEnter.bind(this)));
            this.onExit$ = rxjs_1.fromEvent(cues[i], vg_events_1.VgEvents.VG_EXIT);
            this.cuesSubscriptions.push(this.onExit$.subscribe(this.onExit.bind(this)));
        }
    };
    VgCuePoints.prototype.onEnter = function (event) {
        this.onEnterCuePoint.emit(event.target);
    };
    VgCuePoints.prototype.onExit = function (event) {
        this.onExitCuePoint.emit(event.target);
    };
    VgCuePoints.prototype.ngDoCheck = function () {
        if (this.ref.nativeElement.track && this.ref.nativeElement.track.cues) {
            var changes = this.totalCues !== this.ref.nativeElement.track.cues.length;
            if (changes) {
                this.totalCues = this.ref.nativeElement.track.cues.length;
                this.ref.nativeElement.cues = this.ref.nativeElement.track.cues;
                this.updateCuePoints(this.ref.nativeElement.track.cues);
            }
        }
    };
    VgCuePoints.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VgCuePoints.prototype, "onEnterCuePoint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VgCuePoints.prototype, "onUpdateCuePoint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VgCuePoints.prototype, "onExitCuePoint", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], VgCuePoints.prototype, "onCompleteCuePoint", void 0);
    VgCuePoints = __decorate([
        core_1.Directive({
            selector: '[vgCuePoints]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], VgCuePoints);
    return VgCuePoints;
}());
exports.VgCuePoints = VgCuePoints;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctY3VlLXBvaW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3ZnLWN1ZS1wb2ludHMvdmctY3VlLXBvaW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF3RztBQUN4RyxpREFBK0M7QUFDL0MsNkJBQTZEO0FBSzdEO0lBZUkscUJBQW1CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBZHhCLG9CQUFlLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3hELHFCQUFnQixHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN6RCxtQkFBYyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN2RCx1QkFBa0IsR0FBc0IsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFFckUsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLHNCQUFpQixHQUFtQixFQUFFLENBQUM7UUFNdkMsY0FBUyxHQUFHLENBQUMsQ0FBQztJQUdkLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLG9CQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sS0FBVTtRQUNiLElBQUksSUFBSSxHQUFtQixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVuQyxJQUFJLENBQUMsZUFBZSxDQUFD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QUEsQUFuRUQsSUFtRUM7QUFuRVksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmdFdmVudHMgfSBmcm9tICcuLi9ldmVudHMvdmctZXZlbnRzJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdmdDdWVQb2ludHNdJ1xufSlcbmV4cG9ydCBjbGFzcyBWZ0N1ZVBvaW50cyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBEb0NoZWNrIHtcbiAgICBAT3V0cHV0KCkgb25FbnRlckN1ZVBvaW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25VcGRhdGVDdWVQb2ludDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIG9uRXhpdEN1ZVBvaW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgb25Db21wbGV0ZUN1ZVBvaW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gICAgY3Vlc1N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgICBvbkxvYWQkOiBPYnNlcnZhYmxlPGFueT47XG4gICAgb25FbnRlciQ6IE9ic2VydmFibGU8YW55PjtcbiAgICBvbkV4aXQkOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgICB0b3RhbEN1ZXMgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm9uTG9hZCQgPSBmcm9tRXZlbnQodGhpcy5yZWYubmF0aXZlRWxlbWVudCwgVmdFdmVudHMuVkdfTE9BRCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMub25Mb2FkJC5zdWJzY3JpYmUodGhpcy5vbkxvYWQuYmluZCh0aGlzKSkpO1xuICAgIH1cblxuICAgIG9uTG9hZChldmVudDogYW55KSB7XG4gICAgICAgIGxldCBjdWVzOiBUZXh0VHJhY2tDdWVbXSA9IGV2ZW50LnRhcmdldC50cmFjay5jdWVzO1xuXG4gICAgICAgIHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuY3VlcyA9IGN1ZXM7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDdWVQb2ludHMoY3Vlcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3VlUG9pbnRzKGN1ZXM6IFRleHRUcmFja0N1ZVtdKSB7XG4gICAgICAgIHRoaXMuY3Vlc1N1YnNjcmlwdGlvbnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBjdWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5vbkVudGVyJCA9IGZyb21FdmVudChjdWVzWyBpIF0sIFZnRXZlbnRzLlZHX0VOVEVSKTtcbiAgICAgICAgICAgIHRoaXMuY3Vlc1N1YnNjcmlwdGlvbnMucHVzaCh0aGlzLm9uRW50ZXIkLnN1YnNjcmliZSh0aGlzLm9uRW50ZXIuYmluZCh0aGlzKSkpO1xuXG4gICAgICAgICAgICB0aGlzLm9uRXhpdCQgPSBmcm9tRXZlbnQoY3Vlc1sgaSBdLCBWZ0V2ZW50cy5WR19FWElUKTtcbiAgICAgICAgICAgIHRoaXMuY3Vlc1N1YnNjcmlwdGlvbnMucHVzaCh0aGlzLm9uRXhpdCQuc3Vic2NyaWJlKHRoaXMub25FeGl0LmJpbmQodGhpcykpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRW50ZXIoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLm9uRW50ZXJDdWVQb2ludC5lbWl0KGV2ZW50LnRhcmdldCk7XG4gICAgfVxuXG4gICAgb25FeGl0KGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbkV4aXRDdWVQb2ludC5lbWl0KGV2ZW50LnRhcmdldCk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQudHJhY2sgJiYgdGhpcy5yZWYubmF0aXZlRWxlbWVudC50cmFjay5jdWVzKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy50b3RhbEN1ZXMgIT09IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQudHJhY2suY3Vlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbEN1ZXMgPSB0aGlzLnJlZi5uYXRpdmVFbGVtZW50LnRyYWNrLmN1ZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQuY3VlcyA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQudHJhY2suY3VlcztcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUN1ZVBvaW50cyh0aGlzLnJlZi5uYXRpdmVFbGVtZW50LnRyYWNrLmN1ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcbiAgICB9XG59XG4iXX0=