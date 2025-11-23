import { useState, useEffect } from "react";
// Importamos las funciones de tu archivo api_rest
import { saveFormulario, getRangosExperiencia } from "../api_rest";

function Formulario() {
    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    
    const [listaRangos, setListaRangos] = useState([]);
    const [experienciaId, setExperienciaId] = useState(""); 
    
    const [descripcion, setDescripcion] = useState("");
    const [cv, setCv] = useState(null);
    const [respuesta, setRespuesta] = useState("");

    // Cargar los rangos de experiencia al iniciar
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await getRangosExperiencia();
                setListaRangos(datos); 
            } catch (error) {
                console.error("Error al cargar rangos:", error);
                setRespuesta("Error cargando opciones del servidor.");
            }
        };
        cargarDatos();
    }, []);

    const enviarForm = async (e) => {
        e.preventDefault();
        setRespuesta(""); 

        const errores = [];
        if (!nombre.trim()) errores.push("Nombre es requerido.");
        if (!correo.trim()) errores.push("Correo es requerido.");
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.push("Correo inválido.");
        
        if (!experienciaId) errores.push("Selecciona años de experiencia.");
        if (!descripcion.trim()) errores.push("Cuéntanos algo sobre ti.");

        if (errores.length) {
            setRespuesta(errores.join(" "));
            return;
        }

        // OBJETO PARA ENVIAR A SPRING BOOT
        const formularioDTO = {
            nombreCompleto: nombre,       
            correoElectronico: correo,    
            motivacion: descripcion,      
            urlCv: null,                  
            
            // 1. Rango de Experiencia (Seleccionado por el usuario)
            rangoExperiencia: {
                idRangoExperiencia: parseInt(experienciaId) 
            },

            // 2. Estado del Formulario (Automático: Siempre es "Pendiente" ID 1)
            estadoFormulario: {
                idEstadoFormulario: 1 
            }
        };

        try {
            console.log("Enviando payload:", formularioDTO);
            await saveFormulario(formularioDTO);
            
            setRespuesta(`Gracias ${nombre}, tu postulación fue enviada con éxito.`);

            // Limpiar campos
            setNombre('');
            setCorreo('');
            setExperienciaId('');
            setDescripcion('');
            setCv(null);
            e.target.reset();

        } catch (error) {
            console.error("Error al enviar formulario:", error);
            setRespuesta("Hubo un error al guardar. Verifica que el Estado con ID 1 exista en la base de datos.");
        }
    }

    return (
        <main>
            <div className="accesorio-form">
                <img src="/img/accesorio-form.png" alt="accesorio de postulacion" />
            </div>

            <section className="seccion-postulacion">
                <h2>¿Quieres ser parte de U Can Save?</h2>
                <p>
                    Si te apasiona la conservación animal y quieres aportar tus conocimientos o experiencia, ¡postula aquí!
                </p>
                <hr />
                <form onSubmit={enviarForm} className="formulario-postulacion">
                    <label htmlFor="nombre">
                        <span className="etiqueta-formulario">Nombre completo</span>
                        <input type="text" name="nombre" id="nombre" className="input-formulario" placeholder="Ej: Juan Pérez"
                            value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </label>

                    <label htmlFor="correo">
                        <span className="etiqueta-formulario">Correo electrónico</span>
                        <input type="email" name="correo" id="correo" className="input-formulario" placeholder="ejemplo@correo.com"
                            value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </label>

                    <label htmlFor="experiencia">
                        <span className="etiqueta-formulario">Años de experiencia</span>
                        <select 
                            name="experiencia" 
                            id="experiencia" 
                            className="input-formulario"
                            value={experienciaId} 
                            onChange={(e) => setExperienciaId(e.target.value)}
                        >
                            <option value="">-- Selecciona una opción --</option>
                            {listaRangos.map((rango) => (
                                <option key={rango.idRangoExperiencia} value={rango.idRangoExperiencia}>
                                    {rango.descripcionRango}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="descripcion">
                        <span className="etiqueta-formulario">Cuéntanos más sobre ti</span>
                        <textarea name="descripcion" id="descripcion" className="input-formulario" rows="3" placeholder="¿Qué te motiva?"
                            value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                    </label>

                    <label htmlFor="cv">
                        <span className="etiqueta-formulario">Adjunta tu CV (Opcional)</span>
                        <input name="cv" id="cv" type="file" className="input-formulario"
                            onChange={(e) => setCv(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                    </label>

                    <button type="submit" className="boton-formulario">Postular</button>
                </form>

                {respuesta && <p role="alert" style={{ marginTop: 12, fontWeight: "bold" }}>{respuesta}</p>}
            </section>
        </main>
    );
}

export default Formulario;