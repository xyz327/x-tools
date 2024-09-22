import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodingComponent } from './encoding.component';

describe('EncodingComponent', () => {
  let component: EncodingComponent;
  let fixture: ComponentFixture<EncodingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncodingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncodingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
