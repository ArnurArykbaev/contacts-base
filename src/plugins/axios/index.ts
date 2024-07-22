import axios, { AxiosInstance } from "axios";

const url = '';

const instance: AxiosInstance = axios.create({
    baseURL: url,
});

export default instance;