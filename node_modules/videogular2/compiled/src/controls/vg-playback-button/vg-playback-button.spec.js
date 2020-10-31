"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_playback_button_1 = require("./vg-playback-button");
var vg_api_1 = require("../../core/services/vg-api");
var vg_states_1 = require("../../core/states/vg-states");
describe('Playback Button', function () {
    var playbackButton;
    var ref;
    var api;
    beforeEach(function () {
        ref = {
            nativeElement: {
                getAttribute: function (name) {
                    return name;
                }
            }
        };
        api = new vg_api_1.VgAPI();
        api.medias = {
            main: {
                state: vg_states_1.VgStates.VG_PLAYING
            },
            secondary: {
                state: vg_states_1.VgStates.VG_PAUSED
            }
        };
        playbackButton = new vg_playback_button_1.VgPlaybackButton(ref, api);
    });
    it('Should set playbackIndex default value to 1', function () {
        expect(playbackButton.playbackIndex).toEqual(1);
    });
    it('Should get media by id on init', function () {
        spyOn(api, 'getMediaById').and.callFake(function () { return ({}); });
        playbackButton.vgFor = 'test';
        playbackButton.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });
    describe('onClick (single and multiple media)', function () {
        it('should increase playbackIndex', function () {
            api.medias = {
                main: {
                    state: vg_states_1.VgStates.VG_PLAYING
                }
            };
            playbackButton.target = api;
            playbackButton.onClick();
            expect(playbackButton.playbackIndex).toEqual(2);
        });
        it('should set playbackRate to target media', function () {
            api.medias = {
                main: {
                    state: vg_states_1.VgStates.VG_PLAYING
                }
            };
            playbackButton.target = api;
            playbackButton.onClick();
            expect(playbackButton.target.playbackRate).toEqual('1.5');
        });
        it('should set playbackRate to target media', function () {
            var media = {
                playbackRate: {
                    test: '1'
                }
            };
            playbackButton.target = media;
            playbackButton.vgFor = 'test';
            playbackButton.onClick();
            expect(playbackButton.target.playbackRate.test).toEqual('1.5');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWJhY2stYnV0dG9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbHMvdmctcGxheWJhY2stYnV0dG9uL3ZnLXBsYXliYWNrLWJ1dHRvbi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXdEO0FBQ3hELHFEQUFtRDtBQUVuRCx5REFBdUQ7QUFFdkQsUUFBUSxDQUFDLGlCQUFpQixFQUFFO0lBQzFCLElBQUksY0FBZ0MsQ0FBQztJQUNyQyxJQUFJLEdBQWUsQ0FBQztJQUNwQixJQUFJLEdBQVUsQ0FBQztJQUVmLFVBQVUsQ0FBQztRQUNULEdBQUcsR0FBRztZQUNKLGFBQWEsRUFBRTtnQkFDYixZQUFZLEVBQUUsVUFBQyxJQUFJO29CQUNqQixPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2FBQ0Y7U0FDRixDQUFDO1FBRUYsR0FBRyxHQUFHLElBQUksY0FBSyxFQUFFLENBQUM7UUFDbEIsR0FBRyxDQUFDLE1BQU0sR0FBRztZQUNYLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsb0JBQVEsQ0FBQyxVQUFVO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxvQkFBUSxDQUFDLFNBQVM7YUFDMUI7U0FDRixDQUFDO1FBRUYsY0FBYyxHQUFHLElBQUkscUNBQWdCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFO1FBQ2hELE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ25DLEtBQUssQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFNLE9BQUEsQ0FBSyxFQUFFLENBQUEsRUFBUCxDQUFPLENBQUMsQ0FBQztRQUV2RCxjQUFjLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUM5QixjQUFjLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxxQ0FBcUMsRUFBRTtRQUM5QyxFQUFFLENBQUMsK0JBQStCLEVBQUU7WUFDbEMsR0FBRyxDQUFDLE1BQU0sR0FBRztnQkFDWCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG9CQUFRLENBQUMsVUFBVTtpQkFDM0I7YUFDRixDQUFDO1lBRUYsY0FBYyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFFNUIsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHlDQUF5QyxFQUFFO1lBQzVDLEdBQUcsQ0FBQyxNQUFNLEdBQUc7Z0JBQ1gsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxvQkFBUSxDQUFDLFVBQVU7aUJBQzNCO2FBQ0YsQ0FBQztZQUVGLGNBQWMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBRTVCLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV6QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMseUNBQXlDLEVBQUU7WUFDNUMsSUFBSSxLQUFLLEdBQUc7Z0JBQ1YsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxHQUFHO2lCQUNWO2FBQ0YsQ0FBQztZQUVGLGNBQWMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzlCLGNBQWMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBRTlCLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV6QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZnUGxheWJhY2tCdXR0b24gfSBmcm9tICcuL3ZnLXBsYXliYWNrLWJ1dHRvbic7XG5pbXBvcnQgeyBWZ0FQSSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZnU3RhdGVzIH0gZnJvbSAnLi4vLi4vY29yZS9zdGF0ZXMvdmctc3RhdGVzJztcblxuZGVzY3JpYmUoJ1BsYXliYWNrIEJ1dHRvbicsICgpID0+IHtcbiAgbGV0IHBsYXliYWNrQnV0dG9uOiBWZ1BsYXliYWNrQnV0dG9uO1xuICBsZXQgcmVmOiBFbGVtZW50UmVmO1xuICBsZXQgYXBpOiBWZ0FQSTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZWYgPSB7XG4gICAgICBuYXRpdmVFbGVtZW50OiB7XG4gICAgICAgIGdldEF0dHJpYnV0ZTogKG5hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICBhcGkubWVkaWFzID0ge1xuICAgICAgbWFpbjoge1xuICAgICAgICBzdGF0ZTogVmdTdGF0ZXMuVkdfUExBWUlOR1xuICAgICAgfSxcbiAgICAgIHNlY29uZGFyeToge1xuICAgICAgICBzdGF0ZTogVmdTdGF0ZXMuVkdfUEFVU0VEXG4gICAgICB9XG4gICAgfTtcblxuICAgIHBsYXliYWNrQnV0dG9uID0gbmV3IFZnUGxheWJhY2tCdXR0b24ocmVmLCBhcGkpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHNldCBwbGF5YmFja0luZGV4IGRlZmF1bHQgdmFsdWUgdG8gMScsICgpID0+IHtcbiAgICBleHBlY3QocGxheWJhY2tCdXR0b24ucGxheWJhY2tJbmRleCkudG9FcXVhbCgxKTtcbiAgfSk7XG5cbiAgaXQoJ1Nob3VsZCBnZXQgbWVkaWEgYnkgaWQgb24gaW5pdCcsICgpID0+IHtcbiAgICBzcHlPbihhcGksICdnZXRNZWRpYUJ5SWQnKS5hbmQuY2FsbEZha2UoKCkgPT4gPGFueT57fSk7XG5cbiAgICBwbGF5YmFja0J1dHRvbi52Z0ZvciA9ICd0ZXN0JztcbiAgICBwbGF5YmFja0J1dHRvbi5vblBsYXllclJlYWR5KCk7XG5cbiAgICBleHBlY3QoYXBpLmdldE1lZGlhQnlJZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ3Rlc3QnKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ29uQ2xpY2sgKHNpbmdsZSBhbmQgbXVsdGlwbGUgbWVkaWEpJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgaW5jcmVhc2UgcGxheWJhY2tJbmRleCcsICgpID0+IHtcbiAgICAgIGFwaS5tZWRpYXMgPSB7XG4gICAgICAgIG1haW46IHtcbiAgICAgICAgICBzdGF0ZTogVmdTdGF0ZXMuVkdfUExBWUlOR1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBwbGF5YmFja0J1dHRvbi50YXJnZXQgPSBhcGk7XG5cbiAgICAgIHBsYXliYWNrQnV0dG9uLm9uQ2xpY2soKTtcblxuICAgICAgZXhwZWN0KHBsYXliYWNrQnV0dG9uLnBsYXliYWNrSW5kZXgpLnRvRXF1YWwoMik7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNldCBwbGF5YmFja1JhdGUgdG8gdGFyZ2V0IG1lZGlhJywgKCkgPT4ge1xuICAgICAgYXBpLm1lZGlhcyA9IHtcbiAgICAgICAgbWFpbjoge1xuICAgICAgICAgIHN0YXRlOiBWZ1N0YXRlcy5WR19QTEFZSU5HXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHBsYXliYWNrQnV0dG9uLnRhcmdldCA9IGFwaTtcblxuICAgICAgcGxheWJhY2tCdXR0b24ub25DbGljaygpO1xuXG4gICAgICBleHBlY3QocGxheWJhY2tCdXR0b24udGFyZ2V0LnBsYXliYWNrUmF0ZSkudG9FcXVhbCgnMS41Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNldCBwbGF5YmFja1JhdGUgdG8gdGFyZ2V0IG1lZGlhJywgKCkgPT4ge1xuICAgICAgbGV0IG1lZGlhID0ge1xuICAgICAgICBwbGF5YmFja1JhdGU6IHtcbiAgICAgICAgICB0ZXN0OiAnMSdcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcGxheWJhY2tCdXR0b24udGFyZ2V0ID0gbWVkaWE7XG4gICAgICBwbGF5YmFja0J1dHRvbi52Z0ZvciA9ICd0ZXN0JztcblxuICAgICAgcGxheWJhY2tCdXR0b24ub25DbGljaygpO1xuXG4gICAgICBleHBlY3QocGxheWJhY2tCdXR0b24udGFyZ2V0LnBsYXliYWNrUmF0ZS50ZXN0KS50b0VxdWFsKCcxLjUnKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==