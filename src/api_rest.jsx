import axios from "axios";

const BASE_URL = "http://localhost:8011";

const api = axios.create({
    baseURL: BASE_URL,
});

// INTERCEPTOR
// Antes de enviar cualquier solicitud, revisa si hay un token guardado
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Buscamos el token en el navegador
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Se lo pegamos a la cabecera
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- FUNCIONES DE AUTENTICACIÓN (LOGIN Y REGISTRO) ---

export const loginUsuario = async (credenciales) => {
    // Ruta: http://localhost:8011/auth/iniciar-sesion
    const response = await api.post("/auth/iniciar-sesion", credenciales);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

export const registrarUsuario = async (usuario) => {
    // Ruta: http://localhost:8011/auth/registrar
    const response = await api.post("/auth/registrar", usuario);
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

export const logoutUsuario = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirige al usuario
};

// ----------------------------------------------------

// ANIMALES
export const getAnimales = async () => {
    const response = await api.get("/api/animales/all");
    return response.data;
}

export const getAnimalById = async(id) => {
    const response = await api.get(`/api/animales/find/${id}`);
    return response.data;
}

export const saveAnimal = async (animal) => {
    const response = await api.post("/api/animales/save", animal);
    return response.data;
}

export const deleteAnimal = async (id) => {
    const response = await api.delete(`/api/animales/delete/${id}`);
    return response.data;
}

export const updateAnimal = async (id, animal) => {
    const response = await api.put(`/api/animales/update/${id}`, animal);
    return response.data;
}

// USUARIOS

export const getUsuarios = async () => {
    const response = await api.get("/api/usuarios/all");
    return response.data;
}

export const getUsuarioById = async(id) => {
    const response = await api.get(`/api/usuarios/find/${id}`);
    return response.data;
}

export const saveUsuario = async (usuario) => {
    const response = await api.post("/api/usuarios/save", usuario);
    return response.data;
}

export const deleteUsuario = async (id) => {
    const response = await api.delete(`/api/usuarios/delete/${id}`);
    return response.data;
}

export const updateUsuario = async (id, usuario) => {
    const response = await api.put(`/api/usuarios/update/${id}`, usuario);
    return response.data;
}

// APADRINAMIENTOS

export const getApadrinamientos = async () => {
    const response = await api.get("/api/apadrinamientos/all");
    return response.data;
}

export const getApadrinamientoById = async(id) => {
    const response = await api.get(`/api/apadrinamientos/find/${id}`);
    return response.data;
}

export const getApadrinamientosByUsuarioId = async (id) => {
    const response = await api.get(`/api/apadrinamientos/historial/${id}`);
    return response.data;
}

export const saveApadrinamiento = async (apadrinamiento) => {
    const response = await api.post("/api/apadrinamientos/save", apadrinamiento);
    return response.data;
}

export const deleteApadrinamiento = async (id) => {
    const response = await api.delete(`/api/apadrinamientos/delete/${id}`);
    return response.data;
}

export const updateApadrinamiento = async (id, apadrinamiento) => {
    const response = await api.put(`/api/apadrinamientos/update/${id}`, apadrinamiento);
    return response.data;
}

// FORMULARIOS

export const getFormularios = async () => {
    const response = await api.get("/api/formularios/all");
    return response.data;
}

export const getFormularioById = async(id) => {
    const response = await api.get(`/api/formularios/find/${id}`);
    return response.data;
}

export const saveFormulario = async (formulario) => {
    const response = await api.post("/api/formularios/save", formulario);
    return response.data;
}

export const deleteFormulario = async (id) => {
    const response = await api.delete(`/api/formularios/delete/${id}`);
    return response.data;
}

export const updateFormulario = async (id, formulario) => {
    const response = await api.put(`/api/formularios/update/${id}`, formulario);
    return response.data;
}

// ESPECIES

export const getEspecies = async () => {
    const response = await api.get("/api/especies/all");
    return response.data;
}

export const getEspecieById = async(id) => {
    const response = await api.get(`/api/especies/find/${id}`);
    return response.data;
}

export const saveEspecie = async (especie) => {
    const response = await api.post("/api/especies/save", especie);
    return response.data;
}

export const deleteEspecie = async (id) => {
    const response = await api.delete(`/api/especies/delete/${id}`);
    return response.data;
}

export const updateEspecie = async (id, especie) => {
    const response = await api.put(`/api/especies/update/${id}`, especie);
    return response.data;
}

// CATEGORIAS

export const getCategorias = async () => {
    const response = await api.get("/api/categorias/all");
    return response.data;
}

export const getCategoriaById = async(id) => {
    const response = await api.get(`/api/categorias/find/${id}`);
    return response.data;
}

export const saveCategoria = async (categoria) => {
    const response = await api.post("/api/categorias/save", categoria);
    return response.data;
}

export const deleteCategoria = async (id) => {
    const response = await api.delete(`/api/categorias/delete/${id}`);
    return response.data;
}

export const updateCategoria = async (id, categoria) => {
    const response = await api.put(`/api/categorias/update/${id}`, categoria);
    return response.data;
}

// COMUNAS

export const getComunas = async () => {
    const response = await api.get("/api/comunas/all");
    return response.data;
}

export const getComunaById = async(id) => {
    const response = await api.get(`/api/comunas/find/${id}`);
    return response.data;
}

export const saveComuna = async (comuna) => {
    const response = await api.post("/api/comunas/save", comuna);
    return response.data;
}

export const deleteComuna = async (id) => {
    const response = await api.delete(`/api/comunas/delete/${id}`);
    return response.data;
}

export const updateComuna = async (id, comuna) => {
    const response = await api.put(`/api/comunas/update/${id}`, comuna);
    return response.data;
}

// DIRECCIONES

export const getDirecciones = async () => {
    const response = await api.get("/api/direcciones/all");
    return response.data;
}

export const getDireccionById = async(id) => {
    const response = await api.get(`/api/direcciones/find/${id}`);
    return response.data;
}

export const getDireccionesByUsuarioId = async (id) => {
    const response = await api.get(`/api/direcciones/por-usuario/${id}`);
    return response.data;
}

export const saveDireccion = async (direccion) => {
    const response = await api.post("/api/direcciones/save", direccion);
    return response.data;
}

export const deleteDireccion = async (id) => {
    const response = await api.delete(`/api/direcciones/delete/${id}`);
    return response.data;
}

export const updateDireccion = async (id, direccion) => {
    const response = await api.put(`/api/direcciones/update/${id}`, direccion);
    return response.data;
}

// ESTADOS DE APADRINAMIENTO

export const getEstadosApadrinamiento = async () => {
    const response = await api.get("/api/estados-apadrinamiento/all");
    return response.data;
}

export const getEstadoApadrinamientoById = async(id) => {
    const response = await api.get(`/api/estados-apadrinamiento/find/${id}`);
    return response.data;
}

export const saveEstadoApadrinamiento = async (estadoApadrinamiento) => {
    const response = await api.post("/api/estados-apadrinamiento/save", estadoApadrinamiento);
    return response.data;
}

export const deleteEstadoApadrinamiento = async (id) => {
    const response = await api.delete(`/api/estados-apadrinamiento/delete/${id}`);
    return response.data;
}

export const updateEstadoApadrinamiento = async (id, estadoApadrinamiento) => {
    const response = await api.put(`/api/estados-apadrinamiento/update/${id}`, estadoApadrinamiento);
    return response.data;
}

// ESTADOS DE CONSERVACION DE ANIMALES

export const getEstadosConservacion = async () => {
    const response = await api.get("/api/estados-conservacion/all");
    return response.data;
}

export const getEstadoConservacionById = async(id) => {
    const response = await api.get(`/api/estados-conservacion/find/${id}`);
    return response.data;
}

export const saveEstadoConservacion = async (estadoConservacion) => {
    const response = await api.post("/api/estados-conservacion/save", estadoConservacion);
    return response.data;
}

export const deleteEstadoConservacion = async (id) => {
    const response = await api.delete(`/api/estados-conservacion/delete/${id}`);
    return response.data;
}

export const updateEstadoConservacion = async (id, estadoConservacion) => {
    const response = await api.put(`/api/estados-conservacion/update/${id}`, estadoConservacion);
    return response.data;
}

// ESTADOS DE FORMULARIOS

export const getEstadosFormulario = async () => {
    const response = await api.get("/api/estados-formulario/all");
    return response.data;
}

export const getEstadoFormularioById = async(id) => {
    const response = await api.get(`/api/estados-formulario/find/${id}`);
    return response.data;
}

export const saveEstadoFormulario = async (estadoFormulario) => {
    const response = await api.post("/api/estados-formulario/save", estadoFormulario);
    return response.data;
}

export const deleteEstadoFormulario = async (id) => {
    const response = await api.delete(`/api/estados-formulario/delete/${id}`);
    return response.data;
}

export const updateEstadoFormulario = async (id, estadoFormulario) => {
    const response = await api.put(`/api/estados-formulario/update/${id}`, estadoFormulario);
    return response.data;
}

// METODOS DE PAGO

export const getMetodoPago = async () => {
    const response = await api.get("/api/metodos-pago/all");
    return response.data;
}

export const getMetodoPagoById = async(id) => {
    const response = await api.get(`/api/metodos-pago/find/${id}`);
    return response.data;
}

export const getMetodoPagoByUsuarioId = async (id) => {
    const response = await api.get(`/api/metodos-pago/por-usuario/${id}`);
    return response.data;
}

export const saveMetodoPago = async (metodoPago) => {
    const response = await api.post("/api/metodos-pago/save", metodoPago);
    return response.data;
}

export const deleteMetodoPago = async (id) => {
    const response = await api.delete(`/api/metodos-pago/delete/${id}`);
    return response.data;
}

export const updateMetodoPago = async (id, metodoPago) => {
    const response = await api.put(`/api/metodos-pago/update/${id}`, metodoPago);
    return response.data;
}

// RANGOS DE EXPERIENCIA PARA FORMULARIOS

export const getRangosExperiencia = async () => {
    const response = await api.get("/api/rangos-experiencia/all");
    return response.data;
}

export const getRangoExperienciaById = async(id) => {
    const response = await api.get(`/api/rangos-experiencia/find/${id}`);
    return response.data;
}

export const saveRangoExperiencia = async (rangoExperiencia) => {
    const response = await api.post("/api/rangos-experiencia/save", rangoExperiencia);
    return response.data;
}

export const deleteRangoExperiencia = async (id) => {
    const response = await api.delete(`/api/rangos-experiencia/delete/${id}`);
    return response.data;
}

export const updateRangoExperiencia = async (id, rangoExperiencia) => {
    const response = await api.put(`/api/rangos-experiencia/update/${id}`, rangoExperiencia);
    return response.data;
}

// REGIONES

export const getRegiones = async () => {
    const response = await api.get("/api/regiones/all");
    return response.data;
}

export const getRegionById = async(id) => {
    const response = await api.get(`/api/regiones/find/${id}`);
    return response.data;
}

export const saveRegion = async (region) => {
    const response = await api.post("/api/regiones/save", region);
    return response.data;
}

export const deleteRegion = async (id) => {
    const response = await api.delete(`/api/regiones/delete/${id}`);
    return response.data;
}

export const updateRegion = async (id, region) => {
    const response = await api.put(`/api/regiones/update/${id}`, region);
    return response.data;
}