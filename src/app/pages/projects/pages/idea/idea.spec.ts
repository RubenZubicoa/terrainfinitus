import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Idea } from './idea';

describe('Idea', () => {
  let component: Idea;
  let fixture: ComponentFixture<Idea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Idea],
    }).compileComponents();

    fixture = TestBed.createComponent(Idea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
