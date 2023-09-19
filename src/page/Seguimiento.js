import { NavLink } from "react-router-dom";

const Seguimiento = () => {
    return (
        <div>
            <h1>Seguimiento</h1>
            <NavLink to={"/"}>Atrás</NavLink>
            <div>
                <label htmlFor="PA-sistolica">PA-sistolica</label>
                <input type='number' id='PA-sistolica' placeholder="50-250 mmHg"/>
            </div>
            
{/* PA diastólica
Frecuencia cardíaca
Frecuencia respiratoria
Conciencia 
Soportes
Destino
Paciente */}

        </div>
    )
}

export default Seguimiento;