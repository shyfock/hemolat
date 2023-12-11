import Seguimiento from "./Seguimiento";
import Historia from "./Historia";
import Hemo from './Hemo';
import Bleed from './Bleed';
import Parto from './Parto';
import Labs from './Labs';
import Egreso from './Egreso';


export const ComponentsMap = {
    "routes": [
        {
            "path": "/historia", 
            "route": "Historia",
            "component": Historia,
            "dbPath": "history"
        }, 
        {
            "path": "/parto", 
            "route": "Parto",
            "component": Parto,
            "dbPath": "parto"
        }, 
        {
            "path": "/bleed",
            "route": "Hemorragia",
            "component": Bleed,
            "dbPath": "bleed"
        }, 
        {
            "path": "/hemo",
            "route": "Transfusiones",
            "component": Hemo,
            "dbPath": "hemo"
        },
        {
            "path": "/seguimiento",
            "route": "Seguimiento",
            "component": Seguimiento,
            "dbPath": "seguimiento"
        },
        {
            "path": "/paraclinicos",
            "route": "Paraclínicos",
            "component": Labs,
            "dbPath": "labs"
        },
        {
            "path": "/egreso",
            "route": "Egreso",
            "component": Egreso,
            "dbPath": "egreso"
        }
    ]
}