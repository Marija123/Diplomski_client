import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChangePricelinesComponent } from './add-change-pricelines.component';

describe('AddChangePricelinesComponent', () => {
  let component: AddChangePricelinesComponent;
  let fixture: ComponentFixture<AddChangePricelinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChangePricelinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChangePricelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
