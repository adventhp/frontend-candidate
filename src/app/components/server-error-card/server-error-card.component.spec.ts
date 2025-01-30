import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorCardComponent } from './server-error-card.component';

describe('ServerErrorCardComponent', () => {
  let component: ServerErrorCardComponent;
  let fixture: ComponentFixture<ServerErrorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerErrorCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServerErrorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
