import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

async function writePatientData(patientId, name, lastname, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + patientId), {
        patientId: patientId,
        name: name,
        lastname : lastname ,
        email:email
    });
}
const Patient = () => {
    //state variables for the form inputs and button
    const [patientId, setPatientId] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname ]=useState("") ;
    const[email,setEmail]=useState("");

    //onsubmit function to send data to firebase database
    const onSubmit = async (e) => {
        e.preventDefault();
        await writePatientData(patientId, name, lastname, email)
            .then(patient => console.log(patient + " CREATED"))
            .catch(error => console.log(error.code))
    }
    return (
        <>
            <h1>Ingresar Paciente</h1>
            <NavLink to="/home">Atrás</NavLink>
            <h3>Datos de la paciente</h3>
            <form>
                <div>
                    <label htmlFor="id-patient">ID: </label>
                    <input 
                        type="text"
                        id="id-patient" 
                        value={patientId}
                        onChange={e => setPatientId(e.target.value)}
                        placeholder="ID de paciente"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Nombre: </label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        placeholder="Ingrese nombre"
                        required
                        autoComplete="pass"
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Apellido: </label>
                    <input 
                        type="text" 
                        id="lastname"
                        value={lastname}
                        onChange={e=>setLastname(e.target.value)}
                        placeholder="Ingrese apellido"
                        required
                        autoComplete="pass"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    {/* Email input */}
                    <input 
                        type="email"
                        id="email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        placeholder="Ingrese un email válido"
                        required
                        autoComplete="pass"
                    />
                </div>
                <button type="submit" onClick={onSubmit}>Agregar Paciente</button>
            </form>
            <select>
                <option value="default">Seleccione...</option>
                <option value={"Historia"}><NavLink to={"/seguimiento"}>Historia</NavLink></option>
                <option value={"Parto"}><NavLink to={"/seguimiento"}>Parto</NavLink></option>
                <option value={"Hemorragia"}><NavLink to={"/seguimiento"}>Hemorragia</NavLink></option>
                <option value={"Transfusiones"}><NavLink to={"/seguimiento"}>Transfusiones</NavLink></option>
                <option value={"Seguimiento"}><NavLink to={"/seguimiento"}>Seguimiento</NavLink></option>
                <option value={"Egreso"}><NavLink to={"/seguimiento"}>Egreso</NavLink></option>
                
                
            </select>
        </>
    )
}

export default Patient;