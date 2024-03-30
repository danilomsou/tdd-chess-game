export enum Color {
  WHITE = "white",
  BLACK = "black",
}

export enum PieceType {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
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
    this.populateKnight();
    this.populateBishops();
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

  private populateKnight() {
    const lastRow = this.BOARD_SIZE - 1;
    const knightPositions = [1, this.BOARD_SIZE - 2];

    knightPositions.forEach((position) => {
      this.cells[position].piece = {
        type: PieceType.KNIGHT,
        color: Color.WHITE,
      };
      this.cells[position + lastRow * this.BOARD_SIZE].piece = {
        type: PieceType.KNIGHT,
        color: Color.BLACK,
      };
    });
  }

  private populateBishops() {
    const lastRow = this.BOARD_SIZE - 1;
    const bishopsPositions = [2, this.BOARD_SIZE - 3];

    bishopsPositions.forEach((position) => {
      this.cells[position].piece = {
        type: PieceType.BISHOP,
        color: Color.WHITE,
      };
      this.cells[position + lastRow * this.BOARD_SIZE].piece = {
        type: PieceType.BISHOP,
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
