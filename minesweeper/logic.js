(function () {
  const toggle = document.querySelector(".c-hamburger");
  const menu = document.querySelector(".menu");
  const cross = document.querySelector(".cross");
  const button = document.querySelector(".menu-button button");
  const sectionGame = document.querySelector(".game");
  const table = document.querySelector(".game table");
  const col = document.getElementById('col');
  const row = document.getElementById('row');
  const bomb = document.getElementById('bomb');
  let counterBombs = 0;

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      document.body.style.transition = ".5s ease-in-out";
      menu.style.transition = ".5s ease-in-out";
    },0);
  });

  function toggleHandler(toggle) {

    toggle.addEventListener("click", function (e) {

      if (this.classList.contains("is-active") === true) {
        this.classList.remove("is-active");
        menu.style.top = "-400px";
        document.body.style.backgroundColor = "#fdfe41";
      } else {
        this.classList.add("is-active");
        menu.style.top = "270px";
        document.body.style.backgroundColor = "#0d6311";
        sectionGame.style.display = "none";
      }

    });

  }
  toggleHandler(toggle);

  function validateSizeOfArea() {
    let regColAndRow = /^(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32)$/;
    let regBombs = /[0-9]{1,3}/;
    let numberOfCells = col.value * row.value;
    if (regColAndRow.test(col.value) == false) {
      alert('Введите число столбцов от 1 до 30');
      return false;
    }

    if (regColAndRow.test(row.value) == false) {
      alert('Введите число строк от 1 до 30');
      return false;
    }

    if (regBombs.test(bomb.value) == false) {
      alert('Введите число бомб от 0 до 999');
      return false;
    }

    if (numberOfCells <= bomb.value) {
      alert('Бомб больше чем ячеек!');
      return false;
    }

    return true;
  }

  cross.addEventListener('click', () => {
    toggle.classList.remove("is-active");
    menu.style.top = "-400px";
    document.body.style.backgroundColor = "#fdfe41";

    if (table.children.length > 0) {
      sectionGame.style.display = "block";
    }
  });

  button.addEventListener('click', () => {
    if (validateSizeOfArea()) {
      let numberOfBomb = parseInt(bomb.value);

      // если есть элементы в table
      if (table.children.length > 0) {
        for (let i = 0; i < table.children.length;) {
          table.removeChild(table.children[i]); // когда удалит первый, следующий станет на его место
        }
      }

      // добавление размера поля и обработчик события на ячейки
      for (let i = 0; i < parseInt(col.value); i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < parseInt(row.value); j++) {
          const td = document.createElement('td');
          td.id = "green";

          function win() {
            for (let i = 0; i < parseInt(col.value); i++) {
              for (let j = 0; j < parseInt(row.value); j++) {
                if (table.children[i].children[j].id == "green" || table.children[i].children[j].classList.contains('red')) {
                  return false;
                }
              }
            }
            return true;
          }

          function one() {
            //если на поле открыта бомба, убираем обработчик клика на ячейки, выходом из функции
            for (let i = 0; i < parseInt(col.value); i++) {
              for (let j = 0; j < parseInt(row.value); j++) {
                if (table.children[i].children[j].classList.contains('red')) return;
              }
            } 


            if (td.innerHTML == "💣") {
              // раскрытие всех бомб
              for (let i = 0; i < parseInt(col.value); i++) {
                for (let j = 0; j < parseInt(row.value); j++) {
                  if (table.children[i].children[j].innerHTML == "💣") {
                    table.children[i].children[j].removeAttribute('id');
                    table.children[i].children[j].classList.add('red');
                  }
                }
              }
            } else if (parseInt(`${td.innerHTML}`) > 0) {
              td.removeAttribute('id');
              td.classList.add('brown');
            } else {
              // заливка 3x3 матрицы
              function fill(td) {
                let index = td.cellIndex;

                if (td.parentElement.previousSibling != null && index - 1 >= 0) {
                  if (td.previousSibling.innerHTML.length > 0 && td.parentElement.previousSibling.children[index].innerHTML.length > 0
                    && td.parentElement.previousSibling.children[index - 1].innerHTML == "") {

                  } else {
                    td.parentElement.previousSibling.children[index - 1].removeAttribute('id');
                    td.parentElement.previousSibling.children[index - 1].classList.add('brown');
                  }
                }

                if (td.parentElement.previousSibling != null) {
                  td.parentElement.previousSibling.children[index].removeAttribute('id');
                  td.parentElement.previousSibling.children[index].classList.add('brown');
                }

                if (td.parentElement.previousSibling != null && index + 1 < parseInt(row.value)) {
                  if (td.nextElementSibling.innerHTML.length > 0 && td.parentElement.previousSibling.children[index].innerHTML.length > 0
                    && td.parentElement.previousSibling.children[index + 1].innerHTML == "") {

                  } else {
                    td.parentElement.previousSibling.children[index + 1].removeAttribute('id');
                    td.parentElement.previousSibling.children[index + 1].classList.add('brown');
                  }
                }

                if (td.previousSibling != null) {
                  td.previousSibling.removeAttribute('id');
                  td.previousSibling.classList.add('brown');
                }

                td.removeAttribute('id');
                td.classList.add('brown');

                if (td.nextElementSibling != null) {
                  td.nextElementSibling.removeAttribute('id');
                  td.nextElementSibling.classList.add('brown');
                }

                if (td.parentElement.nextElementSibling != null && index - 1 >= 0) {
                  if (td.previousSibling.innerHTML.length > 0 && td.parentElement.nextElementSibling.children[index].innerHTML.length > 0
                    && td.parentElement.nextElementSibling.children[index - 1].innerHTML == "") {

                  } else {
                    td.parentElement.nextElementSibling.children[index - 1].removeAttribute('id');
                    td.parentElement.nextElementSibling.children[index - 1].classList.add('brown');
                  }
                }

                if (td.parentElement.nextElementSibling != null) {
                  td.parentElement.nextElementSibling.children[index].removeAttribute('id');
                  td.parentElement.nextElementSibling.children[index].classList.add('brown');
                }

                if (td.parentElement.nextElementSibling != null && index + 1 < parseInt(row.value)) {
                  if (td.nextElementSibling.innerHTML.length > 0 && td.parentElement.nextElementSibling.children[index].innerHTML.length > 0
                    && td.parentElement.nextElementSibling.children[index + 1].innerHTML == "") {

                  } else {
                    td.parentElement.nextElementSibling.children[index + 1].removeAttribute('id');
                    td.parentElement.nextElementSibling.children[index + 1].classList.add('brown');
                  }
                }

                return td;
              }

              // Flood fill
              let stack = [];
              let deletedFromStack = [];

              let pressedTD = fill(td);

              stack.push(pressedTD);

              let x = 0;
              let y = 0;

              while (stack.length != 0) {
                x = stack[stack.length - 1].parentElement.rowIndex; // tr
                y = stack[stack.length - 1].cellIndex; // td

                // console.log({x, y});

                deletedFromStack.push(stack.pop());

                if (y + 1 < parseInt(row.value)) {
                  if (table.children[x].children[y + 1].innerHTML == "" && deletedFromStack.indexOf(table.children[x].children[y + 1]) == -1) {
                    stack.push(fill(table.children[x].children[y + 1]));
                  }
                }

                if (y - 1 >= 0) {
                  if (table.children[x].children[y - 1].innerHTML == "" && deletedFromStack.indexOf(table.children[x].children[y - 1]) == -1) {
                    stack.push(fill(table.children[x].children[y - 1]));
                  }
                }

                // new
                if (x - 1 >= 0 && y - 1 >= 0) {
                  if (table.children[x - 1].children[y - 1].innerHTML == "" && deletedFromStack.indexOf(table.children[x - 1].children[y - 1]) == -1) {
                    stack.push(fill(table.children[x - 1].children[y - 1]));
                  }
                }

                if (x - 1 >= 0) {
                  if (table.children[x - 1].children[y].innerHTML == "" && deletedFromStack.indexOf(table.children[x - 1].children[y]) == -1) {
                    stack.push(fill(table.children[x - 1].children[y]));
                  }
                }

                // new
                if (x - 1 >= 0 && y + 1 < parseInt(row.value)) {
                  if (table.children[x - 1].children[y + 1].innerHTML == "" && deletedFromStack.indexOf(table.children[x - 1].children[y + 1]) == -1) {
                    stack.push(fill(table.children[x - 1].children[y + 1]));
                  }
                }

                // new
                if (x + 1 < parseInt(col.value) && y - 1 >= 0) {
                  if (table.children[x + 1].children[y - 1].innerHTML == "" && deletedFromStack.indexOf(table.children[x + 1].children[y - 1]) == -1) {
                    stack.push(fill(table.children[x + 1].children[y - 1]));
                  }
                }

                if (x + 1 < parseInt(col.value)) {
                  if (table.children[x + 1].children[y].innerHTML == "" && deletedFromStack.indexOf(table.children[x + 1].children[y]) == -1) {
                    stack.push(fill(table.children[x + 1].children[y]));
                  }
                }

                // new
                if (x + 1 < parseInt(col.value) && y + 1 < parseInt(row.value)) {
                  if (table.children[x + 1].children[y + 1].innerHTML == "" && deletedFromStack.indexOf(table.children[x + 1].children[y + 1]) == -1) {
                    stack.push(fill(table.children[x + 1].children[y + 1]));
                  }
                }
              }

            }
          }

          td.addEventListener('click', one);

          // флажок
          td.addEventListener('contextmenu', function two(e) {
            e.preventDefault();

            // если на поле открыта бомба, убираем обработчик клика на ячейки, выходом из функции
            for (let i = 0; i < parseInt(col.value); i++) {
              for (let j = 0; j < parseInt(row.value); j++) {
                if (table.children[i].children[j].classList.contains('red')) return;
              }
            }

            if (td.classList.contains('grey')) {
              td.id = 'green';
              td.classList.remove('grey');
              td.addEventListener('click', one);
              counterBombs--;
            } else {
              if (counterBombs >= parseInt(bomb.value)) return;
              td.removeEventListener('click', one);
              td.removeAttribute('id');
              td.classList.add('grey');
              counterBombs++;
            }
          });

          tr.appendChild(td);
        }

        table.appendChild(tr);
      }

      // размещение бомб
      while (numberOfBomb > 0) {
        let colPos = Math.floor((Math.random() * parseInt(col.value)));
        let rowPos = Math.floor((Math.random() * parseInt(row.value)));

        if (table.children[colPos].children[rowPos].innerHTML != "💣") {
          table.children[colPos].children[rowPos].innerHTML = "💣";
          numberOfBomb--;
        }
      }

      // размещение цифр
      for (let i = 0; i < parseInt(col.value); i++) {
        for (let j = 0; j < parseInt(row.value); j++) {
          let count = 0;

          if (i - 1 >= 0 && j - 1 >= 0) {
            if (table.children[i - 1].children[j - 1].innerHTML == "💣")
              count++;
          }
          if (i - 1 >= 0) {
            if (table.children[i - 1].children[j].innerHTML == "💣")
              count++;
          }
          if (i - 1 >= 0 && j + 1 < parseInt(row.value)) {
            if (table.children[i - 1].children[j + 1].innerHTML == "💣")
              count++;
          }
          if (i >= 0 && j - 1 >= 0) {
            if (table.children[i].children[j - 1].innerHTML == "💣")
              count++;
          }

          // центр

          if (i >= 0 && j + 1 < parseInt(row.value)) {
            if (table.children[i].children[j + 1].innerHTML == "💣")
              count++;
          }
          if (i + 1 < parseInt(col.value) && j - 1 >= 0) {
            if (table.children[i + 1].children[j - 1].innerHTML == "💣")
              count++;
          }
          if (i + 1 < parseInt(col.value)) {
            if (table.children[i + 1].children[j].innerHTML == "💣")
              count++;
          }
          if (i + 1 < parseInt(col.value) && j + 1 < parseInt(row.value)) {
            if (table.children[i + 1].children[j + 1].innerHTML == "💣")
              count++;
          }

          if (count !== 0) {
            if (table.children[i].children[j].innerHTML !== "💣") {
              table.children[i].children[j].innerHTML = `${count}`;
            }
          }

        }
      }

      // скрытие меню
      toggle.classList.remove("is-active");
      menu.style.top = "-400px";
      document.body.style.backgroundColor = "#fdfe41";
      sectionGame.style.display = "block";
      counterBombs = 0;
    }
  });

})();











