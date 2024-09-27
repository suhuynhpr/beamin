import { instance } from "./request";

export const login = async (body: any) => {
    return (await instance.post(`auth/login`, body));
};


