export class Board {
  rows: string[] = [];

  create() {
    this.rows = Array(8).fill(Array(8).fill(null));
    return null;
  }
}
