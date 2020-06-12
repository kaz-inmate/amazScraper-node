const info = require('./info');
const scrapper = require('./scrapper');


scrapper.getData(info.baseUrl, (data, res) => {
    if (res) {
        console.log(data)
    }

    //TODO: Add the data to a spreadsheet
});


