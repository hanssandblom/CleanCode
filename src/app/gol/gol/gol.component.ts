import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gol',
  templateUrl: './gol.component.html',
  styleUrls: ['./gol.component.css']
})
export class GolComponent implements OnInit {

  rowSize = 100;
  colSize = 100;
  rows = [];
  col = [];

  constructor() { }

  ngOnInit(): void {
    this.setGridSize(this.rowSize, this.colSize);
  }

  setGridSize = (rows: number, columns: number): void  => {
    // @ts-ignore
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

}
