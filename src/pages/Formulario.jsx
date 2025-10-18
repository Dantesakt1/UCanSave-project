import { useState } from "react";

function Formulario() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [experiencia, setExperiencia] = useState("Menos de un año");
    const [descripcion, setDescripcion] = useState("");
    const [cv, setCv] = useState(null);
    const [respuesta, setRespuesta] = useState("");

    const enviarForm = (e) => {
        e.preventDefault();
        // aquí puedes enviar por fetch/FormData si quieres subir el CV
        console.log({ nombre, correo, experiencia, descripcion, cv });
        setRespuesta(`Gracias ${nombre || "postulante"}, tu postulación fue enviada.`);

        setNombre('');
        setCorreo('');
        setExperiencia('Menos de un año');
        setDescripcion('');
        setCv(null);
        e.target.reset();    
    };

    return (
        <main>
            <section className="seccion-postulacion">
                <h2>¿Quieres ser parte de U Can Save?</h2>
                <p>
                    Si te apasiona la conservación animal y quieres aportar tus conocimientos o experiencia, ¡postula aquí
                    para ser voluntario o colaborador! Buscamos personas comprometidas que deseen ayudar en áreas como tecnología,
                    difusión, gestión o trabajo directo con santuarios y animales rescatados.
                </p>
                <hr />
                <form onSubmit={enviarForm} method="POST" encType="multipart/form-data" className="formulario-postulacion">
                    <label>
                        <span className="etiqueta-formulario">Nombre completo</span>
                        <input required name="nombre" type="text" className="input-formulario" placeholder="Ej: Juan Pérez"
                            value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </label>

                    <label>
                        <span className="etiqueta-formulario">Correo electrónico</span>
                        <input required name="correo" type="email" className="input-formulario" placeholder="ejemplo@correo.com"
                            value={correo} onChange={(e) => setCorreo(e.target.value)} />
                    </label>

                    <label>
                        <span className="etiqueta-formulario">Años de experiencia</span>
                        <select required name="experiencia" className="input-formulario"
                            value={experiencia} onChange={(e) => setExperiencia(e.target.value)}>
                            <option>Menos de un año</option>
                            <option>1 - 2 años</option>
                            <option>2 - 4 años</option>
                            <option>4 - 7 años</option>
                            <option>7 - 10 años</option>
                            <option>Más de 10 años</option>
                        </select>
                    </label>

                    <label>
                        <span className="etiqueta-formulario">Cuéntanos más sobre ti</span>
                        <textarea name="descripcion" className="input-formulario" rows="3" placeholder="¿Qué te motiva?"
                            value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                    </label>

                    <label>
                        <span className="etiqueta-formulario">Adjunta tu CV</span>
                        <input required name="cv" type="file" className="input-formulario"
                            onChange={(e) => setCv(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
                    </label>

                    <button type="submit" className="boton-formulario">Postular</button>
                </form>

                {respuesta && <p role="alert" style={{ marginTop: 12 }}>{respuesta}</p>}
            </section>
        </main>
    );
}

export default Formulario;