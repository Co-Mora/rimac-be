import { APIGatewayProxyHandler } from 'aws-lambda';
import { putItem } from '../services/dynamodbService';
import { Personaje } from '../models/personaje';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Datos del personaje no proporcionados',
        }),
      };
    }

    const personaje: Personaje = JSON.parse(event.body);
    personaje.id = personaje.id || Date.now().toString();

    await putItem(personaje);

    return {
      statusCode: 201,
      body: JSON.stringify(personaje),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno del servidor' }),
    };
  }
};
