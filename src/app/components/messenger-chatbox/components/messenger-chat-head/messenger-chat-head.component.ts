import { AfterViewInit, Component, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { chatHeadUser } from '../../model/messenger-chatbox.model';
import { MessengerChatboxService } from '../../services/messenger-chatbox.service';

@Component({
  selector: 'app-messenger-chat-head',
  templateUrl: './messenger-chat-head.component.html',
  styleUrls: ['./messenger-chat-head.component.scss']
})
export class MessengerChatHeadComponent implements AfterViewInit {

  constructor(private messengerChatboxService: MessengerChatboxService) { }

  chatHeadSwiper: Swiper;
 timer:any
  users: chatHeadUser[] = [
    { id: 1, profilePicture: 'assets/images/user1.png' },
    { id: 2, profilePicture: 'assets/images/user2.png' },
    { id: 3, profilePicture: 'assets/images/user3.png' },
    { id: 4, profilePicture: 'assets/images/user4.png' },
    { id: 5, profilePicture: 'assets/images/user1.png' },
  ];
  selectedUser: chatHeadUser = this.users[2];

  ngAfterViewInit(): void {
    setTimeout(() => {
      // initialize chat swiper with config
      this.chatHeadSwiper = new Swiper('.swiper-container', {
        slideToClickedSlide: true,
        slideActiveClass: 'selected-slide',
        initialSlide: 2,
        spaceBetween: 30,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        on: {
          // set index of service when slide change
          slideChange: () => {
            this.messengerChatboxService.setSelectedSlideIndex(this.chatHeadSwiper?.realIndex);
            this.selectedUser = this.users[this.chatHeadSwiper?.realIndex];
          }
        }
      });
    }, 100);

    // subscribe to change slide observable
    this.messengerChatboxService.selectedSlideIndex$.subscribe(index => {
      this.chatHeadSwiper?.slideTo(index);
      this.selectedUser = this.users[this.chatHeadSwiper?.realIndex];
    });
  }

  // on select chathead user
  selectUser(user: chatHeadUser) {
    this.selectedUser = user;
  }
  startTimer(): void {
    console.log("heelloup")
    this.timer = setTimeout(() => {
      alert('You are holding my head!');
    }, 1500);
  }

  endTimer(): void {
    clearTimeout(this.timer);
  }
}
