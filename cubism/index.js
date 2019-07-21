const divUP = document.querySelector('.up');
const divRigthSide = document.querySelector('.right-side');
const color = ['#60E1AF', '#80D8FF', '#FFFF8D', '#FF8A80', '#CCFF90', '#CFD8DC', '#FFD180'];

for (let i = 0; i < divUP.children.length; i++) {
    divUP.children[i].addEventListener('click', () => {
        if (divUP.children[i].textContent == "Circle") {   

            const randColor = Math.floor((Math.random() * 7));
            const randTop = Math.floor((Math.random() * 690));
            const randleft = Math.floor((Math.random() * 1200));
            const newCircle = document.createElement('div');
            newCircle.classList.add('circle');
            newCircle.style.height = '150px';
            newCircle.style.width = '150px';
            newCircle.style.top = `${randTop}px`;
            newCircle.style.left = `${randleft}px`;
            newCircle.style.backgroundColor = color[randColor];
            divRigthSide.appendChild(newCircle);

            newCircle.addEventListener('mousedown', (e) => {
                for(const div of divRigthSide.children) {
                    if(div.classList.contains('light')) {
                        div.classList.remove('light');
                    }
                }

                newCircle.classList.add('light');
                // местонахождение круга в пределах divRigthSide, т.е. считывает координаты фигуры (круга) внутри блока divRigthSide, 
                // например размер фигуры 200х200, находится в верхнем левом углу, то её координаты буду (0,0) вне зависимости, где тыкнуть внутри блока divRigthSide
                // let x = parseInt(circleStyle.left.slice(0, -2));
                let x = parseInt(newCircle.style.left.slice(0, -2));
                let y = parseInt(newCircle.style.top.slice(0, -2));

                // координаты блока divRigthSide - например левый верхний угол (0,0), правый нижний угол - (525, 815)
                const offsetX = e.offsetX;
                const offsetY = e.offsetY;

                // размеры фигуры(круга) - 200х200
                const height = parseInt(newCircle.style.height.slice(0, -2));
                const width = parseInt(newCircle.style.width.slice(0, -2));

                function mouseMove(e) {
                    e.preventDefault();

                    // считываем координаты передвижения фигуры внутри блока
                    x += e.movementX;
                    y += e.movementY;

                    // e.x and e.y - координаты фигуры относительно всего окна 
                    if (e.x < divRigthSide.offsetLeft + offsetX) {
                        x = 0;
                    } else if (e.x > divRigthSide.offsetLeft + divRigthSide.clientWidth - width + offsetX) {
                        x = divRigthSide.clientWidth - width;
                    }
                    if (e.y < divRigthSide.offsetTop + offsetY) {
                        y = 0;
                    } else if (e.y > divRigthSide.offsetTop + divRigthSide.clientHeight - height + offsetY) {
                        y = divRigthSide.clientHeight - height;
                    }

                    newCircle.style.left = `${x}px`;
                    newCircle.style.top = `${y}px`;
                }

                document.addEventListener('mousemove', mouseMove);

                document.addEventListener('mouseup', function mouseUp(e) {
                    document.removeEventListener('mouseup', mouseUp);
                    document.removeEventListener('mousemove', mouseMove);
                });
            });

            //console.log(divRigthSide.children.length);
        }
        if (divUP.children[i].textContent == "Square") {
            const randColor = Math.floor((Math.random() * 7));
            const randTop = Math.floor((Math.random() * 690));
            const randleft = Math.floor((Math.random() * 1200));
            const newSquare = document.createElement('div');
            newSquare.classList.add('square');
            newSquare.style.height = '150px';
            newSquare.style.width = '150px';
            newSquare.style.top = `${randTop}px`;
            newSquare.style.left = `${randleft}px`;
            newSquare.style.backgroundColor = color[randColor];
            divRigthSide.appendChild(newSquare);

            newSquare.addEventListener('mousedown', (e) => {
                for(const div of divRigthSide.children) {
                    if(div.classList.contains('light')) {
                        div.classList.remove('light');
                    }
                }
                newSquare.classList.add('light');

                let x = parseInt(newSquare.style.left.slice(0, -2));
                let y = parseInt(newSquare.style.top.slice(0, -2));

                const offsetX = e.offsetX;
                const offsetY = e.offsetY;

                const height = parseInt(newSquare.style.height.slice(0, -2));
                const width = parseInt(newSquare.style.width.slice(0, -2));

                function mouseMove(e) {
                    e.preventDefault();

                    x += e.movementX;
                    y += e.movementY;

                    if (e.x < divRigthSide.offsetLeft + offsetX) {
                        x = 0;
                    } else if (e.x > divRigthSide.offsetLeft + divRigthSide.clientWidth - width + offsetX) {
                        x = divRigthSide.clientWidth - width;
                    }
                    if (e.y < divRigthSide.offsetTop + offsetY) {
                        y = 0;
                    } else if (e.y > divRigthSide.offsetTop + divRigthSide.clientHeight - height + offsetY) {
                        y = divRigthSide.clientHeight - height;
                    }

                    newSquare.style.left = `${x}px`;
                    newSquare.style.top = `${y}px`;
                }

                document.addEventListener('mousemove', mouseMove);

                document.addEventListener('mouseup', function mouseUp(e) {
                    document.removeEventListener('mouseup', mouseUp);
                    document.removeEventListener('mousemove', mouseMove);
                });
            });
        }
        if (divUP.children[i].textContent == "Rectangle") {
            const randColor = Math.floor((Math.random() * 7));
            const randTop = Math.floor((Math.random() * 690));
            const randleft = Math.floor((Math.random() * 1200));
            const newRectangle = document.createElement('div');
            newRectangle.classList.add('square');
            newRectangle.style.height = '150px';
            newRectangle.style.width = '300px';
            newRectangle.style.top = `${randTop}px`;
            newRectangle.style.left = `${randleft}px`;
            newRectangle.style.backgroundColor = color[randColor];
            divRigthSide.appendChild(newRectangle);

            newRectangle.addEventListener('mousedown', (e) => {
                for(const div of divRigthSide.children) {
                    if(div.classList.contains('light')) {
                        div.classList.remove('light');
                    }
                }
                newRectangle.classList.add('light');

                let x = parseInt(newRectangle.style.left.slice(0, -2));
                let y = parseInt(newRectangle.style.top.slice(0, -2));

                const offsetX = e.offsetX;
                const offsetY = e.offsetY;

                const height = parseInt(newRectangle.style.height.slice(0, -2));
                const width = parseInt(newRectangle.style.width.slice(0, -2));

                function mouseMove(e) {
                    e.preventDefault();

                    x += e.movementX;
                    y += e.movementY;

                    if (e.x < divRigthSide.offsetLeft + offsetX) {
                        x = 0;
                    } else if (e.x > divRigthSide.offsetLeft + divRigthSide.clientWidth - width + offsetX) {
                        x = divRigthSide.clientWidth - width;
                    }
                    if (e.y < divRigthSide.offsetTop + offsetY) {
                        y = 0;
                    } else if (e.y > divRigthSide.offsetTop + divRigthSide.clientHeight - height + offsetY) {
                        y = divRigthSide.clientHeight - height;
                    }

                    newRectangle.style.left = `${x}px`;
                    newRectangle.style.top = `${y}px`;
                }

                document.addEventListener('mousemove', mouseMove);

                document.addEventListener('mouseup', function mouseUp(e) {
                    document.removeEventListener('mouseup', mouseUp);
                    document.removeEventListener('mousemove', mouseMove);
                });
            });
        }
        if (divUP.children[i].textContent == "Triangle") {
            const randColor = Math.floor((Math.random() * 7));
            const randTop = Math.floor((Math.random() * 690));
            const randleft = Math.floor((Math.random() * 1200));
            const newTriangle = document.createElement('div');
            newTriangle.classList.add('rectangle');
            newTriangle.style.height = '150px';
            newTriangle.style.width = '200px';
            newTriangle.style.top = `${randTop}px`;
            newTriangle.style.left = `${randleft}px`;
            newTriangle.style.borderColor = `transparent transparent ${color[randColor]} transparent`;
            divRigthSide.appendChild(newTriangle);

            newTriangle.addEventListener('mousedown', (e) => {
                for(const div of divRigthSide.children) {
                    if(div.classList.contains('light')) {
                        div.classList.remove('light');
                    }
                }
                newTriangle.classList.add('light');

                let x = parseInt(newTriangle.style.left.slice(0, -2));
                let y = parseInt(newTriangle.style.top.slice(0, -2));

                const offsetX = e.offsetX;
                const offsetY = e.offsetY;

                const height = parseInt(newTriangle.style.height.slice(0, -2));
                const width = parseInt(newTriangle.style.width.slice(0, -2));

                function mouseMove(e) {
                    e.preventDefault();

                    x += e.movementX;
                    y += e.movementY;

                    if (e.x < divRigthSide.offsetLeft + offsetX) {
                        x = 0;
                    } else if (e.x > divRigthSide.offsetLeft + divRigthSide.clientWidth - width + offsetX) {
                        x = divRigthSide.clientWidth - width;
                    }
                    if (e.y < divRigthSide.offsetTop + offsetY) {
                        y = 0;
                    } else if (e.y > divRigthSide.offsetTop + divRigthSide.clientHeight - height + offsetY) {
                        y = divRigthSide.clientHeight - height;
                    }

                    newTriangle.style.left = `${x}px`;
                    newTriangle.style.top = `${y}px`;
                }

                document.addEventListener('mousemove', mouseMove);

                document.addEventListener('mouseup', function mouseUp(e) {
                    document.removeEventListener('mouseup', mouseUp);
                    document.removeEventListener('mousemove', mouseMove);
                });
            });
        }
        if (divUP.children[i].textContent == "Parallelogram") {
            const randColor = Math.floor((Math.random() * 7));
            const randTop = Math.floor((Math.random() * 690));
            const randleft = Math.floor((Math.random() * 1200));
            const newParallelogram = document.createElement('div');
            newParallelogram.classList.add('parallelogram');
            newParallelogram.style.height = '100px;';
            newParallelogram.style.width = '150px';
            newParallelogram.style.top = `${randTop}px`;
            newParallelogram.style.left = `${randleft}px`;
            newParallelogram.style.backgroundColor = color[randColor];
            divRigthSide.appendChild(newParallelogram);

            newParallelogram.addEventListener('mousedown', (e) => {
                for(const div of divRigthSide.children) {
                    if(div.classList.contains('light')) {
                        div.classList.remove('light');
                    }
                }
                newParallelogram.classList.add('light');

                let x = parseInt(newParallelogram.style.left.slice(0, -2));
                let y = parseInt(newParallelogram.style.top.slice(0, -2));

                const offsetX = e.offsetX;
                const offsetY = e.offsetY;

                const height = parseInt(newParallelogram.style.height.slice(0, -2));
                const width = parseInt(newParallelogram.style.width.slice(0, -2));

                function mouseMove(e) {
                    e.preventDefault();

                    x += e.movementX;
                    y += e.movementY;

                    if (e.x < divRigthSide.offsetLeft + offsetX) {
                        x = 0;
                    } else if (e.x > divRigthSide.offsetLeft + divRigthSide.clientWidth - width + offsetX) {
                        x = divRigthSide.clientWidth - width;
                    }
                    if (e.y < divRigthSide.offsetTop + offsetY) {
                        y = 0;
                    } else if (e.y > divRigthSide.offsetTop + divRigthSide.clientHeight - height + offsetY) {
                        y = divRigthSide.clientHeight - height;
                    }

                    newParallelogram.style.left = `${x}px`;
                    newParallelogram.style.top = `${y}px`;
                }

                document.addEventListener('mousemove', mouseMove);

                document.addEventListener('mouseup', function mouseUp(e) {
                    document.removeEventListener('mouseup', mouseUp);
                    document.removeEventListener('mousemove', mouseMove);
                });
            });
        }
    })
}


//---------------------------------------------------------------------------------------
// for (const td of tds) {
//     td.setAttribute('draggable', true);
//     td.addEventListener('dragstart', drag);
//     td.addEventListener('dragover', allowDrop);
//     td.addEventListener('drop', drop);
// }

// const cols = document.querySelectorAll('#columns .column');
// [].forEach.call(cols, function (col) {
//     col.addEventListener('dragstart', handleDragStart, false);
//     col.addEventListener('dragenter', handleDragEnter, false)
//     col.addEventListener('dragover', handleDragOver, false);
//     col.addEventListener('dragleave', handleDragLeave, false);
//     col.addEventListener('drop', handleDrop, false);
//     col.addEventListener('dragend', handleDragEnd, false);
// });