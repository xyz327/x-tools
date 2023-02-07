import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomStringComponent } from './random-string.component';

describe('RandomStringComponent', () => {
  let component: RandomStringComponent;
  let fixture: ComponentFixture<RandomStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomStringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
