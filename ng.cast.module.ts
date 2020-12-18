import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCastComponent } from './ng-cast.component';
import { NgCastService } from './shared/ng-cast.service';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    VgStreamingModule
  ],
  exports: [NgCastComponent],
  providers: [NgCastService],
  declarations: [NgCastComponent]
})
export class NgCastModule { }
