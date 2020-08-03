import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblPreClientsComponent } from './tbl-pre-clients.component';

describe('TblPreClientsComponent', () => {
  let component: TblPreClientsComponent;
  let fixture: ComponentFixture<TblPreClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblPreClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblPreClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
