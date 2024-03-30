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

type PlacePiecesInRowProps = {
  pieceType: PieceType;
  color: Color;
  row: number;
};

type PlacePiecesProps = {
  pieceType: PieceType;
  positions: Array<number>;
};

export class Board {
  private BOARD_SIZE = 8;
  cells: Cell[] = [];

  constructor() {
    this.initializeBoard();
    this.populatePieces();
  }

  private initializeBoard() {
    for (let row = 0; row < this.BOARD_SIZE; row++) {
      for (let column = 0; column < this.BOARD_SIZE; column++) {
        const color = this.isCellWhite(row, column) ? Color.WHITE : Color.BLACK;
        this.cells.push({ color, row, column });
      }
    }
  }

  private populatePieces() {
    this.populatePawns();
    this.populateRooks();
    this.populateKnights();
    this.populateBishops();
  }

  private populatePawns() {
    this.placePiecesInRow({
      pieceType: PieceType.PAWN,
      color: Color.WHITE,
      row: 1,
    });
    this.placePiecesInRow({
      pieceType: PieceType.PAWN,
      color: Color.BLACK,
      row: 6,
    });
  }

  private populateRooks() {
    const positions = [0, this.BOARD_SIZE - 1];
    this.placePieces({ positions, pieceType: PieceType.ROOK });
  }

  private populateKnights() {
    const positions = [1, this.BOARD_SIZE - 2];
    this.placePieces({ positions, pieceType: PieceType.KNIGHT });
  }

  private populateBishops() {
    const positions = [2, this.BOARD_SIZE - 3];
    this.placePieces({ positions, pieceType: PieceType.BISHOP });
  }

  private placePiecesInRow({ row, pieceType, color }: PlacePiecesInRowProps) {
    for (let column = 0; column < this.BOARD_SIZE; column++) {
      const index = row * this.BOARD_SIZE + column;
      this.cells[index].piece = { type: pieceType, color };
    }
  }

  private placePieces({ positions, pieceType }: PlacePiecesProps) {
    positions.forEach((position) => {
      this.cells[position].piece = { type: pieceType, color: Color.WHITE };
      this.cells[position + (this.BOARD_SIZE - 1) * this.BOARD_SIZE].piece = {
        type: pieceType,
        color: Color.BLACK,
      };
    });
  }

  getCellsOfPiece({ color, type }: { color: Color; type: PieceType }) {
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
