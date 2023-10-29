import InteractiveBar from "./InteractiveBar.js";
export default class Scope {
    constructor(containerName, ImgName) {
        this.currentScale = 2;
        this.container = document.querySelector(containerName);
        this.Images = Array.from(document.querySelectorAll(ImgName));
    }
    Start() {
        this.SetEvents();
    }
    SetEvents() {
        let IsFlag;
        let startPosX;
        let startPosY;
        let isDoubleTouche = false;
        this.Images.forEach(image => {
            image.addEventListener("dblclick", (event) => {
                if (!InteractiveBar.IsActive && !InteractiveBar.isMod) {
                    image.classList.add("grab");
                    this.SetScale(image, this.currentScale);
                    this.SetPart(image);
                    InteractiveBar.IsActive = true;
                }
                else {
                    image.classList.remove("grab");
                    this.SetScale(image, 1);
                    this.SetPos(image, 0, 0);
                    InteractiveBar.IsActive = false;
                }
            });
            image.addEventListener("mousedown", (event) => {
                if (InteractiveBar.IsActive && !InteractiveBar.isMod) {
                    image.classList.remove("animate");
                    image.classList.add("grabing");
                    startPosX = event.clientX - image.offsetLeft;
                    startPosY = event.clientY - image.offsetTop;
                    IsFlag = true;
                }
            });
            image.addEventListener("mousemove", (event) => {
                if (IsFlag) {
                    this.SetPos(image, event.pageX - startPosX, event.pageY - startPosY);
                }
            });
            image.addEventListener("wheel", (event) => {
                if (InteractiveBar.IsActive && !event.ctrlKey) {
                    if (event.deltaY < 0) {
                        this.currentScale += 0.2;
                    }
                    else {
                        this.currentScale -= 0.2;
                    }
                    this.currentScale = this.GetValideScale(this.currentScale);
                    this.SetPart(image);
                    this.SetScale(image, this.currentScale);
                }
            });
            image.addEventListener("mouseup", () => {
                if (InteractiveBar.IsActive) {
                    this.SetValideBorder(image);
                    image.classList.remove("grabing");
                    IsFlag = false;
                }
            });
            image.addEventListener("mouseleave", (event) => {
                if (InteractiveBar.IsActive) {
                    this.SetValideBorder(image);
                    image.classList.remove("grabing");
                    IsFlag = false;
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
                    if (performance.getEntriesByName("duration")[0].duration < 200) {
                        if (!InteractiveBar.IsActive && !InteractiveBar.isMod) {
                            this.SetScale(image, this.currentScale);
                            this.SetPart(image);
                            InteractiveBar.IsActive = true;
                        }
                        else {
                            this.SetScale(image, 1);
                            this.SetPos(image, 0, 0);
                            InteractiveBar.IsActive = false;
                        }
                    }
                    performance.clearMarks();
                    performance.clearMeasures();
                    isDoubleTouche = false;
                }
            });
            image.addEventListener("touchstart", (event) => {
                if (InteractiveBar.IsActive && !InteractiveBar.isMod) {
                    image.classList.remove("animate");
                    startPosX = event.touches[0].clientX - image.offsetLeft;
                    startPosY = event.touches[0].clientY - image.offsetTop;
                    IsFlag = true;
                }
            });
            image.addEventListener("touchmove", (event) => {
                if (IsFlag) {
                    this.SetPos(image, event.touches[0].clientX - startPosX, event.touches[0].clientY - startPosY);
                }
            });
            image.addEventListener("touchend", () => {
                if (InteractiveBar.IsActive) {
                    this.SetValideBorder(image);
                    IsFlag = false;
                }
            });
        });
    }
    SetPart(element) {
        this.partWidth = ((element.offsetWidth * this.currentScale) - element.offsetWidth) / 2;
        this.partHeight = ((element.offsetHeight * this.currentScale) - element.offsetHeight) / 2;
    }
    SetPos(element, X, Y) {
        element.style.left = `${X}px`;
        element.style.top = `${Y}px`;
    }
    SetScale(element, scale) {
        element.style.scale = scale;
    }
    GetValideScale(scale) {
        if (scale <= 1.5) {
            return 1.5;
        }
        else if (scale >= 5) {
            return 5;
        }
        return scale;
    }
    SetValideBorder(element) {
        element.classList.add("animate");
        if (element.offsetTop > this.partHeight) {
            element.style.top = `${this.partHeight}px`;
        }
        else if (Math.abs(element.offsetTop) > this.partHeight) {
            element.style.top = `${-this.partHeight}px`;
        }
        if (element.offsetLeft > this.partWidth) {
            element.style.left = `${this.partWidth}px`;
        }
        else if (Math.abs(element.offsetLeft) > this.partWidth) {
            element.style.left = `${-this.partWidth}px`;
        }
    }
}
//# sourceMappingURL=Scope.js.map