import { CellData } from "../types";

type Coordinate = {
  x: number;
  y: number;
};

export function generateField(clickX: number, clickY: number, minesNumber: number, fieldSize: number) {
  const mines = [] as Coordinate[];
  const field = [] as CellData[][];
  for (let y = 0; y < fieldSize; y++) {
    field.push([]);
    for (let x = 0; x < fieldSize; x++) {
      field[y].push({
        minesNumber: 0,
        isOpened: false,
        isMarked: 0
      });
    }
  }

  while (mines.length !== minesNumber) {
    let newX = Math.floor((Math.random() * 1000) % 16);
    let newY = Math.floor((Math.random() * 1000) % 16);
    if (
      mines.filter((el) => {
        return el.x === newX && el.y == newY;
      }).length !== 0 ||
      (newX === clickX && newY === clickY)
    )
      continue;
    mines.push({
      x: newX,
      y: newY,
    });
  }
  for (let mine of mines) {
    field[mine.y][mine.x].minesNumber = -1;
  }
  for (let y = 0; y < fieldSize; y++) {
    for (let x = 0; x < fieldSize; x++) {
      if (field[y][x].minesNumber !== -1) {
        field[y][x].minesNumber +=
          y > 0 && field[y - 1][x].minesNumber === -1 ? 1 : 0;
        field[y][x].minesNumber +=
          y < fieldSize-1 && field[y + 1][x].minesNumber === -1 ? 1 : 0;
        field[y][x].minesNumber +=
          x > 0 && field[y][x - 1].minesNumber === -1 ? 1 : 0;
        field[y][x].minesNumber +=
          x < fieldSize-1 && field[y][x + 1].minesNumber === -1 ? 1 : 0;
        field[y][x].minesNumber +=
          y > 0 && x > 0 && field[y - 1][x - 1].minesNumber === -1 ? 1 : 0;
        field[y][x].minesNumber +=
          y > 0 && x < fieldSize-1 && field[y - 1][x + 1].minesNumber === -1 ? 1 : 0;
        field[y][x].minesNumber +=
          y < fieldSize-1 && x > 0 && field[y + 1][x - 1].minesNumber === -1 ? 1 : 0;
        field[y][x].minesNumber +=
          y < fieldSize-1 && x < fieldSize-1 && field[y + 1][x + 1].minesNumber === -1 ? 1 : 0;
      }
    }
  }
  return field;
}
