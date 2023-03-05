import React from "react";
import "./FieldHeader.css";
import { clockIcons, smileIcons } from "../../const";

type HeaderProps = {
  minesNumber: number;
  time: number;
  gameState: 'CONTINUE' | 'LOSE' | 'WIN' | 'PICKING';
  onRestart: () => void;
};

export const FieldHeader = (props: HeaderProps) => {
  const mines = (
    "000".substring(0, 3 - String(props.minesNumber).length) +
    String(props.minesNumber)
  ).split("");
  const time = (
    "000".substring(0, 3 - String(props.time).length) +
    String(props.time)
  ).split("");
  return (
    <div className="header">
      <div>
        {mines.map((el, ind) => {
          return <img className="header-number" key={`mines-${ind}`} src={clockIcons[el]} />;
        })}
      </div>
      <div className="header__smile" onClick={props.onRestart}>
        <img src={smileIcons[props.gameState]} className="header__smile-icon" />
      </div>
      <div>{time.map((el, ind) => {
          return <img className="header-number" key={`clock-${ind}`} src={clockIcons[el]} />;
        })}</div>
    </div>
  );
};
