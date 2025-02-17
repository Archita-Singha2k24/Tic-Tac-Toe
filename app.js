let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0 ; //To track draw
let turnO = true; //playerX , playerO

const winPatterns = [
    [0,1,2],       //2D array
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const  resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach ( (box) => {
     box.addEventListener("click", () => {
        if(turnO) {
            // playerO
            box.innerText = "O";
            box.style.color = "green";
            turnO = false;
        } else {
            // playerX
            box.innerText = "X";
            box.style.color = "red";
            turnO = true ;
        }
        box.disabled = true ;
        count++ ;
        let isWinner =  checkWinner();
        if(count === 9 && !isWinner) {
            gameDraw();
        }
     });
});

const gameDraw = () => {
    msg.innerText = `Game was a draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Function to disable boxes after winning game
const disableBoxes = () => {
    for(let box of boxes){
          box.disabled = true ;
    }
    };

// Function to enable boxes after clicking reset button
    const enableBoxes = () => {
        for(let box of boxes){
              box.disabled = false ;
              box.innerText = "";
        }
        };

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// I need to go through this part again
// Checking winning conditon
const checkWinner = () => {
    for( let pattern of winPatterns) {
       let pos1val = boxes[pattern[0]].innerText;
       let pos2val = boxes[pattern[1]].innerText;
       let pos3val = boxes[pattern[2]].innerText;
       if(pos1val != "" && pos2val != "" && pos3val != "") {
        if(pos1val === pos2val && pos2val === pos3val ) {
            console.log("winner " + pos1val);
            showWinner(pos1val);
        }
       }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
