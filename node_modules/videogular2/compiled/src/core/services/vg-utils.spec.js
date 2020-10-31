"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_utils_1 = require("./vg-utils");
describe('Videogular Utils', function () {
    it('Should get the highest z-index', function () {
        spyOn(window, 'getComputedStyle').and.callFake(function () { return ({ 'z-index': 2 }); });
        var highestZ = vg_utils_1.VgUtils.getZIndex();
        expect(highestZ).toBe(3);
    });
    it('Should get if is a mobile device', function () {
        // window.orientation is not writable
        var isMobileDevice = vg_utils_1.VgUtils.isMobileDevice();
        expect(isMobileDevice).toBeFalsy();
    });
    it('Should get if is an iOS device', function () {
        var isiOS = vg_utils_1.VgUtils.isiOSDevice();
        expect(isiOS).toBeFalsy();
    });
    it('Should get if is a Cordova app', function () {
        var isCordova = vg_utils_1.VgUtils.isCordova();
        expect(isCordova).toBeFalsy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctdXRpbHMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZpY2VzL3ZnLXV0aWxzLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBcUM7QUFFckMsUUFBUSxDQUFDLGtCQUFrQixFQUFFO0lBQzNCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNuQyxLQUFLLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsQ0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQSxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFFNUUsSUFBSSxRQUFRLEdBQUcsa0JBQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVuQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtDQUFrQyxFQUFFO1FBQ3JDLHFDQUFxQztRQUNyQyxJQUFJLGNBQWMsR0FBRyxrQkFBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTlDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNuQyxJQUFJLEtBQUssR0FBRyxrQkFBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNuQyxJQUFJLFNBQVMsR0FBRyxrQkFBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXBDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmdVdGlscyB9IGZyb20gJy4vdmctdXRpbHMnO1xuXG5kZXNjcmliZSgnVmlkZW9ndWxhciBVdGlscycsICgpID0+IHtcbiAgaXQoJ1Nob3VsZCBnZXQgdGhlIGhpZ2hlc3Qgei1pbmRleCcsICgpID0+IHtcbiAgICBzcHlPbih3aW5kb3csICdnZXRDb21wdXRlZFN0eWxlJykuYW5kLmNhbGxGYWtlKCgpID0+IDxhbnk+eyAnei1pbmRleCc6IDIgfSk7XG5cbiAgICBsZXQgaGlnaGVzdFogPSBWZ1V0aWxzLmdldFpJbmRleCgpO1xuXG4gICAgZXhwZWN0KGhpZ2hlc3RaKS50b0JlKDMpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIGdldCBpZiBpcyBhIG1vYmlsZSBkZXZpY2UnLCAoKSA9PiB7XG4gICAgLy8gd2luZG93Lm9yaWVudGF0aW9uIGlzIG5vdCB3cml0YWJsZVxuICAgIGxldCBpc01vYmlsZURldmljZSA9IFZnVXRpbHMuaXNNb2JpbGVEZXZpY2UoKTtcblxuICAgIGV4cGVjdChpc01vYmlsZURldmljZSkudG9CZUZhbHN5KCk7XG4gIH0pO1xuXG4gIGl0KCdTaG91bGQgZ2V0IGlmIGlzIGFuIGlPUyBkZXZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IGlzaU9TID0gVmdVdGlscy5pc2lPU0RldmljZSgpO1xuXG4gICAgZXhwZWN0KGlzaU9TKS50b0JlRmFsc3koKTtcbiAgfSk7XG5cbiAgaXQoJ1Nob3VsZCBnZXQgaWYgaXMgYSBDb3Jkb3ZhIGFwcCcsICgpID0+IHtcbiAgICBsZXQgaXNDb3Jkb3ZhID0gVmdVdGlscy5pc0NvcmRvdmEoKTtcblxuICAgIGV4cGVjdChpc0NvcmRvdmEpLnRvQmVGYWxzeSgpO1xuICB9KTtcbn0pO1xuIl19