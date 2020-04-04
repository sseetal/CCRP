const { GoogleSpreadsheet } = require('google-spreadsheet');

const load = async (id, sheetIndex) => {
    let doc = new GoogleSpreadsheet(id);
    const json = require('./google.json');
    await doc.useServiceAccountAuth(json);
    await doc.loadInfo();
    return doc.sheetsByIndex[sheetIndex];
}

module.exports = load;