import { getDatabase, push, ref, set } from "firebase/database";
import { useContext, useState } from "react";
import InputLine from "../component/InputLine";
import UniqueSelection from "../component/UniqueSelection";
import { PatientUid } from "../functions/search";

async function writeDischargeData({state}, patientUid) {
    const db = getDatabase();
    await set(push(ref(db, "patients/" + patientUid + "/egreso/")), {
        ...state
    })
}
const Egreso = () => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false)
    const pId = useContext(PatientUid);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await writeDischargeData({state}, pId)
        .then(ref => {
            console.log(ref);
            setLoading(false);
        })
        .catch(error => console.log(error))
    Array.from(
        document.querySelectorAll('input')
    ).forEach(input => {
        input.value = "";
    })
    }
    console.log(state)
    return(
        <div className="container">
            <h1 className="display-6">Egreso</h1>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <InputLine 
                    state={setState}
                    name="fechaEgreso"
                    type="date"
                    text="Fecha"
                    placeholder=""
                    units=""
                />
                <UniqueSelection 
                    state={setState}
                    item="condicion-materna-alta"
                    text="Condición materna al alta"
                    options={["Viva", "Muerta"]}
                />
                <UniqueSelection 
                    state={setState}
                    item="condicion-RN-alta"
                    text="Condición del RN al alta"
                    options={["Viva(o)", "Muerta(o)"]}
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

export default Egreso;