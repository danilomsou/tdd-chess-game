export enum Color {
  WHITE = "white",
  BLACK = "black",
}

export enum PieceType {
  PAWN = "pawn",
  ROOK = "rook",
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
  private BOARD_SIZE = 8;
  cells: Cell[] = [];

  constructor() {
    this.initializeBoard();
    this.populatePawns();
    this.populateRook();
  }

  private initializeBoard() {
    for (let row = 0; row < this.BOARD_SIZE; row++) {
      for (let column = 0; column < this.BOARD_SIZE; column++) {
        const color = this.isCellWhite(row, column) ? Color.WHITE : Color.BLACK;
        this.cells.push({ color, row, column });
      }
    }
  }

  private populatePawns() {
    for (let column = 0; column < this.BOARD_SIZE; column++) {
      this.cells[this.BOARD_SIZE + column].piece = {
        type: PieceType.PAWN,
        color: Color.WHITE,
      };
      this.cells[48 + column].piece = {
        type: PieceType.PAWN,
        color: Color.BLACK,
      };
    }
  }

  private populateRook() {
    const lastRow = this.BOARD_SIZE - 1;
    const rookPositions = [0, this.BOARD_SIZE - 1];

    rookPositions.forEach((position) => {
      this.cells[position].piece = { type: PieceType.ROOK, color: Color.WHITE };
      this.cells[position + lastRow * this.BOARD_SIZE].piece = {
        type: PieceType.ROOK,
        color: Color.BLACK,
      };
    });
  }

  getPiece({ color, type }: { color: Color; type: PieceType }) {
    return this.cells.filter(
      ({ piece }) => piece?.type === type && piece.color === color
    );
  }

  getCellColor({ row, column }: Partial<Cell>): Color | undefined {
    return this.cells.find((cell) => cell.row === row && cell.column === column)
      ?.color;
  }

  private isCellWhite(row: number, column: number): boolean {
    return (row + column) % 2 === 0;
  }
}
