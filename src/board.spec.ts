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
    const whitePawns = board.getPiece({
      color: Color.WHITE,
      type: PieceType.PAWN,
    });
    const blackPawns = board.getPiece({
      color: Color.BLACK,
      type: PieceType.PAWN,
    });

    expect(whitePawns.length).toBe(8);
    expect(blackPawns.length).toBe(8);

    whitePawns.map(({ row }) => {
      expect(row).toBe(1);
    });
    blackPawns.map(({ row }) => {
      expect(row).toBe(6);
    });
  });

  it("should create a board with 2 rooks for each player in the correct positions", () => {
    const whiteRooks = board.getPiece({
      color: Color.WHITE,
      type: PieceType.ROOK,
    });
    const blackRooks = board.getPiece({
      color: Color.BLACK,
      type: PieceType.ROOK,
    });

    expect(whiteRooks.length).toBe(2);
    expect(blackRooks.length).toBe(2);

    whiteRooks.forEach((rook) => {
      expect(rook.row).toBe(0);
      expect([0, 7]).toContain(rook.column);
    });

    blackRooks.forEach((rook) => {
      expect(rook.row).toBe(7);
      expect([0, 7]).toContain(rook.column);
    });
  });

  it("should create a board with 2 knights for each player in the correct positions", () => {
    const whiteKnights = board.getPiece({
      color: Color.WHITE,
      type: PieceType.KNIGHT,
    });
    const blackKnights = board.getPiece({
      color: Color.BLACK,
      type: PieceType.KNIGHT,
    });

    expect(whiteKnights.length).toBe(2);
    expect(blackKnights.length).toBe(2);

    whiteKnights.forEach((rook) => {
      expect(rook.row).toBe(0);
      expect([1, 6]).toContain(rook.column);
    });

    blackKnights.forEach((rook) => {
      expect(rook.row).toBe(7);
      expect([1, 6]).toContain(rook.column);
    });
  });
});
