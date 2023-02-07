var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; //alows the palyer to draw while yourSum <=21

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck(){
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C","D","H","S"];
    deck = [];

    for (let i = 0; i < types.length; i++){
        for (let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]); //check from images folder
        }
    }
}

function shuffleDeck(){
    for (let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random()* deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    //console.log(hidden);
    //console.log(dealerSum);
    while (dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".jpg";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    //console.log(dealerSum);

    for (let i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/" + card + ".jpg";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    console.log(yourSum);
}

function getValue(card){
    let data = card.split("-"); // splits value and type, then obtain only the value "4-C" --> ["4","C"]
    let value = data[0];

    if(isNaN(value)){
        if(value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card){
    if (card[0] == "A"){
        return 1;
    }
    return 0;
}