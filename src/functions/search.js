import { child, getDatabase, onValue, ref } from "firebase/database"
import { createContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"

const db = getDatabase()
export const PatientUid = createContext()
export const UserCenter = createContext()

export const SearchPatientById = ({...props}) => {
    const [id, setId] = useState()
    const {patientId} = {...props}
    
    onValue(
        ref(db, 'patients/'), 
        (snapshot) => {
            snapshot.forEach((data) => {
                if (data.val().patientId === patientId || toString(data.val().patientId) === patientId) {
                    setId(() => data.ref.key)
                    return true
                    
                } else {
                    setId(() => 'Documento no registrado')
                    
                }
            })
        }
        ,
        {
            onlyOnce: true,
        }
    )
    return <span className="input-group-text">{id}</span>;
}

export const PatientUidProvider = ({children, ...props}) => {
    const [pId, setPId] = useState();
    const {patientId} = {...props};
    //console.log(patientId)
    
    onValue(
        ref(db, 'patients/'), 
        (snapshot) => {
            snapshot.forEach((data) => {
                if (data.val().patientId === patientId || toString(data.val().patientId) === patientId) {
                    setPId(() => data.ref.key)
                    //console.log(id)
                    return true
                    
                } else {
                    setPId(() => 'Documento no registrado')
                    
                }
            })
        }
        ,
        {
            onlyOnce: true,
        }
    )
    return <PatientUid.Provider value={pId} {...props}>{children}</PatientUid.Provider>
}

export const UserCenterProvider = ({ children, ...props}) => {
    const [healthCenter, setHealthCenter] = useState()
    const user = auth.currentUser;
    onValue(
        (child(ref(db, "users/"), `${user.uid}`)),
        (snapshot) => {
            if (snapshot.exists && snapshot.val() !== null) {
                console.log(Object.values(snapshot.val())[0]["centro-hospitalario"])
                setHealthCenter(Object.values(snapshot.val())[0]["centro-hospitalario"])
                return true
            } else {
                setHealthCenter(null)
            }
        },
        {
            onlyOnce: true,
        }
    )
    return <UserCenter.Provider value={healthCenter} {...props}>{children}</UserCenter.Provider>
}

export const SearchTool = (props) => {
    const [patientId, setPatientId] = useState();
    const patientList = useRef([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setPatientId(e.target.value);
    }
    const setState = props.state;
    const canva = props.canva;
    useEffect(() => {
        if (canva) {
            const element = document.getElementById("search-patient-btn");
            element.setAttribute("data-bs-dismiss", "offcanvas")
        }
    }, [canva])
    // data-bs-dismiss="offcanvas"
    const handleClick = (e) => {
        e.preventDefault()
        if (patientList.current.includes(patientId)) {
            navigate('/patient/search')
            setState(patientId)
        } else {
            if (window.confirm("Ese documento no está en la base de datos.\n¿Desea registrarlo ahora?") === true) {
                navigate('/patient/new')
            } else {
                navigate('/patient')
            }
        }
    }
    useEffect(() => onValue(
        ref(db, 'patients/'), 
        (snapshot) => {
            snapshot.forEach((data) => {
                !patientList.current.includes(data.val().patientId) ? 
                    patientList.current.push(data.val().patientId) 
                : 
                    patientList.current.push();
                if (data.val().patientId === toString(patientId) || toString(data.val().patientId) === patientId) {
                    //setUid(() => data.ref.key)
                    //setState(patientId)
                    return true
                }
            })
        }
        ,
        {
            onlyOnce: true,
        }
    ), [patientId])

    return(
        <form className="d-flex mt-3 input-group" role="search">
            <label 
                className="input-group-text" 
                htmlFor="search-patient"
            >
                Buscar
            </label>
            <input 
                id="search-patient" 
                list="datalistOptions" 
                className="form-control" 
                onChange={handleChange} 
                type="search" 
                placeholder="Ingrese documento"
            />
            <datalist id="datalistOptions">
                {patientList.current.map((value, index) => {
                    return <option value={value} key={index}>{value}</option>
                })}
            </datalist>
            
            
                <label 
                    className="input-group-text btn btn-outline-secondary" 
                    id="search-patient-btn"
                    data-bs-dismiss=""
                    role="button"
                    onClick={handleClick}
                >
                <span className="material-symbols-outlined align-middle">
                    search
                </span>
                </label>
            
        </form>
    )
}

