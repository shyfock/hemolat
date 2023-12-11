import { getDatabase, push, ref, set } from "firebase/database";
import { useContext, useState } from "react";
import InputLine from "../component/InputLine";
import UniqueSelection from "../component/UniqueSelection";
import { PatientUid } from "../functions/search";


const  writePartoData = async ({state}, patientUid) => {
    const db = getDatabase()
    await set(push(ref(db, "patients/" + patientUid + "/parto/")), {
        ...state
    })
}
const Parto = () => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const pId = useContext(PatientUid);
    console.log(state)
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await writePartoData({state}, pId)
            .then((data) => {
                console.log('Se ha creado registro de parto');
                setLoading(false);
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
            <h1 className="display-6">Parto</h1>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <InputLine
                    state={setState}
                    name="fechaParto"
                    type="date" 
                    text="Fecha" 
                    placeholder=""
                    units=""
                />
                <UniqueSelection 
                    state={setState}
                    item="tipo-parto"
                    text="Tipo de parto"
                    options={["Parto vaginal normal", "Parto Instrumentado", "Cesárea programada", "Cesárea urgente"]}
                />
                <InputLine
                    state={setState}
                    name="pesoRN"
                    type="number" 
                    text="Peso del RN" 
                    placeholder="peso en gramos (gr)"
                    units="gramos"
                />
                <InputLine
                    state={setState}
                    name="tallaRN"
                    type="number" 
                    text="Talla del RN" 
                    placeholder="talla en centímetros (cm)"
                    units="centímetros"
                />
                <InputLine
                    state={setState}
                    name="apgar-0min"
                    type="number" 
                    text="APGAR 0 min" 
                    placeholder="APGAR al nacimiento"
                    units="máx. 10"
                />
                <InputLine
                    state={setState}
                    name="apgar-5min"
                    type="number" 
                    text="APGAR 5 min" 
                    placeholder="APGAR a los 5 min. del nacimiento"
                    units="máx. 10"
                />
                <UniqueSelection 
                    state={setState}
                    item="destino"
                    text="Destino"
                    options={["Hospitalización / Alojamiento conjunto", "Hospitalización / RN en UCI", "UCI obstétrica", "UCI obstétrica / RN en UCI", "Domicilio antes de 24h", "Morgue"]}
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

export default Parto;