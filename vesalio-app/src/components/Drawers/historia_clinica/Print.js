
import axios from "axios";
import React, { useEffect, useState } from "react";
import PrintConsulta from "./PrintConsulta";




export const ComponentToPrint = React.forwardRef((props, ref) => {
    const [lista, setLista] = useState([])
    const getDatos = async (id) => {
        let response = await axios.get(`http://200.121.91.211:4001/personaHistoriaPDF/${id}`)

        setLista(response.data)
    }

    useEffect(() => {
        getDatos(props.selected.Nro_DocIdenti)
    }, [props])

    const retornarContenido = (item, index,selected) => {
        switch (item.tipocontenido_id) {
            case 1:
                return <PrintConsulta key={index} item={item} selected={selected}/>
            default:
                return '';
        }
    }

    return (
        <div ref={ref}>

            {
                lista.map((x, ix) => retornarContenido(x,ix,props.selected))
            }
        </div>
    );
});
