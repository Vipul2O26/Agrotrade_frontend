import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewalluser } from './viewalluser';

describe('Viewalluser', () => {
  let component: Viewalluser;
  let fixture: ComponentFixture<Viewalluser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewalluser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewalluser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
