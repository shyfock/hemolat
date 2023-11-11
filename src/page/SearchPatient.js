import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import 'material-symbols';
import "../styles.scss";
import { SearchPatientById } from "../functions/search";
import OffCanva from "../component/OffCanva";

const db = getDatabase()

const pathRef = (path) => {return ref(db, 'patients/' + path)}
const SearchPatient = () => {
    const [patient, setPatient] = useState({});
    const [patientFound, setPatientFound] = useState(false);
    const [cedula, setCedula] = useState();
    const patientList = useRef([])
    //console.log(id)
    useEffect(() => {
        onValue(
            pathRef(''),
            (snapshot) => snapshot.forEach((data) => {
                const patientData = data.val()
                !patientList.current.includes(patientData.patientId) ? 
                    patientList.current.push(patientData.patientId) 
                    : 
                    patientList.current.push();
                if (patientData.patientId === cedula || toString(patientData.patientId) === cedula) {
                    setPatientFound(true)
                    setPatient(() => ({...patientData, uid: data.ref.key}))
                    return true
                } else {
                    setPatientFound(false)
                }
            }),
            {
                onlyOnce: true,
            }
        )
    }, [cedula])
    
    return (
        <div className="container">
            <div className="input-line">
                <div className="container">
                    <h1 className="display-6">Buscar Paciente</h1>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <label htmlFor="cedula">Número de Cédula</label>
                            <div className="input-group">
                                <input
                                    list="datalistOptions"
                                    className="form-control"
                                    id="cedula" 
                                    name="cedula" 
                                    type="search"
                                    onChange={e => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setCedula(e.target.value)
                                        }
                                    } 
                                />
                                <datalist id="datalistOptions">
                                    {patientList.current.map((value, index) => {
                                        return <option value={value} key={index}>{value}</option>
                                    })}
                                </datalist>
                                <span className="input-group-text material-symbols-outlined">search</span>
                                <button 
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        if (window.confirm(`¿Está seguro de eliminar al paciente ${patient.name} ${patient.lastname}?`) === true) {
                                            remove(ref(db, 'patients/' + patient.uid));
                                            Array.from(
                                                document.querySelectorAll('input')
                                            ).forEach(input => {
                                                input.value = "";
                                            })
                                        }
                                    }}
                                >
                            Borrar
                        </button>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <label>Nombre del paciente</label>
                            <span className="input-group-text">
                                {
                                    patient.patientId ? 
                                    patient.name + " " + patient.lastname
                                    : 
                                    "El paciente no está en la base de datos"
                                }
                            </span>
                        </li>
                        <li className="list-group-item">
                            <label>Id del registro</label>
                            <SearchPatientById patientId={cedula}/>
                        </li>
                    </ul>
                    {patientFound ? <OffCanva /> : null}
                    {/* <div className="btn-group">
                        {
                            [{
                                path: "/historia", 
                                route: "Historia"
                            }, 
                            {
                                path: "/parto", 
                                route: "Parto"
                            }, 
                            {
                                path: "/bleed",
                                route: "Hemorragia"
                            }, 
                            {
                                path: "/hemo",
                                route: "Transfusiones"
                            },
                            {
                                path: "/seguimiento",
                                route: "Seguimiento"
                            },
                            {
                                path: "/paraclinicos",
                                route: "Paraclínicos"
                            },
                            {
                                path: "/egreso",
                                route: "Egreso"
                            }].map((item, index) => {return <a className="btn btn-outline-primary" href={item.path} key={index} hidden={!patientFound}>{item.route}</a>})
                        }
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SearchPatient;