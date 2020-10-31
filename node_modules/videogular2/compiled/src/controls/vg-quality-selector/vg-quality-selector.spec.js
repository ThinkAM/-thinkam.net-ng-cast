"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_quality_selector_1 = require("./vg-quality-selector");
var vg_api_1 = require("../../core/services/vg-api");
describe('Quality Selector control', function () {
    // @ts-ignore
    var vgQualitySelector;
    beforeEach(function () {
        var ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        vgQualitySelector = new vg_quality_selector_1.VgQualitySelector(ref, new vg_api_1.VgAPI());
    });
    describe('onPlayerReady', function () {
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcXVhbGl0eS1zZWxlY3Rvci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRyb2xzL3ZnLXF1YWxpdHktc2VsZWN0b3IvdmctcXVhbGl0eS1zZWxlY3Rvci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTBEO0FBQzFELHFEQUFtRDtBQUduRCxRQUFRLENBQUMsMEJBQTBCLEVBQUU7SUFFakMsYUFBYTtJQUNiLElBQUksaUJBQW9DLENBQUM7SUFFekMsVUFBVSxDQUFDO1FBQ1AsSUFBTSxHQUFHLEdBQWU7WUFDcEIsYUFBYSxFQUFFO2dCQUNYLFlBQVksRUFBRSxVQUFDLElBQUk7b0JBQ2YsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSjtTQUNKLENBQUM7UUFDRixpQkFBaUIsR0FBRyxJQUFJLHVDQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLGNBQUssRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFO0lBRTFCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZ1F1YWxpdHlTZWxlY3RvciB9IGZyb20gXCIuL3ZnLXF1YWxpdHktc2VsZWN0b3JcIjtcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpXCI7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZGVzY3JpYmUoJ1F1YWxpdHkgU2VsZWN0b3IgY29udHJvbCcsICgpID0+IHtcbiAgICBcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgbGV0IHZnUXVhbGl0eVNlbGVjdG9yOiBWZ1F1YWxpdHlTZWxlY3RvcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb25zdCByZWY6IEVsZW1lbnRSZWYgPSB7XG4gICAgICAgICAgICBuYXRpdmVFbGVtZW50OiB7XG4gICAgICAgICAgICAgICAgZ2V0QXR0cmlidXRlOiAobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZnUXVhbGl0eVNlbGVjdG9yID0gbmV3IFZnUXVhbGl0eVNlbGVjdG9yKHJlZiwgbmV3IFZnQVBJKCkpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uUGxheWVyUmVhZHknLCAoKSA9PiB7XG5cbiAgICB9KTtcbn0pO1xuIl19