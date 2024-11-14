import axios from "axios";

const httpClient = axios.create({ baseURL: "http://localhost:5000/api" });

export const getPhones = () => httpClient.get("/phones");

export const createPhone = (body) => httpClient.post("/phones", body);
