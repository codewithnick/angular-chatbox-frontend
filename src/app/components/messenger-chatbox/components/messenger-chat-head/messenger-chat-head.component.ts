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

 chatHeadSwiper: Swiper;
 timer:any
 users: chatHeadUser[]=[];
 selectedUser: chatHeadUser;
  constructor(private messengerChatboxService: MessengerChatboxService) { 
    //initalise users    
    for(let i=1;i<=5;i++){
        let user: chatHeadUser = {id: i, profilePicture: `assets/images/user${i==5?1:i}.png`};
        this.users.push(user);
    }
    this.selectedUser = this.users[2];
    // subscribe to change slide observable
    this.messengerChatboxService.selectedSlideIndex$.subscribe(index => {
      this.chatHeadSwiper?.slideTo(index);
      this.selectedUser = this.users[this.chatHeadSwiper?.realIndex];
    });
  }

  
  

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
