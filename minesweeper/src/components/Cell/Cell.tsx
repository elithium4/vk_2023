import React from "react";
import { cellTypes } from "../../const";
import "./Cell.css";

const markedStates: Record<number, string> = {
  0: "NORMAL",
  1: "MARKED",
  2: "QUESTION",
};

type CellProps = {
  isOpened: boolean;
  hasMine: boolean;
  minesNumber: number;
  x: number;
  y: number;
  isMarked: number;
  clickFunc: (x: number, y: number) => void;
  rightClickFunc: (x: number, y: number) => void;
};

export const Cell = (props: CellProps) => {
  return (
    <div
      className="cell"
      onClick={() => props.isMarked === 0 && props.clickFunc(props.x, props.y)}
      onContextMenu={(e) => {
        e.preventDefault();
        !props.isOpened && props.rightClickFunc(props.x, props.y);
      }}
    >
      {!props.isOpened ? (
        <img
          className="cell-icon"
          src={cellTypes[markedStates[props.isMarked]]}
        />
      ) : props.hasMine ? (
        props.minesNumber === -2 ? (
          <img className="cell-icon" src={cellTypes["BOMBPRESSED"]} />
        ) : (
          <img className="cell-icon" src={cellTypes["BOMB"]} />
        )
      ) : props.isMarked ? (
        <img className="cell-icon" src={cellTypes["NOBOMB"]} />
      ) : (
        <img className="cell-icon" src={cellTypes[String(props.minesNumber)]} />
      )}
    </div>
  );
};
