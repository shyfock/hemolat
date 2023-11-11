import { useState } from 'react';
import InputLine from "../component/InputLine";
import UniqueSelection from "../component/UniqueSelection";
import MultipleSelection from '../component/MultipleSelection';


const Bleed = () => {
    const [state, setState] = useState({});
    console.log(state)
    return(
        <div className="container">
            <h1 className="display-6">Hemorragias</h1>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <InputLine
                    state={setState}
                    name="fechaBleed"
                    type="date" 
                    text="Fecha" 
                    placeholder=""
                    units=""
                />
                <UniqueSelection 
                    state={setState}
                    item="sangradoEstimado"
                    text="Sangrado estimado"
                    options={["menor de 1000", "1000 - 1500", "1500 - 2000", "mayor de 2000"]}
                />
                <MultipleSelection
                    state={setState}
                    group="Medicamentos"
                    options={[
                        "Oxitocina",
                        "Misoprostol",
                        "Methergin",
                        "Ácido tranexámico"
                    ]}
                />
                <div className="form-check">
                    <div className="col">
                        <h5 className="text-center">Transfusiones</h5>
                        <InputLine
                            state={setState}
                            name=""
                            type="radio" 
                            text="Necesidad de transfusión" 
                            placeholder=""
                            units=""
                        />
                    </div>
                    <div className="col">
                        <h5 className="text-center">Manejo mecánico</h5>
                        <InputLine
                            state={setState}
                            name=""
                            type="radio" 
                            text="Balón de Bakri" 
                            placeholder=""
                            units=""
                        />
                        <InputLine
                            state={setState}
                            name=""
                            type="radio" 
                            text="Compresión aórtica" 
                            placeholder=""
                            units=""
                        />
                        <InputLine
                            state={setState}
                            name=""
                            type="radio" 
                            text="Traje antichoque" 
                            placeholder=""
                            units=""
                        />
                    </div>
                    <div className="col">
                        <h5 className="text-center">Manejo quirúrgico</h5>
                        <InputLine
                            state={setState}
                            name=""
                            type="radio" 
                            text="Histerectomía" 
                            placeholder=""
                            units=""
                        />
                        <InputLine
                            state={setState}
                            name=""
                            type="radio" 
                            text="Sutura de B-LYNCH" 
                            placeholder=""
                            units=""
                        />
                        <InputLine
                            state={setState}
                            name=""
                            type="radio" 
                            text="Otra sutura hemostática" 
                            placeholder=""
                            units=""
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Bleed;