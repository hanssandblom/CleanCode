import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolComponent } from './gol.component';

describe('GolComponent', () => {
  let component: GolComponent;
  let fixture: ComponentFixture<GolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the GoL component', () => {
    expect(component).toBeTruthy();
  });

  it('setGridSize', () => {
    spyOn(component, 'setGridSize').and.callThrough();
    fixture.whenRenderingDone()
      .then( () => {
        expect(component.setGridSize).toHaveBeenCalledWith(component.rowSize, component.colSize);
        expect(component.rows.length).toEqual(component.rowSize);
        expect(component.rows[0].col.length).toEqual(component.colSize);
      });
  });
});
