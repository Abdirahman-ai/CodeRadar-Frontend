import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionPieComponent } from './contribution-pie.component';

describe('ContributionPieComponent', () => {
  let component: ContributionPieComponent;
  let fixture: ComponentFixture<ContributionPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributionPieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
