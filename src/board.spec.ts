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

  it("should be able to create a new board with dimension 8x8 cells", () => {
    const board = setUp();

    expect(board.rows.length).toBe(8);
    board.rows.forEach((row) => {
      expect(row.length).toBe(8);
    });
  });

  it("should have a white cell and an alternating black cell.", () => {
    const board = setUp();

    board.rows.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if ((rowIndex + cellIndex) % 2 === 0) {
          expect(cell.color).toBe("white");
        } else {
          expect(cell.color).toBe("black");
        }
      });
    });
  });

  it("should create a board with a white cell at the bottom right for each player", () => {
    const board = setUp();

    expect(board.rows[7][7].color).toBe("white");
    expect(board.rows[0][0].color).toBe("white");
  });

  it("should return only one color from this enum [WHITE, BLACK]", () => {
    const board = setUp();

    const colors = board.rows.flat().map((cell: Cell) => cell.color);

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
});
