import { instance } from "./request";

export const getCategories = async (page: number, limit: number) => {
  return await instance.get(`/category/?page=${page}&limit=${limit}`);
};

export const getCategoryById = async (id: number) => {
  return await instance.get(`/category/${id}`);
};


export const createCategory = async (body: any) => {
  return (await instance.post(`/category`, body));
};

export const updateCategory = async (id: number, body: any) => {
  return (await instance.put(`/category/${id}`, body));
};



export const deleteCategory = async (id: any) => {
  return (await instance.delete(`/category/${id}`));
};

