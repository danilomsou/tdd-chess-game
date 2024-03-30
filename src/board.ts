export enum Color {
  WHITE = "white",
  BLACK = "black",
}

export enum PieceType {
  PAWN = "pawn",
}

export type Piece = {
  type: PieceType;
  color: Color;
};

export type Cell = {
  color: Color;
  piece?: Piece;
  row: number;
  column: number;
};

export class Board {
  cells: Cell[] = [];

  constructor() {
    this.initializeBoard();
    this.populatePawns();
  }

  private initializeBoard() {
    Array.from({ length: 8 }).forEach((_, row) => {
      Array.from({ length: 8 }).forEach((_, column) => {
        const color = this.isCellWhite(row, column) ? Color.WHITE : Color.BLACK;
        this.cells.push({
          color,
          row,
          column,
        });
      });
    });
  }

  private populatePawns() {
    Array.from({ length: 8 }).forEach((_, column) => {
      this.cells.find(
        (cell) => cell.row === 0 && cell.column === column
      )!.piece = { type: PieceType.PAWN, color: Color.WHITE };
      this.cells.find(
        (cell) => cell.row === 2 && cell.column === column
      )!.piece = { type: PieceType.PAWN, color: Color.BLACK };
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
