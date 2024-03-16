export class Renderer {
    #text;
    #bg;
    #clickables
    #bgm = new Audio();
    #sfx = new Audio();
    #sprite;
    #speaker;
    #game;
    #nextButton;

    constructor (game) {
        this.#text = document.getElementById("text");
        this.#bg = document.getElementById("image");
        this.#clickables = document.getElementById("clickables");
        this.#sprite = document.getElementById("sprite");
        this.#speaker = document.getElementById("speaker");
        this.#nextButton = document.getElementById("nextButton");
        this.#bgm.loop = true;
        this.#sfx.loop = false;
        this.#game = game;
    }

    render(frame) {
        this.#text.style.fontSize = "0px";
        this.#speaker.style.fontSize = "0px";

        this.#text.textContent = "";
        this.#speaker.textContent = "";
        this.#nextButton.style.display = "none";

        this.#sprite.style.backgroundImage = null;

        this.#bgm.pause();
        this.#sfx.pause();

        if(frame.bg != undefined && frame.bg != null){
            let img = new Image();
            img.src = "bg/" + frame.bg;

            img.onload = () => {
                this.#bg.style.backgroundImage = "url(" + img.src + ")";
                this.#bg.style.width = img.naturalWidth + "px";
                this.#bg.style.height = img.naturalHeight + "px";
                this.#text.style.maxWidth = img.naturalWidth + "px";
                this.#prepareGrid(img.naturalHeight, img.naturalWidth, frame.clickables, frame.gridDivisor);
            }
        }
        else {
            let h = Number(this.#bg.style.height.replace(/\D/g,''));
            let w = Number(this.#bg.style.width.replace(/\D/g,''));
            this.#prepareGrid(h, w, frame.clickables, frame.gridDivisor);
        }
        

        if(frame.dialogue != undefined && frame.dialogue != null && Object.keys(frame.dialogue).length != 0)
            this.#prepareDialogue(frame.dialogue);

        if(frame.bgm == undefined || frame.bgm == null || frame.bgm == "STOP"){
            this.#bgm.pause();
        }
        else if(frame.bgm == "CONTINUE" || "bgm/" + frame.bgm == this.#bgm.src){
            if(this.#bgm.paused){
                this.#bgm.play();
            }
        }
        else{
            this.#bgm.src = "bgm/" + frame.bgm;
            this.#bgm.play();
        }

        if(frame.sfx != undefined && frame.sfx != null && frame.sfx != ""){
            this.#sfx.src = "sfx/" + frame.sfx;
            this.#sfx.play();
        }
    }

    #typeWriter(txt, speed, target) {
        let i = 0;
        function inner() {
            if (i < txt.length) {
                target.textContent += txt.charAt(i);
                i++;
                setTimeout(inner, speed);
            }
        }
        inner();
    }

    #prepareGrid(height, width, clickables, divisor){
        this.#clickables.innerHTML = "";

        if(clickables == undefined || clickables == null || clickables.length == 0)
            return;

        for(let i = 0; i < height / divisor; i++){
            let row = this.#clickables.insertRow();
            for(let j = 0; j < width / divisor; j++){
                row.insertCell();
            }
        }

        let cell;
        for (let element of clickables) {
            for(let coords of element.coords){
                cell = this.#clickables.rows[coords[1]].cells[coords[0]];
                cell.style.cursor = "pointer";
                cell.onclick = this.#game.functionMap[element.action.type].bind(this.#game, element.action.details);
            }
        }
    }

    #prepareDialogue(dialogue){
        if(dialogue.speakerPos != undefined && dialogue.speakerPos != null){
            switch(dialogue.speakerPos){
                case 0 : {
                    this.#sprite.style.backgroundPositionX = "left";
                    break;
                }
                case 1 : {
                    this.#sprite.style.backgroundPositionX = "center";
                    break;
                }
                case 2 : {
                    this.#sprite.style.backgroundPositionX = "right";
                    break;
                }
            }
        }
        else {
            this.#sprite.style.backgroundPositionX = "center";
        }


        if(dialogue.sprite != undefined && dialogue.sprite != null){
            let src = "url(sprites/" + dialogue.sprite + ")";
            if(this.#sprite.style.backgroundImage != src)
                this.#sprite.style.backgroundImage = src;
        }

        if(dialogue.speaker != undefined && dialogue.speaker){
            this.#speaker.style.fontSize = "20px";
            if(dialogue.speaker != this.#speaker.textContent)
                this.#typeWriter(dialogue.speaker, 15, this.#speaker);
        }

        if(dialogue.text != undefined && dialogue.text != null){
            this.#text.style.fontSize = "20px";
            this.#typeWriter(dialogue.text, 15, this.#text);
        }
        
        if(dialogue.action != undefined && dialogue.action != null && Object.keys(dialogue.action).length != 0){
            this.#nextButton.onclick = this.#game.functionMap[dialogue.action.type].bind(this.#game, dialogue.action.details);
            this.#nextButton.style.display = "inline-block";
        }    
    }
}