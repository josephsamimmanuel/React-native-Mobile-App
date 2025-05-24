import { axiosInstance } from "./index";

// get movies
export const getMovies = async () => {
    const response = await axiosInstance.get("/discover/movie?sort_by=popularity.desc");
    return response.data;
}

// get search movies
export const getSearchMovies = async (movie) => {
    const response = await axiosInstance.get(`/search/movie?query=${encodeURIComponent(movie)}`);
    return response.data;
}

// get movie details
export const getMovieDetails = async (id) => {
    const response = await axiosInstance.get(`/movie/${id}`);
    return response.data;
}


