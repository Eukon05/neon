import { ActionType } from "./action.js";
import { Game } from "./game.js";
import { Renderer } from "./renderer.js";
import * as Logic from "./logic.js";

let game = null;
let renderer = null;

async function main(){
    //Preparing bindings for custom logic to be executed on in-game events
    //If you want to use custom functions in your game, just extend this map in a similar manner, without relying on the ActionType "enum", as shown below:
    let fMap = {
        //"frame_next" : Logic.frameNext would also work, but I'm using the ActionType enum for convenience here
        [ActionType.FRAME_NEXT]: Logic.frameNext,
        [ActionType.LEVEL_NEXT]: Logic.levelNext,
        [ActionType.FRAME_GOTO]: Logic.frameGoto,
        [ActionType.ALERT]: Logic.showAlert
        //"someCustomFunction" : customFunction
    };

    document.getElementById("start").remove();

    console.log("NEON: Welcome to NEON V0.0.1a");

    game = await Game.init("levels/yttd.json", fMap);
    renderer = new Renderer(game);

    renderer.render(game.currentLevel.frames[game.currentFrame]);
    console.log("NEON: Engine started!");
}

document.getElementById('start').addEventListener('click', main);