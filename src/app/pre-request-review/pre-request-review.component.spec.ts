import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRequestReviewComponent } from './pre-request-review.component';

describe('PreRequestReviewComponent', () => {
  let component: PreRequestReviewComponent;
  let fixture: ComponentFixture<PreRequestReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRequestReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRequestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
