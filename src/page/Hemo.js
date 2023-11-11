import { useState } from 'react';
import InputLine from "../component/InputLine";
import UniqueSelection from "../component/UniqueSelection";

const Hemo = () => {
    const [state, setState] = useState({});
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
            </form>
        </div>
    )
}

export default Hemo;