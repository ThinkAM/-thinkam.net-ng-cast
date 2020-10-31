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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var vg_states_1 = require("../states/vg-states");
var vg_api_1 = require("../services/vg-api");
var vg_events_1 = require("../events/vg-events");
var rxjs_2 = require("rxjs");
var VgMedia = /** @class */ (function () {
    function VgMedia(api, ref) {
        this.api = api;
        this.ref = ref;
        this.state = vg_states_1.VgStates.VG_PAUSED;
        this.time = { current: 0, total: 0, left: 0 };
        this.buffer = { end: 0 };
        this.canPlay = false;
        this.canPlayThrough = false;
        this.isMetadataLoaded = false;
        this.isWaiting = false;
        this.isCompleted = false;
        this.isLive = false;
        this.isBufferDetected = false;
        this.checkInterval = 200;
        this.currentPlayPos = 0;
        this.lastPlayPos = 0;
        this.playAtferSync = false;
        this.bufferDetected = new rxjs_1.Subject();
    }
    VgMedia.prototype.ngOnInit = function () {
        var _this = this;
        if (this.vgMedia.nodeName) {
            // It's a native element
            this.elem = this.vgMedia;
        }
        else {
            // It's an Angular Class
            this.elem = this.vgMedia.elem;
        }
        // Just in case we're creating this vgMedia dynamically register again into API
        this.api.registerMedia(this);
        this.subscriptions = {
            // Native events
            abort: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_ABORT),
            canPlay: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_CAN_PLAY),
            canPlayThrough: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_CAN_PLAY_THROUGH),
            durationChange: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_DURATION_CHANGE),
            emptied: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_EMPTIED),
            encrypted: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_ENCRYPTED),
            ended: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_ENDED),
            error: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_ERROR),
            loadedData: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_LOADED_DATA),
            loadedMetadata: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_LOADED_METADATA),
            loadStart: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_LOAD_START),
            pause: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_PAUSE),
            play: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_PLAY),
            playing: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_PLAYING),
            progress: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_PROGRESS),
            rateChange: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_RATE_CHANGE),
            seeked: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_SEEKED),
            seeking: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_SEEKING),
            stalled: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_STALLED),
            suspend: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_SUSPEND),
            timeUpdate: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_TIME_UPDATE),
            volumeChange: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_VOLUME_CHANGE),
            waiting: rxjs_1.fromEvent(this.elem, vg_events_1.VgEvents.VG_WAITING),
            // Advertisement only events
            startAds: rxjs_1.fromEvent(window, vg_events_1.VgEvents.VG_START_ADS),
            endAds: rxjs_1.fromEvent(window, vg_events_1.VgEvents.VG_END_ADS),
            // See changes on <source> child elements to reload the video file
            mutation: rxjs_1.Observable.create(function (observer) {
                var domObs = new MutationObserver(function (mutations) {
                    observer.next(mutations);
                });
                domObs.observe(_this.elem, { childList: true, attributes: true });
                return function () {
                    domObs.disconnect();
                };
            }),
            // Custom buffering detection
            bufferDetected: this.bufferDetected
        };
        this.mutationObs = this.subscriptions.mutation.subscribe(this.onMutation.bind(this));
        this.canPlayObs = this.subscriptions.canPlay.subscribe(this.onCanPlay.bind(this));
        this.canPlayThroughObs = this.subscriptions.canPlayThrough.subscribe(this.onCanPlayThrough.bind(this));
        this.loadedMetadataObs = this.subscriptions.loadedMetadata.subscribe(this.onLoadMetadata.bind(this));
        this.waitingObs = this.subscriptions.waiting.subscribe(this.onWait.bind(this));
        this.progressObs = this.subscriptions.progress.subscribe(this.onProgress.bind(this));
        this.endedObs = this.subscriptions.ended.subscribe(this.onComplete.bind(this));
        this.playingObs = this.subscriptions.playing.subscribe(this.onStartPlaying.bind(this));
        this.playObs = this.subscriptions.play.subscribe(this.onPlay.bind(this));
        this.pauseObs = this.subscriptions.pause.subscribe(this.onPause.bind(this));
        this.timeUpdateObs = this.subscriptions.timeUpdate.subscribe(this.onTimeUpdate.bind(this));
        this.volumeChangeObs = this.subscriptions.volumeChange.subscribe(this.onVolumeChange.bind(this));
        this.errorObs = this.subscriptions.error.subscribe(this.onError.bind(this));
        if (this.vgMaster) {
            this.api.playerReadyEvent.subscribe(function () {
                _this.prepareSync();
            });
        }
    };
    VgMedia.prototype.prepareSync = function () {
        var _this = this;
        var canPlayAll = [];
        for (var media in this.api.medias) {
            if (this.api.medias[media]) {
                canPlayAll.push(this.api.medias[media].subscriptions.canPlay);
            }
        }
        this.canPlayAllSubscription = rxjs_2.combineLatest(canPlayAll).pipe(operators_1.map(function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var checkReadyState = function (event) {
                return event.target.readyState === 4;
            };
            var allReady = params.some(checkReadyState);
            if (allReady && !_this.syncSubscription) {
                _this.startSync();
                _this.syncSubscription.unsubscribe();
            }
        })).subscribe();
    };
    VgMedia.prototype.startSync = function () {
        var _this = this;
        this.syncSubscription = rxjs_2.timer(0, 1000).subscribe(function () {
            for (var media in _this.api.medias) {
                if (_this.api.medias[media] !== _this) {
                    var diff = _this.api.medias[media].currentTime - _this.currentTime;
                    if (diff < -0.3 || diff > 0.3) {
                        _this.playAtferSync = (_this.state === vg_states_1.VgStates.VG_PLAYING);
                        _this.pause();
                        _this.api.medias[media].pause();
                        _this.api.medias[media].currentTime = _this.currentTime;
                    }
                    else {
                        if (_this.playAtferSync) {
                            _this.play();
                            _this.api.medias[media].play();
                            _this.playAtferSync = false;
                        }
                    }
                }
            }
        });
    };
    VgMedia.prototype.onMutation = function (mutations) {
        // Detect changes only for source elements or src attribute
        for (var i = 0, l = mutations.length; i < l; i++) {
            var mut = mutations[i];
            if (mut.type === 'attributes' && mut.attributeName === 'src') {
                // Only load src file if it's not a blob (for DASH / HLS sources)
                if (mut.target['src'] && mut.target['src'].length > 0 && mut.target['src'].indexOf('blob:') < 0) {
                    this.loadMedia();
                    break;
                }
            }
            else if (mut.type === 'childList' && mut.removedNodes.length && mut.removedNodes[0].nodeName.toLowerCase() === 'source') {
                this.loadMedia();
                break;
            }
        }
    };
    VgMedia.prototype.loadMedia = function () {
        var _this = this;
        this.vgMedia.pause();
        this.vgMedia.currentTime = 0;
        // Start buffering until we can play the media file
        this.stopBufferCheck();
        this.isBufferDetected = true;
        this.bufferDetected.next(this.isBufferDetected);
        // TODO: This is ugly, we should find something cleaner. For some reason a TimerObservable doesn't works.
        setTimeout(function () { return _this.vgMedia.load(); }, 10);
    };
    VgMedia.prototype.play = function () {
        var _this = this;
        // short-circuit if already playing
        if (this.playPromise || (this.state !== vg_states_1.VgStates.VG_PAUSED && this.state !== vg_states_1.VgStates.VG_ENDED)) {
            return;
        }
        this.playPromise = this.vgMedia.play();
        // browser has async play promise
        if (this.playPromise && this.playPromise.then && this.playPromise.catch) {
            this.playPromise
                .then(function () {
                _this.playPromise = null;
            })
                .catch(function () {
                _this.playPromise = null;
                // deliberately empty for the sake of eating console noise
            });
        }
        return this.playPromise;
    };
    VgMedia.prototype.pause = function () {
        var _this = this;
        // browser has async play promise
        if (this.playPromise) {
            this.playPromise
                .then(function () {
                _this.vgMedia.pause();
            });
        }
        else {
            this.vgMedia.pause();
        }
    };
    Object.defineProperty(VgMedia.prototype, "id", {
        get: function () {
            // We should return undefined if vgMedia still doesn't exist
            var result = undefined;
            if (this.vgMedia) {
                result = this.vgMedia.id;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "duration", {
        get: function () {
            return this.vgMedia.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "currentTime", {
        get: function () {
            return this.vgMedia.currentTime;
        },
        set: function (seconds) {
            this.vgMedia.currentTime = seconds;
            // this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_SEEK));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "volume", {
        get: function () {
            return this.vgMedia.volume;
        },
        set: function (volume) {
            this.vgMedia.volume = volume;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "playbackRate", {
        get: function () {
            return this.vgMedia.playbackRate;
        },
        set: function (rate) {
            this.vgMedia.playbackRate = rate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "buffered", {
        get: function () {
            return this.vgMedia.buffered;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VgMedia.prototype, "textTracks", {
        get: function () {
            return this.vgMedia.textTracks;
        },
        enumerable: true,
        configurable: true
    });
    // @ts-ignore
    VgMedia.prototype.onCanPlay = function (event) {
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
        this.canPlay = true;
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onCanPlayThrough = function (event) {
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
        this.canPlayThrough = true;
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onLoadMetadata = function (event) {
        this.isMetadataLoaded = true;
        this.time = {
            current: 0,
            left: 0,
            total: this.duration * 1000
        };
        this.state = vg_states_1.VgStates.VG_PAUSED;
        // Live streaming check
        var t = Math.round(this.time.total);
        this.isLive = (t === Infinity);
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onWait = function (event) {
        this.isWaiting = true;
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onComplete = function (event) {
        this.isCompleted = true;
        this.state = vg_states_1.VgStates.VG_ENDED;
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onStartPlaying = function (event) {
        this.state = vg_states_1.VgStates.VG_PLAYING;
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onPlay = function (event) {
        this.state = vg_states_1.VgStates.VG_PLAYING;
        if (this.vgMaster) {
            if (!this.syncSubscription || this.syncSubscription.closed) {
                this.startSync();
            }
        }
        this.startBufferCheck();
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onPause = function (event) {
        this.state = vg_states_1.VgStates.VG_PAUSED;
        if (this.vgMaster) {
            if (!this.playAtferSync) {
                this.syncSubscription.unsubscribe();
            }
        }
        this.stopBufferCheck();
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onTimeUpdate = function (event) {
        var end = this.buffered.length - 1;
        this.time = {
            current: this.currentTime * 1000,
            total: this.time.total,
            left: (this.duration - this.currentTime) * 1000
        };
        if (end >= 0) {
            this.buffer = { end: this.buffered.end(end) * 1000 };
        }
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onProgress = function (event) {
        var end = this.buffered.length - 1;
        if (end >= 0) {
            this.buffer = { end: this.buffered.end(end) * 1000 };
        }
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onVolumeChange = function (event) {
        // TODO: Save to localstorage the current volume
        this.ref.detectChanges();
    };
    // @ts-ignore
    VgMedia.prototype.onError = function (event) {
        // TODO: Handle error messages
        this.ref.detectChanges();
    };
    // http://stackoverflow.com/a/23828241/779529
    VgMedia.prototype.bufferCheck = function () {
        var offset = 1 / this.checkInterval;
        this.currentPlayPos = this.currentTime;
        if (!this.isBufferDetected && this.currentPlayPos < (this.lastPlayPos + offset)) {
            this.isBufferDetected = true;
        }
        if (this.isBufferDetected && this.currentPlayPos > (this.lastPlayPos + offset)) {
            this.isBufferDetected = false;
        }
        // Prevent calls to bufferCheck after ngOnDestroy have been called
        if (!this.bufferDetected.closed) {
            this.bufferDetected.next(this.isBufferDetected);
        }
        this.lastPlayPos = this.currentPlayPos;
    };
    VgMedia.prototype.startBufferCheck = function () {
        var _this = this;
        this.checkBufferSubscription = rxjs_2.timer(0, this.checkInterval).subscribe(function () {
            _this.bufferCheck();
        });
    };
    VgMedia.prototype.stopBufferCheck = function () {
        if (this.checkBufferSubscription) {
            this.checkBufferSubscription.unsubscribe();
        }
        this.isBufferDetected = false;
        this.bufferDetected.next(this.isBufferDetected);
    };
    VgMedia.prototype.seekTime = function (value, byPercent) {
        if (byPercent === void 0) { byPercent = false; }
        var second;
        var duration = this.duration;
        if (byPercent) {
            second = value * duration / 100;
        }
        else {
            second = value;
        }
        this.currentTime = second;
    };
    VgMedia.prototype.addTextTrack = function (type, label, language, mode) {
        var newTrack = this.vgMedia.addTextTrack(type, label, language);
        if (mode) {
            newTrack.mode = mode;
        }
        return newTrack;
    };
    VgMedia.prototype.ngOnDestroy = function () {
        this.vgMedia.src = '';
        this.mutationObs.unsubscribe();
        this.canPlayObs.unsubscribe();
        this.canPlayThroughObs.unsubscribe();
        this.loadedMetadataObs.unsubscribe();
        this.waitingObs.unsubscribe();
        this.progressObs.unsubscribe();
        this.endedObs.unsubscribe();
        this.playingObs.unsubscribe();
        this.playObs.unsubscribe();
        this.pauseObs.unsubscribe();
        this.timeUpdateObs.unsubscribe();
        this.volumeChangeObs.unsubscribe();
        this.errorObs.unsubscribe();
        if (this.checkBufferSubscription) {
            this.checkBufferSubscription.unsubscribe();
        }
        if (this.syncSubscription) {
            this.syncSubscription.unsubscribe();
        }
        this.bufferDetected.complete();
        this.bufferDetected.unsubscribe();
        this.api.unregisterMedia(this);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], VgMedia.prototype, "vgMedia", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], VgMedia.prototype, "vgMaster", void 0);
    VgMedia = __decorate([
        core_1.Directive({
            selector: '[vgMedia]'
        }),
        __metadata("design:paramtypes", [vg_api_1.VgAPI, core_1.ChangeDetectorRef])
    ], VgMedia);
    return VgMedia;
}());
exports.VgMedia = VgMedia;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmctbWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29yZS92Zy1tZWRpYS92Zy1tZWRpYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF1RjtBQUV2Riw2QkFBb0U7QUFDcEUsNENBQXFDO0FBRXJDLGlEQUErQztBQUMvQyw2Q0FBMkM7QUFDM0MsaURBQStDO0FBRS9DLDZCQUEwQztBQVMxQztJQWlESSxpQkFBb0IsR0FBVSxFQUFVLEdBQXNCO1FBQTFDLFFBQUcsR0FBSCxHQUFHLENBQU87UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTNDOUQsVUFBSyxHQUFXLG9CQUFRLENBQUMsU0FBUyxDQUFDO1FBRW5DLFNBQUksR0FBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDOUMsV0FBTSxHQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBSXpCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUVmLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUV6QixrQkFBYSxHQUFHLEdBQUcsQ0FBQztRQUNwQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUtoQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQWdCdEIsbUJBQWMsR0FBcUIsSUFBSSxjQUFPLEVBQUUsQ0FBQztJQU1qRCxDQUFDO0lBRUQsMEJBQVEsR0FBUjtRQUFBLGlCQW1GQztRQWxGRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFF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O1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWxDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFsZlE7UUFBUixZQUFLLEVBQUU7OzRDQUF3QjtJQUN2QjtRQUFSLFlBQUssRUFBRTs7NkNBQW1CO0lBSmxCLE9BQU87UUFIbkIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1NBQ3hCLENBQUM7eUNBa0QyQixjQUFLLEVBQWUsd0JBQWlCO09BakRyRCxPQUFPLENBc2ZuQjtJQUFELGNBQUM7Q0FBQSxBQXRmRCxJQXNmQztBQXRmWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBPbkluaXQsIERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJUGxheWFibGUsIElNZWRpYVN1YnNjcmlwdGlvbnMgfSBmcm9tIFwiLi9pLXBsYXlhYmxlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIFN1YmplY3QsIGZyb21FdmVudCB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBtYXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcblxuaW1wb3J0IHsgVmdTdGF0ZXMgfSBmcm9tICcuLi9zdGF0ZXMvdmctc3RhdGVzJztcbmltcG9ydCB7IFZnQVBJIH0gZnJvbSAnLi4vc2VydmljZXMvdmctYXBpJztcbmltcG9ydCB7IFZnRXZlbnRzIH0gZnJvbSAnLi4vZXZlbnRzL3ZnLWV2ZW50cyc7XG5pbXBvcnQgeyBJTWVkaWFFbGVtZW50IH0gZnJvbSAnLi9pLW1lZGlhLWVsZW1lbnQnO1xuaW1wb3J0IHt0aW1lciwgY29tYmluZUxhdGVzdH0gZnJvbSAncnhqcyc7XG5cblxuXG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdmdNZWRpYV0nXG59KVxuZXhwb3J0IGNsYXNzIFZnTWVkaWEgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgSVBsYXlhYmxlIHtcbiAgICBlbGVtOiBhbnk7XG5cbiAgICBASW5wdXQoKSB2Z01lZGlhOiBJTWVkaWFFbGVtZW50O1xuICAgIEBJbnB1dCgpIHZnTWFzdGVyOiBib29sZWFuO1xuXG4gICAgc3RhdGU6IHN0cmluZyA9IFZnU3RhdGVzLlZHX1BBVVNFRDtcblxuICAgIHRpbWU6IGFueSA9IHsgY3VycmVudDogMCwgdG90YWw6IDAsIGxlZnQ6IDAgfTtcbiAgICBidWZmZXI6IGFueSA9IHsgZW5kOiAwIH07XG4gICAgdHJhY2s6IGFueTtcbiAgICBzdWJzY3JpcHRpb25zOiBJTWVkaWFTdWJzY3JpcHRpb25zIHwgYW55O1xuXG4gICAgY2FuUGxheSA9IGZhbHNlO1xuICAgIGNhblBsYXlUaHJvdWdoID0gZmFsc2U7XG4gICAgaXNNZXRhZGF0YUxvYWRlZCA9IGZhbHNlO1xuICAgIGlzV2FpdGluZyA9IGZhbHNlO1xuICAgIGlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgaXNMaXZlID0gZmFsc2U7XG5cbiAgICBpc0J1ZmZlckRldGVjdGVkID0gZmFsc2U7XG5cbiAgICBjaGVja0ludGVydmFsID0gMjAwO1xuICAgIGN1cnJlbnRQbGF5UG9zID0gMDtcbiAgICBsYXN0UGxheVBvcyA9IDA7XG5cbiAgICBjaGVja0J1ZmZlclN1YnNjcmlwdGlvbjogYW55O1xuICAgIHN5bmNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBjYW5QbGF5QWxsU3Vic2NyaXB0aW9uOiBhbnk7XG4gICAgcGxheUF0ZmVyU3luYyA9IGZhbHNlO1xuXG4gICAgbXV0YXRpb25PYnM6IFN1YnNjcmlwdGlvbjtcbiAgICBjYW5QbGF5T2JzOiBTdWJzY3JpcHRpb247XG4gICAgY2FuUGxheVRocm91Z2hPYnM6IFN1YnNjcmlwdGlvbjtcbiAgICBsb2FkZWRNZXRhZGF0YU9iczogU3Vic2NyaXB0aW9uO1xuICAgIHdhaXRpbmdPYnM6IFN1YnNjcmlwdGlvbjtcbiAgICBwcm9ncmVzc09iczogU3Vic2NyaXB0aW9uO1xuICAgIGVuZGVkT2JzOiBTdWJzY3JpcHRpb247XG4gICAgcGxheWluZ09iczogU3Vic2NyaXB0aW9uO1xuICAgIHBsYXlPYnM6IFN1YnNjcmlwdGlvbjtcbiAgICBwYXVzZU9iczogU3Vic2NyaXB0aW9uO1xuICAgIHRpbWVVcGRhdGVPYnM6IFN1YnNjcmlwdGlvbjtcbiAgICB2b2x1bWVDaGFuZ2VPYnM6IFN1YnNjcmlwdGlvbjtcbiAgICBlcnJvck9iczogU3Vic2NyaXB0aW9uO1xuXG4gICAgYnVmZmVyRGV0ZWN0ZWQ6IFN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgcGxheVByb21pc2U6IFByb21pc2U8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBWZ0FQSSwgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmdNZWRpYS5ub2RlTmFtZSkge1xuICAgICAgICAgICAgLy8gSXQncyBhIG5hdGl2ZSBlbGVtZW50XG4gICAgICAgICAgICB0aGlzLmVsZW0gPSB0aGlzLnZnTWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdCdzIGFuIEFuZ3VsYXIgQ2xhc3NcbiAgICAgICAgICAgIHRoaXMuZWxlbSA9IHRoaXMudmdNZWRpYS5lbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSnVzdCBpbiBjYXNlIHdlJ3JlIGNyZWF0aW5nIHRoaXMgdmdNZWRpYSBkeW5hbWljYWxseSByZWdpc3RlciBhZ2FpbiBpbnRvIEFQSVxuICAgICAgICB0aGlzLmFwaS5yZWdpc3Rlck1lZGlhKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHtcbiAgICAgICAgICAgIC8vIE5hdGl2ZSBldmVudHNcbiAgICAgICAgICAgIGFib3J0OiBmcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX0FCT1JUKSxcbiAgICAgICAgICAgIGNhblBsYXk6IGZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfQ0FOX1BMQVkpLFxuICAgICAgICAgICAgY2FuUGxheVRocm91Z2g6IGZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfQ0FOX1BMQVlfVEhST1VHSCksXG4gICAgICAgICAgICBkdXJhdGlvbkNoYW5nZTogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19EVVJBVElPTl9DSEFOR0UpLFxuICAgICAgICAgICAgZW1wdGllZDogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19FTVBUSUVEKSxcbiAgICAgICAgICAgIGVuY3J5cHRlZDogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19FTkNSWVBURUQpLFxuICAgICAgICAgICAgZW5kZWQ6IGZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfRU5ERUQpLFxuICAgICAgICAgICAgZXJyb3I6IGZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfRVJST1IpLFxuICAgICAgICAgICAgbG9hZGVkRGF0YTogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19MT0FERURfREFUQSksXG4gICAgICAgICAgICBsb2FkZWRNZXRhZGF0YTogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19MT0FERURfTUVUQURBVEEpLFxuICAgICAgICAgICAgbG9hZFN0YXJ0OiBmcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX0xPQURfU1RBUlQpLFxuICAgICAgICAgICAgcGF1c2U6IGZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfUEFVU0UpLFxuICAgICAgICAgICAgcGxheTogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19QTEFZKSxcbiAgICAgICAgICAgIHBsYXlpbmc6IGZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfUExBWUlORyksXG4gICAgICAgICAgICBwcm9ncmVzczogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19QUk9HUkVTUyksXG4gICAgICAgICAgICByYXRlQ2hhbmdlOiBmcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1JBVEVfQ0hBTkdFKSxcbiAgICAgICAgICAgIHNlZWtlZDogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19TRUVLRUQpLFxuICAgICAgICAgICAgc2Vla2luZzogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19TRUVLSU5HKSxcbiAgICAgICAgICAgIHN0YWxsZWQ6IGZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfU1RBTExFRCksXG4gICAgICAgICAgICBzdXNwZW5kOiBmcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1NVU1BFTkQpLFxuICAgICAgICAgICAgdGltZVVwZGF0ZTogZnJvbUV2ZW50KDxhbnk+dGhpcy5lbGVtLCBWZ0V2ZW50cy5WR19USU1FX1VQREFURSksXG4gICAgICAgICAgICB2b2x1bWVDaGFuZ2U6IGZyb21FdmVudCg8YW55PnRoaXMuZWxlbSwgVmdFdmVudHMuVkdfVk9MVU1FX0NIQU5HRSksXG4gICAgICAgICAgICB3YWl0aW5nOiBmcm9tRXZlbnQoPGFueT50aGlzLmVsZW0sIFZnRXZlbnRzLlZHX1dBSVRJTkcpLFxuXG4gICAgICAgICAgICAvLyBBZHZlcnRpc2VtZW50IG9ubHkgZXZlbnRzXG4gICAgICAgICAgICBzdGFydEFkczogZnJvbUV2ZW50KDxhbnk+d2luZG93LCBWZ0V2ZW50cy5WR19TVEFSVF9BRFMpLFxuICAgICAgICAgICAgZW5kQWRzOiBmcm9tRXZlbnQoPGFueT53aW5kb3csIFZnRXZlbnRzLlZHX0VORF9BRFMpLFxuXG4gICAgICAgICAgICAvLyBTZWUgY2hhbmdlcyBvbiA8c291cmNlPiBjaGlsZCBlbGVtZW50cyB0byByZWxvYWQgdGhlIHZpZGVvIGZpbGVcbiAgICAgICAgICAgIG11dGF0aW9uOiBPYnNlcnZhYmxlLmNyZWF0ZShcbiAgICAgICAgICAgICAgICAob2JzZXJ2ZXI6IGFueSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBkb21PYnMgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KG11dGF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvbU9icy5vYnNlcnZlKDxhbnk+dGhpcy5lbGVtLCB7IGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZSB9KTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tT2JzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLFxuXG4gICAgICAgICAgICAvLyBDdXN0b20gYnVmZmVyaW5nIGRldGVjdGlvblxuICAgICAgICAgICAgYnVmZmVyRGV0ZWN0ZWQ6IHRoaXMuYnVmZmVyRGV0ZWN0ZWRcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm11dGF0aW9uT2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLm11dGF0aW9uLnN1YnNjcmliZSh0aGlzLm9uTXV0YXRpb24uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuY2FuUGxheU9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5jYW5QbGF5LnN1YnNjcmliZSh0aGlzLm9uQ2FuUGxheS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5jYW5QbGF5VGhyb3VnaE9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5jYW5QbGF5VGhyb3VnaC5zdWJzY3JpYmUodGhpcy5vbkNhblBsYXlUaHJvdWdoLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWRlZE1ldGFkYXRhT2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLmxvYWRlZE1ldGFkYXRhLnN1YnNjcmliZSh0aGlzLm9uTG9hZE1ldGFkYXRhLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLndhaXRpbmdPYnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMud2FpdGluZy5zdWJzY3JpYmUodGhpcy5vbldhaXQuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NPYnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMucHJvZ3Jlc3Muc3Vic2NyaWJlKHRoaXMub25Qcm9ncmVzcy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5lbmRlZE9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5lbmRlZC5zdWJzY3JpYmUodGhpcy5vbkNvbXBsZXRlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnBsYXlpbmdPYnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMucGxheWluZy5zdWJzY3JpYmUodGhpcy5vblN0YXJ0UGxheWluZy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5wbGF5T2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLnBsYXkuc3Vic2NyaWJlKHRoaXMub25QbGF5LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnBhdXNlT2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLnBhdXNlLnN1YnNjcmliZSh0aGlzLm9uUGF1c2UuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMudGltZVVwZGF0ZU9icyA9IHRoaXMuc3Vic2NyaXB0aW9ucy50aW1lVXBkYXRlLnN1YnNjcmliZSh0aGlzLm9uVGltZVVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy52b2x1bWVDaGFuZ2VPYnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMudm9sdW1lQ2hhbmdlLnN1YnNjcmliZSh0aGlzLm9uVm9sdW1lQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmVycm9yT2JzID0gdGhpcy5zdWJzY3JpcHRpb25zLmVycm9yLnN1YnNjcmliZSh0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgaWYgKHRoaXMudmdNYXN0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBpLnBsYXllclJlYWR5RXZlbnQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVwYXJlU3luYygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwYXJlU3luYygpIHtcbiAgICAgICAgbGV0IGNhblBsYXlBbGw6IEFycmF5PE9ic2VydmFibGU8YW55Pj4gPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBtZWRpYSBpbiB0aGlzLmFwaS5tZWRpYXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0pIHtcbiAgICAgICAgICAgICAgICBjYW5QbGF5QWxsLnB1c2godGhpcy5hcGkubWVkaWFzWyBtZWRpYSBdLnN1YnNjcmlwdGlvbnMuY2FuUGxheSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhblBsYXlBbGxTdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KGNhblBsYXlBbGwpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKC4uLnBhcmFtcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGVja1JlYWR5U3RhdGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudC50YXJnZXQucmVhZHlTdGF0ZSA9PT0gNDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFsbFJlYWR5OiBib29sZWFuID0gcGFyYW1zLnNvbWUoY2hlY2tSZWFkeVN0YXRlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWxsUmVhZHkgJiYgIXRoaXMuc3luY1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFN5bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSkuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgc3RhcnRTeW5jKCkge1xuICAgICAgICB0aGlzLnN5bmNTdWJzY3JpcHRpb24gPSB0aW1lcigwLCAxMDAwKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbWVkaWEgaW4gdGhpcy5hcGkubWVkaWFzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0gIT09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZmOiBudW1iZXIgPSB0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0uY3VycmVudFRpbWUgLSB0aGlzLmN1cnJlbnRUaW1lO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlmZiA8IC0wLjMgfHwgZGlmZiA+IDAuMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUF0ZmVyU3luYyA9ICh0aGlzLnN0YXRlID09PSBWZ1N0YXRlcy5WR19QTEFZSU5HKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwaS5tZWRpYXNbIG1lZGlhIF0uY3VycmVudFRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheUF0ZmVyU3luYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkubWVkaWFzWyBtZWRpYSBdLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QXRmZXJTeW5jID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIG9uTXV0YXRpb24obXV0YXRpb25zOiBBcnJheTxNdXRhdGlvblJlY29yZD4pIHtcbiAgICAgICAgLy8gRGV0ZWN0IGNoYW5nZXMgb25seSBmb3Igc291cmNlIGVsZW1lbnRzIG9yIHNyYyBhdHRyaWJ1dGVcbiAgICAgICAgZm9yIChsZXQgaT0wLCBsPW11dGF0aW9ucy5sZW5ndGg7IGk8bDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbXV0OiBNdXRhdGlvblJlY29yZCA9IG11dGF0aW9uc1tpXTtcblxuICAgICAgICAgICAgaWYgKG11dC50eXBlID09PSAnYXR0cmlidXRlcycgJiYgbXV0LmF0dHJpYnV0ZU5hbWUgPT09ICdzcmMnKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBsb2FkIHNyYyBmaWxlIGlmIGl0J3Mgbm90IGEgYmxvYiAoZm9yIERBU0ggLyBITFMgc291cmNlcylcbiAgICAgICAgICAgICAgICBpZiAobXV0LnRhcmdldFsnc3JjJ10gJiYgbXV0LnRhcmdldFsnc3JjJ10ubGVuZ3RoID4gMCAmJiBtdXQudGFyZ2V0WydzcmMnXS5pbmRleE9mKCdibG9iOicpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRNZWRpYSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG11dC50eXBlID09PSAnY2hpbGRMaXN0JyAmJiBtdXQucmVtb3ZlZE5vZGVzLmxlbmd0aCAmJiBtdXQucmVtb3ZlZE5vZGVzWzBdLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzb3VyY2UnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkTWVkaWEoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRNZWRpYSgpIHtcbiAgICAgICAgdGhpcy52Z01lZGlhLnBhdXNlKCk7XG4gICAgICAgIHRoaXMudmdNZWRpYS5jdXJyZW50VGltZSA9IDA7XG5cbiAgICAgICAgLy8gU3RhcnQgYnVmZmVyaW5nIHVudGlsIHdlIGNhbiBwbGF5IHRoZSBtZWRpYSBmaWxlXG4gICAgICAgIHRoaXMuc3RvcEJ1ZmZlckNoZWNrKCk7XG4gICAgICAgIHRoaXMuaXNCdWZmZXJEZXRlY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYnVmZmVyRGV0ZWN0ZWQubmV4dCh0aGlzLmlzQnVmZmVyRGV0ZWN0ZWQpO1xuXG4gICAgICAgIC8vIFRPRE86IFRoaXMgaXMgdWdseSwgd2Ugc2hvdWxkIGZpbmQgc29tZXRoaW5nIGNsZWFuZXIuIEZvciBzb21lIHJlYXNvbiBhIFRpbWVyT2JzZXJ2YWJsZSBkb2Vzbid0IHdvcmtzLlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudmdNZWRpYS5sb2FkKCksIDEwKTtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICAvLyBzaG9ydC1jaXJjdWl0IGlmIGFscmVhZHkgcGxheWluZ1xuICAgICAgICBpZiAodGhpcy5wbGF5UHJvbWlzZSB8fCAodGhpcy5zdGF0ZSAhPT0gVmdTdGF0ZXMuVkdfUEFVU0VEICYmIHRoaXMuc3RhdGUgIT09IFZnU3RhdGVzLlZHX0VOREVEKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wbGF5UHJvbWlzZSA9IHRoaXMudmdNZWRpYS5wbGF5KCk7XG5cbiAgICAgICAgLy8gYnJvd3NlciBoYXMgYXN5bmMgcGxheSBwcm9taXNlXG4gICAgICAgIGlmICh0aGlzLnBsYXlQcm9taXNlICYmIHRoaXMucGxheVByb21pc2UudGhlbiAmJiB0aGlzLnBsYXlQcm9taXNlLmNhdGNoKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlQcm9taXNlXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlQcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVByb21pc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWxpYmVyYXRlbHkgZW1wdHkgZm9yIHRoZSBzYWtlIG9mIGVhdGluZyBjb25zb2xlIG5vaXNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5UHJvbWlzZTtcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgLy8gYnJvd3NlciBoYXMgYXN5bmMgcGxheSBwcm9taXNlXG4gICAgICAgIGlmICh0aGlzLnBsYXlQcm9taXNlKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlQcm9taXNlXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZnTWVkaWEucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmdNZWRpYS5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGlkKCkge1xuICAgICAgICAvLyBXZSBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZCBpZiB2Z01lZGlhIHN0aWxsIGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgbGV0IHJlc3VsdCA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAodGhpcy52Z01lZGlhKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnZnTWVkaWEuaWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGdldCBkdXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmdNZWRpYS5kdXJhdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFRpbWUoc2Vjb25kcykge1xuICAgICAgICB0aGlzLnZnTWVkaWEuY3VycmVudFRpbWUgPSBzZWNvbmRzO1xuICAgICAgICAvLyB0aGlzLmVsZW0uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoVmdFdmVudHMuVkdfU0VFSykpO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50VGltZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmdNZWRpYS5jdXJyZW50VGltZTtcbiAgICB9XG5cbiAgICBzZXQgdm9sdW1lKHZvbHVtZSkge1xuICAgICAgICB0aGlzLnZnTWVkaWEudm9sdW1lID0gdm9sdW1lO1xuICAgIH1cblxuICAgIGdldCB2b2x1bWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZnTWVkaWEudm9sdW1lO1xuICAgIH1cblxuICAgIHNldCBwbGF5YmFja1JhdGUocmF0ZSkge1xuICAgICAgICB0aGlzLnZnTWVkaWEucGxheWJhY2tSYXRlID0gcmF0ZTtcbiAgICB9XG5cbiAgICBnZXQgcGxheWJhY2tSYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52Z01lZGlhLnBsYXliYWNrUmF0ZTtcbiAgICB9XG5cbiAgICBnZXQgYnVmZmVyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZnTWVkaWEuYnVmZmVyZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHRleHRUcmFja3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZnTWVkaWEudGV4dFRyYWNrcztcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9uQ2FuUGxheShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuaXNCdWZmZXJEZXRlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ1ZmZlckRldGVjdGVkLm5leHQodGhpcy5pc0J1ZmZlckRldGVjdGVkKTtcbiAgICAgICAgdGhpcy5jYW5QbGF5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgb25DYW5QbGF5VGhyb3VnaChldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuaXNCdWZmZXJEZXRlY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJ1ZmZlckRldGVjdGVkLm5leHQodGhpcy5pc0J1ZmZlckRldGVjdGVkKTtcbiAgICAgICAgdGhpcy5jYW5QbGF5VGhyb3VnaCA9IHRydWU7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9uTG9hZE1ldGFkYXRhKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5pc01ldGFkYXRhTG9hZGVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnRpbWUgPSB7XG4gICAgICAgICAgICBjdXJyZW50OiAwLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvdGFsOiB0aGlzLmR1cmF0aW9uICogMTAwMFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBWZ1N0YXRlcy5WR19QQVVTRUQ7XG5cbiAgICAgICAgLy8gTGl2ZSBzdHJlYW1pbmcgY2hlY2tcbiAgICAgICAgbGV0IHQ6bnVtYmVyID0gTWF0aC5yb3VuZCh0aGlzLnRpbWUudG90YWwpO1xuICAgICAgICB0aGlzLmlzTGl2ZSA9ICh0ID09PSBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9uV2FpdChldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuaXNXYWl0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgb25Db21wbGV0ZShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0YXRlID0gVmdTdGF0ZXMuVkdfRU5ERUQ7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9uU3RhcnRQbGF5aW5nKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFZnU3RhdGVzLlZHX1BMQVlJTkc7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9uUGxheShldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBWZ1N0YXRlcy5WR19QTEFZSU5HO1xuXG4gICAgICAgIGlmICh0aGlzLnZnTWFzdGVyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc3luY1N1YnNjcmlwdGlvbiB8fCB0aGlzLnN5bmNTdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydFN5bmMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhcnRCdWZmZXJDaGVjaygpO1xuICAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBvblBhdXNlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFZnU3RhdGVzLlZHX1BBVVNFRDtcblxuICAgICAgICBpZiAodGhpcy52Z01hc3Rlcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBsYXlBdGZlclN5bmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RvcEJ1ZmZlckNoZWNrKCk7XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9uVGltZVVwZGF0ZShldmVudDogYW55KSB7XG4gICAgICAgIGxldCBlbmQgPSB0aGlzLmJ1ZmZlcmVkLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgdGhpcy50aW1lID0ge1xuICAgICAgICAgICAgY3VycmVudDogdGhpcy5jdXJyZW50VGltZSAqIDEwMDAsXG4gICAgICAgICAgICB0b3RhbDogdGhpcy50aW1lLnRvdGFsLFxuICAgICAgICAgICAgbGVmdDogKHRoaXMuZHVyYXRpb24gLSB0aGlzLmN1cnJlbnRUaW1lKSAqIDEwMDBcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZW5kID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyID0geyBlbmQ6IHRoaXMuYnVmZmVyZWQuZW5kKGVuZCkgKiAxMDAwIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgb25Qcm9ncmVzcyhldmVudDogYW55KSB7XG4gICAgICAgIGxldCBlbmQgPSB0aGlzLmJ1ZmZlcmVkLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgaWYgKGVuZCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IHsgZW5kOiB0aGlzLmJ1ZmZlcmVkLmVuZChlbmQpICogMTAwMCB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9uVm9sdW1lQ2hhbmdlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgLy8gVE9ETzogU2F2ZSB0byBsb2NhbHN0b3JhZ2UgdGhlIGN1cnJlbnQgdm9sdW1lXG4gICAgICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIG9uRXJyb3IoZXZlbnQ6IGFueSkge1xuICAgICAgICAvLyBUT0RPOiBIYW5kbGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgICAgdGhpcy5yZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIzODI4MjQxLzc3OTUyOVxuICAgIGJ1ZmZlckNoZWNrKCkge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSAxIC8gdGhpcy5jaGVja0ludGVydmFsO1xuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5UG9zID0gdGhpcy5jdXJyZW50VGltZTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNCdWZmZXJEZXRlY3RlZCAmJiB0aGlzLmN1cnJlbnRQbGF5UG9zIDwgKHRoaXMubGFzdFBsYXlQb3MgKyBvZmZzZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVmZmVyRGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNCdWZmZXJEZXRlY3RlZCAmJiB0aGlzLmN1cnJlbnRQbGF5UG9zID4gKHRoaXMubGFzdFBsYXlQb3MgKyBvZmZzZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmlzQnVmZmVyRGV0ZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXZlbnQgY2FsbHMgdG8gYnVmZmVyQ2hlY2sgYWZ0ZXIgbmdPbkRlc3Ryb3kgaGF2ZSBiZWVuIGNhbGxlZFxuICAgICAgICBpZiAoIXRoaXMuYnVmZmVyRGV0ZWN0ZWQuY2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlckRldGVjdGVkLm5leHQodGhpcy5pc0J1ZmZlckRldGVjdGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdFBsYXlQb3MgPSB0aGlzLmN1cnJlbnRQbGF5UG9zO1xuICAgIH1cblxuICAgIHN0YXJ0QnVmZmVyQ2hlY2soKSB7XG4gICAgICAgIHRoaXMuY2hlY2tCdWZmZXJTdWJzY3JpcHRpb24gPSB0aW1lcigwLCB0aGlzLmNoZWNrSW50ZXJ2YWwpLnN1YnNjcmliZShcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlckNoZWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RvcEJ1ZmZlckNoZWNrKCkge1xuICAgICAgICBpZiAodGhpcy5jaGVja0J1ZmZlclN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jaGVja0J1ZmZlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0J1ZmZlckRldGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5idWZmZXJEZXRlY3RlZC5uZXh0KHRoaXMuaXNCdWZmZXJEZXRlY3RlZCk7XG4gICAgfVxuXG4gICAgc2Vla1RpbWUodmFsdWU6bnVtYmVyLCBieVBlcmNlbnQ6Ym9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBzZWNvbmQ6bnVtYmVyO1xuICAgICAgICBsZXQgZHVyYXRpb246bnVtYmVyID0gdGhpcy5kdXJhdGlvbjtcblxuICAgICAgICBpZiAoYnlQZXJjZW50KSB7XG4gICAgICAgICAgICBzZWNvbmQgPSB2YWx1ZSAqIGR1cmF0aW9uIC8gMTAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2Vjb25kID0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gc2Vjb25kO1xuICAgIH1cblxuICAgIGFkZFRleHRUcmFjayh0eXBlOnN0cmluZywgbGFiZWw/OnN0cmluZywgbGFuZ3VhZ2U/OnN0cmluZywgbW9kZT86J2Rpc2FibGVkJyB8ICdoaWRkZW4nIHwgJ3Nob3dpbmcnKTogVGV4dFRyYWNrIHtcbiAgICAgICAgY29uc3QgbmV3VHJhY2s6VGV4dFRyYWNrID0gdGhpcy52Z01lZGlhLmFkZFRleHRUcmFjayh0eXBlLCBsYWJlbCwgbGFuZ3VhZ2UpO1xuXG4gICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICBuZXdUcmFjay5tb2RlID0gbW9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3VHJhY2s7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudmdNZWRpYS5zcmMgPSAnJztcbiAgICAgICAgdGhpcy5tdXRhdGlvbk9icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmNhblBsYXlPYnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jYW5QbGF5VGhyb3VnaE9icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmxvYWRlZE1ldGFkYXRhT2JzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMud2FpdGluZ09icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnByb2dyZXNzT2JzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuZW5kZWRPYnMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5wbGF5aW5nT2JzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMucGxheU9icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnBhdXNlT2JzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMudGltZVVwZGF0ZU9icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnZvbHVtZUNoYW5nZU9icy51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLmVycm9yT2JzLnVuc3Vic2NyaWJlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tCdWZmZXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tCdWZmZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuc3luY1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zeW5jU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJ1ZmZlckRldGVjdGVkLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuYnVmZmVyRGV0ZWN0ZWQudW5zdWJzY3JpYmUoKTtcblxuICAgICAgICB0aGlzLmFwaS51bnJlZ2lzdGVyTWVkaWEodGhpcyk7XG4gICAgfVxufVxuIl19