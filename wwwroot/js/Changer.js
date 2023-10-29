var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import InteractiveBar from "./InteractiveBar.js";
class ChangerImg {
    constructor(changeabled_ImgNameBlocks) {
        this.imgArea = document.getElementById("imgArea");
        this.imgNewArea = document.getElementById("imgNewArea");
        this.newImageFile = document.getElementById("newImageFile");
        this.imgSubmit = document.getElementById("imgSubmit");
        this.imgReset = document.getElementById("imgReset");
        this.changeable_ImgBlocks = Array.from(document.getElementsByClassName(changeabled_ImgNameBlocks));
    }
    Start() {
        this.SetEvents();
    }
    SetEvents() {
        this.changeable_ImgBlocks.forEach((changeBlock) => {
            changeBlock.addEventListener("click", () => {
                if (InteractiveBar.isMod) {
                    this.currentObj = changeBlock;
                    this.SetImgContentAtArea(this.currentObj);
                    this.ResetBar();
                }
            });
        });
        this.imgReset.addEventListener("click", (e) => {
            e.preventDefault();
            this.ResetBar();
        });
        this.newImageFile.addEventListener("change", (event) => {
            this.currentFile = this.newImageFile.files[0];
            this.SetImgContentAtNewArea(this.currentFile);
        });
        this.imgSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.currentFile != undefined) {
                this.ChangeImgContentAtClient(this.currentObj);
                this.ChangeImgContentAtServer();
            }
        });
    }
    SetImgContentAtArea(target) {
        this.imgArea.src = target.src;
    }
    ResetBar() {
        this.imgNewArea.src = "";
        this.currentFile = undefined;
        this.currentSelectedImg = undefined;
    }
    SetImgContentAtNewArea(selectFile) {
        if (selectFile.size > 0 && selectFile.type.indexOf("image") >= 0) {
            let img = new Image();
            img.src = URL.createObjectURL(selectFile);
            this.imgNewArea.src = img.src;
            this.currentSelectedImg = img;
        }
    }
    ChangeImgContentAtClient(target) {
        if (this.currentFile.size > 0 && this.currentFile.type.indexOf("image") >= 0) {
            target.src = this.currentSelectedImg.src;
        }
    }
    ChangeImgContentAtServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentFile.size > 0 && this.currentFile.type.indexOf("image") >= 0) {
                const formData = new FormData();
                formData.append("id", this.currentObj.id);
                formData.append('image', this.currentFile);
                let myFetch = yield fetch(`/Admin/SetImg`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json"
                    },
                    body: formData
                });
                let response = yield myFetch.json();
                if (myFetch.ok) {
                    console.log(`%c${response}`, "color: green");
                }
                else {
                    setTimeout(() => {
                        alert(response);
                    }, 1000);
                }
            }
        });
    }
}
class ChangerText {
    constructor(changeabled_TextNameBlocks) {
        this.textArea = document.getElementById("textArea");
        this.textSubmit = document.getElementById("textSubmit");
        this.textReset = document.getElementById("textReset");
        this.changeabled_TextBlocks = Array.from(document.getElementsByClassName(changeabled_TextNameBlocks));
    }
    Start() {
        this.SetEvents();
    }
    SetEvents() {
        this.changeabled_TextBlocks.forEach((changeBlock) => {
            changeBlock.addEventListener("click", () => {
                if (InteractiveBar.isMod) {
                    this.currentObj = changeBlock;
                    this.SetTextContentAtArea(changeBlock);
                }
            });
        });
        this.textReset.addEventListener("click", (e) => {
            e.preventDefault();
            this.ResetBar();
        });
        this.textSubmit.addEventListener("click", (e) => {
            this.ChangeTextContentAtClient(this.currentObj);
            this.ChangeTextContentAtServer();
        });
    }
    ResetBar() {
        this.textArea.value = "";
    }
    ChangeTextContentAtClient(target) {
        target.innerHTML = this.textArea.value == "" ? "<h3>Suck my Linux, нигер!</h3>" : this.textArea.value;
    }
    SetTextContentAtArea(target) {
        this.textArea.value = target.innerHTML;
    }
    ChangeTextContentAtServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.set("id", this.currentObj.id);
            formData.set("text", this.textArea.value == "" ? "<h3>Suck my Linux, нигер!</h3>" : this.textArea.value);
            let myFetch = yield fetch(`/Admin/SetText`, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData
            });
            let response = yield myFetch.json();
            if (myFetch.ok) {
                console.log(`%c${response}`, "color: green");
            }
            else {
                setTimeout(() => {
                    alert(response);
                }, 1000);
            }
        });
    }
}
new ChangerText("changeBlockText").Start();
new ChangerImg("changeBlockImg").Start();
//# sourceMappingURL=Changer.js.map