const divMainArea = document.getElementsByClassName("main-area");
const input = document.querySelectorAll(".answer");
const button = document.getElementById('btn');
const points = document.getElementById("points");
const numOfWords = document.getElementById("numOfWords");
let td = document.getElementsByTagName('td');
let description = document.querySelector('.description > div');

points.innerHTML = 0;
numOfWords.innerHTML = 0;

function generateWord() {
    const puzzle = [["АФЕРИСТ", "Нечестный человек, занимающийся шулерством, махинациями"], ["ИЛЛЮЗИЯ", "Обман чувств, нечто кажущееся"], ["КОМНАТА", "Отдельное помещение для жилья в квартире"], ["СТОЛБЕЦ", "Ряд коротких строк, расположенных одна под другой и образующих колонку"], ["ФИЛОСОФ", "Мыслитель, занятый разработкой вопросов мировоззрения"], ["ФАНАТИК", "Человек, страстно преданный какому-нибудь делу"], ["ХИТРЮГА", "Очень хитрый человек"], ["ЧАРОДЕЙ", "Волшебник, колдун"], ["ЭКВАТОР", "Воображаемый круг, делящий земной шар на северное и южное полушария"], ["ЮМОРИСТ", "Автор юмористических произведений"], ["КОЛОКОЛ", "Металлическое (из меди или медного сплава) изделие в форме полого усечённого конуса с подвешенным внутри стержнем (языком) для звона"], ["БАБУШКА", "Мать отца или матери"], ["ЗАВАРКА", "Чай для заваривания, а также сам заваренный чай"]];
    console.log(puzzle.length);

    const rand = Math.floor((Math.random() * puzzle.length));
    const word = puzzle[rand][0];
    description.innerHTML = puzzle[rand][1];

    for (let i = 0; i < divMainArea[0].children.length; i++) {
        divMainArea[0].children[i].innerHTML = word[i];
    }
    return word;
}

function isFullOpen() {
    let count = 0;
    for (let i = 0; i < divMainArea[0].children.length; i++) {
        if (divMainArea[0].children[i].classList.contains("revealed")) {
            count++;
        }
    }
    if (count == divMainArea[0].children.length) return true;
    else return false;
}

let randWord = generateWord();
let mistakes = 0;

for (let i = 0; i < td.length; i++) {
    td[i].addEventListener('click', () => {
        if (randWord.search(td[i].innerHTML) != -1) {
            td[i].classList.add("green");

            for (let k = 0; k < randWord.length; k++) {
                if (randWord[k] == td[i].innerHTML) {
                    divMainArea[0].children[k].classList.add("revealed");
                }
            }

            if (isFullOpen()) {
                setTimeout(function () {
                    for (let i = 0; i < divMainArea[0].children.length; i++) {
                        divMainArea[0].children[i].classList.remove("revealed");
                    }

                    for (let j = 0; j < td.length; j++) {
                        if (td[j].classList.contains("red")) {
                            td[j].classList.remove("red");
                        } else if (td[j].classList.contains("green")) {
                            td[j].classList.remove("green");
                        }
                    }

                    randWord = generateWord();
                    input[0].value = "";
                }, 3000);
            }
        } else {
            td[i].classList.add("red");
            mistakes++;
        }

    });
}

button.addEventListener("click", function () {
    if (input[0].value.toUpperCase() == randWord) {
        for (let i = 0; i < divMainArea[0].children.length; i++) {
            divMainArea[0].children[i].classList.add("revealed");
        }
        points.innerHTML = (parseInt(points.innerHTML) + 70).toString();
        numOfWords.innerHTML = (parseInt(numOfWords.innerHTML) + 1).toString();
        alert(`Вы угадали! Количество неправильных букв = ${mistakes}`);
        mistakes = 0;
    } else if (input[0].value == "") {
        alert(`Введите слово!`);
    } else {
        alert(`Вы не угадали! Количество неправильных открытых букв = ${mistakes}`);
    }

    if (isFullOpen()) {
        setTimeout(function () {
            for (let i = 0; i < divMainArea[0].children.length; i++) {
                divMainArea[0].children[i].classList.remove("revealed");
            }

            for (let j = 0; j < td.length; j++) {
                if (td[j].classList.contains("red")) {
                    td[j].classList.remove("red");
                } else if (td[j].classList.contains("green")) {
                    td[j].classList.remove("green");
                }
            }

            randWord = generateWord();
            input[0].value = "";
        }, 3000);
    }
});

input[0].addEventListener('input', () => {
    if (input[0].value.toUpperCase() == randWord) {
        for (let i = 0; i < divMainArea[0].children.length; i++) {
            divMainArea[0].children[i].classList.add("revealed");
        }
        points.innerHTML = (parseInt(points.innerHTML) + 70).toString();
        numOfWords.innerHTML = (parseInt(numOfWords.innerHTML) + 1).toString();
        console.log(`Вы угадали! Количество неправильных букв = ${mistakes}`);
        mistakes = 0;
    }

    if (isFullOpen()) {
        setTimeout(function () {
            for (let i = 0; i < divMainArea[0].children.length; i++) {
                divMainArea[0].children[i].classList.remove("revealed");
            }

            for (let j = 0; j < td.length; j++) {
                if (td[j].classList.contains("red")) {
                    td[j].classList.remove("red");
                } else if (td[j].classList.contains("green")) {
                    td[j].classList.remove("green");
                }
            }

            randWord = generateWord();
            input[0].value = "";
        }, 3000);
    }
});












