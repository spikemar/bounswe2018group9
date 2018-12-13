import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventRoutingModule } from './event-routing.module';
import { NativeModule } from '../native/native.module';

import { FeedPage } from './pages/feed/feed.page';
import { EventPage } from './pages/event/event.page';
import { EventCreatePage } from './pages/event-create/event-create.page';

import { EventCardComponent } from './components/event-card/event-card.component';
import {SearchComponent} from './components/search/search.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EventRoutingModule,
    FormsModule,
    NativeModule
  ],
  declarations: [
    FeedPage,
    EventPage,
    EventCreatePage,
    EventCardComponent,
    SearchComponent,
    CommentBoxComponent
  ]
})
export class EventsModule { }
