import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerChatTextboxComponent } from './messenger-chat-textbox.component';

describe('MessengerChatTextboxComponent', () => {
  let component: MessengerChatTextboxComponent;
  let fixture: ComponentFixture<MessengerChatTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessengerChatTextboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessengerChatTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
