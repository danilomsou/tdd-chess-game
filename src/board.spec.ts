import { describe, expect, it, beforeEach } from "bun:test";
import { Board, Color, PieceType } from "./board";

type TestPiecePlacementProps = {
  pieceType: PieceType;
  color: Color;
  expectedRows: number[];
  expectedColumns: number[];
};

describe("Board", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
  });

  const testPiecePlacement = ({
    pieceType,
    color,
    expectedRows,
    expectedColumns,
  }: TestPiecePlacementProps) => {
    const pieces = board.getCellsOfPiece({ color, type: pieceType });

    expect(pieces.length).toBe(expectedColumns.length);

    pieces.forEach((piece) => {
      expect(expectedRows).toContain(piece.row);
      expect(expectedColumns).toContain(piece.column);
    });
  };

  it("should be able to create a new board with 64 cells", () => {
    expect(board.cells.length).toBe(64);
  });

  it("should have alternating colors starting with white at (0,0)", () => {
    expect(board.cells[0].color).toBe(Color.WHITE);
  });

  it("should return the correct color for given cell positions", () => {
    expect(board.getCellColor({ row: 0, column: 0 })).toBe(Color.WHITE);
    expect(board.getCellColor({ row: 0, column: 1 })).toBe(Color.BLACK);
    expect(board.getCellColor({ row: 7, column: 7 })).toBe(Color.WHITE);
    expect(board.getCellColor({ row: 7, column: 6 })).toBe(Color.BLACK);
  });

  it("should create a board with a white cell at the bottom right for each player", () => {
    expect(board.getCellColor({ row: 7, column: 7 })).toBe(Color.WHITE);
    expect(board.getCellColor({ row: 0, column: 0 })).toBe(Color.WHITE);
  });

  it("should create a board with 8 pawns for each player in the correct positions", () => {
    testPiecePlacement({
      pieceType: PieceType.PAWN,
      color: Color.WHITE,
      expectedRows: [1],
      expectedColumns: [0, 1, 2, 3, 4, 5, 6, 7],
    });
    testPiecePlacement({
      pieceType: PieceType.PAWN,
      color: Color.BLACK,
      expectedRows: [6],
      expectedColumns: [0, 1, 2, 3, 4, 5, 6, 7],
    });
  });

  it("should create a board with 2 rooks for each player in the correct positions", () => {
    testPiecePlacement({
      pieceType: PieceType.ROOK,
      color: Color.WHITE,
      expectedRows: [0],
      expectedColumns: [0, 7],
    });
    testPiecePlacement({
      pieceType: PieceType.ROOK,
      color: Color.BLACK,
      expectedRows: [7],
      expectedColumns: [0, 7],
    });
  });

  it("should create a board with 2 knights for each player in the correct positions", () => {
    testPiecePlacement({
      pieceType: PieceType.KNIGHT,
      color: Color.WHITE,
      expectedRows: [0],
      expectedColumns: [1, 6],
    });
    testPiecePlacement({
      pieceType: PieceType.KNIGHT,
      color: Color.BLACK,
      expectedRows: [7],
      expectedColumns: [1, 6],
    });
  });

  it("should create a board with 2 bishops for each player in the correct positions", () => {
    testPiecePlacement({
      pieceType: PieceType.BISHOP,
      color: Color.WHITE,
      expectedRows: [0],
      expectedColumns: [2, 5],
    });
    testPiecePlacement({
      pieceType: PieceType.BISHOP,
      color: Color.BLACK,
      expectedRows: [7],
      expectedColumns: [2, 5],
    });
  });
});
