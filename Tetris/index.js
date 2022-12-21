document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');

    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'pink'
    ];

    const zTetromino = [
        [0, width, width+1,width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];
    const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
    ];

    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ];

    const lTetromino = [
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],
        [width,width*2,width*2+1,width*2+2]
    ];

    let currentRotation = 0;
    let currentPosition = 4;
    const theTetrominoes = [lTetromino,zTetromino,oTetromino,tTetromino,iTetromino];

    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current =theTetrominoes[random][currentRotation]

    const draw = () =>{
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino');
        squares[currentPosition + index].style.backgroundColor = colors[random];
    })
  } 
  const undraw = () =>{
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino');
        squares[currentPosition + index].style.backgroundColor = '';
    })
  }

  const moveDown = () =>{
    undraw();
    currentPosition = currentPosition + width;
    draw();
  }
const displayIndex = 0;
const displayWidth = 4;
const upNextTetrominoes = [
    [1,displayWidth*1,displayWidth*2+1,2],//lTetromino
    [0,displayWidth*1,displayWidth*1,displayWidth*2+1],//zTetromino
    [1,displayWidth*1,displayWidth*1,displayWidth+2],//tTetromino
    [0,1,displayWidth,displayWidth+1],//oTetromino
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]//iTetromino
]


 const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayShape = () =>{
displaySquares.forEach((square)=> {
    square.classList.remove('tetromino');
    square.style.backgroundColor = '';
    })
upNextTetrominoes[nextRandom].forEach(index => {
    displaySquares[displayIndex * index].classList.add('tetromino');
    displaySquares[displayIndex * index].style.backgroundColor = colors[nextRandom]
})
  }
  
const moveLeft = () =>{
undraw();
const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
if(!isAtLeftEdge) currentPosition -=1;
draw();
}

const moveRight = () =>{
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width-9 === 0);
    if(!isAtRightEdge) currentPosition +=1;
    draw();
    }
  

const control = (e) => {
    if(e.keyCode === 37){
        moveLeft();
    }else if(e.keyCode === 38){
        rotate();
    }else if(e.keyCode === 39){
        moveRight();
    }else if(e.keyCode === 40){
        moveDown();
    }
}

  document.addEventListener('keyup', control)
    startBtn.addEventListener('click',() => {
        draw();
        const timerId = setInterval(moveDown,1000);
        nextRandom = Math.floor(Math.random()*theTetrominoes.length);
        displayShape();
    })
})