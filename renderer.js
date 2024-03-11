export class Renderer {
    #text;
    #bg;
    #clickables
    #bgm = new Audio();
    #sfx = new Audio();
    #game;
    #nextButton;

    constructor (game) {
        this.#text = document.getElementById("text");
        this.#bg = document.getElementById("image");
        this.#clickables = document.getElementById("clickables");
        this.#nextButton = document.getElementById("nextButton");
        this.#bgm.loop = true;
        this.#sfx.loop = false;
        this.#game = game;
    }

    render(frame) {
        if(frame.mainAction != undefined && frame.mainAction != null){
            this.#nextButton.onclick = this.#game.functionMap[frame.mainAction.type].bind(this.#game, frame.mainAction.details);
            this.#nextButton.style.visibility = "visible";
        }
        else
            this.#nextButton.style.visibility = "hidden";
        
        let img = new Image();
        img.src = "bg/" + frame.bg;

        img.onload = () => {
            this.#bg.style.backgroundImage = "url(" + img.src + ")";
            this.#bg.style.width = img.naturalWidth + "px";
            this.#bg.style.height = img.naturalHeight + "px";
            this.#prepareGrid(img.naturalHeight, img.naturalWidth, frame.clickables, frame.gridDivisor);
        }

        this.#typeWriter(frame.text, 15);

        if(frame.bgm == "STOP"){
            this.#bgm.pause();
        }
        else if(frame.bgm == "CONTINUE"){
            if(this.#bgm.paused){
                this.#bgm.play();
            }
        }
        else{
            this.#bgm.src = "bgm/" + frame.bgm;
            this.#bgm.play();
        }

        if(frame.sfx == undefined && frame.sfx != null)
            this.#sfx.src = "sfx/" + frame.sfx;
        this.#sfx.play();
    }

    #typeWriter(txt, speed) {
        let i = 0;
        let fText = this.#text;
        fText.textContent = "";
        function inner() {
            if (i < txt.length) {
                fText.textContent += txt.charAt(i);
                i++;
                setTimeout(inner, speed);
            }
        }
        inner();
    }

    #prepareGrid(height, width, clickables, divisor){
        this.#clickables.innerHTML = "";

        for(let i = 0; i < height / divisor; i++){
            let row = this.#clickables.insertRow();
            for(let j = 0; j < width / divisor; j++){
                row.insertCell();
            }
        }

        for (let element of clickables) {
            let cell = this.#clickables.rows[element.gridY].cells[element.gridX];
            cell.style.cursor = "pointer";
            cell.onclick = this.#game.functionMap[element.action.type].bind(this.#game, element.action.details);
        }
    }
}