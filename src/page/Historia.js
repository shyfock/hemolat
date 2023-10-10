import { set } from "firebase/database";
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
    // const [dias, setDias] = useState();
    const [semanas, setSemanas] = useState();
    const names = Object.keys(state); 
    console.log(names, state)

    return(
        <div className="container">
            <h1>Historia del paciente</h1>
            <NavLink to={"/patient"}>Regresar...</NavLink>
            <form>
                <div className="input-line">
                    <label htmlFor="edadGestacional">Edad Gestacional </label>
                    <input id="edadGestacional" onChange={e => setSemanas(e.target.value)} type="number" placeholder="semanas"/>
                    <input id="edadGestacional-dias" onChange={e => setState({edadGestacional: parseFloat(semanas) + parseFloat(e.target.value)/7})} type="number" placeholder="dias"/>
                </div>
                <div className="input-line">
                    <label htmlFor="pesoPrevio">Peso Previo </label>
                    <input id="pesoPrevio" onChange={e => setState({pesoPrevio: parseFloat(e.target.value)})} type="number" placeholder="kilogramos"/><span> kilogramos </span>
                </div>
                <div className="input-line">
                    <label htmlFor="pesoActual">Peso Actual </label>
                    <input id="pesoActual" onChange={e => setState({pesoActual: parseFloat(e.target.value)})} type="number" placeholder="kilogramos" /><span> kilogramos </span>
                </div>
                <div className="input-line">
                    <label htmlFor="talla">Talla </label>
                    <input id="talla" onChange={e => setState({talla: parseFloat(e.target.value)})} type="number" placeholder="centímetros" /><span> centímetros </span>
                </div>
                <div className="input-line">
                    <label htmlFor="etnia">Etnia </label>
                    <select id="etnia" onChange={e => setState({etnia: e.target.value})}>
                        <option value="default">Seleccione...</option>
                        <option value="No aplica">No Aplica</option>
                        <option value="Afro">Afro</option>
                        <option value="Indígena">Indígena</option>
                        <option value="Otro">Otro (¿Cúal?)</option>
                    </select>
                    {state.etnia === 'Otro' ?
                        <input id="other-etnia" /> : null
                    }
                </div>
                <div className="input-line">
                    <label htmlFor="causaIngreso">Causa de Ingreso </label>
                    <select id="causaIngreso" onChange={e => setState({causaIngreso: e.target.value})}>
                        <option value="default">Seleccione...</option>
                        <option value="Trabajo de parto">Trabajo de parto</option>
                        <option value="THIE">THIE</option>
                        <option value="Preeclampsia / Eclampsia">Preeclampsia / Eclampsia</option>
                        <option value="HELLP">HELLP</option>
                        <option value="Sepsis">Sepsis</option>
                        <option value="Diabetes gestacional">Diabetes gestacional</option>
                        <option value="Acretismo placentario">Acretismo placentario</option>
                        <option value="Otro">Otro (¿Cúal?)</option>
                    </select>
                    {state.causaIngreso === 'Otro' ?
                        <input id="other-causaIngreso" /> : null
                    }
                </div>
                <div className="input-line">
                    <label htmlFor="prevPatologias">Patologías previas </label>
                    <select id="prevPatologias" onChange={e => setState({prevPatologias: e.target.value})}>
                        <option value="default">Seleccione...</option>
                        <option value="HTA">HTA</option>
                        <option value="Diabetes">Diabetes</option>
                        <option value="Asma / EPOC">Asma / EPOC</option>
                        <option value="Hipotiroidismo">Hipotiroidismo</option>
                        <option value="Tabaquismo">Tabaquismo</option>
                        <option value=">Alcoholismo">Alcoholismo</option>
                        <option value="Consumo de SPA">Consumo de SPA</option>
                        <option value="Otro">Otro (¿Cúal?)</option>
                    </select>
                    {state.prevPatologias === 'Otro' ?
                        <input id="other-prevPatologias" /> : null
                    }
                </div>
                <div className="input-line">
                    <label htmlFor="numFetos">Número de fetos </label>
                    <select id="numFetos" onChange={e => setState({numFetos: parseInt(e.target.value)})}>
                        <option value="default">Seleccione...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className="input-line">
                    <label htmlFor="gestas">Gestas </label>
                    <input id="gestas" onChange={e => setState({gestas: parseInt(e.target.value)})} type="number" placeholder="Número de embarazo"/>
                </div>
                <div className="input-line">
                    <label htmlFor="partos">Partos </label>
                    <input id="partos" onChange={e => setState({partos: parseInt(e.target.value)})} type="number" placeholder="Número de partos previos"/>
                </div>
                <div className="input-line">
                    <label htmlFor="cesareas">Cesáreas </label>
                    <input id="cesareas" onChange={e => setState({cesareas: parseInt(e.target.value)})} type="number" placeholder="Número de cesáreas previas"/>
                </div>
                <div className="input-line">
                    <label htmlFor="abortos">Abortos </label>
                    <input id="abortos" onChange={e => setState({abortos: parseInt(e.target.value)})} type="number" placeholder="Número de abortos previos"/>
                </div>
            </form>
        </div>
    )
}

export default Historia;