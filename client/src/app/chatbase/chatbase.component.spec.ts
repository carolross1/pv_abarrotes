import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbaseComponent } from './chatbase.component';

describe('ChatbaseComponent', () => {
  let component: ChatbaseComponent;
  let fixture: ComponentFixture<ChatbaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatbaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
