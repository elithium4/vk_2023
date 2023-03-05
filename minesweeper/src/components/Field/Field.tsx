import React, { useState } from "react";
import { Cell } from "../Cell/Cell";
import { FieldHeader } from "../FieldHeader/FieldHeader";
import { generateField } from "../../helpers/generator";
import { openFieldZone } from "../../helpers/fieldOpener";
import { CellData } from "../../types";
import "./Field.css";

const minesNumber = 40;
const fieldSize = 16;

export const Field = () => {
  const [minesRemain, setRemain] = useState(minesNumber);
  const [field, setField] = useState<CellData[][]>([]);
  const [cellsOpened, setCellsOpened] = useState(0);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [gameState, setGameState] = useState<
    "CONTINUE" | "LOSE" | "WIN" | "PICKING"
  >("CONTINUE");

  const resetGame = () => {
    setTime(0);
    clearInterval(timer);
    setRemain(minesNumber);
    setCellsOpened(0);
    setGameState("CONTINUE");
    setField([]);
  };

  const startGame = (x: number, y: number) => {
    setCellsOpened(0);
    const generatedField = generateField(x, y, minesNumber, fieldSize);
    let result = openFieldZone(
      generatedField,
      x,
      y,
      cellsOpened,
      fieldSize * fieldSize,
      minesNumber
    );
    setField(result.fieldState);
    setGameState(result.gameResult);
    setCellsOpened(cellsOpened + result.cellsOpened);
    let gameTimer = setInterval(() => setTime((time) => time + 1), 1000);
    setTimer(gameTimer);
  };

  const setVisible = (x: number, y: number) => {
    if (gameState === "LOSE") return;
    let result = openFieldZone(
      field,
      x,
      y,
      cellsOpened,
      fieldSize * fieldSize,
      minesNumber
    );
    if (result.gameResult === "LOSE" || result.gameResult === "WIN")
      clearInterval(timer);
    setField(result.fieldState);
    setGameState(result.gameResult);
    setCellsOpened(cellsOpened + result.cellsOpened);
  };

  const setMark = (x: number, y: number) => {
    if (gameState === "LOSE" || minesRemain === 0) return;
    let newField = [] as CellData[][];
    for (let i = 0; i < fieldSize; i++) {
      newField.push(field[i].slice());
    }
    newField[y][x].isMarked = (newField[y][x].isMarked + 1) % 3;
    if (newField[y][x].isMarked === 1) {
      setRemain(minesRemain - 1);
    } else if (newField[y][x].isMarked === 2) {
      setRemain(minesRemain + 1);
    }
    setField(newField);
  };

  return (
    <div className="field">
      <FieldHeader
        minesNumber={minesRemain}
        gameState={gameState}
        onRestart={resetGame}
        time={time}
      />
      <div
        className="field-base"
        onMouseDown={() => gameState === "CONTINUE" && setGameState("PICKING")}
        onMouseUp={() => gameState === "PICKING" && setGameState("CONTINUE")}
        onMouseLeave={() => gameState === "PICKING" && setGameState("CONTINUE")}
      >
        {field.length === 0
          ? [...Array(fieldSize)].map((el, y) => {
              return (
                <div key={y} className="field-row">
                  {[...Array(fieldSize)].map((cell, x) => {
                    return (
                      <Cell
                        key={`${x}-${y}`}
                        isOpened={false}
                        hasMine={false}
                        minesNumber={0}
                        x={x}
                        y={y}
                        clickFunc={startGame}
                        rightClickFunc={() => {}}
                        isMarked={0}
                      />
                    );
                  })}
                </div>
              );
            })
          : field.map((row, y) => {
              return (
                <div key={y} className="field-row">
                  {row.map((cell, x) => {
                    return (
                      <Cell
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        clickFunc={setVisible}
                        rightClickFunc={setMark}
                        {...cell}
                        hasMine={cell.minesNumber === -1 || cell.minesNumber === -2}
                      />
                    );
                  })}
                </div>
              );
            })}
      </div>
    </div>
  );
};
