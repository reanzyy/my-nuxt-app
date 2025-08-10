import axios from 'axios';

export default function useAxios() {

  const config = useRuntimeConfig();

  let api = axios.create({
    baseURL: config.public.apiBase,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    withCredentials: true,
    withXsrfToken: true,
  });

  return api;
}