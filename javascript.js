let Timer = document.getElementById("timer");
let quote = document.getElementById("quoteDisplay");
let Result = document.getElementById("result");
let textarea = document.getElementById("quoteInput");
let submit = document.getElementById("submitBtn");
let reset = document.getElementById("resetBtn");
let id = null;
let spin = document.getElementById("spinner");
let startTime = null;

function start() {

    clearInterval(id);
    spin.classList.remove("d-none");

    startTime = new Date().getTime();

    id = setInterval(function () {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        Timer.textContent = elapsedTime + " seconds";
    }, 1000);

    let options = {
        method: "GET",
    };

    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            quote.textContent = data.content;
        });
}

submit.addEventListener("click", function (event) {
    event.preventDefault();
    if (textarea.value === quote.textContent) {
        Result.textContent = "You typed in " + Timer.textContent;
        clearInterval(id);
    } else {
        Result.textContent = "You typed an incorrect sentence";
    }
});

reset.addEventListener("click", function (event) {
    event.preventDefault();
    // Check if spinner is visible before hiding
    if (!spin.classList.contains("d-none")) {
        spin.classList.add("d-none");
    }
    Result.textContent = "";
    clearInterval(id);
    start();
});

start();
