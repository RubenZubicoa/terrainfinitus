import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheLake } from './the-lake';

describe('TheLake', () => {
  let component: TheLake;
  let fixture: ComponentFixture<TheLake>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheLake],
    }).compileComponents();

    fixture = TestBed.createComponent(TheLake);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
