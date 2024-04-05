let cards = [];
let CIAbackground, confidentiality, integrity, avability, Cybercrime, winComp, loseComp;
let CIAbackgroundImg, confidentialityImg, integrityImg, avabilityImg, CybercrimeImg, winCompImg, loseCompImg;
let center1, center2, center3;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() {
  integrity.pos = { x: -100, y: -100 };
  confidentiality.pos = { x: -100, y: -100 };
  avability.pos = { x: -100, y: -100 };
  CIAbackground.pos = { x: -300, y: -300 };
  if (screen === 0) {
    Cybercrime.pos = { x: width / 2, y: 160 + 95 };
  }
  else {
    Cybercrime.pos = { x: -100000, y: -200 };
  }if (screen === 3) {
    winComp.pos = { x: width / 2 + 10, y: 160 + 85 };
  }
  else {
    winComp.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    loseComp.pos = { x: width / 2, y: 160 + 85};
  }
  else {
    loseComp.pos = { x: -100000, y: -200 };
  }
}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen == 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      screen = 2;
      confidentiality.position = createVector(width / 2 - 145, height - (height / 3) + 175);
      integrity.position = createVector(width / 2 - 60, height - (height / 3) + 95);
      avability.position = createVector(width / 2 + 33, height - (height / 3) + 175);
      CIAbackground.pos = { x: 190, y: 285 };
      Cybercrime.pos = { x: width / 2, y: 160 + 95 };
    }
  }
  else if (screen == 2 && confirm && !cancel) {
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height / 2 + 250 && mouseY < height / 2 + 290) {
      if (
        dist(confidentiality.x, confidentiality.y, center1.x, center1.y) < 1 &&
        dist(integrity.x, integrity.y, center2.x, center2.y) < 1 &&
        dist(avability.x, avability.y, center3.x, center3.y) < 1
      ) {
        console.log("you win!");
        showScreenWin();
        screen = 3;
        confirm = false;
      }
      else {
        console.log("you lose!");
        showScreenLose();
        screen = 4;
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height / 2 + 250 && mouseY < height / 2 + 290) {
      confirm = false;
      cancel = true;
    }
  }

  //If on the game screen
  if (screen === 2) {
    // Check if the "Learn More" button is clicked
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 45 && mouseY < height - 10) 
    {
      // Display a link to a website for further learning
      window.open('https://www.geeksforgeeks.org/the-cia-triad-in-cryptography/');
    }
  }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    cancel = false;
    confirm = false;
    widthConstraint = constrain(mouseX + card.mouse.x, card.width / 2, width - card.width / 2);
    heightConstraint = constrain(mouseY + card.mouse.y, card.height / 2, height - card.height / 2);
    card.position = createVector(widthConstraint, heightConstraint);
    card.rotationLock = true;
  } else {
    card.vel.x = 0;
    card.vel.y = 0;
    card.rotationLock = true;
  }
}

function snapToCenter(card) {
  // Snap into position and check if there is not already a card in the center position
  if (!mouseIsPressed) {
    let snapped = false;
    switch (true) {
      case dist(card.x, card.y, center1.x, center1.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center1.x, center1.y) < 40):
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 40):
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 40):
        card.position = center3;
        snapped = true;
      default:
        break;
    }

    if (!snapped) {
      // Return the card to its original position
      card.position = card.originalPosition;
    }
  }
}

function checkIfConfirm() {
  let numSnapped = 0;
  for (let card of cards) {
    if ((card.x == center1.x && card.y == center1.y) || (card.x == center2.x && card.y == center2.y) || (card.x == center3.x && card.y == center3.y)) {
      numSnapped++;
    }
  }
  if (numSnapped == 3) {
    confirm = true;
  }
}

function preload() {
  CIAbackgroundImg = loadImage('assets/CIA/1/CIAbackground.png');
  confidentialityImg = loadImage('assets/CIA/1/Confidentiality.png');
  integrityImg = loadImage('assets/CIA/1/Integrity.png');
  avabilityImg = loadImage('assets/CIA/1/Avability.png');
  CybercrimeImg = loadImage('assets/CyberLaws/1/Cybercrime.png');
  winCompImg = loadImage('assets/CyberLaws/1/lockedComputer.png');
  loseCompImg = loadImage('assets/CyberLaws/1/LoseComp.png');
}

function setup() {
  createCanvas(650, 620);

  ////////////////////////////////////////////
  ////////////////// GAME 1 //////////////////
  ////////////////////////////////////////////

  center1 = createVector(545, 220);
  center2 = createVector(545, 285);
  center3 = createVector(545, 350);

  CIAbackground = new Sprite(width / 2 - 80, 285);
  CIAbackground.addImage(CIAbackgroundImg);
  CIAbackground.collider = 'k';
  CIAbackgroundImg.resize(300, 0);

  cards = new Group();
  cards.collider = 'k';

  Cybercrime = new Sprite(width / 2, 160 + 95);
  Cybercrime.addImage(CybercrimeImg);
  Cybercrime.collider = 'k';
  CybercrimeImg.resize(200, 0);

  winComp = new Sprite(width / 2, 160 + 95);
  winComp.addImage(winCompImg);
  winComp.collider = 'k';
  winCompImg.resize(200, 0);

  loseComp = new Sprite(width / 2, 160 + 95);
  loseComp.addImage(loseCompImg);
  loseComp.collider = 'k';
  loseCompImg.resize(200, 0);


  confidentiality = new cards.Sprite((width / 2 - 145), height - (height / 3) + 175);
  confidentiality.addImage(confidentialityImg);
  confidentiality.scale = 0.6;
  cards[0] = confidentiality;
  confidentiality.originalPosition = createVector(width / 2 - 145, height - (height / 3) + 175);

  integrity = new cards.Sprite(width / 2 - 60, height - (height / 3) + 95);
  integrity.addImage(integrityImg);
  integrity.scale = 0.6;
  cards[1] = integrity;
  integrity.originalPosition = createVector(width / 2 - 60, height - (height / 3) + 95);

  avability = new cards.Sprite(width / 2 + 33, height - (height / 3) + 175);
  avability.addImage(avabilityImg);
  avability.scale = 0.6;
  cards[2] = avability;
  avability.originalPosition = createVector(width / 2 + 33, height - (height / 3) + 175);

  integrity.pos = { x: -100, y: -100 };
  confidentiality.pos = { x: -100, y: -100 };
  avability.pos = { x: -100, y: -100 };
  CIAbackground.pos = { x: -200, y: -200 };
  Cybercrime.pos = { x: -400, y: -400 };
  winComp.pos = { x: -400, y: -400 };
  loseComp.pos = { x: -400, y: -400 };

  ////////////////////////////////////////////
  ////////////////// GAME 2 //////////////////
  ////////////////////////////////////////////


}


function draw() {
  // Set up the screen
  clear();
  background("white");


  if (screen === 0) {
    showStartScreen();
  }
  else if (screen === 1) {
    showInstructionScreen();
  }
  else if (screen === 2) {
    // Define the text content
    // Set text properties
    const c = color(0, 179, 115);
    stroke(0);
    strokeWeight(1);
    fill(255);
    rect(20, 10, 620, 74, 10);
    // Display text content
    textSize(12);
    noStroke();
    fill(0);
    textAlign(CENTER, TOP); // Text alignment
    text("\nThe security of a system can be characterized by three properties: Confidentiality, Integrity, and Availability (CIA). Match these terms to their definitions.", 30, 20, 600, 360);

    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);
    rect(width - 150, height - 45, 140, 40, 10);
    // Learn More Button
    noStroke();
    fill(c);
    rect(width - 150 + 1, height - 45 + 1, 138, 38, 10);       // Learn More Button Text
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Learn More", width - 80, height - 25);

    fill(c);
    rect(20, 100, 620, 370, 10);

    fill(255);
    rect(40, 120, 310, 330, 10);

    fill(255);
    noStroke();
    circle (center1.x, center1.y, 35);
    circle (center2.x, center2.y, 35);
    circle (center3.x, center3.y, 35);

    fill(0);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text("1", center1.x - 1, center1.y + 2);
    text("2", center2.x, center2.y + 2);
    text("3", center3.x, center3.y + 2);

    strokeWeight(5);
    stroke(0);
    line(365, center1.y, 440, center1.y);
    line(430, center1.y - 10, 440, center1.y);
    line(430, center1.y + 10, 440, center1.y);

    line(365, center2.y, 440, center2.y);
    line(430, center2.y - 10, 440, center2.y);
    line(430, center2.y + 10, 440, center2.y);

    line(365, center3.y, 440, center3.y);
    line(430, center3.y - 10, 440, center3.y);
    line(430, center3.y + 10, 440, center3.y);

    for (let card of cards) {
      handleDragging(card);
      snapToCenter(card);
    }
  }

  checkIfConfirm();
  //Check if we win!!!
  if (confirm && !cancel) {
    const c = color(0, 179, 115);
    fill(c);
    noStroke();
    rect((width / 2) - 140, height / 2 + 205, 300, 100, 10);
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text('Submit Answer?', width / 2 - 60, height - 80);
    fill(255);
    rect(width / 2 + 20, height / 2 + 250, 120, 40, 10);
    fill(0);
    textSize(17);
    text("Submit", width / 2 + 52, height / 2 + 272);
    fill(255);
    rect(width / 2 - 120, height / 2 + 250, 120, 40, 10);
    fill(0);
    text("Cancel", width / 2 - 90, height / 2 + 272);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen == 4) {
    showScreenLose();
  }
}

function showStartScreen() {
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  // Set text properties
  fill(255); // White color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("CIA Triad\n\n", width / 2, height / 2 - 200);
  
  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2 - 75, height / 2 + 120, 150, 40, 10);
  fill(0);
  textSize(20);
  text("Instructions", width / 2, height / 2 + 140);

  fill(255);
  rect(200, 100, 250, 300, 10);
}


function showInstructionScreen() {
  setCardsoffScreen();
  background("white");
  const c = color(0, 179, 115);
  // Set text properties
  fill(c); // Black color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions\n\n", width / 2, height / 2 - 200);

  // Begin button
  fill(c);
  rect(width / 2 - 50, height / 2 + 120, 100, 40, 10);
  fill(255);
  textSize(20);
  text("Begin", width / 2, height / 2 + 140);


  textSize(18); // Adjusted font size
  textAlign(CENTER, TOP); // Adjusted text alignment

  // Additional text
  fill(color(0));
  let textX = 50; // X position for the additional text
  let textY = height / 2 - 150; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = width - 100; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot. To play, click and hold on a card, then drag it to the numbered slot where you think it belongs. Release the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy. When all cards have been placed, you'll see an option to check your answers. If you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height


}

function showScreenWin() {
  // Move extra icons off screen when win page is up
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  //Set text properties
  fill(255, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!\n\nThanks for playing!", width / 2, height / 2 - 100);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }
  //Restart button
  fill(255);
  rect(width / 2 - 50, height / 2 + 120, 100, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height / 2 + 140);
}

function showScreenLose() {
  setCardsoffScreen();
  background("red");

  //Set text properties
  fill(255, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Not Quite!\n\nTry again?", width / 2, height / 2 - 100);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  // Instructions button
  fill(255);
  rect(width / 2 - 75, height / 2 + 120, 150, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height / 2 + 140);
}
