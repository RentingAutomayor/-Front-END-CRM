import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomicActivityComponent } from './economic-activity.component';

describe('EconomicActivityComponent', () => {
  let component: EconomicActivityComponent;
  let fixture: ComponentFixture<EconomicActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EconomicActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EconomicActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
