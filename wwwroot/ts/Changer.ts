import InteractiveBar from "./InteractiveBar.js";

class ChangerImg
{
    private currentObj: HTMLImageElement;
    private currentSelectedImg;
    private currentFile;
    private changeable_ImgBlocks;

    private imgArea = <HTMLImageElement>document.getElementById("imgArea");
    private imgNewArea = <HTMLImageElement>document.getElementById("imgNewArea");
    private newImageFile = <HTMLFormElement>document.getElementById("newImageFile");
    private imgSubmit = document.getElementById("imgSubmit");
    private imgReset = document.getElementById("imgReset");

    public constructor(changeabled_ImgNameBlocks: string) {
        this.changeable_ImgBlocks = Array.from(document.getElementsByClassName(changeabled_ImgNameBlocks));
    }

    public Start() {
        this.SetEvents();
    }

    private SetEvents() {

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

    private SetImgContentAtArea(target: HTMLImageElement) {
        this.imgArea.src = target.src;
    }

    private ResetBar() {
        this.imgNewArea.src = "";
        this.currentFile = undefined;
        this.currentSelectedImg = undefined;
    }

    private SetImgContentAtNewArea(selectFile) {
        if (selectFile.size > 0 && selectFile.type.indexOf("image") >= 0) {
            let img = new Image();
            img.src = URL.createObjectURL(selectFile);
            this.imgNewArea.src = img.src;
            this.currentSelectedImg = img;
        }
    }

    private ChangeImgContentAtClient(target: HTMLImageElement) {
        if (this.currentFile.size > 0 && this.currentFile.type.indexOf("image") >= 0) {
            target.src = this.currentSelectedImg.src;
        }
    }

    private async ChangeImgContentAtServer() {
        if (this.currentFile.size > 0 && this.currentFile.type.indexOf("image") >= 0) {
            const formData = new FormData();
            formData.append("id", this.currentObj.id);
            formData.append('image', this.currentFile);
            let myFetch = await fetch(`/Admin/SetImg`, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: formData,
                keepalive: true
            });
            let response = await myFetch.json();
            if (myFetch.ok) {
                console.log(`%c${response}`, "color: green");
            }
            else {
                setTimeout(() => {
                    alert(response);
                }, 1000)
            }
        }
    }
}

class ChangerText
{
    private currentObj;
    private changeabled_TextBlocks;

    private textArea = <HTMLFormElement>document.getElementById("textArea");
    private textSubmit = document.getElementById("textSubmit");
    private textReset = document.getElementById("textReset");

    public constructor(changeabled_TextNameBlocks: string) {
        this.changeabled_TextBlocks = Array.from(document.getElementsByClassName(changeabled_TextNameBlocks));
    }

    public Start() {
        this.SetEvents();
    }

    private SetEvents() {
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

    private ResetBar() {
        this.textArea.value = "";
    }

    private ChangeTextContentAtClient(target: HTMLElement) {
        target.innerHTML = this.textArea.value == "" ? "<h3>Suck my Linux, нигер!</h3>" : this.textArea.value;
    }

    private SetTextContentAtArea(target: HTMLElement) {
        this.textArea.value = target.innerHTML;
    }

    private async ChangeTextContentAtServer() {
        const formData = new FormData();
        formData.set("id", this.currentObj.id);
        formData.set("text", this.textArea.value == "" ? "<h3>Suck my Linux, нигер!</h3>" : this.textArea.value);
        let myFetch = await fetch(`/Admin/SetText`, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: formData,
            keepalive: true
        });
        let response = await myFetch.json();
        if (myFetch.ok) {
            console.log(`%c${response}`, "color: green");
        }
        else {
            setTimeout(() => {
                alert(response);
            }, 1000)
        }
    }
}

new ChangerText("changeBlockText").Start();
new ChangerImg("changeBlockImg").Start();