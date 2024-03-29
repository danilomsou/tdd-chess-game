type Cell = {
  color: string;
};

export class Board {
  rows: Array<Array<Cell>> = [];

  create() {
    this.rows = Array.from({ length: 8 }, (_, rowIndex) =>
      Array.from({ length: 8 }, (_, cellIndex) => ({
        color: (rowIndex + cellIndex) % 2 === 0 ? "white" : "black",
      }))
    );

    return null;
  }
}
