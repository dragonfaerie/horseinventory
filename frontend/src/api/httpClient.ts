import axios from "axios";
import { supabase } from "../lib/supabaseClient";

const apiClient = axios.create();

apiClient.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  if (anonKey) {
    config.headers = config.headers ?? {};
    config.headers.apikey = anonKey;
  }

  return config;
});

export default apiClient;
