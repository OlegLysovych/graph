/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChinesePostmanComponent } from './ChinesePostman.component';

describe('ChinesePostmanComponent', () => {
  let component: ChinesePostmanComponent;
  let fixture: ComponentFixture<ChinesePostmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinesePostmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinesePostmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
