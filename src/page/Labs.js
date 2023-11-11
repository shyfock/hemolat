import { useState } from "react";
import { getDatabase, set, push, ref } from 'firebase/database'
import InputLine from "../component/InputLine";

async function writeLabsData({state}, patientUid) {
    const db = getDatabase();
    set(push(ref(db, 'patients/' + patientUid + '/labs')), {
        ...state
    })
}

const Labs = (props) => {
    const [state, setState] = useState({})
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        await writeLabsData({state}, props.patientUid)
            .then(ref => {
                console.log(ref)
            })
            .catch(error => console.log(error.code))
        Array.from(
            document.querySelectorAll('input')
        ).forEach(input => {
            input.value = "";
        })
    }
    return(
        <div className="container">
            <h1 className="display-6">Paraclínicos</h1>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <InputLine
                    state={setState}
                    name="fechaLabs"
                    type="date" 
                    text="Fecha" 
                    placeholder=""
                    units=""
                />
                <InputLine
                    state={setState}
                    name="leucocitos"
                    type="number" 
                    text="Leucocitos" 
                    placeholder="Recuento leucocitario total"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="hemoglobina"
                    type="number" 
                    text="Hemoglobina" 
                    placeholder="gramos por decilitro"
                    units="g/dL"
                />
                <InputLine
                    state={setState}
                    name="hematocrito"
                    type="number" 
                    text="Hematocrito" 
                    placeholder="porcentaje (%)"
                    units="%"
                />
                <InputLine
                    state={setState}
                    name="plaquetas"
                    type="number" 
                    text="Plaquetas" 
                    placeholder="Recuento plaquetario total"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="protrombina"
                    type="number" 
                    text="Tiempo de protrombina" 
                    placeholder="segundos"
                    units="segundos"
                />
                <InputLine
                    state={setState}
                    name="INR"
                    type="number" 
                    text="INR" 
                    placeholder="Índice internacional"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="tromboplastina"
                    type="number" 
                    text="Tiempo de tromboplastina" 
                    placeholder="segundos"
                    units="segundos"
                />
                <InputLine
                    state={setState}
                    name="tptControl"
                    type="number" 
                    text="TPT control" 
                    placeholder="Control del laboratorio local"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="fibrinogeno"
                    type="number" 
                    text="Fibrinógeno" 
                    placeholder="miligramos por decilitro"
                    units="mg/dL"
                />
                <InputLine
                    state={setState}
                    name="lactato"
                    type="number" 
                    text="Lactato" 
                    placeholder="miliosmoles por litro"
                    units="mmol/L"
                />
                <InputLine
                    state={setState}
                    name="creatinina"
                    type="number" 
                    text="Creatinina" 
                    placeholder="miligramos por decilitro"
                    units="mg/dL"
                />
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-outline-primary" type="submit" onClick={onSubmit}>Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default Labs;