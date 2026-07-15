import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Resort } from './resort';

describe('Resort', () => {
  let component: Resort;
  let fixture: ComponentFixture<Resort>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resort, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { resortId: 'peralejos' } },
            fragment: { pipe: () => ({ subscribe: () => undefined }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Resort);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
