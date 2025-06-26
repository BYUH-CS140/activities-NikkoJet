// Tetris Game Script
const canvas = document.getElementById("tetrisCanvas");
const context = canvas.getContext("2d");
context.scale(20, 20);

const scoreElement = document.getElementById("tetrisScore");
let score = 0;

const tetrominoes = {
  T: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
  ],
  O: [
    [2, 2],
    [2, 2]
  ],
  L: [
    [0, 3, 0],
    [0, 3, 0],
    [0, 3, 3]
  ],
  J: [
    [0, 4, 0],
    [0, 4, 0],
    [4, 4, 0]
  ],
  I: [
    [0, 5, 0, 0],
    [0, 5, 0, 0],
    [0, 5, 0, 0],
    [0, 5, 0, 0]
  ],
  S: [
    [0, 6, 6],
    [6, 6, 0],
    [0, 0, 0]
  ],
  Z: [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ]
};

const colors = [
  null,
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FFFF33",
  "#FF33FF",
  "#33FFFF",
  "#FFFFFF"
];

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 &&
          (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function createPiece(type) {
  return tetrominoes[type];
}

function playerReset() {
  const pieces = 'TJLOSZI';
  player.matrix = createPiece(pieces[Math.floor(Math.random() * pieces.length)]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    score = 0;
    updateScore();
  }
}

function playerRotate() {
  const m = player.matrix;
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < y; ++x) {
      [m[x][y], m[y][x]] = [m[y][x], m[x][y]];
    }
  }
  m.forEach(row => row.reverse());
  if (collide(arena, player)) {
    m.forEach(row => row.reverse());
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [m[x][y], m[y][x]] = [m[y][x], m[x][y]];
      }
    }
  }
}

function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y >= 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    ++y;
    score += rowCount * 10;
    rowCount *= 2;
  }
}

function updateScore() {
  scoreElement.innerText = score;
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);
const player = {
  pos: {x: 0, y: 0},
  matrix: null
};

// Disable arrow key scrolling
window.addEventListener("keydown", function(e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
    e.preventDefault();
  }
  switch (e.key) {
    case "ArrowLeft":
      playerMove(-1);
      break;
    case "ArrowRight":
      playerMove(1);
      break;
    case "ArrowDown":
      playerDrop();
      break;
    case "ArrowUp":
      playerRotate();
      break;
    case " ":
      while (!collide(arena, player)) {
        player.pos.y++;
      }
      player.pos.y--;
      playerDrop();
      break;
  }
}, { passive: false });

// Start game on button click
let gameStarted = false;
document.getElementById("startTetris").addEventListener("click", () => {
  if (!gameStarted) {
    playerReset();
    updateScore();
    update();
    gameStarted = true;
  } else {
    arena.forEach(row => row.fill(0));
    score = 0;
    updateScore();
    playerReset();
  }
});
