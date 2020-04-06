'use strict';
const google = require('./google')
const config = require("./config")

const getAnswer = (answers, x) => answers[x].answer

module.exports.endpoint = async (event, context, callback) => {
  const jsonData = event.body ? JSON.parse(event.body) : event
  const answers = jsonData.twilio.collected_data.order_food 
    ? jsonData.twilio.collected_data.order_food.answers
    : jsonData.twilio.collected_data.item_details.answers; //Get the answers object from the incoming request object

  const sheet =  await google(config.sheetId, 0)
  
  const newRow = {
    'Address': getAnswer(answers, 'address'),
    'Contact': getAnswer(answers, 'contact'),
    'Name': getAnswer(answers, 'full_name'),
    'Age': getAnswer(answers, 'age'),
    'Items': getAnswer(answers, 'items')
  }

  console.log(newRow)

  await sheet.addRow(newRow);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Done`,
    }),
  };
  callback(null, response);
};
