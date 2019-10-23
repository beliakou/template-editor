const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/render', (req, res) => {
  console.log(req.body);
  var html = req.body.html;
  (async () => {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true
    });
    const page = await browser.newPage();
    await page.setContent(`${html}`);
    const buffer = await page.pdf({ path: 'hn.pdf', format: 'A4' });
    await browser.close();

    res.contentType('application/pdf');
    res.send(buffer);
  })();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));