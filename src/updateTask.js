const AWS = require('aws-sdk');

const updateTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  //* Obteniendo parametro amigable de la url 
  const { id } = event.pathParameters;

  //* body del PUT
  const { done,title,description } = JSON.parse(event.body);



  //* Actualizando Item de DynamoDB
  await dynamodb.update({
    //* Tabla en donde se actualiza el Item 
    TableName: "TaskTable",
    //* Pasando PK del registro a actualizar 
    Key: {
      id
    },
    //* Definiendo expresion para definir las columnas a actualizar del Item 
    UpdateExpression: "set done = :done,title = :title,description = :description",
    //* Definiendo valores de las expresiones anteriores 
    ExpressionAttributeValues: {
      ":done": done,
      ":title": title,
      ":description": description,
    },
    //* Permite retornar el item actualizado 
    ReturnValues: "ALL_NEW"
  }).promise();
  
  return {
    statusCode: 200,
    body: JSON.stringify({message: "Task Updated"},null,2),
  }
}

module.exports = {
  updateTask,
}