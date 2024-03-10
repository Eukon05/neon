import { ActionType } from "./action.js";
import { Game } from "./game.js";
import { Renderer } from "./renderer.js";

let game = null;
let renderer = null;

async function main(){
    let fMap = {
        [ActionType.FRAME_NEXT]: frameNext,
        [ActionType.LEVEL_NEXT]: levelNext,
        [ActionType.FRAME_GOTO]: frameGoto
    };

    document.getElementById("game").style.visibility = "visible";
    document.getElementById("start").remove();

    console.log("NEON: Welcome to NEON V0.0.1a");

    game = await Game.init("levels/level.json", fMap);

    renderer = new Renderer(game);

    renderer.render(game.currentLevel.frames[game.currentFrame]);
    console.log("NEON: Engine started!");
}

function frameNext(details){
    if(game.currentFrame >= game.currentLevel.frames.length - 1){
        console.log("NEON: End of level");
        levelNext(null);
        return;
    }
    game.currentFrame++;
    renderer.render(game.currentLevel.frames[game.currentFrame]);
}

function frameGoto(details){
    let targetFrame = details.frame;
    if(targetFrame < 0 || targetFrame >= game.currentLevel.frames.length){
        console.log("NEON: Invalid frame number");
        alert("Invalid frame number");
        return;
    }
    game.currentFrame = targetFrame;
    renderer.render(game.currentLevel.frames[targetFrame]);
}

async function levelNext(details){
    let nextLevel = game.currentLevel.nextLevel;

    if(nextLevel === null){
        console.log("NEON: No more levels to load!");
        alert("No more levels to load!");
        return;
    }

    game.currentLevel = await game.readLevel("levels/" + nextLevel + ".json");
    game.currentFrame = 0;
    renderer.render(game.currentLevel.frames[game.currentFrame]);
}

function nextButton(){
    let exe = game.currentLevel.frames[game.currentFrame].mainAction;
    game.functionMap[exe.type](exe.details);
}

document.getElementById('start').addEventListener('click', main);
document.getElementById('next').addEventListener('click', nextButton);