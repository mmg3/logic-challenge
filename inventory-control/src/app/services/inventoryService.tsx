import { Movimiento } from '../types/interfaces';
import apiClient from '../utils/apiClient';

export const getMovementByProductId = async (id: number) => {
    const response = await apiClient.get(`/GetMovementByProductId/${id}`);
    return response.data;
};

export const createMovement = async (movement: Movimiento) => {
    try {
        const response = await apiClient.post('/AddMovement', movement);
        return response.data;
    } catch (error) {
        console.error("Error creating movement:", error);
        throw error;
    }
};