this is a roll dice game : 
just for brief understanding of pixi.js workflow
without using dom model , only using pixi js tried to implement spritesheet animation and generate random value and based on that random value the number on dice will be shown



assets should be in public folder : 
diceSheet.png -> spritesheet
rollDice.json -> atlas for the spritesheet

below concept is used when the setTimeout stops :
const DisplayTexture: Record<number, Texture> = {
  1: Texture.from("roll_4_0"),
  2: Texture.from("roll_4_4"),
  3: Texture.from("roll_7_0"),
  4: Texture.from("roll_1_0"),
  5: Texture.from("roll_4_12"),
  6: Texture.from("roll_4_8"),
};