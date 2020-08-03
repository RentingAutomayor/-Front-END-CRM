import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreRequestComponent } from './update-pre-request.component';

describe('UpdatePreRequestComponent', () => {
  let component: UpdatePreRequestComponent;
  let fixture: ComponentFixture<UpdatePreRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePreRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePreRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
