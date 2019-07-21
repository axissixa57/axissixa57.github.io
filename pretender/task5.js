const names = ["Geraldine", "Lance", "Georgetta", "Brigette", "Temeka", "Amelia", "Taneka", "Romana"];
const surnames = ["Verhey", "Grosse", "Morquecho", "Kamps", "Guilbault", "Collier", "Obermiller", "Allgood"];

let leftSide = document.getElementsByClassName("left-side");
let rightSide = document.getElementsByClassName("right-side");

let dislike = document.getElementById("dislike");
let like = document.getElementById("like");
let person = document.getElementById("person");

let id = 0;
let img = document.getElementsByTagName("img");

function tinder() {
    let obj = {};

    const rName = Math.floor((Math.random() * 7) + 1);
    const rSurname = Math.floor((Math.random() * 7) + 1);
    img[0].src = `https://thispersondoesnotexist.com/image?${id}`;
    img[0].addEventListener('load', () => {
        person.innerHTML = `${names[rName]} ${surnames[rSurname]}`;
        id++;

        if (JSON.parse(localStorage.getItem(id)) != null) {
            let objOfRaiting = JSON.parse(localStorage.getItem(`${id}`));
            dislike.innerHTML = objOfRaiting.countOfDislikes;
            like.innerHTML = objOfRaiting.countOfLikes;
            obj.countOfDislikes = objOfRaiting.countOfDislikes;
            obj.countOfLikes = objOfRaiting.countOfLikes;
        } else {
            obj.countOfDislikes = 0;
            obj.countOfLikes = 0;
            dislike.innerHTML = obj.countOfDislikes;
            like.innerHTML = obj.countOfLikes;
        }

        leftSide[0].addEventListener("click", function () {
            obj.countOfDislikes++;
            dislike.innerHTML = obj.countOfDislikes;
            localStorage.setItem(`${id}`, JSON.stringify(obj));
        });

        rightSide[0].addEventListener("click", function () {
            obj.countOfLikes++;
            like.innerHTML = obj.countOfLikes;
            localStorage.setItem(`${id}`, JSON.stringify(obj));
        });
    })
};

tinder();

let timer = setInterval(tinder, 2000);
