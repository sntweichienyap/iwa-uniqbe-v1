import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentListingPage } from './fulfillment-listing.page';

describe('FulfillmentListingPage', () => {
  let component: FulfillmentListingPage;
  let fixture: ComponentFixture<FulfillmentListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulfillmentListingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FulfillmentListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
