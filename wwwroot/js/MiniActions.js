/*Animation for link of navbar*/
let animatedLinks = Array.from(document.getElementsByClassName("animateLink"));

for (let animateLink of animatedLinks) {
    animateLink?.addEventListener("mousemove", (e) => {
        let widthElement = e.target.offsetWidth;
        let mousePosX = e.offsetX; 
        e.target.style.backgroundPositionX = `${(mousePosX / widthElement).toFixed(2) * 100}%`;
    });
}

/*LoadBlock*/
let loadPage = document.getElementById("loadBlock");
let moveBlock = document.getElementById("moveBlock");
window?.addEventListener("DOMContentLoaded", function () {
    loadPage.style.opacity = "0";
    moveBlock.style.top = "-5vw";
    setTimeout(function () {
        loadPage.style.display = "none";
    }, 300);

    GenerateLoadingBlocks("loading");

    let images = Array.from(document.querySelectorAll("img"));

    images.forEach(image => {
        image.src = image.getAttribute("data-src");
        image.addEventListener("load", () => {
            if (image.parentElement.lastElementChild.classList.contains("load")) {
                image.parentElement.removeChild(image.parentElement.lastElementChild);
            }
        });
    });
});


function GenerateLoadingBlocks(name) {
    let blocks = Array.from(document.getElementsByClassName(name));

    for (let index = 0; index < blocks.length; index++) {
        let loadingPage = document.createElement("div");
        loadingPage.setAttribute("class", "load");
        loadingPage.innerHTML = '<div class="loader"></div>';
        blocks[index].appendChild(loadingPage);
    }
}

/*welcome*/
let welcome = document.getElementById("welcome");
let now = new Date().getHours();
function SetTimeNow() {
    if (now >= 22 && now < 5) {
        welcome.textContent = "Доброй ночи"
    }
    else if (now >= 5 && now < 9) {
        welcome.textContent = "Доброе утро!"
    }
    else if (now >= 9 && now < 17) {
        welcome.textContent = "Добрый день!"
    }
    else {
        welcome.textContent = "Добрый вечер!"
    }
}
SetTimeNow();

let button_map = document.getElementById("map");

function SetCloneMap() {
    let cloneMap = document.createElement("div");
    cloneMap.innerHTML = button_map.innerHTML;
    mapBar.appendChild(cloneMap);
}
SetCloneMap();

