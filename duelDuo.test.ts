
import { Builder, Capabilities, By } from "selenium-webdriver"
import { SequelizeScopeError } from "sequelize/dist"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test("choice options should show up when clicking on draw", async () => {
   const drawButton = await driver.findElement(By.id('draw'));
   drawButton.click();
   driver.sleep(1000);
   const choices = await driver.findElement(By.id('choices'));
   const choicesDisplayed = await choices.isDisplayed()
   expect(choicesDisplayed).toBeTruthy();
});

test("assert that clicking on Add To Duo button makes player dueo card to show up", async () => {
    const drawButton = await driver.findElement(By.id('draw'));
    drawButton.click();
    driver.sleep(1000);
    const choices = await driver.findElement(By.id('choices'));
    const botCardOutline = await choices.findElement(By.className("bot-card outline"));
    
    const AddToDuoButton = await botCardOutline.findElement(By.className("bot-btn"));
    AddToDuoButton.click();
    driver.sleep(1000);
    const playerDuoCard = await driver.findElement(By.id('player-duo')); 
    const duoCardDisplayed = await playerDuoCard.isDisplayed();
    expect(duoCardDisplayed).toBeTruthy();
    
})

test("assert that when a bot is Removed from Duo, that it goes back to choices", async () => {
    const drawButton = await driver.findElement(By.id('draw'));
    drawButton.click();
    driver.sleep(3000);
    let choices = await driver.findElement(By.id('choices'));
    let botCardOutlineList = await choices.findElements(By.className("bot-card outline"));
    //if no card is added to duo, it will be 5
    expect(botCardOutlineList.length).toBe(5);

    const botCardOutline = await choices.findElement(By.className("bot-card outline"));
    
    const AddToDuoButton = await botCardOutline.findElement(By.className("bot-btn"));
    AddToDuoButton.click();
    
    driver.sleep(3000);
    const updateList = await choices.findElements(By.className("bot-card outline"));
    console.log("updateList: ", updateList.length);
    //after adding a card to duo, the list will have 4 elements instead
    expect(updateList.length).toBe(4);
    const playerDuoCard = await driver.findElement(By.id('player-duo')); 
    const activeBotCardOutline = await playerDuoCard.findElement(By.className("bot-card outline"));
    const removeDuoButton = await activeBotCardOutline.findElement(By.className("bot-btn"));
    removeDuoButton.click();

    driver.sleep(3000);
    //after removing the duo, the card list length returns to 5
    const newBotList = await choices.findElements(By.className("bot-card outline"));
    expect(newBotList.length).toBe(5);
})
