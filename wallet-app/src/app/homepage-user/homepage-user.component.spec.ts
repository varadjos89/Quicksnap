import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageUserComponent } from './homepage-user.component';

describe('HomepageUserComponent', () => {
  let component: HomepageUserComponent;
  let fixture: ComponentFixture<HomepageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
