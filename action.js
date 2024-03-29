//This "enum" contains function name constants for logic functions included in the engine.
//It exists purely for my convenience of not having to type these function names as strings anywhere in the engine's code.
//If you want to use custom logic in your game, you don't have to modify this.
export const ActionType = Object.freeze({
    FRAME_NEXT : "FRAME_NEXT",
    FRAME_PREV : "FRAME_PREV",
    FRAME_GOTO : "FRAME_GOTO",
    LEVEL_NEXT : "LEVEL_NEXT",
    LEVEL_GOTO : "LEVEL_GOTO",
    ALERT : "ALERT"
});

export class Action{
    type;
    details;
    constructor(type, details){
        this.type = type;
        this.details = details;
    }

    static fromJSON(json){
        if(json == undefined ||  json == null || json.type == undefined || json.type == null)
            return null;
        return new Action(json.type, json.details);
    }
}