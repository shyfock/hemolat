import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
const db = getDatabase();

const InfoModal = (props) => {
    const {title, dbPath, pId} = {...props}
    const [state, setState] = useState({});

    useEffect(() => onValue(ref(db,"patients/" + pId + dbPath), snapshot => {
            snapshot.forEach((data) => {
                setState(data.val())
            })
            //console.log(state)
            return true
        },
        {
            onlyOnce: true,
        }
    ), [dbPath, pId, state])
    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target={`#${title}`}>
                <span className="material-symbols-outlined align-middle">
                    visibility
                </span>
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id={title} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={title + "-drop"} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={title + "-drop"}>{title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {/* {dbPath} */}
                    <ol>
                    {Object.entries(state).map((data, i) => {
                        return (
                        <li key={i}>
                            <span>{data[0]}</span>
                            {/* <p>{Object.values(state)[i]}</p> */}
                            {
                                typeof data[1] !== 'object' ?
                                    <p>{data[1]}</p>
                                :
                                    <ul>
                                        {Object.entries(data[1]).map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <span>{item[0]}</span>
                                                    <p>{item[1]}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                            }
                        </li>
                        )
                    })}
                    </ol>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Understood</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default InfoModal;