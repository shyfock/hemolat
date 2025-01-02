import { getDatabase, push, ref, set } from "firebase/database";
import { useContext, useState } from "react";
import InputLine from "../component/InputLine";
import Modal from "../component/Modal";
import UniqueSelection from "../component/UniqueSelection";
import { PatientUid } from "../functions/search";

const imgUrl = "https://firebasestorage.googleapis.com/v0/b/hemolat123.appspot.com/o/GCH.png?alt=media&token=b0703f61-0c57-42d7-a125-e78dc7a41a21";
async function writeFollowUpData({state}, patientUid) {
    const db = getDatabase();
    await set(push(ref(db, "patients/" + patientUid + "/seguimiento")), {
        ...state
    })
}

const Seguimiento = () => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const pId = useContext(PatientUid);
    console.log(state) 
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await writeFollowUpData({state}, pId)
            .then((data) => {
                console.log('Se ha creado registro de seguimiento');
                setLoading(false);
            })
            .catch(error => console.log(error.code))
            Array.from(
                document.querySelectorAll('input')
            ).forEach(input => {
                input.value = "";
            })
            // Unload form information after submit
            Array.from(
                document.querySelectorAll('form')
            ).forEach(form => {
                form.reset();
            });
        console.log(state)
        // Reset state after submit
        setState({})
    }
    return (
        <div className="container">
            <h1 className="display-6">Seguimiento</h1>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <InputLine
                    state={setState}
                    name="fechaSeg"
                    type="date" 
                    text="Fecha" 
                    placeholder=""
                    units=""
                />
                <InputLine
                    state={setState}
                    name="paSistolica"
                    type="number" 
                    text="PA-sistólica" 
                    placeholder="50-250 mmHg"
                    units="mmHg"
                />
                <InputLine
                    state={setState}
                    name="paDiastolica"
                    type="number" 
                    text="PA-diastólica" 
                    placeholder="50-250 mmHg"
                    units="mmHg"
                />
                <div className="input-group mb-3">
                    <span className="input-group-text"><label htmlFor="PA-media">PA-media</label></span>
                    <input
                        className="form-control"
                        type='number' 
                        id='PA-media' 
                        placeholder="50-250 mmHg" 
                        disabled
                        value={(state.paDiastolica && state.paDiastolica > 0 && state.paSistolica && state.paSistolica > 0) ? Math.round(100*(2*state.paDiastolica + state.paSistolica)/3)/100 : ''}
                    />
                    <span className="input-group-text"> mmHg </span>
                </div>
                <InputLine
                    state={setState}
                    name="fCardiaca"
                    type="number" 
                    text="Frecuencia cardiaca" 
                    placeholder="latidos/min."
                    units="latidos/min."
                />
                <InputLine
                    state={setState}
                    name="fRespiratoria"
                    type="number" 
                    text="Frecuencia respiratoria" 
                    placeholder="respiraciones/min."
                    units="respiraciones/min."
                />
                <UniqueSelection 
                    state={setState}
                    item="conciencia"
                    text="Conciencia"
                    options={["Tranquila", "Agitada", "Letargia", "Inconciente"]}
                />
                <InputLine
                    state={setState}
                    name="diuresis"
                    type="number" 
                    text="Diuresis" 
                    placeholder="función del peso y del tiempo"
                    units="mL/k/h"
                />
                <InputLine
                    state={setState}
                    name="lCapilar"
                    type="number" 
                    text="Llenado capilar" 
                    placeholder="tiempo en segundos"
                    units="segundos"
                />
                <div className="input-group mb-3">
                    <span className="input-group-text"><label htmlFor="i-choque">Índice de choque</label></span>
                    <input 
                        className="form-control"
                        type='number'  
                        id='-i-choque' 
                        placeholder="FC / PAS" 
                        disabled
                        value={(state.paDiastolica && state.paDiastolica > 0 && state.fCardiaca && state.fCardiaca > 0) ? Math.round(100*(state.fCardiaca / state.paSistolica))/100 : ''}
                    />
                </div>
                <Modal 
                    url={imgUrl} 
                    alt="GCH"
                    title="Grado de Choque Hemorrágico"
                    source="Fuente: (Fescina , De Mucio , Ortiz , & Jarquin , 2012)"
                />
                <UniqueSelection 
                    state={setState}
                    item="gChHemo"
                    text="Grado choque hemorrágico"
                    options={["Compensada", "Leve", "Moderada", "Severa"]}
                />
                <div className="col">
                    <h5 className="text-center">Soportes</h5>
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Norepinefrina" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Vasopresina" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Adrenalina" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Dopamina" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Dobutamina" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Sulfato de magnesio"
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Labetatol" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Otra" 
                        placeholder=""
                        units=""
                    />
                </div>
                <UniqueSelection 
                    state={setState}
                    item="tUterino"
                    text="Tono uterino"
                    options={["Adecuado", "Hipotónico"]}
                />
                <UniqueSelection 
                    state={setState}
                    item="destino"
                    text="Destino"
                    options={["Hospitalización / Alojamiento conjunto", "Hospitalización / RN en UCI", "UCI obstétrica", "UCI obstétrica / RN en UCI", "Domicilio", "Morgue"]}
                />
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-outline-primary" type="submit" onClick={onSubmit}>
                    {
                        loading ? 
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        :
                            null
                    }
                    <span role="status">Enviar</span>
                </button>
                </div>
            </form>
        </div>
    )
}

export default Seguimiento;