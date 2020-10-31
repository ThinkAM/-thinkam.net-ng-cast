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
var vg_controls_1 = require("./vg-controls");
var vg_fullscreen_1 = require("./vg-fullscreen/vg-fullscreen");
var vg_mute_1 = require("./vg-mute/vg-mute");
var vg_volume_1 = require("./vg-volume/vg-volume");
var vg_play_pause_1 = require("./vg-play-pause/vg-play-pause");
var vg_playback_button_1 = require("./vg-playback-button/vg-playback-button");
var vg_scrub_bar_1 = require("./vg-scrub-bar/vg-scrub-bar");
var vg_scrub_bar_buffering_time_1 = require("./vg-scrub-bar/vg-scrub-bar-buffering-time/vg-scrub-bar-buffering-time");
var vg_scrub_bar_cue_points_1 = require("./vg-scrub-bar/vg-scrub-bar-cue-points/vg-scrub-bar-cue-points");
var vg_scrub_bar_current_time_1 = require("./vg-scrub-bar/vg-scrub-bar-current-time/vg-scrub-bar-current-time");
var vg_time_display_1 = require("./vg-time-display/vg-time-display");
var vg_track_selector_1 = require("./vg-track-selector/vg-track-selector");
var vg_controls_hidden_1 = require("../core/services/vg-controls-hidden");
var vg_quality_selector_1 = require("./vg-quality-selector/vg-quality-selector");
var VgControlsModule = /** @class */ (function () {
    function VgControlsModule() {
    }
    VgControlsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [
                vg_controls_1.VgControls,
                vg_fullscreen_1.VgFullscreen,
                vg_mute_1.VgMute,
                vg_volume_1.VgVolume,
                vg_play_pause_1.VgPlayPause,
                vg_playback_button_1.VgPlaybackButton,
                vg_scrub_bar_1.VgScrubBar,
                vg_scrub_bar_buffering_time_1.VgScrubBarBufferingTime,
                vg_scrub_bar_cue_points_1.VgScrubBarCuePoints,
                vg_scrub_bar_current_time_1.VgScrubBarCurrentTime,
                vg_time_display_1.VgTimeDisplay,
                vg_time_display_1.VgUtcPipe,
                vg_track_selector_1.VgTrackSelector,
                vg_quality_selector_1.VgQualitySelector
            ],
            exports: [
                vg_controls_1.VgControls,
                vg_fullscreen_1.VgFullscreen,
                vg_mute_1.VgMute,
                vg_volume_1.VgVolume,
                vg_play_pause_1.VgPlayPause,
                vg_playback_button_1.VgPlaybackButton,
                vg_scrub_bar_1.VgScrubBar,
                vg_scrub_bar_buffering_time_1.VgScrubBarBufferingTime,
                vg_scrub_bar_cue_points_1.VgScrubBarCuePoints,
                vg_scrub_bar_current_time_1.VgScrubBarCurrentTime,
                vg_time_display_1.VgTimeDisplay,
                vg_time_display_1.VgUtcPipe,
                vg_track_selector_1.VgTrackSelector,
                vg_quality_selector_1.VgQualitySelector
            ],
            providers: [vg_controls_hidden_1.VgControlsHidden]
        })
    ], VgControlsModule);
    return VgControlsModule;
}());
exports.VgControlsModule = VgControlsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbHMvY29udHJvbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMsMENBQStDO0FBQy9DLDZDQUEyQztBQUMzQywrREFBNkQ7QUFDN0QsNkNBQTJDO0FBQzNDLG1EQUFpRDtBQUNqRCwrREFBNEQ7QUFDNUQsOEVBQTJFO0FBQzNFLDREQUF5RDtBQUN6RCxzSEFBaUg7QUFDakgsMEdBQXFHO0FBQ3JHLGdIQUEyRztBQUMzRyxxRUFBNkU7QUFDN0UsMkVBQXdFO0FBQ3hFLDBFQUF1RTtBQUN2RSxpRkFBOEU7QUFzQzlFO0lBQUE7SUFDQSxDQUFDO0lBRFksZ0JBQWdCO1FBcEM1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBRSxxQkFBWSxDQUFFO1lBQ3pCLFlBQVksRUFBRTtnQkFDVix3QkFBVTtnQkFDViw0QkFBWTtnQkFDWixnQkFBTTtnQkFDTixvQkFBUTtnQkFDUiwyQkFBVztnQkFDWCxxQ0FBZ0I7Z0JBQ2hCLHlCQUFVO2dCQUNWLHFEQUF1QjtnQkFDdkIsNkNBQW1CO2dCQUNuQixpREFBcUI7Z0JBQ3JCLCtCQUFhO2dCQUNiLDJCQUFTO2dCQUNULG1DQUFlO2dCQUNmLHVDQUFpQjthQUNwQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3QkFBVTtnQkFDViw0QkFBWTtnQkFDWixnQkFBTTtnQkFDTixvQkFBUTtnQkFDUiwyQkFBVztnQkFDWCxxQ0FBZ0I7Z0JBQ2hCLHlCQUFVO2dCQUNWLHFEQUF1QjtnQkFDdkIsNkNBQW1CO2dCQUNuQixpREFBcUI7Z0JBQ3JCLCtCQUFhO2dCQUNiLDJCQUFTO2dCQUNULG1DQUFlO2dCQUNmLHVDQUFpQjthQUNwQjtZQUNELFNBQVMsRUFBRSxDQUFFLHFDQUFnQixDQUFFO1NBQ2xDLENBQUM7T0FDVyxnQkFBZ0IsQ0FDNUI7SUFBRCx1QkFBQztDQUFBLEFBREQsSUFDQztBQURZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVmdDb250cm9scyB9IGZyb20gJy4vdmctY29udHJvbHMnO1xuaW1wb3J0IHsgVmdGdWxsc2NyZWVuIH0gZnJvbSAnLi92Zy1mdWxsc2NyZWVuL3ZnLWZ1bGxzY3JlZW4nO1xuaW1wb3J0IHsgVmdNdXRlIH0gZnJvbSAnLi92Zy1tdXRlL3ZnLW11dGUnO1xuaW1wb3J0IHsgVmdWb2x1bWUgfSBmcm9tICcuL3ZnLXZvbHVtZS92Zy12b2x1bWUnO1xuaW1wb3J0IHsgVmdQbGF5UGF1c2UgfSBmcm9tICcuL3ZnLXBsYXktcGF1c2UvdmctcGxheS1wYXVzZSc7XG5pbXBvcnQgeyBWZ1BsYXliYWNrQnV0dG9uIH0gZnJvbSAnLi92Zy1wbGF5YmFjay1idXR0b24vdmctcGxheWJhY2stYnV0dG9uJztcbmltcG9ydCB7IFZnU2NydWJCYXIgfSBmcm9tICcuL3ZnLXNjcnViLWJhci92Zy1zY3J1Yi1iYXInO1xuaW1wb3J0IHsgVmdTY3J1YkJhckJ1ZmZlcmluZ1RpbWUgfSBmcm9tICcuL3ZnLXNjcnViLWJhci92Zy1zY3J1Yi1iYXItYnVmZmVyaW5nLXRpbWUvdmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lJztcbmltcG9ydCB7IFZnU2NydWJCYXJDdWVQb2ludHMgfSBmcm9tICcuL3ZnLXNjcnViLWJhci92Zy1zY3J1Yi1iYXItY3VlLXBvaW50cy92Zy1zY3J1Yi1iYXItY3VlLXBvaW50cyc7XG5pbXBvcnQgeyBWZ1NjcnViQmFyQ3VycmVudFRpbWUgfSBmcm9tICcuL3ZnLXNjcnViLWJhci92Zy1zY3J1Yi1iYXItY3VycmVudC10aW1lL3ZnLXNjcnViLWJhci1jdXJyZW50LXRpbWUnO1xuaW1wb3J0IHsgVmdUaW1lRGlzcGxheSwgVmdVdGNQaXBlIH0gZnJvbSAnLi92Zy10aW1lLWRpc3BsYXkvdmctdGltZS1kaXNwbGF5JztcbmltcG9ydCB7IFZnVHJhY2tTZWxlY3RvciB9IGZyb20gJy4vdmctdHJhY2stc2VsZWN0b3IvdmctdHJhY2stc2VsZWN0b3InO1xuaW1wb3J0IHsgVmdDb250cm9sc0hpZGRlbiB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdmctY29udHJvbHMtaGlkZGVuJztcbmltcG9ydCB7IFZnUXVhbGl0eVNlbGVjdG9yIH0gZnJvbSAnLi92Zy1xdWFsaXR5LXNlbGVjdG9yL3ZnLXF1YWxpdHktc2VsZWN0b3InO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFZnQ29udHJvbHMsXG4gICAgICAgIFZnRnVsbHNjcmVlbixcbiAgICAgICAgVmdNdXRlLFxuICAgICAgICBWZ1ZvbHVtZSxcbiAgICAgICAgVmdQbGF5UGF1c2UsXG4gICAgICAgIFZnUGxheWJhY2tCdXR0b24sXG4gICAgICAgIFZnU2NydWJCYXIsXG4gICAgICAgIFZnU2NydWJCYXJCdWZmZXJpbmdUaW1lLFxuICAgICAgICBWZ1NjcnViQmFyQ3VlUG9pbnRzLFxuICAgICAgICBWZ1NjcnViQmFyQ3VycmVudFRpbWUsXG4gICAgICAgIFZnVGltZURpc3BsYXksXG4gICAgICAgIFZnVXRjUGlwZSxcbiAgICAgICAgVmdUcmFja1NlbGVjdG9yLFxuICAgICAgICBWZ1F1YWxpdHlTZWxlY3RvclxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBWZ0NvbnRyb2xzLFxuICAgICAgICBWZ0Z1bGxzY3JlZW4sXG4gICAgICAgIFZnTXV0ZSxcbiAgICAgICAgVmdWb2x1bWUsXG4gICAgICAgIFZnUGxheVBhdXNlLFxuICAgICAgICBWZ1BsYXliYWNrQnV0dG9uLFxuICAgICAgICBWZ1NjcnViQmFyLFxuICAgICAgICBWZ1NjcnViQmFyQnVmZmVyaW5nVGltZSxcbiAgICAgICAgVmdTY3J1YkJhckN1ZVBvaW50cyxcbiAgICAgICAgVmdTY3J1YkJhckN1cnJlbnRUaW1lLFxuICAgICAgICBWZ1RpbWVEaXNwbGF5LFxuICAgICAgICBWZ1V0Y1BpcGUsXG4gICAgICAgIFZnVHJhY2tTZWxlY3RvcixcbiAgICAgICAgVmdRdWFsaXR5U2VsZWN0b3JcbiAgICBdLFxuICAgIHByb3ZpZGVyczogWyBWZ0NvbnRyb2xzSGlkZGVuIF1cbn0pXG5leHBvcnQgY2xhc3MgVmdDb250cm9sc01vZHVsZSB7XG59XG4iXX0=