"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_scrub_bar_buffering_time_1 = require("./vg-scrub-bar-buffering-time");
var vg_api_1 = require("../../../core/services/vg-api");
describe('Scrub bar buffering time', function () {
    var scrubBarBufferingTime;
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
        scrubBarBufferingTime = new vg_scrub_bar_buffering_time_1.VgScrubBarBufferingTime(ref, api);
    });
    it('Should get media by id on init', function () {
        spyOn(api, 'getMediaById');
        scrubBarBufferingTime.vgFor = 'test';
        scrubBarBufferingTime.onPlayerReady();
        expect(api.getMediaById).toHaveBeenCalledWith('test');
    });
    describe('getPercentage', function () {
        it('should return 50% when buffer end is 10 and total time is 20', function () {
            scrubBarBufferingTime.target = {
                time: {
                    total: 20
                },
                buffer: {
                    end: 10
                },
                buffered: [1]
            };
            var percent = scrubBarBufferingTime.getBufferTime();
            expect(percent).toEqual('50%');
        });
        it('should return 25% when buffer end is 5 and total time is 20', function () {
            scrubBarBufferingTime.target = {
                time: {
                    total: 20
                },
                buffer: {
                    end: 5
                },
                buffered: [1]
            };
            var percent = scrubBarBufferingTime.getBufferTime();
            expect(percent).toEqual('25%');
        });
        it('should return 0% when no buffer is loaded', function () {
            scrubBarBufferingTime.target = {
                buffer: null
            };
            var percent = scrubBarBufferingTime.getBufferTime();
            expect(percent).toEqual('0%');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctc2NydWItYmFyLWJ1ZmZlcmluZy10aW1lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29udHJvbHMvdmctc2NydWItYmFyL3ZnLXNjcnViLWJhci1idWZmZXJpbmctdGltZS92Zy1zY3J1Yi1iYXItYnVmZmVyaW5nLXRpbWUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZFQUFzRTtBQUN0RSx3REFBb0Q7QUFHcEQsUUFBUSxDQUFDLDBCQUEwQixFQUFFO0lBQ2pDLElBQUkscUJBQThDLENBQUM7SUFDbkQsSUFBSSxHQUFjLENBQUM7SUFDbkIsSUFBSSxHQUFTLENBQUM7SUFFZCxVQUFVLENBQUM7UUFDUCxHQUFHLEdBQUc7WUFDRixhQUFhLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLFVBQUMsSUFBSTtvQkFDZixPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQzthQUNKO1NBQ0osQ0FBQztRQUVGLEdBQUcsR0FBRyxJQUFJLGNBQUssRUFBRSxDQUFDO1FBRWxCLHFCQUFxQixHQUFHLElBQUkscURBQXVCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFM0IscUJBQXFCLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNyQyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUV0QyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN0QixFQUFFLENBQUMsOERBQThELEVBQUU7WUFDL0QscUJBQXFCLENBQUMsTUFBTSxHQUFHO2dCQUMzQixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLEVBQUU7aUJBQ1o7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLEdBQUcsRUFBRSxFQUFFO2lCQUNWO2dCQUNELFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNoQixDQUFDO1lBRUYsSUFBSSxPQUFPLEdBQUcscUJBQXFCLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFcEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw2REFBNkQsRUFBRTtZQUM5RCxxQkFBcUIsQ0FBQyxNQUFNLEdBQUc7Z0JBQzNCLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsRUFBRTtpQkFDWjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osR0FBRyxFQUFFLENBQUM7aUJBQ1Q7Z0JBQ0QsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hCLENBQUM7WUFFRixJQUFJLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVwRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLDJDQUEyQyxFQUFFO1lBQzVDLHFCQUFxQixDQUFDLE1BQU0sR0FBRztnQkFDM0IsTUFBTSxFQUFFLElBQUk7YUFDZixDQUFDO1lBRUYsSUFBSSxPQUFPLEdBQUcscUJBQXFCLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFcEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZnU2NydWJCYXJCdWZmZXJpbmdUaW1lfSBmcm9tIFwiLi92Zy1zY3J1Yi1iYXItYnVmZmVyaW5nLXRpbWVcIjtcbmltcG9ydCB7VmdBUEl9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3ZnLWFwaVwiO1xuaW1wb3J0IHtFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5kZXNjcmliZSgnU2NydWIgYmFyIGJ1ZmZlcmluZyB0aW1lJywgKCkgPT4ge1xuICAgIGxldCBzY3J1YkJhckJ1ZmZlcmluZ1RpbWU6IFZnU2NydWJCYXJCdWZmZXJpbmdUaW1lO1xuICAgIGxldCByZWY6RWxlbWVudFJlZjtcbiAgICBsZXQgYXBpOlZnQVBJO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlZiA9IHtcbiAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQ6IHtcbiAgICAgICAgICAgICAgICBnZXRBdHRyaWJ1dGU6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBhcGkgPSBuZXcgVmdBUEkoKTtcblxuICAgICAgICBzY3J1YkJhckJ1ZmZlcmluZ1RpbWUgPSBuZXcgVmdTY3J1YkJhckJ1ZmZlcmluZ1RpbWUocmVmLCBhcGkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCBnZXQgbWVkaWEgYnkgaWQgb24gaW5pdCcsICgpID0+IHtcbiAgICAgICAgc3B5T24oYXBpLCAnZ2V0TWVkaWFCeUlkJyk7XG5cbiAgICAgICAgc2NydWJCYXJCdWZmZXJpbmdUaW1lLnZnRm9yID0gJ3Rlc3QnO1xuICAgICAgICBzY3J1YkJhckJ1ZmZlcmluZ1RpbWUub25QbGF5ZXJSZWFkeSgpO1xuXG4gICAgICAgIGV4cGVjdChhcGkuZ2V0TWVkaWFCeUlkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndGVzdCcpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldFBlcmNlbnRhZ2UnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIDUwJSB3aGVuIGJ1ZmZlciBlbmQgaXMgMTAgYW5kIHRvdGFsIHRpbWUgaXMgMjAnLCAoKSA9PiB7XG4gICAgICAgICAgICBzY3J1YkJhckJ1ZmZlcmluZ1RpbWUudGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgdG90YWw6IDIwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidWZmZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgZW5kOiAxMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYnVmZmVyZWQ6IFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSBzY3J1YkJhckJ1ZmZlcmluZ1RpbWUuZ2V0QnVmZmVyVGltZSgpO1xuXG4gICAgICAgICAgICBleHBlY3QocGVyY2VudCkudG9FcXVhbCgnNTAlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIDI1JSB3aGVuIGJ1ZmZlciBlbmQgaXMgNSBhbmQgdG90YWwgdGltZSBpcyAyMCcsICgpID0+IHtcbiAgICAgICAgICAgIHNjcnViQmFyQnVmZmVyaW5nVGltZS50YXJnZXQgPSB7XG4gICAgICAgICAgICAgICAgdGltZToge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbDogMjBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ1ZmZlcjoge1xuICAgICAgICAgICAgICAgICAgICBlbmQ6IDVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJ1ZmZlcmVkOiBbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxldCBwZXJjZW50ID0gc2NydWJCYXJCdWZmZXJpbmdUaW1lLmdldEJ1ZmZlclRpbWUoKTtcblxuICAgICAgICAgICAgZXhwZWN0KHBlcmNlbnQpLnRvRXF1YWwoJzI1JScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIHJldHVybiAwJSB3aGVuIG5vIGJ1ZmZlciBpcyBsb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBzY3J1YkJhckJ1ZmZlcmluZ1RpbWUudGFyZ2V0ID0ge1xuICAgICAgICAgICAgICAgIGJ1ZmZlcjogbnVsbFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHBlcmNlbnQgPSBzY3J1YkJhckJ1ZmZlcmluZ1RpbWUuZ2V0QnVmZmVyVGltZSgpO1xuXG4gICAgICAgICAgICBleHBlY3QocGVyY2VudCkudG9FcXVhbCgnMCUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdfQ==