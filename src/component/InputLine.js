


const InputLine = (props) => {

    const setState = props.state
    const text = props.text.replace(/ /g, "-");
    const otherName = {}
    const handleChange = (e) => {

        const grandPa = e.target.parentNode.parentNode.parentNode.firstChild.innerHTML;
        if (e.target.type !== "radio") {
            const name = {}
            if (e.target.type === "number") {
                if (props.text !== "ID") {
                    name[e.target.id] = parseFloat(e.target.value)
                } else {
                    name[e.target.id] = e.target.value
                }
            } else {
                if (e.target.id !== "Otra") {
                    name[e.target.id] = e.target.value
                } else {
                    // if(e.target.value.length > 8 && e.target.value.length < 14)
                    //name[e.target.value] = "SI"
                    otherName[e.target.value] = "SI"
                    setState(prevState => (
                        {
                            ...prevState,
                            [e.target.parentNode.parentNode.firstChild.innerHTML]: {
                                ...prevState[e.target.parentNode.parentNode.firstChild.innerHTML],
                                ...otherName
                            }
                        }
                    ))
                }
            }
            setState(prevState => (
                {
                    ...prevState,
                    ...name
                }
            ))
        } else {
            setState(prevState => (
                {
                    ...prevState,
                    [grandPa]: {
                        ...prevState[grandPa],
                        [e.target.name]: e.target.value
                    }
                }
            ))
            console.log(grandPa)
        }
    }
    return(
        (props.type !== "radio") ?
        (<div className="input-group mb-3">
            <span className="input-group-text"><label htmlFor={props.name}>{props.text}</label></span>
            <input 
                className="form-control"
                type={props.type} 
                id={props.name} 
                placeholder={props.placeholder} 
                onChange={handleChange}
            />
            {props.units !== ""? <span className="input-group-text"> {props.units} </span> : null}
        </div>)
        :
            props.text === "Otra"? 
                <div className="input-group mb-3">
                    <label className="input-group-text">{props.text}</label>
                    <label className="input-group-text" htmlFor={props.text}>¿Cuál?</label>
                    <input className="form-control" id={props.text} name={props.text} type="text" onChange={handleChange}/>
                </div>
            :
                <div className="row">
                    <label className="col-sm">{props.text}</label>
                    <div className="form-check col-sm-2">
                        <input 
                            className="form-check-input"
                            id={props.text+'SI'}
                            name={text}
                            type={props.type}
                            value="SI"
                            onChange={handleChange}
                        />
                        <label htmlFor={props.text+'SI'} className="form-check-label">SI</label>
                    </div>
                    <div className="form-check col-sm-2">
                        <input 
                            className="form-check-input"
                            id={props.text+'NO'}
                            name={text}
                            type={props.type}
                            value="NO"
                            onChange={handleChange}
                        />
                        <label htmlFor={props.text+'NO'} className="form-check-label">NO</label>
                    </div>
                </div>
    )
}

export default InputLine;