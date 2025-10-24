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

        const errores = [];
        if (!nombre.trim()) errores.push("Nombre es requerido.");
        if (!correo.trim()) errores.push("Correo es requerido.");
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.push("Correo inválido.");
        if (!experiencia || !experiencia.trim()) errores.push("Selecciona años de experiencia.");
        if (!descripcion.trim()) errores.push("Cuéntanos algo sobre ti.");
        if (!cv) errores.push("Adjunta tu CV.");

        if (errores.length) {
            setRespuesta(errores.join(" "));
            return;
        }

        console.log({ nombre, correo, experiencia, descripcion, cv });
        setRespuesta(`Gracias ${nombre || "postulante"}, tu postulación fue enviada.`);

        setNombre('');
        setCorreo('');
        setExperiencia('Menos de un año');
        setDescripcion('');
        setCv(null);
        e.target.reset();
    }

    return (
        <main>
            <div className="accesorio-form">
                <img src="/img/accesorio-form.png" alt="accesorio de postulacion" />
            </div>

            <section className="seccion-postulacion">
                <h2>¿Quieres ser parte de U Can Save?</h2>
                <p>
                    Si te apasiona la conservación animal y quieres aportar tus conocimientos o experiencia, ¡postula aquí
                    para ser voluntario o colaborador! Buscamos personas comprometidas que deseen ayudar en áreas como tecnología,
                    difusión, gestión o trabajo directo con santuarios y animales rescatados.
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
                        <select name="experiencia" id="experiencia" className="input-formulario"
                            value={experiencia} onChange={(e) => setExperiencia(e.target.value)}>
                            <option>Menos de un año</option>
                            <option>1 - 2 años</option>
                            <option>2 - 4 años</option>
                            <option>4 - 7 años</option>
                            <option>7 - 10 años</option>
                            <option>Más de 10 años</option>
                        </select>
                    </label>

                    <label htmlFor="descripcion">
                        <span className="etiqueta-formulario">Cuéntanos más sobre ti</span>
                        <textarea name="descripcion" id="descripcion" className="input-formulario" rows="3" placeholder="¿Qué te motiva?"
                            value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                    </label>

                    <label htmlFor="cv">
                        <span className="etiqueta-formulario">Adjunta tu CV</span>
                        <input name="cv" id="cv" type="file" className="input-formulario"
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