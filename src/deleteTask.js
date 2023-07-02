const AWS = require('aws-sdk');

const deleteTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  //* Obteniendo parametro amigable de la url 
  const { id } = event.pathParameters;

  //* Eliminando item de dynamodb
  await dynamodb.delete({
    TableName: 'TaskTable',
    Key: {
      id,
    }
  }).promise();



  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Task Deleted" }, null, 2)
  }
}

module.exports = {
  deleteTask
}