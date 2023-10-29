import { Tape } from "./Tape.js";
import Slider from "./Slider.js";
import InteractiveBar from "./InteractiveBar.js";
import Scope from "./Scope.js";
class Program {
    static Main() {
        let slider_autosound = new Slider("#autoSoundScreen .slider .container", "#autoSoundScreen .slider .container .slide");
        slider_autosound.Start();
        let slider_alarms = new Slider("#alarmsScreen .slider .container", "#alarmsScreen .slider .container .slide");
        slider_alarms.Start();
        let slider_tinting = new Slider("#tintingScreen .slider .container", "#tintingScreen .slider .container .slide");
        slider_tinting.Start();
        let slider_insulation = new Slider("#insulationScreen .slider .container", "#insulationScreen .slider .container .slide");
        slider_insulation.Start();
        let mainTape = Tape.GetInstance(".screen");
        mainTape.Start();
        InteractiveBar.Start();
        let scopeImg = new Scope("#autoSoundScreen .slider .container", ".slide img");
        scopeImg.Start();
        Array.from(document.getElementsByClassName("main-Link")).forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                mainTape.SetPos(0);
            });
        });
        Array.from(document.getElementsByClassName("AutoSound-Link")).forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                mainTape.SetPos(1);
            });
        });
        Array.from(document.getElementsByClassName("Alarms-Link")).forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                mainTape.SetPos(2);
            });
        });
        Array.from(document.getElementsByClassName("Tinting-Link")).forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                mainTape.SetPos(3);
            });
        });
        Array.from(document.getElementsByClassName("Noise_Insulation-Link")).forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                mainTape.SetPos(4);
            });
        });
    }
}
Program.Main();
//# sourceMappingURL=Main.js.map