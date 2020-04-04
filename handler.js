'use strict';
const google = require('./google')
const config = require("./config")

module.exports.endpoint = async (event, context, callback) => {
  const jsonData = event.body ? JSON.parse(event.body) : event
  const answers = jsonData.twilio.collected_data.item_details.answers; //Get the answers object from the incoming request object

  const objectKeys = Object.keys(answers)
    .map(key => (key)) //Get a list of all keys within "answers" object

  const sheet =  await google(config.sheetId, 0)
  
  const newRow = {}
  objectKeys.forEach((x) => {
    newRow[x] = answers[x].answer;
  })
  await sheet.addRow(newRow);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Done`,
    }),
  };
  callback(null, response);
};
