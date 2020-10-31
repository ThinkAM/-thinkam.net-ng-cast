"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vg_buffering_1 = require("./vg-buffering");
var vg_api_1 = require("../core/services/vg-api");
describe('Buffering', function () {
    var vgBuffering;
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
        vgBuffering = new vg_buffering_1.VgBuffering(ref, api);
    });
    describe('onPlayerReady', function () {
        it('should subscribe to bufferDetected media events', function () {
            spyOn(api, 'getMediaById').and.returnValue({
                subscriptions: {
                    bufferDetected: { subscribe: jasmine.createSpy('bufferDetected') }
                }
            });
            vgBuffering.onPlayerReady();
            expect(vgBuffering.target.subscriptions.bufferDetected.subscribe).toHaveBeenCalled();
        });
    });
    describe('isBuffering', function () {
        it('should show if buffer is detected', function () {
            vgBuffering.onUpdateBuffer(true);
            expect(vgBuffering.isBuffering).toBe(true);
        });
        it('should hide if buffer is not detected', function () {
            vgBuffering.onUpdateBuffer(false);
            expect(vgBuffering.isBuffering).toBe(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctYnVmZmVyaW5nLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYnVmZmVyaW5nL3ZnLWJ1ZmZlcmluZy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTZDO0FBQzdDLGtEQUFnRDtBQUdoRCxRQUFRLENBQUMsV0FBVyxFQUFFO0lBQ3BCLElBQUksV0FBd0IsQ0FBQztJQUM3QixJQUFJLEdBQWUsQ0FBQztJQUNwQixJQUFJLEdBQVUsQ0FBQztJQUVmLFVBQVUsQ0FBQztRQUNULEdBQUcsR0FBRztZQUNKLGFBQWEsRUFBRTtnQkFDYixZQUFZLEVBQUUsVUFBQyxJQUFJO29CQUNqQixPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2FBQ0Y7U0FDRixDQUFDO1FBRUYsR0FBRyxHQUFHLElBQUksY0FBSyxFQUFFLENBQUM7UUFDbEIsV0FBVyxHQUFHLElBQUksMEJBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3hCLEVBQUUsQ0FBQyxpREFBaUQsRUFBRTtZQUNwRCxLQUFLLENBQUMsR0FBRyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQU07Z0JBQzlDLGFBQWEsRUFBRTtvQkFDYixjQUFjLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2lCQUNuRTthQUNGLENBQUMsQ0FBQztZQUNILFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM1QixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDdEIsRUFBRSxDQUFDLG1DQUFtQyxFQUFFO1lBQ3RDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsdUNBQXVDLEVBQUU7WUFDMUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZ0J1ZmZlcmluZyB9IGZyb20gJy4vdmctYnVmZmVyaW5nJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy92Zy1hcGknO1xuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5kZXNjcmliZSgnQnVmZmVyaW5nJywgKCkgPT4ge1xuICBsZXQgdmdCdWZmZXJpbmc6IFZnQnVmZmVyaW5nO1xuICBsZXQgcmVmOiBFbGVtZW50UmVmO1xuICBsZXQgYXBpOiBWZ0FQSTtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICByZWYgPSB7XG4gICAgICBuYXRpdmVFbGVtZW50OiB7XG4gICAgICAgIGdldEF0dHJpYnV0ZTogKG5hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBhcGkgPSBuZXcgVmdBUEkoKTtcbiAgICB2Z0J1ZmZlcmluZyA9IG5ldyBWZ0J1ZmZlcmluZyhyZWYsIGFwaSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdvblBsYXllclJlYWR5JywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc3Vic2NyaWJlIHRvIGJ1ZmZlckRldGVjdGVkIG1lZGlhIGV2ZW50cycsICgpID0+IHtcbiAgICAgIHNweU9uKGFwaSwgJ2dldE1lZGlhQnlJZCcpLmFuZC5yZXR1cm5WYWx1ZSg8YW55PntcbiAgICAgICAgc3Vic2NyaXB0aW9uczoge1xuICAgICAgICAgIGJ1ZmZlckRldGVjdGVkOiB7IHN1YnNjcmliZTogamFzbWluZS5jcmVhdGVTcHkoJ2J1ZmZlckRldGVjdGVkJykgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZnQnVmZmVyaW5nLm9uUGxheWVyUmVhZHkoKTtcbiAgICAgIGV4cGVjdCh2Z0J1ZmZlcmluZy50YXJnZXQuc3Vic2NyaXB0aW9ucy5idWZmZXJEZXRlY3RlZC5zdWJzY3JpYmUpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzQnVmZmVyaW5nJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc2hvdyBpZiBidWZmZXIgaXMgZGV0ZWN0ZWQnLCAoKSA9PiB7XG4gICAgICB2Z0J1ZmZlcmluZy5vblVwZGF0ZUJ1ZmZlcih0cnVlKTtcbiAgICAgIGV4cGVjdCh2Z0J1ZmZlcmluZy5pc0J1ZmZlcmluZykudG9CZSh0cnVlKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGhpZGUgaWYgYnVmZmVyIGlzIG5vdCBkZXRlY3RlZCcsICgpID0+IHtcbiAgICAgIHZnQnVmZmVyaW5nLm9uVXBkYXRlQnVmZmVyKGZhbHNlKTtcbiAgICAgIGV4cGVjdCh2Z0J1ZmZlcmluZy5pc0J1ZmZlcmluZykudG9CZShmYWxzZSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=