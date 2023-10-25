const langFilePath = "../lang/lang.csv";

var langIcon = document.getElementsByClassName('translate-icon')[0]
var langArray = [];
var age = 0

document.addEventListener("DOMContentLoaded", function () {
    age = calculateAge(new Date(2004, 11, 8))
    loadLang()
})

function loadLang() {
    fetch(langFilePath)
        .then(response => response.text())
        .then(csvText => {
            const lines = csvText.split("\n");

            lines.forEach(line => {
                const fields = line.split(";");
                langArray.push(fields);
            });

            let langID = localStorage.getItem("lang")

            if (langID == null) {
                let userLang = navigator.language || navigator.userLanguage;

                if (userLang.includes("es")) {
                    langID = 3
                    langIcon.src = "../imgs/lang/arg.png"
                }
                else {
                    langID = 2
                    langIcon.src = "../imgs/lang/us.png"
                }

                localStorage.setItem("lang", langID);
            }
            else {
                if (langID == 3) {
                    langIcon.src = "../imgs/lang/arg.png"
                }
                else {
                    langIcon.src = "../imgs/lang/us.png"
                }
            }

            translateText()
        })
        .catch(error => {
            console.error("Error loading CSV file:", error);
        });
}

function translateText() {

    langArray[4][2] = langArray[4][2].replace("${age}", age);
    langArray[4][3] = langArray[4][3].replace("${age}", age);

    let langID = localStorage.getItem("lang")

    for (let i = 0; i < langArray.length; i++) {
        let currentID = langArray[i][0];

        if (currentID == "") {
            continue
        }

        let elements = document.getElementsByClassName(currentID);

        switch (langArray[i][1]) {
            case "":
                for (let j = 0; j < elements.length; j++) {
                    elements[j].innerHTML = langArray[i][langID];
                }
                break;
            case "placeholder":
                for (let j = 0; j < elements.length; j++) {
                    elements[j].placeholder = langArray[i][langID];
                }
                break;
            case "value":
                for (let j = 0; j < elements.length; j++) {
                    elements[j].value = langArray[i][langID];
                }
                break;
        }
    }
}

function manualTranslation() {

    let langID = localStorage.getItem("lang")

    if (langID == 2) {
        langID = 3
        langIcon.src = "../imgs/lang/arg.png"
    }
    else {
        langID = 2
        langIcon.src = "../imgs/lang/us.png"
    }

    localStorage.setItem("lang", langID);

    translateText()
}

function calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}