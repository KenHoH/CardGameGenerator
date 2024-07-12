// card generator
const cardValue = document.getElementById("card-value");
const cardNumber = document.getElementById("card-number");
const deck = document.getElementById("card-deck");
let maxCard = 32;
let valueHolder;
let numberHolder;
function generateCard() {
  let totalCard = cardNumber.value;
  let totalChar = cardValue.value;
  numberHolder = totalCard;
  valueHolder = totalChar;
  console.log(totalCard, totalChar);
  if (!validInput(totalCard, totalChar)) {
    console.log("wrong");
    return;
  }
  console.log(deck);
  deck.style.display = "grid";
  // deck card
  if (totalCard % 8 == 0 && totalCard > 20) {
    deck.style.gridTemplateColumns = "repeat(8, 70px)";
  } else deck.style.gridTemplateColumns = "repeat(4, 70px)";
  for (let i = 0; i < totalCard; i++) {
    // ukuran kartu disesuaikan juga dengan besar card deck
    const card = create(`
        <div style=" 
            height: 70px;
        "
        class="card" id="card-${i + 1}" onclick="flip(this)">
          <div class="front"></div>
          <div class="back" id="${i + 1}"></div>
        </div>
            `);
    deck.appendChild(card);
  }
  // disabling the input element
  let before = document.getElementById("main");
  before.style.display = "none";
  console.log(totalChar, totalCard);
  generatorValue(totalChar, totalCard);
}
// checking if the input is valid to create a cardGame
function validInput(number, characters) {
  console.log("validating input");
  console.log(number, characters.length, characters);
  if (number > maxCard) {
    alert("Too many cards, maximum cards are " + maxCard);
    cardNumber.value = "";
    return false;
  }
  if (number == "" || number % 2 !== 0 || number <= 1) {
    alert("Please enter a valid number of cards");
    cardNumber.value = "";
    return false;
  }
  if (characters == "" || characters.length !== number / 2) {
    alert(`Character needed are ${number / 2} characters`);
    cardValue.value = "";
    return false;
  }
  return true;
  // return false or true
}

// function template
function create(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

// card game mechanism
// card checker function
function cardCheck(one, two) {
  // one, twp are the card element
  let cardOne = one.childNodes[3]; // back div 1st card
  let cardTwo = two.childNodes[3]; // back div 2nd card

  // same card function
  if (one.id == two.id) {
    alert("pick another card");
  }
  // correct card function
  if (cardOne.innerText == cardTwo.innerText && one.id != two.id) {
    // adding green color to the back div
    cardOne.classList.add("correct");
    cardTwo.classList.add("correct");
    // changing the card id
    one.id = "Correct";
    two.id = "Correct";
  }
  // wrong card function
  else {
    // adding red color to the back div
    cardOne.classList.add("wrong");
    cardTwo.classList.add("wrong");
    setTimeout(() => {
      // unflip the card
      one.classList.remove("showBack");
      two.classList.remove("showBack");
    }, 1000);
    setTimeout(() => {
      //remove red color from the back div
      cardOne.classList.remove("wrong");
      cardTwo.classList.remove("wrong");
    }, 1500);
  }
}
// card flip function
let cardId;
let tempCard;
let cardCount = 0;
function flip(card) {
  //class = showBack , showFront
  //back contains value, front hides value
  card.classList.add("showBack");
  cardId = card;
  cardCount++;
  if (cardCount == 2) {
    cardCount = 0;
    cardCheck(tempCard, cardId);
  } else {
    tempCard = cardId;
  }
  winCondition();
  win = 0;
}
// random number generator
function randomNumber(number) {
  return Math.floor(Math.random() * number + 1);
}
// card value generator
function generatorValue(char, numberCard) {
  console.log("generator value succeded", char);
  let border = 2;
  for (let i = 0; i < char.length; i++) {
    //border is to forbid the character from being picked more than twice
    while (border > 0) {
      let randomCard = randomNumber(`${numberCard}`); // random card selection from 1-16 id
      let card = document.getElementById(`${randomCard}`);
      console.log(`${randomCard}`);
      console.log(card);
      if (card.innerText == "") {
        card.innerText = char[i];
        border--;
      } else {
        do {
          // pick a random card  until the empty card is selected
          randomCard = randomNumber(`${numberCard}`);
          card = document.getElementById(`${randomCard}`);
        } while (card.innerText != "");
        //if we found the card insert the value
        card.innerText = char[i];
        border--;
      }
    }
    //reset the border for char[i+1];
    border = 2;
  }
}
let win = 0;
const restart = document.getElementById('restart');
function winCondition(){
  let max = deck.childElementCount;
    for(let i = 0; i < max; i++){
      let card = deck.children[i];
      if(card.id.includes("Correct")){
          win++;
      }
    }
    if(win == deck.childElementCount){
      setTimeout(() => {
        alert("Congratulations, you win!");
      }, 1000);
      win = 0;
      restart.style.display = 'block';
    }
}
function restartButton(){
  let totalDeckChild = deck.childElementCount;
  for(let i = 0; i < totalDeckChild; i++) {
    let card = deck.children[i];
    let backCard = card.children[1];
    console.log(card);
    card.id = `card-${i+1}`;
    backCard.classList.remove('correct');
    card.classList.remove('showBack');  
    console.log(backCard.innerText);
    backCard.innerText = '';
  }
  setTimeout(() => {
    generatorValue(valueHolder, numberHolder);
  }, 1000)
  restart.style.display = 'none';
}