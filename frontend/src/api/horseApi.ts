import axios from "axios";
import { Horse, HorseRequest } from "../types/Horse";

const BASE_URL = "/api/horses";

export const getAllHorses = async (): Promise<Horse[]> => {
  const response = await axios.get<Horse[]>(BASE_URL);
  return response.data;
};

export const createHorse = async (payload: HorseRequest): Promise<Horse> => {
  const response = await axios.post<Horse>(BASE_URL, payload);
  return response.data;
};

export const updateHorse = async (
  id: number,
  payload: Partial<HorseRequest>,
): Promise<Horse> => {
  const response = await axios.put<Horse>(`${BASE_URL}/${id}`, payload);
  return response.data;
};

export const getHorseById = async (id: number): Promise<Horse> => {
  const response = await axios.get<Horse>(`${BASE_URL}/${id}`);
  return response.data;
};
