import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bugarra } from './bugarra';

describe('Bugarra', () => {
  let component: Bugarra;
  let fixture: ComponentFixture<Bugarra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bugarra],
    }).compileComponents();

    fixture = TestBed.createComponent(Bugarra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
