import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReacfromComponent } from './reacfrom.component';

describe('ReacfromComponent', () => {
  let component: ReacfromComponent;
  let fixture: ComponentFixture<ReacfromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReacfromComponent]
    });
    fixture = TestBed.createComponent(ReacfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
