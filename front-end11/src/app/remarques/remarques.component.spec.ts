import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarquesComponent } from './remarques.component';

describe('RemarquesComponent', () => {
  let component: RemarquesComponent;
  let fixture: ComponentFixture<RemarquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemarquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
