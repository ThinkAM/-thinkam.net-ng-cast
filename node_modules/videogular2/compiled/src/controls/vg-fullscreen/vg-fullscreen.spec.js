"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_fullscreen_1 = require("./vg-fullscreen");
var vg_api_1 = require("../../core/services/vg-api");
var vg_fullscreen_api_1 = require("../../core/services/vg-fullscreen-api");
describe('Videogular Player', function () {
    var fullscreen;
    var ref;
    var api;
    var fsAPI;
    beforeEach(function () {
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        api = new vg_api_1.VgAPI();
        fsAPI = new vg_fullscreen_api_1.VgFullscreenAPI();
        fullscreen = new vg_fullscreen_1.VgFullscreen(ref, api, fsAPI);
    });
    it('Should get media by id on init', function () {
        spyOn(api, 'getMediaById').and.callFake(function () { return ({}); });
        fullscreen.vgFor = 'test';
        fullscreen.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });
    describe('onClick', function () {
        beforeEach(function () {
            spyOn(fsAPI, 'toggleFullscreen');
        });
        it('Should call toggleFullscreen with null param if target is API', function () {
            fullscreen.target = api;
            fullscreen.onClick();
            expect(fsAPI.toggleFullscreen).toHaveBeenCalledWith(null);
        });
        it('Should call toggleFullscreen with target param if target', function () {
            fullscreen.target = 'test';
            fullscreen.onClick();
            expect(fsAPI.toggleFullscreen).toHaveBeenCalledWith('test');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctZnVsbHNjcmVlbi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbnRyb2xzL3ZnLWZ1bGxzY3JlZW4vdmctZnVsbHNjcmVlbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQStDO0FBQy9DLHFEQUFtRDtBQUVuRCwyRUFBd0U7QUFFeEUsUUFBUSxDQUFDLG1CQUFtQixFQUFFO0lBQzVCLElBQUksVUFBd0IsQ0FBQztJQUM3QixJQUFJLEdBQWUsQ0FBQztJQUNwQixJQUFJLEdBQVUsQ0FBQztJQUNmLElBQUksS0FBc0IsQ0FBQztJQUUzQixVQUFVLENBQUM7UUFDVCxHQUFHLEdBQUc7WUFDSixhQUFhLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFLFVBQUMsSUFBSTtvQkFDakIsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQzthQUNGO1NBQ0YsQ0FBQztRQUVGLEdBQUcsR0FBRyxJQUFJLGNBQUssRUFBRSxDQUFDO1FBQ2xCLEtBQUssR0FBRyxJQUFJLG1DQUFlLEVBQUUsQ0FBQztRQUM5QixVQUFVLEdBQUcsSUFBSSw0QkFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsZ0NBQWdDLEVBQUU7UUFDbkMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLGNBQU0sT0FBQSxDQUFLLEVBQUUsQ0FBQSxFQUFQLENBQU8sQ0FBQyxDQUFDO1FBRXZELFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzFCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUUzQixNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNsQixVQUFVLENBQUM7WUFDVCxLQUFLLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsK0RBQStELEVBQUU7WUFDbEUsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFFeEIsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywwREFBMEQsRUFBRTtZQUM3RCxVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUUzQixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZnRnVsbHNjcmVlbiB9IGZyb20gJy4vdmctZnVsbHNjcmVlbic7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnRnVsbHNjcmVlbkFQSSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdmctZnVsbHNjcmVlbi1hcGknO1xuXG5kZXNjcmliZSgnVmlkZW9ndWxhciBQbGF5ZXInLCAoKSA9PiB7XG4gIGxldCBmdWxsc2NyZWVuOiBWZ0Z1bGxzY3JlZW47XG4gIGxldCByZWY6IEVsZW1lbnRSZWY7XG4gIGxldCBhcGk6IFZnQVBJO1xuICBsZXQgZnNBUEk6IFZnRnVsbHNjcmVlbkFQSTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZWYgPSB7XG4gICAgICBuYXRpdmVFbGVtZW50OiB7XG4gICAgICAgIGdldEF0dHJpYnV0ZTogKG5hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICBmc0FQSSA9IG5ldyBWZ0Z1bGxzY3JlZW5BUEkoKTtcbiAgICBmdWxsc2NyZWVuID0gbmV3IFZnRnVsbHNjcmVlbihyZWYsIGFwaSwgZnNBUEkpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIGdldCBtZWRpYSBieSBpZCBvbiBpbml0JywgKCkgPT4ge1xuICAgIHNweU9uKGFwaSwgJ2dldE1lZGlhQnlJZCcpLmFuZC5jYWxsRmFrZSgoKSA9PiA8YW55Pnt9KTtcblxuICAgIGZ1bGxzY3JlZW4udmdGb3IgPSAndGVzdCc7XG4gICAgZnVsbHNjcmVlbi5vblBsYXllclJlYWR5KCk7XG5cbiAgICBleHBlY3QoYXBpLmdldE1lZGlhQnlJZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3Rlc3QnKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ29uQ2xpY2snLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBzcHlPbihmc0FQSSwgJ3RvZ2dsZUZ1bGxzY3JlZW4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgY2FsbCB0b2dnbGVGdWxsc2NyZWVuIHdpdGggbnVsbCBwYXJhbSBpZiB0YXJnZXQgaXMgQVBJJywgKCkgPT4ge1xuICAgICAgZnVsbHNjcmVlbi50YXJnZXQgPSBhcGk7XG5cbiAgICAgIGZ1bGxzY3JlZW4ub25DbGljaygpO1xuXG4gICAgICBleHBlY3QoZnNBUEkudG9nZ2xlRnVsbHNjcmVlbikudG9IYXZlQmVlbkNhbGxlZFdpdGgobnVsbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIGNhbGwgdG9nZ2xlRnVsbHNjcmVlbiB3aXRoIHRhcmdldCBwYXJhbSBpZiB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICBmdWxsc2NyZWVuLnRhcmdldCA9ICd0ZXN0JztcblxuICAgICAgZnVsbHNjcmVlbi5vbkNsaWNrKCk7XG5cbiAgICAgIGV4cGVjdChmc0FQSS50b2dnbGVGdWxsc2NyZWVuKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndGVzdCcpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19