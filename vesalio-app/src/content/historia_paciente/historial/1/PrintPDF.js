
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrintConsulta from "src/components/Drawers/historia_clinica/PrintConsulta";





export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [lista, setLista] = useState([])
    const getDatos = async (id) => {
        let response = await axios.get(`http://200.121.91.211:4001/personaHistoriaPDF/${id}`)
        setLista(response.data)
    }

    useEffect(() => {
        getDatos(props.datosUsuario.Nro_DocIdenti)
    }, [props])

    const retornarContenido = (item, index) => {
        switch (item.tipocontenido_id) {
            case 1:
                return <PrintConsulta key={index} item={item} />
            default:
                return '';
        }
    }

    return (
        <div ref={ref}>

            {
                lista.map((x, ix) => retornarContenido(x,ix))
            }
        </div>
    );
});
