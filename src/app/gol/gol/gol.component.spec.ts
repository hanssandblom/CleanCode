import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GolComponent } from './gol.component';

describe('GolComponent', () => {
  let component: GolComponent;
  let fixture: ComponentFixture<GolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
        expect(component.col.length).toEqual(component.colSize);
      });
  });

  it('createGrid', () => {
    const columns = 10;
    const rows = 10;
    spyOn(component, 'createGrid').and.callThrough();
    component.createGrid(rows, columns);
    fixture.detectChanges();
    fixture.whenRenderingDone()
      .then( () => {
        expect(component.createGrid).toHaveBeenCalledWith(rows, columns);
        expect(component.rows.length).toEqual(rows);
        expect(component.col.length).toEqual(columns);
      });
  });

  it('should checkNeighbours count to 3', () => {
    component.setGridSize(3, 3);
    component.rows[0].cols.forEach((col: { active: boolean; }) => {
      col.active = true;
    });
    const CONTROL = component.checkNeighboursCells(1, 1);
    expect(CONTROL).toEqual(3);
  });

  it('should checkNeighbours count to 0', () => {
    component.setGridSize(3, 3);
    component.rows[0].cols.forEach((col: { active: boolean; }) => {
      col.active = true;
    });
    const CONTROL = component.checkNeighboursCells(2, 2);
    expect(CONTROL).toEqual(0);
  });
});
