import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gol',
  templateUrl: './gol.component.html',
  styleUrls: ['./gol.component.css']
})
export class GolComponent implements OnInit {

  generateCellsMultiplier = 0;

  rowSize = 40;
  colSize = 40;
  rows : any = [];
  randomInputValue = 160;
  timer: number | undefined;

  constructor() { }

  ngOnInit(): void {
    this.setGridSize(this.rowSize, this.colSize);
  }

  setGridSize = (rows: number, columns: number): void  => {
    this.rows = this.createGrid(rows, columns);
  }

  createGrid = (rows: number, columns: number) => {
    const output = [];
    for (let i = 0; i < rows; i++){
      const col = [];
      for ( let j = 0; j < columns; j++){
        const cell = {
          active: false,
          neighbours: 0
        };
        col.push(cell);
      }
      output.push({columns: col});
    }
    return output;
  }

  checkNeighbourCells = (row: number, col: number): number => {
    let count = 0;
    for (let i = row - 1; i < row + 2; i++){
      for (let j = col - 1; j < col + 2; j++){
        if ((i !== row || j !== col) && (this.rows[i]) && (this.rows[i].columns[j])){
          if (this.rows[i].columns[j].active) {
            count++;
          }
        }
      }
    }
    return count;
  }

  randomizeCells = (times: number) => {
    for (let i = 0; i < times; i++){
      const row = Math.floor(Math.random() * this.rowSize);
      const col = Math.floor(Math.random() * this.colSize);
      this.rows[row].columns[col].active ?
        this.randomizeCells(1) :
        this.rows[row].columns[col].active = true;
    }
  }

  changeCellStatus(i: number, j: number) {
    this.rows[i].columns[j].active = !this.rows[i].columns[j].active;
  }

  runTheGame = () => {
    this.timer = setInterval(() => {
      this.generateCellsMultiplier++;
      this.rows.forEach((row: { columns: any[]; }, rowIndex: any) => {
        const i = rowIndex;
        row.columns.forEach((col, colIndex) => {
          col.neighbours = this.checkNeighbourCells(i, colIndex);
          switch (col.neighbours) {
            case  3:
              col.active = true;
              break;
            case 2:
              break;
            default:
              col.active = false;
          }
        });
      });
    }, 100);
  }
}
