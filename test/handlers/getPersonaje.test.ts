import { handler } from '../../src/handlers/getPersonaje';
import * as swapiService from '../../src/services/swapiService';
import * as dynamodbService from '../../src/services/dynamodbService';

jest.mock('../../src/services/swapiService');
jest.mock('../../src/services/dynamodbService');

describe('getPersonaje handler', () => {
  it('should return a personaje from DynamoDB if it exists', async () => {
    const mockPersonaje = { id: '1', nombre: 'Luke Skywalker' };
    (dynamodbService.getItem as jest.Mock).mockResolvedValue(mockPersonaje);

    const result: any = await handler(
      { pathParameters: { id: '1' } } as any,
      {} as any,
      {} as any
    );

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockPersonaje);
  });

  it('should return a personaje from SWAPI if not in DynamoDB', async () => {
    const mockPersonaje = { id: '1', nombre: 'Luke Skywalker' };
    (dynamodbService.getItem as jest.Mock).mockResolvedValue(null);
    (swapiService.getPersonaje as jest.Mock).mockResolvedValue(mockPersonaje);

    const result: any = await handler(
      { pathParameters: { id: '1' } } as any,
      {} as any,
      {} as any
    );

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(mockPersonaje);
  });
});
