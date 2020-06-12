const info = require('./info');
const scrapper = require('./scrapper');
const json2xls = require('json2xls');
const fs = require('fs');
const filename = 'amazScrap.xlsx';

scrapper.getData(info.baseUrl, (data, res) => {
    if (res) {
        console.log(data)
    }

    // saving to a spreadsheet
    let xls = json2xls(data);
    fs.writeFileSync(filename, xls, 'binary', (err) => {
       if (err) {
             console.log("writeFileSync :", err);
        }
      console.log("file saved");
   });
});


