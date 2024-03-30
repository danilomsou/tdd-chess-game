export type Cell = {
  color: Color;
  row: number;
  column: number;
};

export enum Color {
  WHITE = "white",
  BLACK = "black",
}

export class Board {
  cells: Cell[] = [];

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    Array.from({ length: 8 }).forEach((_, row) => {
      Array.from({ length: 8 }).forEach((_, column) => {
        const color = this.isCellWhite(row, column) ? Color.WHITE : Color.BLACK;
        this.cells.push({ color, row, column });
      });
    });
  }

  getCellColor({ row, column }: Partial<Cell>): Color | undefined {
    return this.cells.find((cell) => cell.row === row && cell.column === column)
      ?.color;
  }

  private isCellWhite(row: number, column: number): boolean {
    return (row + column) % 2 === 0;
  }
}
