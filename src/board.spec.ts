import { describe, expect, it, beforeEach } from "bun:test";
import { Board, Color, PieceType } from "./board";

describe("Board", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
  });

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
    const whitePawns = board.cells.filter(
      ({ piece, row }) =>
        piece?.type === PieceType.PAWN &&
        piece.color === Color.WHITE &&
        row === 1
    );
    const blackPawns = board.cells.filter(
      ({ piece, row }) =>
        piece?.type === PieceType.PAWN &&
        piece.color === Color.BLACK &&
        row === 6
    );

    expect(whitePawns.length).toBe(8);
    expect(blackPawns.length).toBe(8);
  });
});
