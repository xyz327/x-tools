import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateConvertComponent } from './date-convert.component';

describe('DateConvertComponent', () => {
  let component: DateConvertComponent;
  let fixture: ComponentFixture<DateConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateConvertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
