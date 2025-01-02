import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
const db = getDatabase();

const UpdateModal = (props) => {
    const {title, dbPath, pId} = {...props}
    const [state, setState] = useState();
    
        useEffect(() => onValue(ref(db,"patients/" + pId + dbPath), snapshot => {
                snapshot.forEach((data) => {
                    // setState(data.val())
                    setState(data.toJSON())
                })
                console.log(state)
                return true
            },
            {
                onlyOnce: true,
            }
        ), [dbPath, pId, state])
    return (
        <>
            {/* <!-- Button trigger modal --> */}
            {!state || state === null? 
                <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#${title + "-update"}`} disabled>
                    <span className="material-symbols-outlined align-middle">
                        update_disabled
                    </span>
                </button> 
            : 
                <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#${title + "-update"}`}>
                    <span className="material-symbols-outlined align-middle">
                        update
                    </span>
                </button>
            }

            {/* <!-- Modal --> */}
            <div className="modal fade" id={title + "-update"} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={title + "-update-drop"} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={title + "-update-drop"}>{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* {dbPath} */}
                            {!state || state === null ? 
                                <p>No hay registros</p> 
                            : 
                                <ul>
                                    {Object.entries(state).map((data, i) => {
                                        return (
                                            <li key={i}>{data[0]}</li>
                                        )
                                    })}
                                </ul>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" disabled>Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateModal;