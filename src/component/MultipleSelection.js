import { useState } from "react"


const cleanString = (text) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f(\s\W)]/gi,"")
}
const MultipleSelection = (props) => {
    const [displayOther, setDisplayOther] = useState('none')
    const setState = props.state
    const options = props.options;
    const tempState = {}
    const handleChange = (e) => {
        if (e.target.value !== "Otro") {
            if (e.target.checked) {
                tempState[e.target.value] = true
                setState(prevState => ({
                    ...prevState,
                    [e.target.name]: {
                        ...prevState[e.target.name],
                        ...tempState
                    }
                }))
                console.log(tempState)
            } else {
                setState(prevState => {
                    const current = {...prevState}
                    delete current[e.target.name][e.target.value]
                    return current
                })
            }
        } else {
            let otherInput = document.getElementById('other-' + cleanString(props.group))
            if (e.target.checked) {
                setDisplayOther('inline')
                otherInput.addEventListener('change', (evt) => {
                    console.log(evt.target.value)
                    if (evt.target.value) tempState[evt.target.value] = true
                    setState(prevState => ({
                        ...prevState,
                        [e.target.name]: {
                            ...prevState[e.target.name],
                            ...tempState
                        }
                    }))
                })
                console.log(tempState)
            } else {
                setState(prevState => {
                    const current = {...prevState}
                    if(otherInput.value) delete current[e.target.name][otherInput.value]
                    otherInput.value = '';
                    return current
                })
                setDisplayOther('none');
            }
        }
    }
    return (
        <ul className="list-group">
            <li className="list-group-item"><h5 className="text-center">{props.group}</h5></li>
            {options.map((opt, index) => {
                if (opt === "Otro") {
                return (
                    <li className="list-group-item" key={index}>
                        <input
                            className="form-check-input me-1" 
                            type="checkbox"
                            id={cleanString(opt + '-' + props.group)}
                            value={opt}
                            name={cleanString(props.group)}
                            onChange={handleChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={cleanString(opt + '-' + props.group)}
                        >
                            {opt}
                        </label>
                        <input 
                            id={'other-' + cleanString(props.group)} 
                            className="form-control" 
                            type="text" 
                            placeholder="¿Cuál?"
                            style={{display: displayOther}}
                        />
                    </li>
                )} else {
                    return (
                    <li className="list-group-item" key={index}>
                        <input
                            className="form-check-input me-1" 
                            type="checkbox"
                            id={cleanString(opt) }
                            value={opt}
                            name={cleanString(props.group)}
                            onChange={handleChange}
                        />
                        <label
                            className="form-check-label stretched-link"
                            htmlFor={cleanString(opt)}
                        >
                            {opt}
                        </label>
                    </li>
                )
                }
            })}
        </ul>
    )
}

export default MultipleSelection;