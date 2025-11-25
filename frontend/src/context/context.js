import { createContext } from "react";
import axios from "axios";

const BACKEND_URL = null;
const api = axios.create({ baseURL: BACKEND_URL });

export const AppContext = createContext({
  BACKEND_URL,
  api
});