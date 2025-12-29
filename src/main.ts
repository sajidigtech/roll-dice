import { Application, Sprite, Graphics, Text, Assets, AnimatedSprite, Texture, Container } from "pixi.js";


const app = new Application();

await app.init({
  width: 800,
  height: 800,
  backgroundColor: 0x1099bb,
})


const divContainer = document.getElementById("pixi-container")!;
divContainer.appendChild(app.canvas);



const diceSheet = await Assets.load("assets/rollDice.json");


const DisplayTexture: Record<number, Texture> = {
  1: Texture.from("roll_4_0"),
  2: Texture.from("roll_4_4"),
  3: Texture.from("roll_7_0"),
  4: Texture.from("roll_1_0"),
  5: Texture.from("roll_4_12"),
  6: Texture.from("roll_4_8"),
};







const diceSprite = new AnimatedSprite(diceSheet.animations["roll"]);

diceSprite.anchor.set(0.5);

diceSprite.x = app.screen.width / 2;
diceSprite.y = app.screen.height / 2;

diceSprite.animationSpeed = 0.29;
diceSprite.scale.set(1.5)

diceSprite.loop = true;
// diceSprite.play();

app.stage.addChild(diceSprite);

// yahan tk dice ka kaam hai bs 


// now i want ki button bnau

// ================= BUTTON =================

const button = new Graphics();
button.roundRect(0, 0, 120, 40, 8);
button.fill(0x222222);

button.x = 5;
button.y = 5;
button.eventMode = "static";
button.cursor = "pointer";

app.stage.addChild(button);

const buttonText = new Text("Roll Dice", { fontSize: 16, fill: 0xffffff })
buttonText.anchor.set(0.5);
buttonText.x = button.x + 60;
buttonText.y = button.y + 20;
app.stage.addChild(buttonText);


const historyContainer = new Container();
historyContainer.x = button.x + 140; // button ke side
historyContainer.y = button.y;

app.stage.addChild(historyContainer);






const historyBox = new Graphics();
historyBox.roundRect(0, 0, 40, 40, 10);
historyBox.fill(0x000000, 0.4);
historyContainer.addChild(historyBox);

const historyText = new Text("-", {

  fontSize: 16,
  fill: 0xffffff,

});

historyText.anchor.set(0.5);
historyText.x = 20;
historyText.y = 20;
historyContainer.addChild(historyText);

const updateHistory = (value: number) => {

  historyText.text = value.toString();

}


let isRolling = false;
let displaySprite: Sprite | null = null; // store the current number display
const rollDiceFunction = async () => {

  if (isRolling) return
  if (displaySprite) {
    app.stage.removeChild(displaySprite);
    displaySprite.destroy();
    displaySprite = null;
  }

  diceSprite.visible = true;
  diceSprite.play()

  const rollDuration = 1000 + Math.random() * 1000;

  isRolling = true;



  setTimeout(() => {

    diceSprite.stop();
    diceSprite.visible = false; // hide rolling animation

    const finalNumber = Math.floor(Math.random() * 6) + 1;

    // Create new sprite for final number
    displaySprite = new Sprite(DisplayTexture[finalNumber]);
    displaySprite.anchor.set(0.5);
    displaySprite.x = app.screen.width / 2;
    displaySprite.y = app.screen.height / 2;
    displaySprite.scale.set(1.5);

    app.stage.addChild(displaySprite);

    isRolling = false;

    console.log("data : ", finalNumber)
    updateHistory(finalNumber);







  }, rollDuration)

}

button.on("pointerdown", rollDiceFunction)


// dom model for bet u can use place bet type esa !
// number set and all !










const amountInput = document.getElementById("bet-amount") as HTMLInputElement;
const expectedInput = document.getElementById("expected-number") as HTMLInputElement;
const placeBetBtn = document.getElementById("place-bet")!;
const resultText = document.getElementById("result-text")!;


let betAmount = 1;
let expectedNumber = 1;
let isBetPlaced = false;

expectedInput.addEventListener("input", () => {
  const value = Number(expectedInput.value);

  if (value >= 1 && value <= 6) {
    expectedNumber = value;
  } else {
    expectedNumber = 0;
  }
});


amountInput.addEventListener("input", () => {
  const value = Number(amountInput.value);
  betAmount = value > 0 ? value : 1;
});



placeBetBtn.addEventListener("click", () => {
  if (betAmount <= 0) {
    resultText.innerText = "❌ Enter valid amount";
    resultText.className = "lose";
    return;
  }

  if (expectedNumber < 1 || expectedNumber > 6) {
    resultText.innerText = "❌ Choose number 1 - 6";
    resultText.className = "lose";
    return;
  }

  isBetPlaced = true;
  resultText.innerText = "🎲 Rolling...";
  resultText.className = "";

  placeBetRollDice(betAmount, expectedNumber);

  
});


const placeBetRollDice = (betAmount: number, expectedNumber: number) => {
  if (isRolling) return;

  isRolling = true;

  if (displaySprite) {
    app.stage.removeChild(displaySprite);
    displaySprite.destroy();
    displaySprite = null;
  }

  diceSprite.visible = true;
  diceSprite.play();

  const rollDuration = 1000 + Math.random() * 1000;

  setTimeout(() => {
    diceSprite.stop();
    diceSprite.visible = false;

    const finalNumber = Math.floor(Math.random() * 6) + 1;

    displaySprite = new Sprite(DisplayTexture[finalNumber]);
    displaySprite.anchor.set(0.5);
    displaySprite.x = app.screen.width / 2;
    displaySprite.y = app.screen.height / 2;
    displaySprite.scale.set(1.5);

    app.stage.addChild(displaySprite);

    updateHistory(finalNumber);

    // 🎯 BET RESULT CHECK
    if (expectedNumber === finalNumber) {
      const winAmount = betAmount * 10;
      resultText.innerText = `🎉 You WON ₹${winAmount}`;
      resultText.className = "win";
    } else {
      resultText.innerText = "❌ You Lost";
      resultText.className = "lose";
    }

    isRolling = false;
    isBetPlaced = false;

  }, rollDuration);
};
