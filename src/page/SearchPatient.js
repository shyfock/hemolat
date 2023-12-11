import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import 'material-symbols';
import "../styles.scss";
import { PatientUid } from "../functions/search";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "../routes.json";
import InfoModal from "../component/InfoModal";

const db = getDatabase()

const pathRef = (path) => {return ref(db, 'patients/' + path)}
const SearchPatient = () => {
    const [patient, setPatient] = useState({});
    const [loading, setLoading] = useState(false);
    // const [modal, setModal] = useState({});
    const pId = useContext(PatientUid);
    const navigate = useNavigate();
    // console.log(modal)
    useEffect(() => onValue(pathRef(pId), (snapshot) => {
        snapshot.forEach((data) => {
                setPatient(prevState => ({
                    ...prevState,
                    [data.key]: data.val()
                }))
            })
            //console.log(Object.values(patient.labs))
            return true
        },
        {
            onlyOnce: true
        }
    ), [pId])
    // const openModal = ({route}) => {
    //     setModal({...route});
    // }
    const handleRemove = async () => {
        setLoading(true);
        if (window.confirm(`¿Está seguro de eliminar al paciente ${patient.name} ${patient.lastname}?`) === true) {
            await remove(ref(db, 'patients/' + pId))
                .then(() => {
                    setLoading(false);
                    navigate("/patient")
                })
                .catch((error) => {
                    setLoading(false);
                    console.log("Error: ", error);
                })
            Array.from(
                document.querySelectorAll('input')
            ).forEach(input => {
                input.value = "";
            })
        } else {
            setLoading(false);
        }
    }
    return (
        <div className="container">
            {/* <InfoModal 
                title={modal.route}
                dbPath={modal.dbPath}
                route={modal.path}
                pId={pId}
            /> */}
            <div className="card" style={{width: "100%"}}>
                <div className="card-body">
                    <h5 className="card-title">Datos de la paciente</h5>
                    <p className="card-text">ID: {pId}</p>
                </div>
                <div className="card-header">
                <p className="card-text"><b>Identificación</b></p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Nombre: {patient.name}</li>
                    <li className="list-group-item">Apellidos: {patient.lastname}</li>
                    <li className="list-group-item">Documento: {patient.patientId}</li>
                </ul>
                <div className="card-header">
                <p className="card-text"><b>Contacto</b></p>
                </div>
                <ul className="list-group list-group-flush">
                    
                    <li className="list-group-item">Email: {patient.email}</li>
                    <li className="list-group-item">Teléfono: {patient.phoneNumber}</li>
                </ul>
                <div className="card-header">
                <p className="card-text"><b>Registros de la paciente</b></p>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Ver</th>
                            <th scope="col">Agregar</th>
                            <th scope="col">Actualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.routes.map((route, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{route.route}</td>
                                    <td>
                                        <InfoModal 
                                            title={route.route}
                                            dbPath={route.dbPath}
                                            route={route.path}
                                            pId={pId}
                                        />
                                        {/* <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#${route.route}`} onClick={(e) => {setModal({...route}); e.preventDefault();}}>
                                            <span className="material-symbols-outlined align-middle">
                                                visibility
                                            </span>
                                        </button> */}
                                        
                                        {/* <button className="btn btn-outline-secondary">
                                            <span className="material-symbols-outlined align-middle">
                                                visibility
                                            </span>
                                        </button> */}
                                    </td>
                                    <td>
                                        <NavLink className="btn btn-outline-secondary" to={route.path}>
                                            <span className="material-symbols-outlined align-middle">
                                                add
                                            </span>
                                        </NavLink>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-secondary">
                                            <span className="material-symbols-outlined align-middle">
                                                check
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="card-body">
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={handleRemove}
                    >
                        {
                            loading ? 
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            :
                                null
                        }
                        <span role="status">Borrar</span>
                    </button>
                </div>
                
            </div>
        </div>                    
    )
}

export default SearchPatient;