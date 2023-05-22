import React, { useState } from 'react'
import SearchFiltro from './SearchFiltro'
import axios from 'axios';
import Lista from './Lista'

export default function Index() {
    const [filter, setFilter] = useState({ paciente: '', tipo_paciente: 'documento_paciente' })
    const [lista, setLista] = useState([])

    const handleChangedFilter = (id, value) => {
        setFilter(x => {
            return {
                ...x,
                [id]: value
            }
        })
    }
    const handleBuscarFiltro = async () => {
        let response = await axios.post(`http://200.121.91.211:4001/personaHistoria/`, filter)
        setLista(response.data.datosUsuario);
    }
    return (
        <>
            <SearchFiltro handleBuscarFiltro={handleBuscarFiltro} handleChangedFilter={handleChangedFilter} filter={filter} />
            {
                lista.length > 0 && <Lista lista={lista} />
            }

        </>
    )
}
