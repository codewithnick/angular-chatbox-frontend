import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMessengerChatboxContainerComponent } from './main-messenger-chatbox-container.component';

describe('MainMessengerChatboxContainerComponent', () => {
  let component: MainMessengerChatboxContainerComponent;
  let fixture: ComponentFixture<MainMessengerChatboxContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMessengerChatboxContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMessengerChatboxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
