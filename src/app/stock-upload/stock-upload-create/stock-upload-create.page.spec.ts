import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockUploadCreatePage } from './stock-upload-create.page';

describe('StockUploadCreatePage', () => {
  let component: StockUploadCreatePage;
  let fixture: ComponentFixture<StockUploadCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockUploadCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockUploadCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
