import axios from "axios";

const API_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_TOKEN?.replace(/'/g, '');

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

