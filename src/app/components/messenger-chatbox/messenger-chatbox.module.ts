import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerChatboxRoutingModule } from './messenger-chatbox-routing.module';
import { MainMessengerChatboxContainerComponent } from './components/main-messenger-chatbox-container/main-messenger-chatbox-container.component';
import { MessengerChatHeadComponent } from './components/messenger-chat-head/messenger-chat-head.component';
import { MessengerChatComponent } from './components/messenger-chat/messenger-chat.component';
import { CircleProgressModule, ProgressBarModule } from 'nextsapien-component-lib';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';

// Step 2: Add the following line...
register();

@NgModule({
  declarations: [
    MainMessengerChatboxContainerComponent,
    MessengerChatHeadComponent,
    MessengerChatComponent
  ],
  imports: [
    CommonModule,
    MessengerChatboxRoutingModule, 
    ProgressBarModule,
    CircleProgressModule,
    PickerComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessengerChatboxModule { }
