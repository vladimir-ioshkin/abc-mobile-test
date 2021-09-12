function clickHandler() {
    const container = document.getElementById("main-wrapper");

    container.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-action") === "forward"){
            window.location.pathname = '/pages/questionnaire.html';
        }
    }); 
}

clickHandler();
