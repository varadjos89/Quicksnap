import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderHeaderComponent } from './service-provider-header.component';

describe('ServiceProviderHeaderComponent', () => {
  let component: ServiceProviderHeaderComponent;
  let fixture: ComponentFixture<ServiceProviderHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProviderHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
