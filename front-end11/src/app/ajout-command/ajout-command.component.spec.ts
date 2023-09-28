import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCommandComponent } from './ajout-command.component';

describe('AjoutCommandComponent', () => {
  let component: AjoutCommandComponent;
  let fixture: ComponentFixture<AjoutCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
