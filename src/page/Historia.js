import { useState } from "react";

const Historia = () => {
    const [state, setState] = useState({
        edadGestacional: '',
        pesoPrevio: '',
        pesoActual: '',
        talla: '',
        etnia: '',
        causaIngreso: '',
        prevPatologias: '',
        numFetos: '',
        gestas: '',
        partos: '',
        cesareas: '',
        abortos: ''
    })
    console.log(state.pesoPrevio)

    return(
        <div>
            <h1>Historia del paciente</h1>
            <form>
                <div>
                    <label htmlFor="edadGestacional">Edad Gestacional </label>
                    <input id="edadGestacional" type="number" placeholder="semanas"/>
                    <input id="edadGestacional-dias" type="number" placeholder="dias"/>
                </div>
                <div>
                    <label htmlFor="pesoPrevio">Peso Previo </label>
                    <input id="pesoPrevio" onChange={e => setState({pesoPrevio: e.target.value})} type="number" placeholder="kilogramos"/><span> (kg)</span>
                </div>
                <div>
                    <label htmlFor="pesoActual">Peso Actual </label>
                    <input id="pesoActual" type="number" placeholder="kilogramos" /><span> (kg)</span>
                </div>
                <div>
                    <label htmlFor="talla">Talla </label>
                    <input id="talla" type="number" placeholder="centímetros" /><span> (cm)</span>
                </div>
            </form>
        </div>
    )
}

export default Historia;