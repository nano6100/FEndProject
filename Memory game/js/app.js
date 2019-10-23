/*
 * Create a list that holds all of your cards
 */
const Pics = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt",
    "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond",
    "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o",
    "fa fa-cube"
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976




//Dynamaicly shuffle and create the cards 

const CardsContainer = document.querySelector(".deck");


shuffle(Pics).forEach(Pics => {
    const Card = document.createElement("li");
    Card.classList.add("card");
    Card.innerHTML = `<i class ="${Pics}"></i>`;
    CardsContainer.appendChild(Card);

});





function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let modal = document.querySelector('.my-modal');
let cards = document.querySelectorAll('.card');
let star = document.querySelectorAll(".fa-star");
let OpenCards = [];
let MathcedCrad = [];
let NOfMoves = 0;



//timer Start 
let myTime = document.getElementById("myTime");
let second = 0;
let minute = 0;
let hour = 0;
let time;

//Restart timer
function resetVars() {
    second = 0;
    minute = 0;
    hour = 0;
}
myTime.innerHTML = hour + " hrs " + minute + " mins " + second + " secs";
startTimer();

cards.forEach(function(card) {

    card.addEventListener('click', function(e) {

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {


            //number of moves
            let moves = document.querySelector(".moves");
            NOfMoves++;
            moves.textContent = NOfMoves;





            //Reveale the cards
            OpenCards.push(card);
            card.classList.add('open', 'show');




            //if there is two open cards and a match
            if (OpenCards.length == 2) {
                const FirstCard = OpenCards[0];
                const SecondCrad = OpenCards[1];
                if (FirstCard.innerHTML === SecondCrad.innerHTML) {
                    FirstCard.classList.add('match');
                    SecondCrad.classList.add('match');
                    MathcedCrad.push(FirstCard, SecondCrad);

                    //empty the array
                    OpenCards = [];

                    //check if the game is over!

                    GameOver();

                } else {
                    //if there is no match


                    if (NOfMoves > 3 && NOfMoves < 6) {
                        for (i = 0; i < 3; i++) {
                            if (i > 1) {
                                star.forEach(element => {
                                    star[0].classList.add("fa-star-o");
                                    star[0].classList.remove("fa-star");

                                });
                            }
                        }
                    } else if (NOfMoves > 6 && NOfMoves > 9) {
                        for (i = 0; i < 3; i++) {
                            if (i > 0) {
                                star[1].classList.add("fa-star-o");
                                star[1].classList.remove("fa-star");
                            }
                        }
                    }

                    setTimeout(function() {
                        OpenCards.forEach(function(card) {

                            card.classList.remove('open', 'show');
                            OpenCards = [];

                        });
                    }, 500);
                }
            }
        }


    });
})




//timer
function startTimer() {
    time = setInterval(function() {
        myTime.textContent = hour + " hrs " + minute + " mins " + second + " secs";

        second++;
        if (second >= 60) {
            second = 0;
            minute++;
        }
        if (minute >= 60) {

            minute = 0;
            hour++;
        }
    }, 1000);
}
//stop Timer function
function stopTimer() {
    clearInterval(time);
}







//When game end 
function GameOver() {
    let content = document.querySelector('.modal-content');
    content.firstElementChild.innerText = "YOU DID IT!!!\n Your time was: " + myTime.innerText + "\n And Number of moves are (" + NOfMoves + ")";
    modal.setAttribute("style", "display:block;");
    if (MathcedCrad.length == Pics.length) {
        alert("GAME OVER \n your time is " + myTime.innerText + "\n your moves are " + NOfMoves);
        stopTimer();

    }
}

//Restart the game 

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {

    resetVars();

    let trashCards = document.querySelectorAll(".open");
    trashCards.forEach(function(trashCards) {
            trashCards.classList.remove("open");
            trashCards.classList.remove("show");
            trashCards.classList.remove("match");





        })
        //Empty The array for the next game 
    MathcedCrad = [];
    OpenCards = [];
    NOfMoves = 0;

    //Reset the moves to 0
    document.querySelector(".moves").textContent = 0;

    //Reset the stars
    document.querySelectorAll(".fa-star-o").forEach(function(star) {
        star.classList.remove("fa-star-o");
        star.classList.add("fa-star");

    })

})