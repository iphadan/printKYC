import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmharicComponent } from './amharic.component';

describe('AmharicComponent', () => {
  let component: AmharicComponent;
  let fixture: ComponentFixture<AmharicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmharicComponent]
    });
    fixture = TestBed.createComponent(AmharicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
