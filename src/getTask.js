const AWS = require('aws-sdk');

const getTask = async(event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  //* Obteniendo parametro amigable de la url 
  const { id } = event.pathParameters;

  //* Consultando en la tabla TaskTable filtrando por id 
  const result = await dynamodb.get({
    TableName: 'TaskTable',
    Key: {
      id,
    }
  }).promise();

  //* Obteniendo tarea por id 
  const task = result.Item;


  return {
    statusCode: 200,
    body: JSON.stringify(task, null, 2)
  }
}

module.exports = {
  getTask
}