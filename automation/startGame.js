// Creates a game and has 5 players join it

const puppeteer = require('puppeteer');

var joinGame = async function (b, name, joinCode) {
    const page = await b.newPage()
    await page.goto('http://localhost:3000/play')
    await page.waitForSelector('#joinCode')
    const joinCodeInput = await page.$('#joinCode')
    await joinCodeInput.type(joinCode)
    const nameInput = await page.$('#name')
    await nameInput.type(name)
    const btn = await page.$('button')
    await btn.click()
};

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/host');
    const clickRoles = [2, 3, 5, 7]
    await page.waitFor(() => {
        const joinCode = document.querySelector('h1')
        return joinCode && joinCode.innerHTML.length
    })
    const h1 = await page.$('h1')
    const joinCode = await (await h1.getProperty('innerHTML')).jsonValue();
    for (const id of clickRoles) {
        let btn = await page.$(`#\\3${id}`)
        await btn.click()
    }
    for(let i = 0; i < 5; i++) {
        await joinGame(browser, i.toString(), joinCode)
    }
    await page.bringToFront()
    // const startButton = await page.$('button')
    // await startButton.click()
})();
