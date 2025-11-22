import axios from "axios";

const API_URL = "http://localhost:8011/api";

//definir las funciones a utilizar

// ANIMALES
export const getAnimales = async () => {
    const response = await axios.get(`${API_URL}/animales/all`);
    return response.data;
}

export const saveAnimal = async (animal) => {
    const response = await axios.post(`${API_URL}/animales/save`, animal);
    return response.data;
}

export const deleteAnimal = async (id) => {
    const response = await axios.delete(`${API_URL}/animales/delete/${id}`);
    return response.data;
}

export const updateAnimal = async (id,animal) => {
    const response = await axios.put(`${API_URL}/animales/update/${id}`, animal);
    return response.data;
}
