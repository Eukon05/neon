import { Action } from "./action.js";

export class Clickable{
    action;

    constructor(action){
        this.action = action;
    }

    static fromJSON(json){
        return new Clickable(Action.fromJSON(json.action));
    }
}