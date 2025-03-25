import apiClient from '../utils/apiClient';
import { Producto } from "../types/interfaces";

export const getCategories = async () => {
    const response = await apiClient.get('/GetAllCategories');
    return response.data;
};

export const getProducts = async (page: number, limit: number) => {
    const response = await apiClient.get(`/GetAllPaginatedProducts/${page}/${limit}`);
    return response.data;
};

export const getAllProducts = async () => {
    const response = await apiClient.get(`/GetAllProducts`);
    return response.data;
};

export const updateProduct = async (product: Producto) => {
    try {
        const response = await apiClient.put('/UpdateProduct', product);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export const deleteProduct = async (id: number) => {
    const response = await apiClient.delete(`/DeleteProduct/${id}`);
    return response.data;
};

export const createProduct = async (product: Producto) => {
    try {
        const response = await apiClient.post('/CreateProduct', product);
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};
