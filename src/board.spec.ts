import { describe, expect, it } from "bun:test";

import { Board, Color } from "./board";
import type { Cell } from "./board";

const setUp = () => {
  const board = new Board();
  board.create();

  return board;
};

describe("Board ", () => {
  it("should be able to create a new board", () => {
    const board = setUp();

    expect(board).toBeDefined();
  });

  it("should return only one color from this enum [WHITE, BLACK]", () => {
    const board = setUp();

    const colors = board.cells.map((cell: Cell) => cell.color);

    expect(
      colors.every((color) => color === Color.WHITE || color === Color.BLACK)
    ).toBe(true);
  });

  it("should be returns cell color", () => {
    const board = setUp();

    const cell = {
      row: 0,
      column: 0,
    };

    expect(board.getCellColor(cell)).toBe("white");
  });

  it("should be able to create a new board with 64 cells", () => {
    const board = setUp();

    expect(board.cells.length).toBe(64);
  });
});
