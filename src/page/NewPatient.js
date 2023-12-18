import { useState, useContext, useEffect } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import 'material-symbols';
import InputLine from "../component/InputLine";
import { useNavigate } from "react-router-dom";
import { UserCenter } from "../functions/search";

async function writePatientData({state}) {
    const db = getDatabase();
    const patientRef = push(ref(db, 'patients/'));
    set(
        patientRef
        ,
        {...state}
    );
    return patientRef.key
}
const NewPatient = (props) => {
    //state variables for the form inputs and button
    // const [patientId, setPatientId] = useState("");
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false)
    const healthCenter = useContext(UserCenter);
    const setPid = props.state;
    const navigate = useNavigate()
    useEffect(() => setState(prevState => ({
        ...prevState,
        "centro-hospitalario": healthCenter
    })), [healthCenter])
    //onsubmit function to send data to firebase database
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(healthCenter)
        setLoading(true)
        
        if (healthCenter && healthCenter !== null) {
        await writePatientData({state})
            .then((data) => {
                setPid(data)
                setLoading(false)
                console.log("PATIENT CREATED: ", data)
            })
            .catch(error => {
                setLoading(false)
                console.log(error.code)
            })
        onReset()
        navigate('/patient/search')
        } else {
            setLoading(false)
            window.alert("Usted no ha ingresado su centro de operación. Actualice su perfil");
            navigate("/profile/update")
        }
    }

    const onReset = () => {
        //e.preventDefault()
        Array.from(document.querySelectorAll('input')).forEach(input => {
            input.value = "";
        })
    }
    return (
        <div className="container">
            <h1 className="display-6">Datos de la paciente</h1>
            <form className="row row-cols-lg-auto g-3 align-items-center">
                <InputLine
                    state={setState}
                    name="patientId"
                    type="number" 
                    text="ID" 
                    placeholder="Nº de documento de la paciente"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="name"
                    type="text" 
                    text="Nombre" 
                    placeholder="Ingrese nombre completo"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="lastname"
                    type="text" 
                    text="Apellidos" 
                    placeholder="Ingrese apellidos completos"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="fechaNace"
                    type="date" 
                    text="Fecha de nacimiento" 
                    placeholder=""
                    units=""
                />
                <InputLine
                    state={setState}
                    name="email"
                    type="email" 
                    text="Correo electrónico" 
                    placeholder="Ingrese correo si lo tiene"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="telefono"
                    type="phone" 
                    text="Teléfono" 
                    placeholder="Ingrese un número de contacto"
                    units=""
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
                    <button className="btn btn-outline-secondary" type="reset" onClick={onReset}>Limpiar</button>
                </div>
            </form>
        </div>
    )
}

export default NewPatient;