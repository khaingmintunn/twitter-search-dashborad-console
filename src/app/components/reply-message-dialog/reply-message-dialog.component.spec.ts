import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyMessageDialogComponent } from './reply-message-dialog.component';

describe('ReplyMessageDialogComponent', () => {
  let component: ReplyMessageDialogComponent;
  let fixture: ComponentFixture<ReplyMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
