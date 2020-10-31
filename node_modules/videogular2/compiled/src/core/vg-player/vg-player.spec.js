"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var vg_player_1 = require("./vg-player");
var vg_api_1 = require("../services/vg-api");
var vg_fullscreen_api_1 = require("../services/vg-fullscreen-api");
describe('Videogular Player', function () {
    var player;
    var ref;
    var api;
    var fsAPI;
    var controlsHidden;
    beforeEach(function () {
        ref = {
            nativeElement: {
                querySelectorAll: function () {
                    return [{}];
                }
            }
        };
        controlsHidden = {
            isHidden: {
                subscribe: function () { }
            }
        };
        api = new vg_api_1.VgAPI();
        fsAPI = new vg_fullscreen_api_1.VgFullscreenAPI();
        player = new vg_player_1.VgPlayer(ref, api, fsAPI, controlsHidden);
    });
    it('Should handle native fullscreen', function () {
        fsAPI.nativeFullscreen = true;
        player.onChangeFullscreen(true);
        expect(player.isFullscreen).toBeFalsy();
    });
    it('Should handle emulated fullscreen enabled', function () {
        fsAPI.nativeFullscreen = false;
        player.onChangeFullscreen(true);
        expect(player.isFullscreen).toBeTruthy();
        expect(player.zIndex).toBe('1');
    });
    it('Should handle emulated fullscreen enabled', function () {
        fsAPI.nativeFullscreen = false;
        player.onChangeFullscreen(false);
        expect(player.isFullscreen).toBeFalsy();
        expect(player.zIndex).toBe('auto');
    });
});
describe('Videogular Player', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [VgPlayerTest, vg_player_1.VgPlayer]
        });
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.compileComponents();
    }));
    it('Should create a VgPlayer component', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(VgPlayerTest);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        var video = compiled.querySelector('video');
        expect(video.controls).toBe(true);
    }));
});
var VgPlayerTest = /** @class */ (function () {
    function VgPlayerTest() {
    }
    VgPlayerTest = __decorate([
        core_1.Component({
            template: "\n        <vg-player>\n            <video vg-media id=\"singleVideo\" preload=\"auto\" controls>\n                <source src=\"http://static.videogular.com/assets/videos/videogular.mp4\" type=\"video/mp4\">\n                <source src=\"http://static.videogular.com/assets/videos/videogular.ogg\" type=\"video/ogg\">\n                <source src=\"http://static.videogular.com/assets/videos/videogular.webm\" type=\"video/webm\">\n            </video>\n        </vg-player>\n    ",
            providers: [vg_api_1.VgAPI]
        })
    ], VgPlayerTest);
    return VgPlayerTest;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctcGxheWVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS92Zy1wbGF5ZXIvdmctcGxheWVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxpREFBcUQ7QUFDckQsc0NBQXdDO0FBQ3hDLHlDQUFxQztBQUNyQyw2Q0FBeUM7QUFDekMsbUVBQThEO0FBSTlELFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtJQUMxQixJQUFJLE1BQWUsQ0FBQztJQUNwQixJQUFJLEdBQWMsQ0FBQztJQUNuQixJQUFJLEdBQVMsQ0FBQztJQUNkLElBQUksS0FBcUIsQ0FBQztJQUMxQixJQUFJLGNBQStCLENBQUM7SUFFcEMsVUFBVSxDQUFDO1FBQ1AsR0FBRyxHQUFHO1lBQ0YsYUFBYSxFQUFFO2dCQUNYLGdCQUFnQixFQUFFO29CQUNkLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEIsQ0FBQzthQUNKO1NBQ0osQ0FBQztRQUVGLGNBQWMsR0FBRztZQUNiLFFBQVEsRUFBRTtnQkFDTixTQUFTLEVBQUUsY0FBTyxDQUFDO2FBQ3RCO1NBQ2dCLENBQUM7UUFFdEIsR0FBRyxHQUFHLElBQUksY0FBSyxFQUFFLENBQUM7UUFDbEIsS0FBSyxHQUFHLElBQUksbUNBQWUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sR0FBRyxJQUFJLG9CQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUNBQWlDLEVBQUU7UUFDbEMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU5QixNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywyQ0FBMkMsRUFBRTtRQUM1QyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVoQyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFO1FBQzVDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFL0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtJQUUxQixVQUFVLENBQUM7UUFDUCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzNCLFlBQVksRUFBRSxDQUFDLFlBQVksRUFBRSxvQkFBUSxDQUFDO1NBQ3pDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsVUFBVSxDQUFDLGVBQUssQ0FBQztRQUNiLGlCQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRUosRUFBRSxDQUFDLG9DQUFvQyxFQUNuQyxlQUFLLENBQUM7UUFDRixJQUFJLE9BQU8sR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDeEIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFDbEQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1QyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FDTCxDQUFDO0FBQ04sQ0FBQyxDQUFDLENBQUM7QUFjSDtJQUFBO0lBQW9CLENBQUM7SUFBZixZQUFZO1FBWmpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsbWVBUVQ7WUFDRCxTQUFTLEVBQUUsQ0FBQyxjQUFLLENBQUM7U0FDckIsQ0FBQztPQUNJLFlBQVksQ0FBRztJQUFELG1CQUFDO0NBQUEsQUFBckIsSUFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FzeW5jLCBUZXN0QmVkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZS90ZXN0aW5nXCI7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7VmdQbGF5ZXJ9IGZyb20gXCIuL3ZnLXBsYXllclwiO1xuaW1wb3J0IHtWZ0FQSX0gZnJvbSBcIi4uL3NlcnZpY2VzL3ZnLWFwaVwiO1xuaW1wb3J0IHtWZ0Z1bGxzY3JlZW5BUEl9IGZyb20gXCIuLi9zZXJ2aWNlcy92Zy1mdWxsc2NyZWVuLWFwaVwiO1xuaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVmdDb250cm9sc0hpZGRlbiB9IGZyb20gJy4uL3NlcnZpY2VzL3ZnLWNvbnRyb2xzLWhpZGRlbic7XG5cbmRlc2NyaWJlKCdWaWRlb2d1bGFyIFBsYXllcicsICgpID0+IHtcbiAgICBsZXQgcGxheWVyOlZnUGxheWVyO1xuICAgIGxldCByZWY6RWxlbWVudFJlZjtcbiAgICBsZXQgYXBpOlZnQVBJO1xuICAgIGxldCBmc0FQSTpWZ0Z1bGxzY3JlZW5BUEk7XG4gICAgbGV0IGNvbnRyb2xzSGlkZGVuOlZnQ29udHJvbHNIaWRkZW47XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgcmVmID0ge1xuICAgICAgICAgICAgbmF0aXZlRWxlbWVudDoge1xuICAgICAgICAgICAgICAgIHF1ZXJ5U2VsZWN0b3JBbGw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFt7fV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnRyb2xzSGlkZGVuID0ge1xuICAgICAgICAgICAgaXNIaWRkZW46IHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmU6ICgpID0+IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gYXMgVmdDb250cm9sc0hpZGRlbjtcblxuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICAgICAgZnNBUEkgPSBuZXcgVmdGdWxsc2NyZWVuQVBJKCk7XG4gICAgICAgIHBsYXllciA9IG5ldyBWZ1BsYXllcihyZWYsIGFwaSwgZnNBUEksIGNvbnRyb2xzSGlkZGVuKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIG5hdGl2ZSBmdWxsc2NyZWVuJywgKCkgPT4ge1xuICAgICAgICBmc0FQSS5uYXRpdmVGdWxsc2NyZWVuID0gdHJ1ZTtcblxuICAgICAgICBwbGF5ZXIub25DaGFuZ2VGdWxsc2NyZWVuKHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChwbGF5ZXIuaXNGdWxsc2NyZWVuKS50b0JlRmFsc3koKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIGVtdWxhdGVkIGZ1bGxzY3JlZW4gZW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgZnNBUEkubmF0aXZlRnVsbHNjcmVlbiA9IGZhbHNlO1xuXG4gICAgICAgIHBsYXllci5vbkNoYW5nZUZ1bGxzY3JlZW4odHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KHBsYXllci5pc0Z1bGxzY3JlZW4pLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KHBsYXllci56SW5kZXgpLnRvQmUoJzEnKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgaGFuZGxlIGVtdWxhdGVkIGZ1bGxzY3JlZW4gZW5hYmxlZCcsICgpID0+IHtcbiAgICAgICAgZnNBUEkubmF0aXZlRnVsbHNjcmVlbiA9IGZhbHNlO1xuXG4gICAgICAgIHBsYXllci5vbkNoYW5nZUZ1bGxzY3JlZW4oZmFsc2UpO1xuXG4gICAgICAgIGV4cGVjdChwbGF5ZXIuaXNGdWxsc2NyZWVuKS50b0JlRmFsc3koKTtcbiAgICAgICAgZXhwZWN0KHBsYXllci56SW5kZXgpLnRvQmUoJ2F1dG8nKTtcbiAgICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnVmlkZW9ndWxhciBQbGF5ZXInLCAoKSA9PiB7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKHtcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uczogW1ZnUGxheWVyVGVzdCwgVmdQbGF5ZXJdXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYmVmb3JlRWFjaChhc3luYygoKSA9PiB7XG4gICAgICAgIFRlc3RCZWQuY29tcGlsZUNvbXBvbmVudHMoKTtcbiAgICB9KSk7XG5cbiAgICBpdCgnU2hvdWxkIGNyZWF0ZSBhIFZnUGxheWVyIGNvbXBvbmVudCcsXG4gICAgICAgIGFzeW5jKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaXh0dXJlID0gVGVzdEJlZC5jcmVhdGVDb21wb25lbnQoVmdQbGF5ZXJUZXN0KTtcbiAgICAgICAgICAgIGZpeHR1cmUuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgbGV0IGNvbXBpbGVkID0gZml4dHVyZS5kZWJ1Z0VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGxldCB2aWRlbyA9IGNvbXBpbGVkLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG5cbiAgICAgICAgICAgIGV4cGVjdCh2aWRlby5jb250cm9scykudG9CZSh0cnVlKTtcbiAgICAgICAgfSlcbiAgICApO1xufSk7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx2Zy1wbGF5ZXI+XG4gICAgICAgICAgICA8dmlkZW8gdmctbWVkaWEgaWQ9XCJzaW5nbGVWaWRlb1wiIHByZWxvYWQ9XCJhdXRvXCIgY29udHJvbHM+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCJodHRwOi8vc3RhdGljLnZpZGVvZ3VsYXIuY29tL2Fzc2V0cy92aWRlb3MvdmlkZW9ndWxhci5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCJodHRwOi8vc3RhdGljLnZpZGVvZ3VsYXIuY29tL2Fzc2V0cy92aWRlb3MvdmlkZW9ndWxhci5vZ2dcIiB0eXBlPVwidmlkZW8vb2dnXCI+XG4gICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCJodHRwOi8vc3RhdGljLnZpZGVvZ3VsYXIuY29tL2Fzc2V0cy92aWRlb3MvdmlkZW9ndWxhci53ZWJtXCIgdHlwZT1cInZpZGVvL3dlYm1cIj5cbiAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgIDwvdmctcGxheWVyPlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbVmdBUEldXG59KVxuY2xhc3MgVmdQbGF5ZXJUZXN0IHt9XG4iXX0=