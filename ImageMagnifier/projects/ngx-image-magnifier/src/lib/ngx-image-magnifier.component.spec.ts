import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImageMagnifierComponent } from './ngx-image-magnifier.component';

describe('NgxImageMagnifierComponent', () => {
  let component: NgxImageMagnifierComponent;
  let fixture: ComponentFixture<NgxImageMagnifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxImageMagnifierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxImageMagnifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
