import InteractiveBar from "./InteractiveBar.js";
export class Tape {
    constructor(ScreenListName) {
        this.currentIndex = 0;
        this.cover = document.getElementById("main_body");
        this.container = document.getElementById("container");
        this.screens = Array.from(document.querySelectorAll(ScreenListName));
    }
    static GetInstance(ScreenListName) {
        if (Tape.instance == null) {
            Tape.instance = new Tape(ScreenListName);
        }
        return Tape.instance;
    }
    Start() {
        this.SetEvents();
        this.SetPos(0);
    }
    SetAdditation() {
        /*Animation for navbar when scrolling*/
        setTimeout(() => {
            if (this.currentIndex == 0) {
                document.documentElement.className = "default";
            }
            else if (this.currentIndex == 1) {
                document.documentElement.className = "Autosound";
            }
            else if (this.currentIndex == 2) {
                document.documentElement.className = "Alarms";
            }
            else if (this.currentIndex == 3) {
                document.documentElement.className = "Tinting";
            }
            else if (this.currentIndex == 4) {
                document.documentElement.className = "Insulation";
            }
        }, 300);
    }
    SetEvents() {
        let start;
        let end;
        let difference = 0;
        let isFlag = false;
        this.container.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "transform") {
                Tape.IsAnimation = true;
            }
        });
        this.container.addEventListener("transitionrun", (event) => {
            if (event.propertyName == "transform") {
                Tape.IsAnimation = true;
            }
        });
        this.cover.addEventListener("transitioncancel", (event) => {
            if (event.propertyName == "transform") {
                Tape.IsAnimation = true;
            }
        });
        this.container.addEventListener("transitionend", (event) => {
            if (event.propertyName == "transform") {
                Tape.IsAnimation = false;
            }
        });
        window.addEventListener("wheel", (event) => {
            if (!Tape.IsAnimation && !InteractiveBar.IsActive && (!event.ctrlKey || event.shiftKey)) {
                if (event.deltaY > 0) {
                    this.Move(-300);
                }
                else {
                    this.Move(300);
                }
            }
        });
        this.cover.addEventListener("touchstart", (event) => {
            if (!InteractiveBar.IsActive) {
                difference = 0;
                start = event.changedTouches[0].clientY;
                isFlag = true;
            }
        });
        this.cover.addEventListener("touchmove", (event) => {
            if (isFlag) {
                end = event.changedTouches[0].clientY;
                difference = end - start;
            }
        });
        this.cover.addEventListener("touchend", (event) => {
            if (!InteractiveBar.IsActive) {
                isFlag = false;
                if (difference != 0) {
                    this.Move(difference);
                }
            }
        });
    }
    Move(difference) {
        if (difference <= -150 || difference >= 150) {
            if (difference < 0) {
                this.currentIndex++;
            }
            else {
                this.currentIndex--;
            }
            this.SetPos();
        }
    }
    SetPos(currentIndex = this.currentIndex) {
        this.currentIndex = this.CheckValideIndex(currentIndex);
        this.container.style.transform = ` translateY(-${this.currentIndex * 100}vh)`;
        this.SetAdditation();
    }
    CheckValideIndex(index) {
        if (index < 0) {
            return 0;
        }
        else if (index > this.screens.length - 1) {
            return this.screens.length - 1;
        }
        return index;
    }
}
Tape.IsAnimation = false;
//# sourceMappingURL=Tape.js.map