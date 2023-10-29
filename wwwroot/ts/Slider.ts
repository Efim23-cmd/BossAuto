import InteractiveBar from "./InteractiveBar.js";


export default class Slider {

    private container: HTMLElement;
    private slides: HTMLElement[];
    private slidesBar: HTMLElement[];

    private listOfPositions: number[];
    private index: number = 0;

    private IsSlideBar: boolean;

    constructor(containerName: string, SlideListName: string, sliderBar?: string) {
        this.container = document.querySelector(containerName);
        this.slides = Array.from(document.querySelectorAll(SlideListName));
        this.slidesBar = Array.from(document.querySelectorAll(sliderBar));
    }

    public Start() {
        this.listOfPositions = this.CreatPosList();
        this.SetPos();
        this.SetEvents();
        if (this.slidesBar.length != 0) {
            this.IsSlideBar = true;
            this.SetActiveBar();
        }
    }
    private SetEvents() {
        let start: number;
        let end: number;
        let difference: number = 0;
        let isFlag = false;

        this.container.addEventListener("mousedown", (event) => {
            if (!InteractiveBar.IsActive) {
                this.container.classList.remove("animate");
                start = event.clientX;
                difference = 0;
                isFlag = true;
            }
        });

        this.container.addEventListener("mousemove", (event) => {
            if (isFlag && !InteractiveBar.IsActive) {
                end = event.clientX;
                difference = end - start;
                this.container.style.transform = `translateX(${(difference / 2)}px)`;
            }
        });

        this.container.addEventListener("mouseup", () => {
            if (!InteractiveBar.IsActive) {
                isFlag = false;
                if (difference != 0) {
                    this.container.classList.add("animate");
                    this.container.style.transform = "translateX(0px)";
                    this.Move(difference);
                }
            }
        });
        this.container.addEventListener("mouseleave", () => {
            if (!InteractiveBar.IsActive) {
                isFlag = false;
                this.container.classList.add("animate");
                this.container.style.transform = "translateX(0px)";
            }
        });

        this.container.addEventListener("touchstart", (event) => {
            if (!InteractiveBar.IsActive) {
                this.container.classList.remove("animate");
                difference = 0;
                start = event.changedTouches[0].clientX;
                isFlag = true;
            }
        });

        this.container.addEventListener("touchmove", (event) => {
            if (isFlag && !InteractiveBar.IsActive) {
                end = event.changedTouches[0].clientX;
                difference = end - start;
                this.container.style.transform = `translateX(${(difference / 2)}px)`;
            }
        });

        this.container.addEventListener("touchend", (event) => {
            isFlag = false;
            if (difference != 0) {
                this.container.classList.add("animate");
                this.container.style.transform = "translateX(0px)";
                this.Move(difference);
            }
        });
    }

    private Move(difference) {
        if (difference < -200 || difference > 200) {
            if (difference < 0) {
                this.Next();
            }
            else {
                this.Previous();
            }
            if (this.IsSlideBar) {
                this.SetActiveBar();
            }
        }
    }

    private Previous() {
        this.index--;
        this.listOfPositions.push(this.listOfPositions[0]);
        this.listOfPositions.shift();
        this.SetPos();
    }

    private Next() {
        this.index++;
        this.listOfPositions.unshift(this.listOfPositions[this.listOfPositions.length - 1]);
        this.listOfPositions.pop();
        this.SetPos();
    }

    private CreatPosList(): number[] {
        let middleIndex = Math.round((this.slides.length - 1) / 2);
        let minIndex = -middleIndex;
        let resultList: number[] = Array.of();
        for (let index = 0; index < this.slides.length; index++) {
            resultList[index] = (minIndex++) * 100;
        }
        for (let index = 0; index < middleIndex; index++) {
            resultList.push(resultList[0]);
            resultList.shift();
        }
        return resultList;
    }

    private SetPos() {
        for (let index = 0; index < this.slides.length; index++) {
            if (this.listOfPositions[index] == 0) {
                this.slides[index].classList.remove("around");
                this.slides[index].classList.remove("background");
                this.slides[index].classList.add("foreground");
            }
            else if (Math.abs(this.listOfPositions[index]) == 100) {
                this.slides[index].classList.remove("foreground");
                this.slides[index].classList.remove("background");
                this.slides[index].classList.add("around");
            }
            else {
                this.slides[index].classList.remove("foreground");
                this.slides[index].classList.remove("around");
                this.slides[index].classList.add("background");
            }
            this.slides[index].style.transform = `translateX(${this.listOfPositions[index]}%)`;
        }
    }
    private SetActiveBar() {
        this.RemoveActiveBar();
        this.index = this.CheckValideIndex(this.index)
        this.slidesBar[this.index].classList.add("active");
    }

    private RemoveActiveBar() {
        this.slidesBar.forEach(element => element.classList.remove("active"));
    }

    private CheckValideIndex(index: number) {
        if (index < 0) {
            return this.slidesBar.length - 1;
        }
        else if (index > this.slidesBar.length - 1) {
            return 0;
        }
        return index;
    }
}