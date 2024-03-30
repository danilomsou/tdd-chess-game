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
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        const color = this.isCellWhite(row, column) ? Color.WHITE : Color.BLACK;
        this.cells.push({ color, row, column });
      }
    }
  }

  private populatePawns() {
    for (let column = 0; column < 8; column++) {
      this.cells[0 + column].piece = {
        type: PieceType.PAWN,
        color: Color.WHITE,
      };
      this.cells[8 + column].piece = {
        type: PieceType.PAWN,
        color: Color.BLACK,
      };
    }
  }

  getCellColor({ row, column }: Partial<Cell>): Color | undefined {
    return this.cells.find((cell) => cell.row === row && cell.column === column)
      ?.color;
  }

  private isCellWhite(row: number, column: number): boolean {
    return (row + column) % 2 === 0;
  }
}
