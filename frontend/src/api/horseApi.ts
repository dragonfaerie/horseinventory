import axios from 'axios';
import { Horse } from '../types/Horse';

const BASE_URL = '/api/models/';

export const getAllHorses = async (): Promise<Horse[]> => {
const response = await axios.get<Horse[]>(BASE_URL);
return response.data;
};
