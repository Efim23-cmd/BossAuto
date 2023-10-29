class InteractiveBar {
    static Start() {
        InteractiveBar.SetEvents();
    }
    static SetEvents() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        window === null || window === void 0 ? void 0 : window.addEventListener("DOMContentLoaded", function () {
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
        (_a = InteractiveBar.menuBar) === null || _a === void 0 ? void 0 : _a.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = true;
            }
        });
        (_b = InteractiveBar.menuBar) === null || _b === void 0 ? void 0 : _b.addEventListener("transitionend", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = false;
            }
            InteractiveBar.isRun = false;
        });
        (_c = InteractiveBar.mapBar) === null || _c === void 0 ? void 0 : _c.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = true;
            }
        });
        (_d = InteractiveBar.mapBar) === null || _d === void 0 ? void 0 : _d.addEventListener("transitionend", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = false;
            }
        });
        (_e = InteractiveBar.changeBarText) === null || _e === void 0 ? void 0 : _e.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = true;
            }
        });
        (_f = InteractiveBar.changeBarText) === null || _f === void 0 ? void 0 : _f.addEventListener("transitionend", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = false;
            }
        });
        (_g = InteractiveBar.changeBarImg) === null || _g === void 0 ? void 0 : _g.addEventListener("transitionstart", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = true;
            }
        });
        (_h = InteractiveBar.changeBarImg) === null || _h === void 0 ? void 0 : _h.addEventListener("transitionend", (event) => {
            if (event.propertyName == "left") {
                InteractiveBar.isRun = false;
            }
        });
        (_j = InteractiveBar.textSubmit) === null || _j === void 0 ? void 0 : _j.addEventListener("click", () => {
            InteractiveBar.RemoveActive();
        });
        (_k = InteractiveBar.imgSubmit) === null || _k === void 0 ? void 0 : _k.addEventListener("click", () => {
            InteractiveBar.RemoveActive();
        });
        (_l = InteractiveBar.btn_change) === null || _l === void 0 ? void 0 : _l.addEventListener("click", () => {
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
            back === null || back === void 0 ? void 0 : back.addEventListener("click", (e) => {
                InteractiveBar.RemoveActive();
            });
        });
        InteractiveBar.changeable_ImgBlocks.forEach((changeBlock) => {
            changeBlock === null || changeBlock === void 0 ? void 0 : changeBlock.addEventListener("click", () => {
                if (!InteractiveBar.isRun && InteractiveBar.isMod) {
                    InteractiveBar.IsActive = true;
                    InteractiveBar.button_burger.classList.add("active");
                    InteractiveBar.changeBarImg.classList.add("active");
                }
            });
        });
        InteractiveBar.changeabled_TextBlocks.forEach((changeBlock) => {
            changeBlock === null || changeBlock === void 0 ? void 0 : changeBlock.addEventListener("click", () => {
                if (!InteractiveBar.isRun && InteractiveBar.isMod) {
                    InteractiveBar.IsActive = true;
                    InteractiveBar.button_burger.classList.add("active");
                    InteractiveBar.changeBarText.classList.add("active");
                }
            });
        });
        (_m = InteractiveBar.button_burger) === null || _m === void 0 ? void 0 : _m.addEventListener("click", () => {
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
        (_o = InteractiveBar.button_map) === null || _o === void 0 ? void 0 : _o.addEventListener("mousedown", () => {
            if (!InteractiveBar.isRun && document.documentElement.offsetWidth <= 1100) {
                InteractiveBar.IsActive = true;
                InteractiveBar.mapBar.classList.add("active");
                InteractiveBar.button_burger.classList.add("active");
            }
        });
        (_p = InteractiveBar.button_map) === null || _p === void 0 ? void 0 : _p.addEventListener("touchstart", () => {
            if (!InteractiveBar.isRun && document.documentElement.offsetWidth <= 1100) {
                InteractiveBar.IsActive = true;
                InteractiveBar.mapBar.classList.add("active");
                InteractiveBar.button_burger.classList.add("active");
            }
        });
        InteractiveBar.linksMenuBar.forEach((link) => {
            link === null || link === void 0 ? void 0 : link.addEventListener("click", () => {
                if (!InteractiveBar.isRun) {
                    InteractiveBar.RemoveActive();
                }
            });
        });
    }
    static RemoveActive() {
        var _a, _b;
        InteractiveBar.menuBar.classList.remove("active");
        InteractiveBar.button_burger.classList.remove("active");
        InteractiveBar.mapBar.classList.remove("active");
        (_a = InteractiveBar.changeBarText) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
        (_b = InteractiveBar.changeBarImg) === null || _b === void 0 ? void 0 : _b.classList.remove("active");
        InteractiveBar.IsActive = false;
    }
}
InteractiveBar.IsActive = true;
InteractiveBar.isMod = false;
InteractiveBar.isRun = false;
InteractiveBar.menuBar = document.getElementById("menuBar");
InteractiveBar.mapBar = document.getElementById("mapBar");
InteractiveBar.changeBarText = document.getElementById("changeBarText");
InteractiveBar.changeBarImg = document.getElementById("changeBarImg");
InteractiveBar.changeabled_TextBlocks = Array.from(document.getElementsByClassName("changeBlockText"));
InteractiveBar.changeable_ImgBlocks = Array.from(document.getElementsByClassName("changeBlockImg"));
InteractiveBar.buttons_back = Array.from(document.getElementsByClassName("btn_back"));
InteractiveBar.button_burger = document.getElementById("burger");
InteractiveBar.button_map = document.getElementById("map");
InteractiveBar.linksMenuBar = Array.from(document.getElementsByClassName("link_menuBar"));
InteractiveBar.imgSubmit = document.querySelector("#changeBarImg input[type='submit']");
InteractiveBar.textSubmit = document.querySelector("#changeBarText input[type='submit']");
InteractiveBar.btn_change = document.getElementById("btn_change");
export default InteractiveBar;
//# sourceMappingURL=InteractiveBar.js.map