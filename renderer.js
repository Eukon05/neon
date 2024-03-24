export class Renderer {
    #text = document.createElement('p');
    #bg = document.createElement("div");
    #clickables = document.createElement("table")
    #bgm = new Audio();
    #sfx = new Audio();
    #sprite = document.createElement("div");
    #speaker = document.createElement("h3");
    #nextButton = document.createElement("button");
    #choices = document.createElement('table');
    
    #game;

    constructor (game) {
        this.#text.id = "text";
        this.#bg.id = "image";
        this.#clickables.id = "clickables";
        this.#choices.id = "choices";
        this.#sprite.id = "sprite";
        this.#speaker.id = "speaker";
        this.#nextButton.id = "nextButton";

        this.#text.className = "basic-text transitioning-text";
        this.#speaker.className = "basic-text transitioning-text";
        this.#nextButton.className = "basic-button";

        this.#nextButton.textContent = "→";

        let gameDiv = document.createElement('div');
        gameDiv.id = "game";
        document.body.appendChild(gameDiv);

        gameDiv.appendChild(this.#bg);
        this.#bg.appendChild(this.#sprite);
        this.#sprite.appendChild(this.#clickables);
        this.#sprite.appendChild(this.#choices);

        gameDiv.appendChild(this.#speaker);
        gameDiv.appendChild(this.#text);
        gameDiv.appendChild(this.#nextButton);

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

        if(divisor == undefined || divisor == null)
            return;

        for(let i = 0; i < height / divisor; i++){
            let row = this.#clickables.insertRow();
            for(let j = 0; j < width / divisor; j++){
                row.insertCell();
            }
        }

        if(clickables == undefined || clickables == null || clickables.length == 0)
            return;

        let cell;
        for (let element of clickables) {
            for(let coords of element.coords){
                cell = this.#clickables.rows[coords[1]].cells[coords[0]];
                cell.style.cursor = "pointer";
                cell.onclick = this.#game.functionMap[element.action.type].bind(this, this.#game, element.action.details);
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
            this.#nextButton.onclick = this.#game.functionMap[dialogue.action.type].bind(this, this.#game, dialogue.action.details);
            this.#nextButton.style.display = "inline-block";
        }
        
        this.#prepareChoices(dialogue.choices);
    }

    #prepareChoices(choices){
        this.#choices.innerHTML = "";

        if(choices == undefined || choices == null || choices.length == 0)
            return;

        let cell;
        for(let i = 0; i < choices.length; i++){
            if(choices[i].text == undefined || choices[i].text == null || choices[i].action == undefined || choices[i].action == null)
                continue;

            cell = this.#choices.insertRow(i).insertCell(0);
            cell.textContent = choices[i].text;
            cell.onclick = this.#game.functionMap[choices[i].action.type].bind(this, this.#game, choices[i].action.details);

            if(choices[i].bgColor == undefined || choices[i].bgColor == null)
                cell.style.backgroundColor = "#ab741b"
            else
                cell.style.backgroundColor = choices[i].bgColor;

            if(choices[i].fontColor == undefined || choices[i].fontColor == null)
                cell.style.color = "white"
            else
                cell.style.color = choices[i].fontColor;
        }
    }
}