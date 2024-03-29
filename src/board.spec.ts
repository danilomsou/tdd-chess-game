import { describe, expect, it } from "bun:test";

import { Board } from "./board";

describe("Board ", () => {
  it("should be able to create a new board", () => {
    const board = new Board();
    board.create();
    expect(board).toBeDefined();
  });

  it("should be able to create a new board with dimension 8x8 cells", () => {
    const board = new Board();

    board.create();

    expect(board.rows.length).toBe(8);
    board.rows.forEach((row) => {
      expect(row.length).toBe(8);
    });
  });

  it("should have a white cell and an alternating black cell.", () => {
    const board = new Board();

    board.create();

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
});
