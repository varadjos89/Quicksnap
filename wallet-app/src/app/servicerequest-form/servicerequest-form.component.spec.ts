import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerequestFormComponent } from './servicerequest-form.component';

describe('ServicerequestFormComponent', () => {
  let component: ServicerequestFormComponent;
  let fixture: ComponentFixture<ServicerequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicerequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicerequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
