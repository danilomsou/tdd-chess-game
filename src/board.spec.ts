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
});
