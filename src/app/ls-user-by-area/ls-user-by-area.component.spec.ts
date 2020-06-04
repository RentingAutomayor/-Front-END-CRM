import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsUserByAreaComponent } from './ls-user-by-area.component';

describe('LsUserByAreaComponent', () => {
  let component: LsUserByAreaComponent;
  let fixture: ComponentFixture<LsUserByAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsUserByAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsUserByAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
