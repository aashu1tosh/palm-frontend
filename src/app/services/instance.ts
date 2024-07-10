import axios, { AxiosInstance } from "axios";
import { environment } from "../environments/environment";


const instance: AxiosInstance = axios.create({
    baseURL: environment.apiUrl,
    timeout: 10000,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
instance.interceptors.request.use(async (config: any) => {
    const token = sessionStorage.getItem("accessToken") as string;
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default instance