const container = document.getElementById("section-questionnaire");
const counterContainer = document.getElementById("question-number");

const messageContainer = document.querySelector(".header__message");
const textContainer = document.querySelector(".header__text");

const spinnerContainer = document.querySelector(".spinner");
const wrapperContainer = document.querySelector(".wrapper");

const form = document.getElementById("age-form");

let age;

function switchQuestions(currentElem) {
    const nextQuestion = Number(currentElem.getAttribute("data-question")) + 1;

    if (nextQuestion === 6) {
        window.location.pathname = '/pages/result.html';
        return;
    }

    const nextElem = container.querySelector(`[data-question="${nextQuestion}"]`);

    currentElem.setAttribute("hidden", true);
    nextElem.setAttribute("hidden", false);
    counterContainer.innerText = nextQuestion;

    if (nextQuestion === 3) {
        textContainer.innerHTML = "Уже совсем скоро&nbsp;Вы узнаете много интересного о&nbsp;своем будущем!";
    }

    if (nextQuestion === 4) {
        textContainer.innerHTML = "Смерть родного человека&nbsp;&mdash; одно из&nbsp;тяжелейших испытаний в&nbsp;жизни каждого из&nbsp;нас!";
    }

    if (nextQuestion === 5) {
        textContainer.setAttribute("hidden", true);

        if (age <= 35) {
            messageContainer.innerHTML = "По&nbsp;вам скучает очень близкий человек, которого " +
            "больше нет в&nbsp;мире живых."
            messageContainer.parentElement.setAttribute("hidden", false);
            return;
        }
        if (age <= 45) {
            messageContainer.innerHTML = "По&nbsp;вам скучает очень близкий человек, которого " + 
            "больше нет в&nbsp;мире живых. Возможно это дедушка или бабушка."
            messageContainer.parentElement.setAttribute("hidden", false);
            return;
        }
        messageContainer.innerHTML = "По&nbsp;вам скучает очень близкий человек, которого " + 
            "больше нет в&nbsp;мире живых. Возможно это кто-то из&nbsp;Ваших родителей."
        messageContainer.parentElement.setAttribute("hidden", false);
    }
}

function clickHandler() {
    container.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-action") === "forward"){
            const currentElem = event.target.closest("[data-question]");
            switchQuestions(currentElem);
        }
    }); 
}

function validateSelects(selectsArray) {
    let count = 0;
    selectsArray.forEach(select => {
        console.log(select)
        select.classList.remove("select-error");
        if (select.value === "no") {
            count++;
            select.classList.add("select-error");
        }
    })

    return count === 0;
}

function onSubmit() {
    form.onsubmit = (event) => {
        event.preventDefault();

        const isValid = validateSelects([form.day, form.month, form.year]);

        if (!isValid) {
            return;
        }

        spinnerContainer.setAttribute("hidden", false);
        wrapperContainer.setAttribute("hidden", true);
        setTimeout(() => {
            spinnerContainer.setAttribute("hidden", true);
            wrapperContainer.setAttribute("hidden", false);
        }, 2000);
        
        const day = form.day.value;
        const month = form.month.value;
        const year = form.year.value;
        const date = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        const diff = currentDate - date;
        const diffdays = diff/1000/(60*60*24);
        age = Math.floor(diffdays/365.25);

        const currentElem = form.closest("[data-question]");
        switchQuestions(currentElem);
    }
}


clickHandler();
onSubmit();
