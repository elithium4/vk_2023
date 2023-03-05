import { CellData, ClickResult } from "../types";

type Coordinate = {
  x: number;
  y: number;
};

function openFullField(field: CellData[][]) {
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      field[y][x].isOpened = true;
    }
  }
}

export function openFieldZone(
  field: CellData[][],
  x: number,
  y: number,
  opened: number,
  total: number,
  mines: number
): ClickResult {
    if (field[y][x].isOpened) return {
        fieldState: field,
        gameResult: 'CONTINUE',
        cellsOpened: 0
    }
  let newField = [] as CellData[][];
  for (let i = 0; i < field.length; i++) {
    newField.push(field[i].slice());
  }
  if (field[y][x].minesNumber === -1) {
    openFullField(newField);
    newField[y][x].minesNumber = -2;
    return {
      fieldState: newField,
      gameResult: "LOSE",
      cellsOpened: 1,
    };
  }
  newField[y][x].isOpened = true;
  let cellsOpened = 1;
  if (field[y][x].minesNumber === 0) {
    let cellToCheck = [
      {
        x: x,
        y: y,
      },
    ] as Coordinate[];
    const checked = [] as Number[][];
    for (let y = 0; y < field.length; y++) {
      checked.push([]);
      for (let x = 0; x < field[y].length; x++) {
        checked[y].push(0);
      }
    }
    checked[y][x] = 1;
    while (cellToCheck.length !== 0) {
      const current = cellToCheck.pop();
      const cX = current!.x;
      const cY = current!.y;
      if (checked[cY][cX] !== 1) {
        newField[cY][cX].isOpened = true;
        cellsOpened += 1;
      }
      checked[cY][cX] = 1;
      if (newField[cY][cX].minesNumber !== 0) continue;
      let x0 = cX;
      let y0 = cY;
      let x1 = cX;
      let y1 = cY;
      if (cX > 0) x0 = cX - 1;
      if (cX < field.length - 1) x1 = cX + 1;
      if (cY > 0) y0 = cY - 1;
      if (cY < field.length - 1) y1 = cY + 1;
      for (let i = y0; i <= y1; i++) {
        for (let j = x0; j <= x1; j++) {
          if ((i !== cY || j !== cX) && checked[i][j] === 0)
            cellToCheck.push({
              x: j,
              y: i,
            });
        }
      }
    }
  }
  if (total - cellsOpened - opened === mines) {
    openFullField(newField);
    return {
      fieldState: newField,
      gameResult: "WIN",
      cellsOpened: cellsOpened,
    };
  }

  return {
    fieldState: newField,
    gameResult: "CONTINUE",
    cellsOpened: cellsOpened,
  };
}
