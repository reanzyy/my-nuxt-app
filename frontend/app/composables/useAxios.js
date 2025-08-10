import axios from 'axios';

export default function useAxios() {

  const config = useRuntimeConfig();

  let api = axios.create({
    baseURL: config.public.API_URL + '/api',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    withCredentials: true,
    withXSRFToken: true,
  });

  async function csrf() {
    return await api.get(config.public.API_URL + "/sanctum/csrf-cookie");
  }


  return {
    api, csrf
  }
}