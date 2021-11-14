var sudoku = [];
var filled = 0;
var selected;

const cols = document.getElementsByClassName("col");

function solveSudoku(arr, i, j) {
  if (i === arr.length - 1 && j === arr.length) {
    return true;
  }
  var ni = 0,
    nj = 0;
  if (j === 9) {
    ni = i + 1;
    nj = 0;
  } else {
    ni = i;
    nj = j + 1;
  }
  if (arr[i][j] !== 0) {
    return solveSudoku(arr, ni, nj);
  }
  for (var k = 0; k <= 9; k++) {
    if (isSafe(arr, k, i, j)) {
      arr[i][j] = k;
      if (solveSudoku(arr, ni, nj)) return true;
    }
    arr[i][j] = 0;
  }
  return false;
}

function isSafe(arr, k, x, y) {
  //* row check
  for (var j = 0; j < arr.length; j++) {
    if (arr[x][j] === k) return false;
  }
  //* col check
  for (var j = 0; j < arr.length; j++) {
    if (arr[j][y] === k) return false;
  }
  //* Box check
  var bi = Math.floor(x / 3) * 3;
  var bj = Math.floor(y / 3) * 3;

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (arr[i + bi][j + bj] === k) return false;
    }
  }
  return true;
}

function runProgram(input) {
  for (var i = 0; i < 9; i++) {
    sudoku.push(input[i]);
  }
  for (var x = 0; x < sudoku.length; x++) {
    for (var y = 0; y < sudoku.length; y++) {
      if (sudoku[x][y] != 0) {
        ++filled;
        document.getElementById(`${x}${y}`).readOnly = true;
        document.getElementById(`${x}${y}`).value = sudoku[x][y];
        document.getElementById(`${x}${y}`).style.backgroundColor = "#9DE3F6";
      }
    }
  }
  document.getElementById("showAns").disabled = false;
  solveSudoku(sudoku, 0, 0);


}

for (var k = 0; k < cols.length; k++) {
    cols[k].addEventListener("input", () => {
      var cord = event.target.id.split("");
      if (event.target.value != sudoku[cord[0]][cord[1]]) {
        event.target.setAttribute('style', 'color: red !important');
      //   event.target.value = null;
      } else {
        ++filled;
        event.target.readOnly = true;
        event.target.setAttribute('style', 'color: green !important');
  
        if (filled == 81) {
          alert("Hurray!! You won !!");
        }
      }
  
    });
  }

const newGame = () => {
  for (var i = 0; i < cols.length; i++) {
    cols[i].readOnly = false;
  }
  document.getElementById("showAns").disabled = true;

  if (selected) {
    console.log(selected);
    for (var x = 0; x < 9; x++) {
      for (var y = 0; y < 9; y++) {
        document.getElementById(`${x}${y}`).value = null;
        document.getElementById(`${x}${y}`).style.backgroundColor = "white";
      }
    }
    filled = 0;
    sudoku = [];
    fetchGame();
  } else {
    alert("Select difficulty level!!");
  }
};

const fetchGame = async () => {
  try {
    const results = await getGame();
    runProgram(results[0].qstn);
  } catch (err) {
    console.log(err);
  }
};

const getGame = () => {
  return fetch(`http://localhost:3000/${selected}?id=1`).then((response) =>
    response.json()
  );
};



const showAnswer = () => {
  for (var i = 0; i < sudoku.length; i++) {
    for (var j = 0; j < sudoku[i].length; j++) {
      document.getElementById(`${i}${j}`).value = sudoku[i][j];
      document.getElementById(`${i}${j}`).readOnly = "true";
      document.getElementById(`${i}${j}`).style.color = "black";
    }
  }
};

const selectLevel = () => {
  selected = event.target.value;
  document.getElementById("showAns").disabled = true;
  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 9; y++) {
      document.getElementById(`${x}${y}`).value = null;
      document.getElementById(`${x}${y}`).style.backgroundColor = "white";
    }
  }
};

const onNight = () => {
  document.getElementsByClassName("title-bar")[0].classList.add("dark-mode");
  document.getElementById("newGame").classList.add("dark-buttons");
  document.getElementById("showAns").classList.add("dark-buttons");
  document.body.classList.add("dark-mode");
  document.getElementsByTagName("label")[0].classList.add("dark-label");
  document.getElementsByTagName("label")[1].classList.add("dark-label");
  document.getElementsByTagName("label")[2].classList.add("dark-label");

  for (var i = 0; i < cols.length; i++) {
    cols[i].classList.add("dark-col");
  }
};

const onDay = () => {
  document.getElementsByClassName("title-bar")[0].classList.remove("dark-mode");
  document.getElementById("newGame").classList.remove("dark-buttons");
  document.getElementById("showAns").classList.remove("dark-buttons");
  document.body.classList.remove("dark-mode");
  document.getElementsByTagName("label")[0].classList.remove("dark-label");
  document.getElementsByTagName("label")[1].classList.remove("dark-label");
  document.getElementsByTagName("label")[2].classList.remove("dark-label");
  for (var i = 0; i < cols.length; i++) {
    cols[i].classList.remove("dark-col");
  }
};
