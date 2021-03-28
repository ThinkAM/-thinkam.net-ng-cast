import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { NgCastService } from './shared/ng-cast.service';

import { VgDashDirective } from '@videogular/ngx-videogular/streaming';
import { VgApiService, BitrateOptions, IDRMLicenseServer } from '@videogular/ngx-videogular/core';

import { ScheduleDto } from './dto/schedule-dto';

export interface IMediaStream {
  type: 'vod' | 'dash';
  source: string;
  label: string;
  token?: string;
  licenseServers?: IDRMLicenseServer;
}

@Component({
  selector: 'ng-cast',
  templateUrl: './ng-cast.component.html',
  styleUrls: [
    './ng-cast.component.scss'
  ]
})
export class NgCastComponent implements OnInit, AfterViewChecked {
  @ViewChild(VgDashDirective, { static: false }) vgDash!: VgDashDirective;
  @ViewChild('media', { static: false }) media!: ElementRef<HTMLVideoElement>;

  castingStatus: any;
  window: any;

  @Input() videoImage = '';
  @Input() imageOffline = false;
  @Input() premium = false;
  @Input() srcImageOffline = '';

  @Input() currentStream: IMediaStream = {
    type: 'dash',
    label: 'DASH: Media Stream test',
    source: 'http://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
  };

  api: VgApiService = new VgApiService();

  @Input() isDebug = false;

  @Input() paused!: boolean;

  @Input() streams: IMediaStream[] = [
    {
      type: 'dash',
      label: 'DASH: Media Stream test',
      source: 'http://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd'
    }
  ];

  @Input() playlist: Array<ScheduleDto> = [];

  @Input() play = false;
  @Input() isHidden = false;
  @Input() isShow = true;

  @Input() currentIndex = 0;
  @Input() video: ScheduleDto = new ScheduleDto();
  @Input() appBaseUrl: String = '';

  constructor(
    private ngCastService: NgCastService
  ) { }

  ngOnInit() {
    this.window = window;
    this.currentStream = this.streams[0];

    let ngCastService = this.ngCastService;
    this.window['__onGCastApiAvailable'] = function (isAvailable: boolean) {
      if (isAvailable) {
        ngCastService.initializeCastApi();
      }
    };

    this.castingStatus = this.ngCastService.getStatus();
  }

  ngAfterViewChecked() { 
    setTimeout(() => {
      this.getPaused();
    }, 2000);
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  setBitrate(option: BitrateOptions) {
    switch (this.currentStream.type) {
      case 'dash':
        this.vgDash.setBitrate(option);
        break;
    }
  }

  nextVideo() {
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
      this.currentIndex = 0;
    }

    this.video = this.playlist[this.currentIndex];
  }

  getPaused() {
    if (this.media && this.media.nativeElement) {
      this.paused = this.media.nativeElement.paused;
      return this.media.nativeElement.paused;
    } else {
      setTimeout(() => {
        return this.getPaused();
      }, 2000);
    }
  }

  pause(): void {
    this.media.nativeElement.pause();
    this.getPaused();
  }

  openSession() {
    this.ngCastService.discoverDevices();
  }

  closeSession() {
    this.ngCastService.discoverDevices();
  }

  tryAgain() {
    this.imageOffline = true;
    this.isHidden = true;
    console.log('loading...');

    setTimeout(() => {
      this.getVideos();
    }, 500);
  }

  getVideos(): void {
    if (this.playlist && this.playlist.length > 0) {
      this.imageOffline = false;
      this.video = this.playlist[this.currentIndex];

      this.getPosition(this.video);
    } else {
      this.video = new ScheduleDto();
      this.tryAgain();
    }
  }

  getPosition(result: ScheduleDto) {
    setTimeout(() => {
      let vid: any = document.getElementById('video_element');
      vid.load();

      const now = new Date();
      const currentTime = Math.abs(now.getTime() - new Date(this.video.actualStart).getTime());

      console.log('Temos no player: ' + result.url);
      console.log('Início em: ' + currentTime);

      this.video.url = result.url;
      vid['currentTime'] = currentTime / 1000;

      let promise = vid.play();
      if (promise !== undefined) {
        promise.then((_: any) => {
          // Autoplay started!
          console.log('Estamos ao vivo!');
        }).catch(() => {
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
          this.play = true;
        });
      }
    }, 1000);
  }

  getMuted(): boolean {
    return this.media && this.media.nativeElement && this.media.nativeElement.muted || false;
  }

  getMaximized(): boolean {
    return this.api && this.api.fsAPI && this.api.fsAPI.isFullscreen && this.api.fsAPI.isFullscreen || false;
  }

  toggleSound(): void {
    this.media.nativeElement.muted = !this.media.nativeElement.muted;
  }

  toggleMaximize(): void {
    if (!this.mobileCheck()) {
      this.api.fsAPI.toggleFullscreen(this.media);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        this.requestFullscreenVideo();
        this.lockScreenInLandscape();
      }    
    }
  }

  requestFullscreenVideo() {
    const videoContainer = document.getElementById('videoContainer');
    const video = document.getElementById('video_element') as any;

    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else {
      video.webkitEnterFullscreen();
    }
  }  

  lockScreenInLandscape() {
    if (!('orientation' in screen)) {
      return;
    }
    // Let's force landscape mode only if device is in portrait mode and can be held in one hand.
    if (matchMedia('(orientation: portrait) and (max-device-width: 768px)').matches) {
      screen.orientation.lock('landscape');
    }
  }  

  showVideoControls(): void {
    this.isHidden = false;
    this.isShow = true;
  }

  hideVideoControls(): void {
    this.isHidden = true;
    this.isShow = false;
  }

  mobileCheck(): boolean {
    let check = false;
    ((a) => {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window['opera']);
    return check;
  }

  mobileAndTabletCheck(): boolean {
    let check = false;
    ((a) => {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window['opera']);
    return check;
  }
}
