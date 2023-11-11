import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import InputLine from "../component/InputLine";
import UniqueSelection from "../component/UniqueSelection";

async function writeDischargeData({state}) {
    const db = getDatabase();
    set(push(ref(db, "egreso/")), {
        ...state
    })
}
const Egreso = () => {
    const [state, setState] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();
        await writeDischargeData({state})
        .then(ref => console.log(ref))
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
                    <button className="btn btn-outline-primary" type="submit" onClick={onSubmit}>Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default Egreso;