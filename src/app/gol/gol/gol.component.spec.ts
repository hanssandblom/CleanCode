import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GolComponent } from './gol.component';

describe('GolComponent', () => {
  let component: GolComponent;
  let fixture: ComponentFixture<GolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [GolComponent]
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

  it('should call setGridSize', () => {
    spyOn(component, 'setGridSize').and.callThrough();
    fixture.whenRenderingDone()
      .then(() => {
        expect(component.setGridSize).toHaveBeenCalledWith(component.rowSize, component.colSize);
        expect(component.rows.length).toEqual(component.rowSize);
        expect(component.rows[0].col.length).toEqual(component.colSize);
      });
  });

  it('should call createGrid', () => {
    const columns = 10;
    const rows = 10;
    spyOn(component, 'createGrid').and.callThrough();
    component.createGrid(rows, columns);
    fixture.detectChanges();
    fixture.whenRenderingDone()
      .then(() => {
        expect(component.createGrid).toHaveBeenCalledWith(rows, columns);
        expect(component.rows.length).toEqual(rows);
        expect(component.rows[0].col.length).toEqual(columns);
      });
  });

  it('should checkNeighbours count to 3', () => {
    component.setGridSize(3, 3);
    component.rows[0].columns.forEach((col: { active: boolean; }) => {
      col.active = true;
    });
    const CONTROL = component.checkNeighbourCells(1, 1);
    expect(CONTROL).toEqual(3);
  });

  it('should checkNeighbours count to 0', () => {
    component.setGridSize(3, 3);
    component.rows[0].columns.forEach((col: { active: boolean; }) => {
      col.active = true;
    });
    const CONTROL = component.checkNeighbourCells(2, 2);
    expect(CONTROL).toEqual(0);
  });

  it('should randomize cells and active cells', () => {
    const MOCK_RUN_X_TIMES = 2;
    let control = 0;
    component.randomizeCells(MOCK_RUN_X_TIMES);
    component.rows.forEach((row: { columns: any[]; }) => {
      row.columns.forEach( col => {
        if (col.active === true) {
          control++;
        }
      });
    });
    expect(control).toEqual(MOCK_RUN_X_TIMES);
  });

  it('should change cell status', () => {
    component.setGridSize(50, 50);
    component.changeCellStatus(0, 0);
    expect(component.rows[0].columns[0].active).toBeTrue();
    component.changeCellStatus(0, 0);
    expect(component.rows[0].columns[0].active).toBeFalse();
  });

  it('should generate cells based on timer', () => {
    jasmine.clock().install();
    component.runTheGame();
    jasmine.clock().tick(1000);
    expect((component.generateCellsMultiplier)).toEqual(10);
  });

  it('should stop the generate of new cells', () => {
    component.stopTheGame();
    expect((component.timer)).toBeFalsy();
  });

  it('should clear the grid and reset counter', () => {
    component.setGridSize(6, 6);
    component.generateCellsMultiplier = 10;
    let CHECK = 0;
    component.rows.forEach((row: { columns: any[]; }) => {
      row.columns.forEach(col => {
        col.active = true;
      });
    });
    spyOn(component, 'stopTheGame');
    component.clearTheGame();
    component.rows.forEach((row: { columns: any[]; }) => {
      row.columns.forEach(col => {
        if (col.active) {
          CHECK++;
        }
      });
    });
    expect(component.stopTheGame).toHaveBeenCalled();
    expect(component.generateCellsMultiplier).toEqual(0);
    expect(CHECK).toEqual(0);
  });
});
