const divUP = document.querySelector('.up');
const cirlces = document.querySelectorAll('.circle');
const table = document.querySelector('.right-side table');
const curColor = document.getElementById('cur');
const prevColor = document.getElementById('prev');
const tds = document.querySelectorAll('table td');

// cursors
for (let i = 0; i < divUP.children.length; i++) {
    divUP.children[i].addEventListener('click', () => {
        if (divUP.children[i].textContent == "Paint bucket") {
            document.body.style.cursor = "url('./img/fill-drip-solid.png'), auto";
        }
        if (divUP.children[i].textContent == "Choose color") {
            document.body.style.cursor = "url('./img/eye-dropper-solid.png') 10 10, auto";
        }
        if (divUP.children[i].textContent == "Move") {
            document.body.style.cursor = "url('./img/arrows-alt-solid.png'), auto";
        }
        if (divUP.children[i].textContent == "Transform") {
            document.body.style.cursor = "url('./img/exchange-alt-solid.png'), auto";
        }
    })
}

document.addEventListener('contextmenu', () => {
    document.body.style.cursor = "default";
})

// Paint bucket, Move, Transform
for (let i = 0; i < table.children[0].children.length; i++) {
    for (let j = 0; j < 3; j++) {
        let td = table.children[0].children[i].children[j];
        td.addEventListener('click', () => {
            if (document.body.style.cursor == 'url("./img/fill-drip-solid.png"), auto') {
                let currentColor = getComputedStyle(curColor);
                td.style.backgroundColor = currentColor.backgroundColor;
            }

            if (document.body.style.cursor == 'url("./img/exchange-alt-solid.png"), auto') {
                let tdProps = getComputedStyle(td);
                if (tdProps.borderRadius == "0px") {
                    td.style.borderRadius = "125px";
                } else {
                    td.style.borderRadius = "0px";
                }
            }
        });

        td.addEventListener('mousedown', () => {
            if (document.body.style.cursor == 'url("./img/arrows-alt-solid.png"), auto') {

                for (const td of tds) {
                    td.setAttribute('draggable', true);
                    td.addEventListener('dragstart', drag);
                    td.addEventListener('dragover', allowDrop);
                    td.addEventListener('drop', drop);
                }
            } else {
                for (const td of tds) {
                    td.removeAttribute('draggable');
                    td.removeEventListener('dragstart', drag);
                    td.removeEventListener('dragover', allowDrop);
                    td.removeEventListener('drop', drop);
                }
            }
        });
    }
}

// change current color in the circle 
for (let i = 0; i < cirlces.length; i++) {
    cirlces[i].addEventListener('click', () => {
        if (document.body.style.cursor == 'url("./img/eye-dropper-solid.png") 10 10, auto') {
            let circle = getComputedStyle(cirlces[i]);
            let currentColor = getComputedStyle(curColor);

            let temp = currentColor.backgroundColor;
            curColor.style.backgroundColor = circle.backgroundColor;
            prevColor.style.backgroundColor = temp;

        }
    })
}

function drag(event) {
    event.dataTransfer.setData('target_id', event.target.id); // записывает id элемента в event.dataTransfer по именем 'target_id', чтобы в будующем можно было считать записанное значение
}

function allowDrop(event) {
    event.preventDefault(); // event.preventDefault() is to prevent default functionality of drop which is to open dropped element as a link.
}

function drop(event) {
    event.preventDefault(); 
    const drop_target = event.target;
    const drag_target_id = event.dataTransfer.getData('target_id'); 
    const drag_target = document.getElementById(`${drag_target_id}`);
    const tmp = document.createElement('span'); // make dummy span which will help in swapping the elements
    tmp.className = 'hide';
    drop_target.before(tmp); // append dummy span before drop_target in dom
    drag_target.before(drop_target); // append drop_target before drag_target in dom
    tmp.replaceWith(drag_target); // it will replace dummy span with drag_target
}

// const cols = document.querySelectorAll('#columns .column');
// [].forEach.call(cols, function (col) {
//     col.addEventListener('dragstart', handleDragStart, false);
//     col.addEventListener('dragenter', handleDragEnter, false)
//     col.addEventListener('dragover', handleDragOver, false);
//     col.addEventListener('dragleave', handleDragLeave, false);
//     col.addEventListener('drop', handleDrop, false);
//     col.addEventListener('dragend', handleDragEnd, false);
// });


