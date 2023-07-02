const AWS = require('aws-sdk');
const { v4 } = require('uuid');

//* Contiene los Middlewares para parsear el body de un lambda, validar, etc. 
const middy = require('@middy/core');
//* Parsea un body 
const jsonBodyParser = require('@middy/http-json-body-parser'); 


const addTask = async (event) => {
  //* Conexion que nos permite acceder a dynamodb a traves de nuestro perfil por default de AWS  
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  
  //* body del POST 
  const { title, description } = event.body;
  
  const createdAt = new Date();
  const id = v4();
  
  //* Item a insertar 
  const newTask = {
    id,
    title,
    description,
    createdAt,
    done: false
  }

  //* Insertando Item a DynamoDB
  await dynamodb.put({
    //* Tabla en donde se inserta el Item 
    TableName: "TaskTable",
    //* Item a insertar
    Item: newTask
  }).promise();
  
  return {
    statusCode: 200,
    body: JSON.stringify(newTask, null, 2)
  }
}

module.exports = {
  //* Antes de exportar la funcion lambda se usa el Middleware para parsear el body 
  addTask: middy(addTask).use(jsonBodyParser()),
};
