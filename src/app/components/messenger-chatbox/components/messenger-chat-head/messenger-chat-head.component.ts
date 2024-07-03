import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { chatHeadUser } from '../../model/messenger-chatbox.model';
import { MessengerChatboxService } from '../../services/messenger-chatbox.service';
import { Constants } from 'src/app/components/shared/configs/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messenger-chat-head',
  templateUrl: './messenger-chat-head.component.html',
  styleUrls: ['./messenger-chat-head.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MessengerChatHeadComponent implements AfterViewInit {

 private chatHeadSwiper: Swiper;
 private timer:ReturnType<typeof setTimeout>;
 private subscription: Subscription;
 protected users: chatHeadUser[]=[];
 protected selectedUser: chatHeadUser;
  constructor(private messengerChatboxService: MessengerChatboxService,
    private cdr:ChangeDetectorRef
  ) { }
  ngOnInit(){
    this.cdr.markForCheck();
    //initalise users    
    this.users=Constants.userList;
    this.selectedUser = this.users[Constants.userList.length/2];
    // subscribe to change slide observable
    this.subscription=this.messengerChatboxService.selectedSlideIndex$.subscribe(index => {
      this.chatHeadSwiper?.slideTo(index);
      this.selectedUser = this.users[this.chatHeadSwiper?.realIndex];
      this.cdr.detectChanges();
    });
  }
  
  

  ngAfterViewInit(): void {
    setTimeout(() => {
      // initialize chat swiper with config
      this.chatHeadSwiper = new Swiper('.swiper-container', {
        slideToClickedSlide: true,
        slideActiveClass: 'selected-slide',
        initialSlide: Constants.userList.length/2,
        spaceBetween: 30,
        touchStartPreventDefault: false,
        effect :'slide',
        speed: 900,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        on: {
          // set index of service when slide change
          slideChange: () => {
            setTimeout(() => {
              this.messengerChatboxService.setSelectedSlideIndex(this.chatHeadSwiper?.realIndex);
              this.selectedUser = this.users[this.chatHeadSwiper?.realIndex];
            }, 100);
          }
        }
      });
    }, 100);

  }

  // on select chathead user
  protected selectUser(user: chatHeadUser) {
    this.selectedUser = user;
  }
  protected startTimer(): void {
    //console.log("heelloup")
    this.timer = setTimeout(() => {
      alert('You are holding my head!');
    }, 1500);
  }

  protected endTimer(): void {
    clearTimeout(this.timer);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
