import { APIGatewayProxyHandler } from 'aws-lambda';
import { getPersonaje } from '../services/swapiService';
import { getItem } from '../services/dynamodbService';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'ID de personaje no proporcionado' }),
      };
    }

    const localPersonaje = await getItem(id);
    if (localPersonaje) {
      return {
        statusCode: 200,
        body: JSON.stringify(localPersonaje),
      };
    }

    const swapiPersonaje = await getPersonaje(id);
    return {
      statusCode: 200,
      body: JSON.stringify(swapiPersonaje),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error interno del servidor' }),
    };
  }
};
