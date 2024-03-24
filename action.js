//This "enum" contains function name constants for logic functions included in the engine.
//It exists purely for my convenience of not having to type these function names as strings anywhere in the engine's code.
//If you want to use custom logic in your game, you don't have to modify this.
export const ActionType = Object.freeze({
    FRAME_NEXT : "frame_next",
    FRAME_PREV : "frame_prev",
    FRAME_GOTO : "frame_goto",
    LEVEL_NEXT : "level_next",
    FRAME_GOTO : "frame_goto",
    LEVEL_GOTO : "level_goto",
    ALERT : "alert"
});

export class Action{
    type;
    details;
    constructor(type, details){
        this.type = type;
        this.details = details;
    }

    static fromJSON(json){
        if(json == undefined ||  json == null)
            return null;
        return new Action(ActionType[json.type], json.details);
    }
}