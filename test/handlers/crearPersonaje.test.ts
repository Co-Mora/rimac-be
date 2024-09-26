import { handler } from '../../src/handlers/crearPersonaje';
import * as dynamodbService from '../../src/services/dynamodbService';

jest.mock('../../src/services/dynamodbService');

describe('crearPersonaje handler', () => {
  it('should create a new personaje', async () => {
    const mockPersonaje = { nombre: 'Nuevo Personaje' };
    (dynamodbService.putItem as jest.Mock).mockResolvedValue(undefined);

    const result: any = await handler(
      { body: JSON.stringify(mockPersonaje) } as any,
      {} as any,
      {} as any
    );

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toHaveProperty('id');
    expect(JSON.parse(result.body).nombre).toBe('Nuevo Personaje');
  });

  it('should return 400 if no body is provided', async () => {
    const result: any = await handler({} as any, {} as any, {} as any);

    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toHaveProperty(
      'message',
      'Datos del personaje no proporcionados'
    );
  });
});
