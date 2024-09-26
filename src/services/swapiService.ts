import axios from 'axios';
import { translateAttributes } from '../utils/translator';

const SWAPI_BASE_URL = 'https://swapi.py4e.com/api';

export async function getPersonaje(id: string): Promise<any> {
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/${id}/`);
    return translateAttributes(response.data);
  } catch (error) {
    console.error('Error fetching from SWAPI:', error);
    throw error;
  }
}
