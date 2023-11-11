import { getDatabase, onValue, ref } from "firebase/database"
import { createContext, useState } from "react"

const db = getDatabase()
const PatientUid = createContext()

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
    return <PatientUid.Provider value={id}>{children}</PatientUid.Provider>
}

