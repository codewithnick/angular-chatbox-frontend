import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerChatHeadComponent } from './messenger-chat-head.component';

describe('MessengerChatHeadComponent', () => {
  let component: MessengerChatHeadComponent;
  let fixture: ComponentFixture<MessengerChatHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerChatHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessengerChatHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
