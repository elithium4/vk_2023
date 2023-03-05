import clockOne from './assets/1.png';
import clockTwo from './assets/2.png';
import clockThree from './assets/3.png';
import clockFour from './assets/4.png';
import clockFive from './assets/5.png';
import clockSix from './assets/6.png';
import clockSeven from './assets/7.png';
import clockEight from './assets/8.png';
import clockNine from './assets/9.png';
import clockZero from './assets/0.png';

import cellNormal from './assets/cell_normal.png';
import cellSus from './assets/cell_sus.png';
import cellMarked from './assets/cell_marked.png';
import cellBomb from './assets/cell_bomb.png';
import cellBombsZero from './assets/bombs_0.png';
import cellBombsOne from './assets/bombs_1.png';
import cellBombsTwo from './assets/bombs_2.png';
import cellBombsThree from './assets/bombs_3.png';
import cellBombsFour from './assets/bombs_4.png';
import cellBombsFive from './assets/bombs_5.png';
import cellBombsSix from './assets/bombs_6.png';
import cellBombsSeven from './assets/bombs_7.png';
import cellBombsEight from './assets/bombs_8.png';

import loseSmile from './assets/dead.png';
import coolSmile from './assets/cool.png';
import scaredSmile from './assets/scared.png';
import happySmile from './assets/happy_static.png';
import bombPressed from './assets/cell_bomb_red.png';
import noBomb from './assets/cell_bomb_crossed.png';

export const clockIcons: Record<string, string> = {
    '1': clockOne,
    '2': clockTwo,
    '3': clockThree,
    '4': clockFour,
    '5': clockFive,
    '6': clockSix,
    '7': clockSeven,
    '8': clockEight,
    '9': clockNine,
    '0': clockZero
}

export const cellTypes: Record<string, string> = {
    NORMAL: cellNormal,
    BOMB: cellBomb,
    MARKED: cellMarked,
    QUESTION: cellSus,
    BOMBPRESSED: bombPressed,
    NOBOMB: noBomb,
    '0': cellBombsZero,
    '1': cellBombsOne,
    '2': cellBombsTwo,
    '3': cellBombsThree,
    '4': cellBombsFour,
    '5': cellBombsFive,
    '6': cellBombsSix,
    '7': cellBombsSeven,
    '8': cellBombsEight,
}

export const smileIcons: Record<string, string> = {
    LOSE: loseSmile,
    PICKING: scaredSmile,
    CONTINUE: happySmile,
    WIN: coolSmile
}