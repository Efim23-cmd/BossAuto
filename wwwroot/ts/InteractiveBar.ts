
export default class InteractiveBar {

    public static IsActive: boolean = true;

    public static isMod: boolean = false;
    private static isRun: boolean = false;

    private static menuBar = document.getElementById("menuBar");
    private static mapBar = document.getElementById("mapBar");
    private static changeBarText = document.getElementById("changeBarText");
    private static changeBarImg = document.getElementById("changeBarImg");

    private static changeabled_TextBlocks = Array.from(document.getElementsByClassName("changeBlockText"));
    private static changeable_ImgBlocks = Array.from(document.getElementsByClassName("changeBlockImg"));

    private static buttons_back = Array.from(document.getElementsByClassName("btn_back"));

    private static button_burger = document.getElementById("burger");
    private static button_map = document.getElementById("map");
    private static linksMenuBar = Array.from(document.getElementsByClassName("link_menuBar"));

    private static imgSubmit = document.querySelector("#changeBarImg input[type='submit']");

    private static textSubmit = document.querySelector("#changeBarText input[type='submit']");

    private static btn_change = document.getElementById("btn_change");

    public static Start() {
        InteractiveBar.SetEvents();
    }
    public static SetEvents() {

        window?.addEventListener("DOMContentLoaded", function () {
            setTimeout(function () {
                InteractiveBar.IsActive = false;
            }, 300);
        });

        window.addEventListener("keydown", (event) => {
            if (event.key == "Escape" && !InteractiveBar.isRun) {
                InteractiveBar.RemoveActive();
                InteractiveBar.IsActive = false;
            }
        });

        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 77 && !InteractiveBar.isRun) {
                if (!InteractiveBar.isRun && document.documentElement.offsetWidth <= 1100) {
                    if (!InteractiveBar.IsActive) {
                        InteractiveBar.IsActive = true;
                        InteractiveBar.mapBar.classList.add("active");
                        InteractiveBar.button_burger.classList.add("active");
                    }
                    else {
                        InteractiveBar.RemoveActive();
                        InteractiveBar.IsActive = false;
                    }
                }
            }
        });

        window.addEventListener("resize", () => {
            if (document.documentElement.offsetWidth > 1100) {
                InteractiveBar.RemoveActive();
                InteractiveBar.IsActive = false;
            }
        });

        InteractiveBar.menuBar?.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = true;
            }
        });
        InteractiveBar.menuBar?.addEventListener("transitionend", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = false;
            }
            InteractiveBar.isRun = false;
        });
        InteractiveBar.mapBar?.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = true;
            }
        });
        InteractiveBar.mapBar?.addEventListener("transitionend", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = false;
            }
        });
        InteractiveBar.changeBarText?.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = true;
            }
        });
        InteractiveBar.changeBarText?.addEventListener("transitionend", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = false;
            }
        });

        InteractiveBar.changeBarImg?.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = true;
            }
        });
        InteractiveBar.changeBarImg?.addEventListener("transitionend", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = false;
            }
        });

        InteractiveBar.textSubmit?.addEventListener("click", () => {
            InteractiveBar.RemoveActive();
        });
        InteractiveBar.imgSubmit?.addEventListener("click", () => {
            InteractiveBar.RemoveActive();
        });

        InteractiveBar.btn_change?.addEventListener("click", () => {
            if (InteractiveBar.isMod) {
                InteractiveBar.btn_change.classList.remove("active");
                InteractiveBar.isMod = false;
            }
            else {
                InteractiveBar.btn_change.classList.add("active");
                InteractiveBar.isMod = true;
            }
        });

        InteractiveBar.buttons_back.forEach(back => {
            back?.addEventListener("click", (e) => {
                InteractiveBar.RemoveActive();
            })
        });


        InteractiveBar.changeable_ImgBlocks.forEach((changeBlock) => {
            changeBlock?.addEventListener("click", () => {
                if (!InteractiveBar.isRun && InteractiveBar.isMod) {
                    InteractiveBar.IsActive = true;
                    InteractiveBar.button_burger.classList.add("active");
                    InteractiveBar.changeBarImg.classList.add("active");
                }
            });
        });

        InteractiveBar.changeabled_TextBlocks.forEach((changeBlock) => {
            changeBlock?.addEventListener("click", () => {
                if (!InteractiveBar.isRun && InteractiveBar.isMod) {
                    InteractiveBar.IsActive = true;
                    InteractiveBar.button_burger.classList.add("active");
                    InteractiveBar.changeBarText.classList.add("active");
                }
            });
        });

        InteractiveBar.button_burger?.addEventListener("click", () => {
            if (!InteractiveBar.isRun) {
                if (InteractiveBar.IsActive) {
                    InteractiveBar.RemoveActive();
                }
                else {
                    InteractiveBar.menuBar.classList.add("active");
                    InteractiveBar.button_burger.classList.add("active");
                    InteractiveBar.IsActive = true;
                }
            }
        });

        InteractiveBar.button_map?.addEventListener("mousedown", () => {
            if (!InteractiveBar.isRun && document.documentElement.offsetWidth <= 1100) {
                InteractiveBar.IsActive = true;
                InteractiveBar.mapBar.classList.add("active");
                InteractiveBar.button_burger.classList.add("active");
            }
        });
        InteractiveBar.button_map?.addEventListener("touchstart", () => {
            if (!InteractiveBar.isRun && document.documentElement.offsetWidth <= 1100) {
                InteractiveBar.IsActive = true;
                InteractiveBar.mapBar.classList.add("active");
                InteractiveBar.button_burger.classList.add("active");
            }
        });

        InteractiveBar.linksMenuBar.forEach((link) => {
            link?.addEventListener("click", () => {
                if (!InteractiveBar.isRun) {
                    InteractiveBar.RemoveActive();
                }
            });
        })
    }
    private static RemoveActive() {
        InteractiveBar.menuBar.classList.remove("active");
        InteractiveBar.button_burger.classList.remove("active");
        InteractiveBar.mapBar.classList.remove("active");
        InteractiveBar.changeBarText?.classList.remove("active");
        InteractiveBar.changeBarImg?.classList.remove("active");
        InteractiveBar.IsActive = false;
    }
}