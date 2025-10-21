import axios from "axios";

// cliente Axios genérico
export const apiService = axios.create({
  baseURL: "https://sua-api.com/api", // Substituir pela URL base da API do perdo
  headers: {
    "Content-Type": "application/json",
  },
});
