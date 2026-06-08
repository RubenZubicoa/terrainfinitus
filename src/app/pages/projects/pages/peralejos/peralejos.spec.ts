import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Peralejos } from './peralejos';

describe('Peralejos', () => {
  let component: Peralejos;
  let fixture: ComponentFixture<Peralejos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Peralejos],
    }).compileComponents();

    fixture = TestBed.createComponent(Peralejos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
