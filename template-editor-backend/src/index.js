const pdf = require('html-pdf');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/render', (req, res) => {
    console.log(req.body);
    // var html = req.body.html;
    html = '<!DOCTYPE html><html><head><style>* { box-sizing: border-box; } body {margin: 0;}.gjs-row{display:flex;justify-content:flex-start;align-items:stretch;flex-wrap:nowrap;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;max-height:100%;}.gjs-cell{padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;min-height:15px;max-height:100%;flex-grow:1;flex-basis:100%;}#i92p{padding:10px;}@media (max-width: 768px){.gjs-row{flex-wrap:wrap;}}</style></head><body><div class="gjs-row"><div class="gjs-cell"></div><div class="gjs-cell"><div id="i92p">Insert your text here</div></div><div class="gjs-cell"></div></div></body></html>';
    pdf.create(html, {})
        .toBuffer((err, buffer) => {
            console.log('This is a buffer:', Buffer.isBuffer(buffer));
            res.contentType('application/pdf');
            res.send(buffer);
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));