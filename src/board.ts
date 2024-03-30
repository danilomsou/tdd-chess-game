export type Cell = {
  color: string;
  row: number;
  column: number;
};

export enum Color {
  WHITE = "white",
  BLACK = "black",
}

export class Board {
  cells: Array<Cell> = [];

  create() {
    Array.from({ length: 8 }).forEach((_, row) => {
      Array.from({ length: 8 }).forEach((_, column) => {
        const color =
          (row % 2 === 0 && column % 2 === 0) ||
          (row % 2 !== 0 && column % 2 !== 0)
            ? Color.WHITE
            : Color.BLACK;

        this.cells.push({ color, row, column });
      });
    });

    return null;
  }

  getCellColor({ row, column }: Partial<Cell>) {
    return this.cells.find((cell) => cell.row === row && cell.column === column)
      ?.color;
  }
}
