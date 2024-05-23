import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMessengerChatboxContainerComponent } from './components/main-messenger-chatbox-container/main-messenger-chatbox-container.component';

const routes: Routes = [
  { path: '', component: MainMessengerChatboxContainerComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessengerChatboxRoutingModule { }
