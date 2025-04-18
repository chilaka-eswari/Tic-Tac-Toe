const inputArray = document.querySelectorAll('input');
const btns = document.querySelectorAll('button');
const inputField = document.querySelector('.board')
let Turn=''
let player1=''
let player2=''
let mode = ''
let gameOn = false
let computerPosition=''

function showMode(){
    $('.start').addClass('hideBox')
    $('.choose-mode').removeClass('hideBox');
}

function playerChoice(modeName){
    $('.choose-mode').addClass('hideBox')
    $('.mode').text(modeName)
    $('.mode').removeClass('hideBox')
    $('.choose-player').removeClass('hideBox')
    
}

function setPlayerChoice(choice){

    $('.choose-player').addClass('hideBox')

    player1 = choice;

    player2 = choice === 'X'?'O':'X';

    $('.choosed-player').removeClass('hideBox')

    $('.player-1').text("Player 1: "+player1)

    $('.player-2').text("Player 2: "+player2)

    $(':input').removeAttr('placeholder')

    // document.querySelector('.input').style.backgroundColor = 'rgba(71, 20, 7, 0.925)'

    $('.reset').removeClass('hideBox')

    Turn = chooseFirst()
    $('.turn').removeClass('hideBox')
    $('.turn').text(Turn+" will go First")
    gameOn=true

    if(Turn === player2){
        computerRunner()
    }

}


for(let i=0;i<btns.length;i++){
    btns[i].addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            handleButtonClick(e, e.target.textContent)
        }
    })

}

function handleButtonClick(e,btnText){
    console.log(btnText)

    if(btnText === 'Start Game'){
        showMode();
    }
    else if(btnText === 'Single Mode' || btnText === 'Dual Mode'){
        mode =btnText;
        playerChoice(btnText)
    }
    else if(btnText === 'X' || btnText === 'O'){
        setPlayerChoice(btnText)
    }
    else if(btnText === 'Quit'){
        $('.quit').removeClass('hideBox')
        $('.row').addClass('blur')
    }
    else if(btnText === 'Yes' || btnText === 'No'){
        if(btnText === 'Yes'){
            window.close();
        }
        else{
            $('.quit').addClass('hideBox')
            $('.row').removeClass('blur')
        }
    }
    else if(btnText === 'Replay Game'){
        location.reload()
    }

}


inputField.addEventListener('click',(e)=>{
    if(gameOn && e.target.tagName === 'INPUT' && e.target.value === ''){
        console.log(e.target)
        handleClickResponse(e.target)
    }
})

function handleClickResponse(position){
    position.value = Turn
    run();

}



function computerRunner(){

    if(Turn === player2){
        while(true){
            computerPosition = '.input-'+randomNumberGenerator();
            if(isBlank(computerPosition)){
                break;
            }
        }
        setTimeout(()=>{
            document.querySelector(computerPosition).value=Turn;
            run();
        },1000)
    }
    
}

function run(){
    if(winCheck(Turn)){
        $('.turn').text(Turn+" Wins !!");
        $('.party').removeClass('hideBox')
        gameOn=false;
    }
    else if(isBoardFull()){
        $('.turn').text("Match Tie !!")
        gameOn= false
    }
    else{
        Turn = (Turn === 'X'?'O':'X');
        $('.turn').text(Turn+" turn.");
        if(mode === 'Single Mode'){
            computerRunner()
        }
        
    }
}


function isBoardFull(){
    for(let i =0; i< inputArray.length; i++){
        if(inputArray[i].value === ''){
            return false
        }
    }
    return true;
}

// Function to generate random number for (Player-1)Computer. Can be remove if want 2 user player game.

function randomNumberGenerator(){
    console.log('i');
    return Math.floor((Math.random() * 9)+1);
}

// Function to check if given position input feild is Blank or Not.

function isBlank(position){
     return (document.querySelector(position).value == '')
}

// Function to choose which player will take first move.

function chooseFirst(){
    return (Math.floor((Math.random() * 2)+1) === 1)?'X':'O';
}

// Fucntion to check if given player is Win or Not.

function winCheck(mark){

    return ((inputArray[0].value == mark && inputArray[1].value == mark && inputArray[2].value == mark) ||
            (inputArray[3].value == mark && inputArray[4].value == mark && inputArray[5].value == mark) ||
            (inputArray[6].value == mark && inputArray[7].value == mark && inputArray[8].value == mark) ||
            (inputArray[0].value == mark && inputArray[3].value == mark && inputArray[6].value == mark) ||
            (inputArray[1].value == mark && inputArray[4].value == mark && inputArray[7].value == mark) ||
            (inputArray[2].value == mark && inputArray[5].value == mark && inputArray[8].value == mark) ||
            (inputArray[0].value == mark && inputArray[4].value == mark && inputArray[8].value == mark) ||
            (inputArray[2].value == mark && inputArray[4].value == mark && inputArray[6].value == mark));
}







