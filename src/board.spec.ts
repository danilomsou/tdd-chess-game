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

  it("should be able to create a new board with 64 cells", () => {
    const board = setUp();

    expect(board.cells.length).toBe(64);
  });

  it("should have a white cell and an alternating black cell.", () => {
    const board = setUp();

    board.cells.forEach(({ row, column, color }: Cell) => {
      if (isCellWhite(row, column)) {
        expect(color).toBe(Color.WHITE);
      } else {
        expect(color).toBe(Color.BLACK);
      }
    });
  });

  it("should create a board with a white cell at the bottom right for each player", () => {
    const board = setUp();

    expect(board.getCellColor(firstPlayerLastRightCell)).toBe(Color.WHITE);
    expect(board.getCellColor(secondPlayerFirstRightCell)).toBe(Color.WHITE);
  });

  const isCellWhite = (row: number, column: number) => {
    if (
      (row % 2 === 0 && column % 2 === 0) ||
      (row % 2 !== 0 && column % 2 !== 0)
    ) {
      return true;
    }
  };

  const firstPlayerLastRightCell = { row: 7, column: 7 };
  const secondPlayerFirstRightCell = { row: 0, column: 0 };
});
