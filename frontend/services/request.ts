import axios, { AxiosResponse } from "axios";

const API_URL = "http://127.0.0.1:5000";

export type { AxiosResponse as Response };
export default axios.create({ baseURL: API_URL });
