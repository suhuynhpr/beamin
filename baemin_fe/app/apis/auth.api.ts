import { instance } from "./request";

export const login = async (body: any) => {
    return (await instance.post(`auth/login`, body));
};


export const register = async (body: any) => {
    return (await instance.post(`auth/signup`, body));
};


export const refreshToken = async (body: any) => {
    return (await instance.post(`auth/refresh`, body));
};


export const getAuthUser = async () => {
    return (await instance.get(`auth/user`));
};

