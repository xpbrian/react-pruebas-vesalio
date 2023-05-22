import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ContenedorTicket from './ContenedorTicket'

export default function Componente({ list: recivido }) {
    const [list, setLista] = useState(null)
    useEffect(() => {
        const mostrarComponente = async (id) => {
            const rpta = await axios.get(`http://apis-vesalio.com.pe/turnoProgramadoListaCitasItem/${id}`)
            if (rpta.data.length > 0) {
                setLista(rpta.data[0])
            }
        }
        try{
            mostrarComponente(recivido.id)

        }catch(e){
            console.log(e)
        }
    }, [recivido])

    return (
        <>

            {
                list !== null && <ContenedorTicket
                    list={list}
                />
            }
        </>
    )
}
