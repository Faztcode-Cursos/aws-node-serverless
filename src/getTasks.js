const AWS = require('aws-sdk');

const getTasks = async (event) => { 
  //* Instancia de dynamodb 
  const dynamodb = new AWS.DynamoDB.DocumentClient(); 

  //* Operacion scan para obtener todas las tareas 
  const results = await dynamodb.scan({
    TableName: 'TaskTable'
  }).promise();

  //* todas las tareas 
  const tasks = results.Items;

  return {
    statusCode: 200,
    body: JSON.stringify(tasks, null, 2)
  }
}

module.exports = {
  getTasks
}