import InteractiveBar from "./InteractiveBar.js";
export default class Scope {
    constructor(containerName, currentImgName, ImgName) {
        this.cross = document.querySelector("#scope_Cross");
        this.container = document.querySelector(containerName);
        this.currentImg = document.querySelector(currentImgName);
        this.Images = Array.from(document.querySelectorAll(ImgName));
    }
    Start() {
        this.SetEvents();
    }
    SetEvents() {
        let isDoubleTouche = false;
        this.container.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "opacity") {
                InteractiveBar.isRun = true;
            }
        });
        this.container.addEventListener("transitionend", (event) => {
            if (event.propertyName == "opacity") {
                InteractiveBar.isRun = false;
            }
        });
        this.Images.forEach(image => {
            image.addEventListener("dblclick", (event) => {
                if (!InteractiveBar.IsActive && !InteractiveBar.isMod) {
                    this.container.classList.add("active");
                    this.currentImg.src = image.src;
                    InteractiveBar.IsActive = true;
                }
            });
            image.addEventListener("touchstart", (event) => {
                if (!isDoubleTouche) {
                    performance.mark("start");
                    isDoubleTouche = true;
                }
                else {
                    performance.mark("end");
                    performance.measure("duration", "start", "end");
                    if (performance.getEntriesByName("duration")[0].duration < 250) {
                        if (!InteractiveBar.IsActive && !InteractiveBar.isMod) {
                            this.container.classList.add("active");
                            this.currentImg.src = image.src;
                            InteractiveBar.IsActive = true;
                        }
                    }
                    performance.clearMarks();
                    performance.clearMeasures();
                    isDoubleTouche = false;
                }
            });
        });
        this.cross.addEventListener("click", () => {
            this.container.classList.remove("active");
            InteractiveBar.IsActive = false;
        });
    }
}
//# sourceMappingURL=Scope.js.map