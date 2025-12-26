import { Application, Graphics, Text } from "pixi.js";


const app = new Application();

await app.init({
  width: 500,
  height: 500,
  backgroundColor: 0x1099bb,
})


const divContainer = document.getElementById("pixi-container")!;
divContainer.appendChild(app.canvas);


// app initiated

// now : 


// dice box : 

const dice = new Graphics();
dice.label = "Dice";
dice.roundRect(0, 0, 100, 100, 12).fill(0xffffff);
dice.pivot.set(50, 50);  

dice.x = 200;
dice.y = 130;

app.stage.addChild(dice);

const diceText = new Text("1", {
  fontSize: 48,
  fill: 0x000000,
  fontWeight: "bold",
});

diceText.anchor.set(0.5);

// same center as dice
diceText.x = dice.x;
diceText.y = dice.y;

app.stage.addChild(diceText);

// now button create : 

const button = new Graphics();
button.roundRect(0, 0, 140, 50, 10);
button.fill(0x222222);
button.x = 130;
button.y = 250;
button.eventMode = "static";
button.cursor = "pointer";
app.stage.addChild(button);



const buttonText = new Text("ROLL DICE", {
  fontSize: 18,
  fill: 0xffffff,
});

buttonText.anchor.set(0.5);
buttonText.x = button.x + 70;
buttonText.y = button.y + 25;
app.stage.addChild(buttonText);







let isRolling = false;
let rollInterval: any = null;

button.on("pointerdown", () => {
  if (isRolling) return;
  isRolling = true;

  rollInterval = setInterval(() => {
    const random = Math.floor(Math.random() * 6) + 1;
    diceText.text = random.toString();

    dice.rotation += 0.3;
    dice.scale.set(1.1);
  }, 50); // every 50ms

  setTimeout(() => {
    clearInterval(rollInterval);

    dice.rotation = 0;
    dice.scale.set(1);

    diceText.text = (Math.floor(Math.random() * 6) + 1).toString();
    isRolling = false;
  }, 800); // roll duration
});