import axios from "axios";

const API_URL = "http://localhost:8011/api";

//definir las funciones a utilizar

// ANIMALES
export const getAnimales = async () => {
    const response = await axios.get(`${API_URL}/animales/all`);
    return response.data;
}

export const getAnimalById = async(id) => {
    const response = await axios.get(`${API_URL}/animales/find/${id}`);
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

// USUARIOS

export const getUsuarios = async () => {
    const response = await axios.get(`${API_URL}/usuarios/all`);
    return response.data;
}

export const getUsuarioById = async(id) => {
    const response = await axios.get(`${API_URL}/usuarios/find/${id}`);
    return response.data;
}

export const saveUsuario = async (usuario) => {
    const response = await axios.post(`${API_URL}/usuarios/save`, usuario);
    return response.data;
}

export const deleteUsuario = async (id) => {
    const response = await axios.delete(`${API_URL}/usuarios/delete/${id}`);
    return response.data;
}

export const updateUsuario = async (id,usuario) => {
    const response = await axios.put(`${API_URL}/usuarios/update/${id}`, usuario);
    return response.data;
}

// APADRINAMIENTOS

export const getApadrinamientos = async () => {
    const response = await axios.get(`${API_URL}/apadrinamientos/all`);
    return response.data;
}

export const getApadrinamientoById = async(id) => {
    const response = await axios.get(`${API_URL}/apadrinamientos/find/${id}`);
    return response.data;
}

export const getApadrinamientosByUsuarioId = async (id) => {
    const response = await axios.get(`${API_URL}/apadrinamientos/historial/${id}`);
    return response.data;
}

export const saveApadrinamiento = async (apadrinamiento) => {
    const response = await axios.post(`${API_URL}/apadrinamientos/save`, apadrinamiento);
    return response.data;
}

export const deleteApadrinamiento = async (id) => {
    const response = await axios.delete(`${API_URL}/apadrinamientos/delete/${id}`);
    return response.data;
}

export const updateApadrinamiento = async (id,apadrinamiento) => {
    const response = await axios.put(`${API_URL}/apadrinamientos/update/${id}`, apadrinamiento);
    return response.data;
}

// FORMULARIOS

export const getFormularios = async () => {
    const response = await axios.get(`${API_URL}/formularios/all`);
    return response.data;
}

export const getFormularioById = async(id) => {
    const response = await axios.get(`${API_URL}/formularios/find/${id}`);
    return response.data;
}

export const saveFormulario = async (formulario) => {
    const response = await axios.post(`${API_URL}/formularios/save`, formulario);
    return response.data;
}

export const deleteFormulario = async (id) => {
    const response = await axios.delete(`${API_URL}/formularios/delete/${id}`);
    return response.data;
}

export const updateFormulario = async (id,formulario) => {
    const response = await axios.put(`${API_URL}/formularios/update/${id}`, formulario);
    return response.data;
}

// ESPECIES

export const getEspecies = async () => {
    const response = await axios.get(`${API_URL}/especies/all`);
    return response.data;
}

export const getEspecieById = async(id) => {
    const response = await axios.get(`${API_URL}/especies/find/${id}`);
    return response.data;
}

export const saveEspecie = async (especie) => {
    const response = await axios.post(`${API_URL}/especies/save`, especie);
    return response.data;
}

export const deleteEspecie = async (id) => {
    const response = await axios.delete(`${API_URL}/especies/delete/${id}`);
    return response.data;
}

export const updateEspecie = async (id,especie) => {
    const response = await axios.put(`${API_URL}/especies/update/${id}`, especie);
    return response.data;
}

// CATEGORIAS

export const getCategorias = async () => {
    const response = await axios.get(`${API_URL}/categorias/all`);
    return response.data;
}

export const getCategoriaById = async(id) => {
    const response = await axios.get(`${API_URL}/categorias/find/${id}`);
    return response.data;
}

export const saveCategoria = async (categoria) => {
    const response = await axios.post(`${API_URL}/categorias/save`, categoria);
    return response.data;
}

export const deleteCategoria = async (id) => {
    const response = await axios.delete(`${API_URL}/categorias/delete/${id}`);
    return response.data;
}

export const updateCategoria = async (id,categoria) => {
    const response = await axios.put(`${API_URL}/categorias/update/${id}`, categoria);
    return response.data;
}

// COMUNAS

export const getComunas = async () => {
    const response = await axios.get(`${API_URL}/comunas/all`);
    return response.data;
}

export const getComunaById = async(id) => {
    const response = await axios.get(`${API_URL}/comunas/find/${id}`);
    return response.data;
}

export const saveComuna = async (comuna) => {
    const response = await axios.post(`${API_URL}/comunas/save`, comuna);
    return response.data;
}

export const deleteComuna = async (id) => {
    const response = await axios.delete(`${API_URL}/comunas/delete/${id}`);
    return response.data;
}

export const updateComuna = async (id,comuna) => {
    const response = await axios.put(`${API_URL}/comunas/update/${id}`, comuna);
    return response.data;
}

// DIRECCIONES

export const getDirecciones = async () => {
    const response = await axios.get(`${API_URL}/direcciones/all`);
    return response.data;
}

export const getDireccionById = async(id) => {
    const response = await axios.get(`${API_URL}/direcciones/find/${id}`);
    return response.data;
}

export const getDireccionesByUsuarioId = async (id) => {
    const response = await axios.get(`${API_URL}/direcciones/por-usuario/${id}`);
    return response.data;
}

export const saveDireccion = async (direccion) => {
    const response = await axios.post(`${API_URL}/direcciones/save`, direccion);
    return response.data;
}

export const deleteDireccion = async (id) => {
    const response = await axios.delete(`${API_URL}/direcciones/delete/${id}`);
    return response.data;
}

export const updateDireccion = async (id,direccion) => {
    const response = await axios.put(`${API_URL}/direcciones/update/${id}`, direccion);
    return response.data;
}

// ESTADOS DE APADRINAMIENTO

export const getEstadosApadrinamiento = async () => {
    const response = await axios.get(`${API_URL}/estados-apadrinamiento/all`);
    return response.data;
}

export const getEstadoApadrinamientoById = async(id) => {
    const response = await axios.get(`${API_URL}/estados-apadrinamiento/find/${id}`);
    return response.data;
}

export const saveEstadoApadrinamiento = async (estadoApadrinamiento) => {
    const response = await axios.post(`${API_URL}/estados-apadrinamiento/save`, estadoApadrinamiento);
    return response.data;
}

export const deleteEstadoApadrinamiento = async (id) => {
    const response = await axios.delete(`${API_URL}/estados-apadrinamiento/delete/${id}`);
    return response.data;
}

export const updateEstadoApadrinamiento = async (id,estadoApadrinamiento) => {
    const response = await axios.put(`${API_URL}/estados-apadrinamiento/update/${id}`, estadoApadrinamiento);
    return response.data;
}

// ESTADOS DE CONSERVACION DE ANIMALES

export const getEstadosConservacion = async () => {
    const response = await axios.get(`${API_URL}/estados-conservacion/all`);
    return response.data;
}

export const getEstadoConservacionById = async(id) => {
    const response = await axios.get(`${API_URL}/estados-conservacion/find/${id}`);
    return response.data;
}

export const saveEstadoConservacion = async (estadoConservacion) => {
    const response = await axios.post(`${API_URL}/estados-conservacion/save`, estadoConservacion);
    return response.data;
}

export const deleteEstadoConservacion = async (id) => {
    const response = await axios.delete(`${API_URL}/estados-conservacion/delete/${id}`);
    return response.data;
}

export const updateEstadoConservacion = async (id,estadoConservacion) => {
    const response = await axios.put(`${API_URL}/estados-conservacion/update/${id}`, estadoConservacion);
    return response.data;
}

// ESTADOS DE FORMULARIOS

export const getEstadosFormulario = async () => {
    const response = await axios.get(`${API_URL}/estados-formulario/all`);
    return response.data;
}

export const getEstadoFormularioById = async(id) => {
    const response = await axios.get(`${API_URL}/estados-formulario/find/${id}`);
    return response.data;
}

export const saveEstadoFormulario = async (estadoFormulario) => {
    const response = await axios.post(`${API_URL}/estados-formulario/save`, estadoFormulario);
    return response.data;
}

export const deleteEstadoFormulario = async (id) => {
    const response = await axios.delete(`${API_URL}/estados-formulario/delete/${id}`);
    return response.data;
}

export const updateEstadoFormulario = async (id,estadoFormulario) => {
    const response = await axios.put(`${API_URL}/estados-formulario/update/${id}`, estadoFormulario);
    return response.data;
}

// METODOS DE PAGO

export const getMetodoPago = async () => {
    const response = await axios.get(`${API_URL}/metodos-pago/all`);
    return response.data;
}

export const getMetodoPagoById = async(id) => {
    const response = await axios.get(`${API_URL}/metodos-pago/find/${id}`);
    return response.data;
}

export const getMetodoPagoByUsuarioId = async (id) => {
    const response = await axios.get(`${API_URL}/metodos-pago/por-usuario/${id}`);
    return response.data;
}

export const saveMetodoPago = async (metodoPago) => {
    const response = await axios.post(`${API_URL}/metodos-pago/save`, metodoPago);
    return response.data;
}

export const deleteMetodoPago = async (id) => {
    const response = await axios.delete(`${API_URL}/metodos-pago/delete/${id}`);
    return response.data;
}

export const updateMetodoPago = async (id,metodoPago) => {
    const response = await axios.put(`${API_URL}/metodos-pago/update/${id}`, metodoPago);
    return response.data;
}

// RANGOS DE EXPERIENCIA PARA FORMULARIOS

export const getRangosExperiencia = async () => {
    const response = await axios.get(`${API_URL}/rangos-experiencia/all`);
    return response.data;
}

export const getRangoExperienciaById = async(id) => {
    const response = await axios.get(`${API_URL}/rangos-experiencia/find/${id}`);
    return response.data;
}

export const saveRangoExperiencia = async (rangoExperiencia) => {
    const response = await axios.post(`${API_URL}/rangos-experiencia/save`, rangoExperiencia);
    return response.data;
}

export const deleteRangoExperiencia = async (id) => {
    const response = await axios.delete(`${API_URL}/rangos-experiencia/delete/${id}`);
    return response.data;
}

export const updateRangoExperiencia = async (id,rangoExperiencia) => {
    const response = await axios.put(`${API_URL}/rangos-experiencia/update/${id}`, rangoExperiencia);
    return response.data;
}

// REGIONES


export const getRegiones = async () => {
    const response = await axios.get(`${API_URL}/regiones/all`);
    return response.data;
}

export const getRegionById = async(id) => {
    const response = await axios.get(`${API_URL}/regiones/find/${id}`);
    return response.data;
}

export const saveRegion = async (region) => {
    const response = await axios.post(`${API_URL}/regiones/save`, region);
    return response.data;
}

export const deleteRegion = async (id) => {
    const response = await axios.delete(`${API_URL}/regiones/delete/${id}`);
    return response.data;
}

export const updateRegion = async (id,region) => {
    const response = await axios.put(`${API_URL}/regiones/update/${id}`, region);
    return response.data;
}
