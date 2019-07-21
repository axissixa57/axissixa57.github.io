function proxyFetch(url, params) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    return fetch(proxyUrl + url, params);
}

async function getRandomName() {
    const response = await proxyFetch('http://names.drycodes.com/1?combine=2&separator=space');
    const [name] = await response.json();
    return name;
}

getRandomName() 

async function getRandomAnimalImage(kind) {
    const response = await proxyFetch(`https://some-random-api.ml/img/${kind}`);
    const { link } = await response.json();
    return link;
}

async function getRandomAnimalFact(kind) {
    const response = await proxyFetch(`https://some-random-api.ml/facts/${kind}`);
    const { fact } = await response.json();
    return fact;
}

async function getRuTranslate(textEN) {
    const apiKey = 'trnsl.1.1.20190514T093202Z.dfe60581071f8355.0297f4f0d00513d81d658168f519f65b59dc9a9a';
    const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=${apiKey}&text=${textEN}`);
    const { text: [result] } = await response.json();
    return result;
}

async function showAnimal(kind) {
    while (document.body.firstElementChild) {
        document.body.removeChild(document.body.firstElementChild);
    }
    const container = document.createElement('div');
    container.classList.add('animal');
    const reloadButton = document.createElement('button');
    reloadButton.classList.add('reload');
    const image = document.createElement('img');
    image.src = await getRandomAnimalImage(kind);
    const paragraphEN = document.createElement('p');
    const paragraphRU = document.createElement('p');
    paragraphEN.textContent = await getRandomAnimalFact(kind);
    paragraphRU.textContent = await getRuTranslate(paragraphEN.textContent);
    reloadButton.addEventListener('click', async function () {
        const link = await getRandomAnimalImage(kind);
        const textEN = await getRandomAnimalFact(kind);
        const textRU = await getRuTranslate(textEN);
        image.src = link;
        image.onload = () => {
            paragraphEN.textContent = textEN;
            paragraphRU.textContent = textRU;
        };
    });
    container.appendChild(image);
    container.appendChild(paragraphEN);
    container.appendChild(paragraphRU);
    container.appendChild(reloadButton);
    document.body.appendChild(container);
}

async function selectAnimal() {
    document.body.innerHTML =
        `<div class="select">
        <p>А на чьей стороне ты?</p>
        <ul>
          <li>Коты</li>
          <li>Собаки</li>
          <li>Лисы</li>
        </ul>
      </div>`;
    const items = document.querySelectorAll('.select ul > li');
    const animals = ['cat', 'dog', 'fox'];
    for (let i = 0; i < items.length; ++i) {
        items[i].addEventListener('click', async function () {
            await showAnimal(animals[i]);
        });
    }
}

async function initGreeting() {
    const name = await getRandomName();
    const text = document.createElement('div');
    text.classList.add('welcome');
    text.innerHTML =
        `<p>Добро пожаловать, странник!</p>
       <p>Я буду звать тебя <span class="name">${name}</span>, ок?</p>`;
    const buttons = document.createElement('div');
    const okButton = document.createElement('button');
    okButton.classList.add('button');
    okButton.textContent = 'Ладно...';
    const noButton = document.createElement('button');
    noButton.classList.add('button');
    noButton.textContent = 'А может не надо?..';
    buttons.appendChild(okButton);
    buttons.appendChild(noButton);
    document.body.appendChild(text);
    document.body.appendChild(buttons);
    okButton.addEventListener('click', selectAnimal);
    noButton.addEventListener('click', async function () {
        const newName = await getRandomName();
        text.innerHTML = `<p>Хм... Тогда что насчёт</p><p><span class="name">${newName}</span>?</p>`;
    });
}

initGreeting();

// =========================================  XMLHttpRequest  =============================================

// const urls = ['https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/834463/', 'https://picsum.photos/v2/list', 'https://api.punkapi.com/v2/beers?page=1&per_page=10', 'https://api.opendota.com/api/heroes', 'https://cors-anywhere.herokuapp.com/https://anapioficeandfire.com/api/characters/583'];
//
// Without callbacks
// for (let i = 0; i < urls.length; i++) {
//     const url = urls[i];

//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", url, true);
//     xhttp.onload = function () {
//         if (xhttp.readyState === 4) {
//             if (xhttp.status === 200) {
//                 const data = JSON.parse(xhttp.responseText);
//                 console.log(data);
//             } else {
//                 console.error(xhttp.statusText);
//             }
//         }
//     };
//     xhttp.onerror = function () {
//         console.error(xhttp.statusText);
//     };
//     xhttp.send();
// }

// ===================================  Callbacks (v1)  ================================================

// function request(callback) {
//     for (let i = 0; i < urls.length; i++) {
//         const url = urls[i];

//         const xhttp = new XMLHttpRequest();
//         xhttp.open("GET", url, true);
//         xhttp.onload = function () {
//             if (xhttp.readyState === 4) {
//                 if (xhttp.status === 200) {
//                     const data = JSON.parse(xhttp.responseText);
//                     callback(data);
//                 } else {
//                     console.error(xhttp.statusText);
//                 }
//             }
//         };
//         xhttp.onerror = function () {
//             console.error(xhttp.statusText);
//         };
//         xhttp.send();
//     }
// } 
// request((data) => console.log(data));

// ===================================  Callbacks (v2)  ================================================

// function request(callbackA) {
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/834463/', true);
//     xhttp.onload = function () {
//         if (xhttp.readyState === 4) {
//             if (xhttp.status === 200) {
//                 const data = JSON.parse(xhttp.responseText);
//                 console.log(data);

//                 callbackA(function getMoreData(callbackC) {
//                     const xhttp = new XMLHttpRequest();
//                     xhttp.open("GET", 'https://api.punkapi.com/v2/beers?page=1&per_page=10', true);
//                     xhttp.onload = function () {
//                         if (xhttp.readyState === 4) {
//                             if (xhttp.status === 200) {
//                                 const data = JSON.parse(xhttp.responseText);
//                                 console.log(data);
//                                 callbackC(function getMoreData() {
//                                     const xhttp = new XMLHttpRequest();
//                                     xhttp.open("GET", 'https://cors-anywhere.herokuapp.com/https://anapioficeandfire.com/api/characters/583', true);
//                                     xhttp.onload = function () {
//                                         if (xhttp.readyState === 4) {
//                                             if (xhttp.status === 200) {
//                                                 const data = JSON.parse(xhttp.responseText);
//                                                 console.log(data);
//                                             } else {
//                                                 console.error(xhttp.statusText);
//                                             }
//                                         }
//                                     };
//                                     xhttp.onerror = function () {
//                                         console.error(xhttp.statusText);
//                                     };
//                                     xhttp.send();
//                                 });
//                             } else {
//                                 console.error(xhttp.statusText);
//                             }
//                         }
//                     };
//                     xhttp.onerror = function () {
//                         console.error(xhttp.statusText);
//                     };
//                     xhttp.send();
//                 });

//             } else {
//                 console.error(xhttp.statusText);
//             }
//         }
//     };
//     xhttp.onerror = function () {
//         console.error(xhttp.statusText);
//     };
//     xhttp.send();
// }

// request(function getData(callbackB) {
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", 'https://picsum.photos/v2/list', true);
//     xhttp.onload = function () {
//         if (xhttp.readyState === 4) {
//             if (xhttp.status === 200) {
//                 const data = JSON.parse(xhttp.responseText);
//                 console.log(data);
//                 callbackB(function getMoreData(callbackD) {
//                     const xhttp = new XMLHttpRequest();
//                     xhttp.open("GET", 'https://api.opendota.com/api/heroes', true);
//                     xhttp.onload = function () {
//                         if (xhttp.readyState === 4) {
//                             if (xhttp.status === 200) {
//                                 const data = JSON.parse(xhttp.responseText);
//                                 console.log(data);
//                                 callbackD();
//                             } else {
//                                 console.error(xhttp.statusText);
//                             }
//                         }
//                     };
//                     xhttp.onerror = function () {
//                         console.error(xhttp.statusText);
//                     };
//                     xhttp.send();
//                 });
//             } else {
//                 console.error(xhttp.statusText);
//             }
//         }
//     };
//     xhttp.onerror = function () {
//         console.error(xhttp.statusText);
//     };
//     xhttp.send();
// });

// ===================================  Promises  ================================================

// function requestPromise(url) {
//     return new Promise((res) => {
//         const xhttp = new XMLHttpRequest();
//         xhttp.open("GET", url, true);
//         xhttp.onload = function () {
//             if (xhttp.readyState === 4) {
//                 if (xhttp.status === 200) {
//                     const data = JSON.parse(xhttp.responseText);
//                     res(data);
//                 }
//             }
//         };

//         xhttp.send();
//     });
// }

// requestPromise('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/834463/')
//     .then(data => {
//         console.log(data);
//         return requestPromise('https://picsum.photos/v2/list');
//     })
//     .then(data => {
//         console.log(data);
//         return requestPromise('https://api.punkapi.com/v2/beers?page=1&per_page=10');
//     })
//     .then(data => {
//         console.log(data);
//         return requestPromise('https://api.opendota.com/api/heroes');
//     })
//     .then(data => {
//         console.log(data);
//         return requestPromise('https://cors-anywhere.herokuapp.com/https://anapioficeandfire.com/api/characters/583');
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(`Error occured: ${err.message}`);
//     });

// ===================================  Async / await  ================================================

function request(url) {
    return new Promise((res) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.onload = function () {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    const data = JSON.parse(xhttp.responseText);
                    res(data);
                }
            }
        };

        xhttp.send();
    });
}

const urls = ['https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/834463/', 'https://picsum.photos/v2/list', 'https://api.punkapi.com/v2/beers?page=1&per_page=10', 'https://api.opendota.com/api/heroes', 'https://cors-anywhere.herokuapp.com/https://anapioficeandfire.com/api/characters/583'];

async function requestPromise(url) {
    const response = await request(url);
    console.log(response);
}

for(let i = 0; i < urls.length; i++) {
    requestPromise(urls[i]);
}


