import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedRowComponent } from './finished-row.component';

describe('FinishedRowComponent', () => {
  let component: FinishedRowComponent;
  let fixture: ComponentFixture<FinishedRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishedRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
