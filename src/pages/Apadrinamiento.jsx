import { useEffect } from "react";


import '../css/apadrinamiento.css'

const Apadrinamiento = () => {

    useEffect(() => {
        const scripts = [
            '/js/animal.js',
            '/js/productoAnimal.js',
            '/js/script.js'
        ]

        scripts.forEach(src =>{
            if (!document.querySelector(`script[src="${src}"]`)) {
            console.log("no está cargado")
            const sc = document.createElement('script')
            sc.src = src
            sc.async = true
            if(src === '/js/script.js'){
                sc.onload = () => {
                    if(renderCatalogo){
                        renderCatalogo()
                    }
                }
            }
            document.body.appendChild(sc)
            }
        })
    }, [])

    return (
        <main>
            <section className="galeria">
                <h2>Apadrina algún animal !</h2>
                <div className="contenedor">

                    {/* 1 */}
                    <div className="ficha">
                        <img className="animal" src="img/Lama guanicoe.jpeg" 
                        alt="Lama guanicoe" width="200" height="150"/>
                        <h3>Minga</h3>
                        <hr/>
                        <p> Especie: Lama guanicoe <br/> <br/> Ungulado andino clave en los ecosistemas de altura.</p>
                        <p>⚠️ En peligro: Caza furtiva y pérdida de hábitat.</p>
                        <p>Fue Rescatada tras ser encontrada herida por un ataque de perros en una zona rural.</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(1)}/>
                    </div>

                    {/* 2 */}
                    <div className="ficha">
                        <img className="animal" src="img/Athene.jpg" 
                        alt="Athene cunicularia" width="200" height="150"/>
                        <h3>Rumi</h3>
                        <hr/>
                        <p> Especie: Athene cunicularia <br/> <br/> Búho terrestre que habita en madrigueras y es activo de
                            día.</p>
                        <p>⚠️ En peligro: Destrucción de suelos y madrigueras por agricultura.</p>
                        <p>Llegó Trasladado por CONAF luego de que su madriguera fuese destruida por maquinaria</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(2)}/>
                    </div>

                    {/* 3 */}
                    <div className="ficha">
                        <img className="animal" src="img/Lycalopex.jpg" 
                        alt="Lycalopex griseus" width="200" height="150"/>
                        <h3>Lycan</h3>
                        <hr/>
                        <p>
                            Especie: Lycalopex griseus
                            <br/>
                            <br/>
                            Cánido pequeño que ayuda a controlar plagas de roedores.
                        </p>
                        <p>⚠️ En peligro: Perseguido por creencias y caza por su piel.</p>
                        <p>Rescatado de una familia que lo mantenía como mascota ilegal.</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(3)}/>
                    </div>

                    {/* 4 */}
                    <div className="ficha">
                        <img className="animal" src="img/Puma concolor.jpg" 
                        alt="Puma concolor" width="200" height="150"/>
                        <h3>Huilo</h3>
                        <hr/>
                        <p>
                            Especie: Puma concolor
                            <br/>
                            <br/>
                            Gran felino sudamericano, depredador tope en la cadena trófica.
                        </p>
                        <p>⚠️ En peligro: Conflictos con humanos y reducción de hábitat.</p>
                        <p>Encontrado cachorro tras la caza de su madre por proteger ganado.</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(4)}/>
                    </div>

                    {/* 5 */}
                    <div className="ficha">
                        <img className="animal" src="img/Parabuteo.jpg" 
                        alt="Parabuteo unicinctus" width="200" height="150"/>
                        <h3>Terra</h3>
                        <hr/>
                        <p>
                            Especie: Parabuteo unicinctus
                            <br/>
                            <br/>
                            Ave rapaz social, poco común entre halcones, suele cazar en grupo
                        </p>
                        <p>⚠️ En peligro: Tráfico ilegal de fauna y pérdida de hábitats.</p>
                        <p>Incautado en un operativo contra cetrería ilegal en el norte de Chile.</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(5)}/>
                    </div>

                    {/* 6 */}
                    <div className="ficha">
                        <img className="animal" src="img/Phocoena.jpeg" 
                        alt="Phocoena sinus" width="200" height="150"/>
                        <h3>Luna</h3>
                        <hr/>
                        <p>
                            Especie: Phocoena sinus
                            <br/>
                            <br/>
                            La marsopa más pequeña del mundo, endémica del golfo de California.
                        </p>
                        <p>⚠️ En peligro: Captura incidental en redes de pesca.</p>
                        <p>Encontrada enmallada en una red abandonada, sobrevivió gracias al rescate.</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(6)}/>
                    </div>

                    {/* 7 */}
                    <div className="ficha">
                        <img className="animal" src="img/Beluga.jpg" 
                        alt="Delphinapterus leucas" width="200" height="150"/>
                        <h3>Nieve</h3>
                        <hr/>
                        <p>
                            Especie: Delphinapterus leucas
                            <br/>
                            <br/>
                            Cetáceo blanco del Ártico, muy social y comunicativo.
                        </p>
                        <p>⚠️ En peligro: Cambio climático y contaminación acústica en mares polares.</p>
                        <p>Trasladada a un centro de rehabilitación luego de varar debilitada en aguas frías del sur.</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(7)}/>
                    </div>

                    {/* 8 */}
                    <div className="ficha">
                        <img className="animal" src="img/Narval.jpg" 
                        alt="Monodon monoceros" width="200" height="150"/>
                        <h3>Spike</h3>
                        <hr/>
                        <p>
                            Especie: Monodon monoceros
                            <br/>
                            <br/>
                            Ballena dentada famosa por su largo colmillo en espiral.
                        </p>
                        <p>⚠️ En peligro: Derretimiento del hielo ártico y caza históric</p>
                        <p>Rescatado tras quedar atrapado en aguas poco profundas debido al retroceso del hielo.</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(8)}/>
                    </div>


                    {/* 9 */}
                    <div className="ficha">
                        <img className="animal" src="img/Pingüino de Humboldt.webp" 
                        alt="Spheniscus humboldti" width="200" height="150"/>
                        <h3>Chilly</h3>
                        <hr/>
                        <p>
                            Especie: Spheniscus humboldti
                            <br/>
                            <br/>
                            Pingüino costero del norte de Chile y Perú.
                        </p>
                        <p>⚠️ En peligro: Sobrepesca de anchovetas y pérdida de lugares de anidación.</p>
                        <p>Encontrado cubierto de petróleo tras un derrame cerca de la costa.</p>
                        <input type="button" value="Agregar" onClick={()=> agregarAnimal(9)}/>
                    </div>
                </div>
            </section>

            <section className="carrito">
                Carrito: <label id="pie">0</label>
                <br/>
                Items: <span id="items">0</span>
                <br/>
                Total: $<span id="total">0</span>
            </section>
        </main>
    )
}
export default Apadrinamiento;