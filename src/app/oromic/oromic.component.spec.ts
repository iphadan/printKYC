import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OromicComponent } from './oromic.component';

describe('OromicComponent', () => {
  let component: OromicComponent;
  let fixture: ComponentFixture<OromicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OromicComponent]
    });
    fixture = TestBed.createComponent(OromicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
