import axios from 'axios';
import { getEnv } from '../helpers';

const { VITE_API_URL } = getEnv();

export const api = axios.create({
  baseURL: VITE_API_URL,
});
