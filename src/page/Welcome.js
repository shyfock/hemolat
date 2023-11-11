
import 'material-symbols'

const logoUrl = process.env.REACT_APP_APP_LOGO;
const Welcome = () => {
    return (
        <div className="container">
            <h1 className="text-center display-1"> HEMOLAT APP </h1>
            <picture>
                <img className="img-fluid opacity-75" id="logo-welcome" lazy="true" src={logoUrl} alt="LOGO"/>
            </picture>
        </div>
    )
}

export default Welcome;