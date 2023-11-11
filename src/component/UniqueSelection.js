import { useState } from "react";

const UniqueSelection = (props) => {
    const [displayOther, setDisplayOther] = useState('none')
    const setState = props.state
    const options = props.options;
    const handleSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const name = {}
        if (e.target.value !== "Otro") {
            setDisplayOther('none')
            if (isNaN(e.target.value)) {
                name[e.target.id] = e.target.value
            } else {
                name[e.target.id] = parseFloat(e.target.value)
            }
        } else {
            setDisplayOther('inline')
            let other = document.getElementById('other-' + props.item);
            other.style.display = displayOther
            other.addEventListener("change", (evt) => {
                evt.preventDefault()
                console.log(evt.target.value)
                if (evt.target.value) {
                    name[e.target.id] = evt.target.value
                    setState(prevState => (
                        {
                            ...prevState,
                            ...name
                        }
                    ))
                }
            })

        }
        setState(prevState => (
            {
                ...prevState,
                ...name
            }
        ))
        console.log(name)
    }
    
    return(
        <div className="input-group mb-3">
            <span className="input-group-text">
                <label htmlFor={props.item}>{props.text}</label>
            </span>
            <select
                className="form-select" 
                id={props.item}
                onChange={handleSelect}
            >
                <option defaultValue>Seleccione...</option>
                {
                    options.map((opt, index) => {
                        return <option value={opt} key={index}>{opt}</option>
                    })
                }
            </select>
            <input 
                id={'other-' + props.item} 
                className="form-control" 
                type="text" 
                placeholder="¿Cuál?"
                style={{display: displayOther}}
            />
        </div>
    )
}

export default UniqueSelection;