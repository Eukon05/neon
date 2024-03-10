export class Renderer {
    #text;
    #bg;
    #bgm = new Audio();
    #sfx = new Audio();

    constructor () {
        this.#text = document.getElementById("text");
        this.#bg = document.getElementById("image");
        this.#bgm.loop = true;
        this.#sfx.loop = false;
    }

    render(frame) {
        this.#bg.setAttribute("src", "bg/" + frame.bg);

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
}