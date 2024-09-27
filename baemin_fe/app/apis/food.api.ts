import { instance } from "./request";

export const getFoods = async (page?: number, limit?: number, search?: string) => {
    return await instance.get(`/foods/?page=${page ?? 1}&limit=${limit ?? 1000}&search=${search ?? ""}`);
};


