import { Action } from "./action.js";

export class Clickable{
    action;
    coords;

    constructor(action, coords){
        this.action = action;
        this.coords = coords;
    }

    static fromJSON(json){
        if(json == undefined || json == null)
            return null;
        return new Clickable(Action.fromJSON(json.action), json.coords);
    }
}