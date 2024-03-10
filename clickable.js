import { Action } from "./action.js";

export class Clickable{
    action;
    gridX;
    gridY;

    constructor(action, gridX, gridY){
        this.action = action;
        this.gridX = gridX;
        this.gridY = gridY;
    }

    static fromJSON(json){
        return new Clickable(Action.fromJSON(json.action), json.gridX, json.gridY);
    }
}