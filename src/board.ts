export type Cell = {
  color: string;
};

export enum Color {
  WHITE = "white",
  BLACK = "black",
}

export class Board {
  rows: Array<Array<Cell>> = [];

  create() {
    this.rows = Array.from({ length: 8 }, (_, rowIndex) =>
      Array.from({ length: 8 }, (_, cellIndex) => ({
        color: (rowIndex + cellIndex) % 2 === 0 ? Color.WHITE : Color.BLACK,
      }))
    );

    return null;
  }

  getCellColor({ row, column }: { row: number; column: number }) {
    return this.rows[row][column].color;
  }
}
