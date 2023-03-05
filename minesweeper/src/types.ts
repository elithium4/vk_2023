export type CellData = {
  minesNumber: number;
  isOpened: boolean;
  isMarked: number;
};

export type ClickResult = {
  fieldState: CellData[][];
  gameResult: "LOSE" | "CONTINUE" | "WIN";
  cellsOpened: number;
};
