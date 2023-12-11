import { getDatabase, push, ref, set } from "firebase/database";
import { useContext, useState } from "react";
import InputLine from "../component/InputLine";
import UniqueSelection from "../component/UniqueSelection";
import MultipleSelection from "../component/MultipleSelection";
import { PatientUid } from "../functions/search";
import { useNavigate } from "react-router-dom";


async function writeHistoryData({state}, patientUid) {
    const db = getDatabase();
    await set(push(ref(db, 'patients/' + patientUid + '/history')), {
        ...state
    })
}

const Historia = () => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(false);
    const pId = useContext(PatientUid);
    const navigate = useNavigate()
    console.log(state)
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await writeHistoryData({state}, pId)
            .then((data) => {
                setLoading(false)
                console.log('Se ha creado registro de historia')
                navigate("/patient/search")
            })
            .catch(error => console.log(error.code))
        
        Array.from(
            document.querySelectorAll('input')
        ).forEach(input => {
            input.value = "";
        })
        console.log(state)
    }

    return(
        <div className="container">
            <h1 className="display-6">Historia del paciente</h1>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <div className="input-group mb-3">
                    <span className="input-group-text"><label htmlFor="edadGestacional">Edad Gestacional</label></span>
                    <input 
                        className="form-control"
                        id="edadGestacional" 
                        min="1"
                        onChange={e => setState(
                            prevState => (
                                {
                                    ...prevState,
                                    edadGestacional: prevState.edadGestacional ?
                                    parseFloat(prevState.edadGestacional - Math.trunc(prevState.edadGestacional)) + parseInt(e.target.value)
                                    :
                                    parseInt(e.target.value)
                                }
                            
                            ))} 
                        type="number" 
                        placeholder="semanas"/>
                    <input 
                        className="form-control"
                        id="edadGestacional-dias" 
                        min="0"
                        max="7"
                        onChange={e => setState(
                            prevState => (
                                {
                                    ...prevState, 
                                    edadGestacional: prevState.edadGestacional ?
                                    parseInt(prevState.edadGestacional) + parseFloat(e.target.value)/7
                                    :
                                    parseFloat(e.target.value)/7
                                }
                            )
                        )} 
                        type="number" 
                        placeholder="dias"
                    />
                </div>
                <InputLine 
                    state={setState}
                    name="pesoPrevio"
                    type="number"
                    text="Peso previo"
                    placeholder="kilogramos"
                    units="kg"
                />
                <InputLine 
                    state={setState}
                    name="pesoActual"
                    type="number"
                    text="Peso actual"
                    placeholder="kilogramos"
                    units="kg"
                />
                <InputLine 
                    state={setState}
                    name="talla"
                    type="number"
                    text="Talla"
                    placeholder="centímetros"
                    units="cm"
                />
                <UniqueSelection 
                    state={setState}
                    item="etnia"
                    text="Etnia"
                    options={["No Aplica", "Afro", "Indígena", "Otro"]}
                />
                <MultipleSelection
                    state={setState}
                    group="Causa de ingreso"
                    options={[
                        "Trabajo de parto",
                        "THIE",
                        "Preeclampsia / Eclampsia",
                        "HELLP",
                        "Sepsis",
                        "Diabetes gestacional",
                        "Acretismo placentario",
                        "Otro"
                    ]}
                />
                <MultipleSelection
                    state={setState}
                    group="Patologías previas"
                    options={[
                        "HTA",
                        "Diabetes",
                        "Asma / EPOC",
                        "Hipotiroidismo",
                        "Tabaquismo",
                        "Alcoholismo",
                        "Consumo de SPA",
                        "Otro"
                    ]}
                />
                <UniqueSelection 
                    state={setState}
                    item="numFetos"
                    text="Número de fetos"
                    options={["1", "2", "3"]}
                />
                <InputLine 
                    state={setState}
                    name="gestas"
                    type="number"
                    text="Gestas"
                    placeholder="cantidad de gestaciones"
                    units="und"
                />
                <InputLine 
                    state={setState}
                    name="partos"
                    type="number"
                    text="Partos"
                    placeholder="cantidad de partos"
                    units="und"
                />
                <InputLine 
                    state={setState}
                    name="cesareas"
                    type="number"
                    text="Cesáreas"
                    placeholder="cantidad de cesáreas"
                    units="und"
                />
                <InputLine 
                    state={setState}
                    name="abortos"
                    type="number"
                    text="Abortos"
                    placeholder="cantidad de abortos"
                    units="und"
                />
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-outline-primary" type="submit" onClick={onSubmit}>
                        {loading ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>:null}
                        <span role="status">Enviar</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Historia;