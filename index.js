const puppeteer = require("puppeteer");
const dotenv = require('dotenv');
dotenv.config()

let browser;
let page;

async function testLogin() {
  browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  page = await browser.newPage();
  await page.goto("http://klickflow.klickersgroup.com/login.html");
  await page.waitForSelector("#username");
  //Enter Username........
  await page.type("#username", process.env.username);
  //Enter Password.....
  await page.type("#password", process.env.password);
  //Click to login button..
  await page.click(".login-btn-new");

  //Wait Timeout
  await page.waitForTimeout(10000);

  //ScreeShot AllPage
  await page.screenshot({ path: "allpage.png" });

  //ScreenShot Selection
  const logo = await page.$(
    "#page-content-wrapper > div.main-header > div > div > div:nth-child(1) > div > a"
  );

  //Save Images PNG
  await logo.screenshot({ path: "partialpage.png" });

  // //Save PDF
  // await page.waitForTimeout(10000);
  // await page.emulateMediaType("print");
  // await page.pdf({
  //   format: "A4",
  //   path: "sample.pdf",
  //   printBackground: true,
  // });

  await browser.close();
}

testLogin();
