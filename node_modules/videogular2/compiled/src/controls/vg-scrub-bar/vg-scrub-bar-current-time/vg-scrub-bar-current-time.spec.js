"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_scrub_bar_current_time_1 = require("./vg-scrub-bar-current-time");
var vg_api_1 = require("../../../core/services/vg-api");
describe('Scrub bar current time', function () {
    var scrubBarCurrentTime;
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
        scrubBarCurrentTime = new vg_scrub_bar_current_time_1.VgScrubBarCurrentTime(ref, api);
    });
    it('Should get media by id on init', function () {
        spyOn(api, 'getMediaById');
        scrubBarCurrentTime.vgFor = 'test';
        scrubBarCurrentTime.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });
    describe('getPercentage', function () {
        it('should return 50% when current time is 10 and total time is 20', function () {
            scrubBarCurrentTime.target = {
                time: {
                    current: 10,
                    total: 20
                }
            };
            var percent = scrubBarCurrentTime.getPercentage();
            expect(percent).toEqual('50%');
        });
        it('should return 25% when current time is 5 and total time is 20', function () {
            scrubBarCurrentTime.target = {
                time: {
                    current: 5,
                    total: 20
                }
            };
            var percent = scrubBarCurrentTime.getPercentage();
            expect(percent).toEqual('25%');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWN1cnJlbnQtdGltZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbnRyb2xzL3ZnLXNjcnViLWJhci92Zy1zY3J1Yi1iYXItY3VycmVudC10aW1lL3ZnLXNjcnViLWJhci1jdXJyZW50LXRpbWUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlFQUFrRTtBQUNsRSx3REFBb0Q7QUFHcEQsUUFBUSxDQUFDLHdCQUF3QixFQUFFO0lBQy9CLElBQUksbUJBQTBDLENBQUM7SUFDL0MsSUFBSSxHQUFjLENBQUM7SUFDbkIsSUFBSSxHQUFTLENBQUM7SUFFZCxVQUFVLENBQUM7UUFDUCxHQUFHLEdBQUc7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLFVBQUMsSUFBSTtvQkFDZixPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQUNKO1NBQ0osQ0FBQztRQUVGLEdBQUcsR0FBRyxJQUFJLGNBQUssRUFBRSxDQUFDO1FBRWxCLG1CQUFtQixHQUFHLElBQUksaURBQXFCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFM0IsbUJBQW1CLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNuQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVwQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN0QixFQUFFLENBQUMsZ0VBQWdFLEVBQUU7WUFDakUsbUJBQW1CLENBQUMsTUFBTSxHQUFHO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsS0FBSyxFQUFFLEVBQUU7aUJBQ1o7YUFDSixDQUFDO1lBRUYsSUFBSSxPQUFPLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywrREFBK0QsRUFBRTtZQUNoRSxtQkFBbUIsQ0FBQyxNQUFNLEdBQUc7Z0JBQ3pCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsQ0FBQztvQkFDVixLQUFLLEVBQUUsRUFBRTtpQkFDWjthQUNKLENBQUM7WUFFRixJQUFJLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVsRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VmdTY3J1YkJhckN1cnJlbnRUaW1lfSBmcm9tIFwiLi92Zy1zY3J1Yi1iYXItY3VycmVudC10aW1lXCI7XG5pbXBvcnQge1ZnQVBJfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGlcIjtcbmltcG9ydCB7RWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZGVzY3JpYmUoJ1NjcnViIGJhciBjdXJyZW50IHRpbWUnLCAoKSA9PiB7XG4gICAgbGV0IHNjcnViQmFyQ3VycmVudFRpbWU6IFZnU2NydWJCYXJDdXJyZW50VGltZTtcbiAgICBsZXQgcmVmOkVsZW1lbnRSZWY7XG4gICAgbGV0IGFwaTpWZ0FQSTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICByZWYgPSB7XG4gICAgICAgICAgICBuYXRpdmVFbGVtZW50OiB7XG4gICAgICAgICAgICAgICAgZ2V0QXR0cmlidXRlOiAobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgYXBpID0gbmV3IFZnQVBJKCk7XG5cbiAgICAgICAgc2NydWJCYXJDdXJyZW50VGltZSA9IG5ldyBWZ1NjcnViQmFyQ3VycmVudFRpbWUocmVmLCBhcGkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBnZXQgbWVkaWEgYnkgaWQgb24gaW5pdCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oYXBpLCAnZ2V0TWVkaWFCeUlkJyk7XG5cbiAgICAgICAgc2NydWJCYXJDdXJyZW50VGltZS52Z0ZvciA9ICd0ZXN0JztcbiAgICAgICAgc2NydWJCYXJDdXJyZW50VGltZS5vblBsYXllclJlYWR5KCk7XG5cbiAgICAgICAgZXhwZWN0KGFwaS5nZXRNZWRpYUJ5SWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd0ZXN0Jyk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UGVyY2VudGFnZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gNTAlIHdoZW4gY3VycmVudCB0aW1lIGlzIDEwIGFuZCB0b3RhbCB0aW1lIGlzIDIwJywgKCkgPT4ge1xuICAgICAgICAgICAgc2NydWJCYXJDdXJyZW50VGltZS50YXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgdGltZToge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiAxMCxcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6IDIwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSBzY3J1YkJhckN1cnJlbnRUaW1lLmdldFBlcmNlbnRhZ2UoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBlcmNlbnQpLnRvRXF1YWwoJzUwJScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiAyNSUgd2hlbiBjdXJyZW50IHRpbWUgaXMgNSBhbmQgdG90YWwgdGltZSBpcyAyMCcsICgpID0+IHtcbiAgICAgICAgICAgIHNjcnViQmFyQ3VycmVudFRpbWUudGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudDogNSxcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6IDIwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSBzY3J1YkJhckN1cnJlbnRUaW1lLmdldFBlcmNlbnRhZ2UoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBlcmNlbnQpLnRvRXF1YWwoJzI1JScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIl19