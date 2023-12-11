import { getDatabase, push, ref, set } from 'firebase/database';
import { useContext, useState } from 'react';
import InputLine from "../component/InputLine";
import UniqueSelection from "../component/UniqueSelection";
import { PatientUid } from '../functions/search';

const writeHemoData = async ({state}, patientUid) => {
    const db = getDatabase();
    await set(push(ref(db, 'patients/' + patientUid + '/hemo')), {
        ...state
    })
}

const Hemo = () => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false)
    const pId = useContext(PatientUid);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await writeHemoData({state}, pId)
            .then((data) => {
                console.log('Se ha creado registro de transfusiones');
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
    console.log(state)
    return(
        <div className="container">
            <h1 className="display-6">Hemocomponentes / Hemoderivados</h1>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <InputLine
                    state={setState}
                    name="fechaHemo"
                    type="date" 
                    text="Fecha" 
                    placeholder=""
                    units=""
                />
                <UniqueSelection 
                    state={setState}
                    item="hemocomponente"
                    text="Hemocomponente"
                    options={["Glóbulos rojos estándar", "PFC", "Plaquetas unidad", "Plaquetas cup", "Crioprecipitado"]}
                />
                <div className="col">
                    <h5 className="text-center">Hemoderivado</h5>
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Fibrinógeno" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Complejo protrombínico" 
                        placeholder=""
                        units=""
                    />
                </div>
                <InputLine
                    state={setState}
                    name="unidades"
                    type="number" 
                    text="Unidades" 
                    placeholder="Cantidad de unidades"
                    units="unidades"
                />
                <div className="col">
                    <h5 className="text-center">Reacciones adversas</h5>
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Reacción leve o moderada" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="Reacción severa" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="TRALI-Injuria pulmonar" 
                        placeholder=""
                        units=""
                    />
                    <InputLine
                        state={setState}
                        name=""
                        type="radio" 
                        text="TACO-Sobrecarga cardíaca" 
                        placeholder=""
                        units=""
                    />
                </div>
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

export default Hemo;