const recordingContainer = document.querySelector(".recording");
const wrapperContainer = document.querySelector(".wrapper");
const percentContainer = document.getElementById("recording-counter");


function getRecord() {
    let percent = 0;

    const id = setInterval(() => {
        if (percent === 100) {
            recordingContainer.setAttribute("hidden", true);
            wrapperContainer.setAttribute("hidden", false);
            clearInterval(id);
            return;
        }

        percent++;
        percentContainer.innerText = percent;
    }, 50);
}


const url = "https://swapi.dev/api/people/1/";
const map = {
    height: "Height",
    mass: "Mass",
    hair_color: "Hair color",
    skin_color: "Skin color",
    eye_color: "Eye Color",
    birth_year: "Birth Year",
    gender: "Gender",
};

function showInfo(data) {
    const container = document.getElementById("star-wars-info");

    const { name, ...otherData } = data;

    const title = `<h2 class="star-wars__title">${name}</h2>`;

    let info = '';
    for (let key in otherData) {
        if (!map[key]) {
            continue;
        }

        info = info.concat(`<li class="star-wars__elem">${map[key]}: ${otherData[key]}</li>`)
    }

    container.innerHTML = `${title}<ul>${info}</ul>`;
}

function getData() {
    const btn = document.getElementById("result-call");

    function callback() {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                showInfo(result);
            });
    }

    btn.addEventListener("click", callback);
}

getRecord();
getData();


