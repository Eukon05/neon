import { Clickable } from './clickable.js';
import { Action } from './action.js';

export class Frame{
    bg;
    bgm;
    text;
    mainAction;
    clickables;
    gridDivisor;

    constructor(bg, bgm, text, mainAction, clickables, gridDivisor){
        this.bg = bg;
        this.bgm = bgm;
        this.text = text;
        this.mainAction = mainAction;
        this.clickables = clickables;
        this.gridDivisor = gridDivisor;
    }

    static fromJSON(json){
        return new Frame(json.bg, json.bgm, json.text, Action.fromJSON(json.mainAction), json.clickables.map(Clickable.fromJSON), json.gridDivisor);
    }
}
