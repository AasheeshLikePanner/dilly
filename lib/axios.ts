// lib/axios.ts
import axios from 'axios';

const instance = axios.create({
  withCredentials: true, // This ensures cookies are sent with cross-origin requests
});

export default instance;
