import { Button, Card, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ListaAgenda from './ListaAgenda'

export default function Index() {
    const { modalOpen } = useLayoutContext()
    const [activos, setActivos] = useState([])
    const [inactivos, setInactivos] = useState([])
    const [mostrarBoton, setMostrarBoton] = useState({ texto: "Mostrar", estado: false })
    const getDatos = async (idAsignacion) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/agendaAll`,
            {
                idAsignacion: idAsignacion
            })
        if (response.status === 200) {
            setActivos(response.data.agendas.filter(x => x.estado_agenda === 1))
            setInactivos(response.data.agendas.filter(x => x.estado_agenda === 0))
        }
    }
    useEffect(() => {

        getDatos(modalOpen.item.personalId.asignacion_id)
    }, [modalOpen])

    return (
        <Grid
            sx={{
                px: { xs: 0, md: 4 },
                pb: 2
            }}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
        >
            <Grid item xs={12}>
                <Card>
                    <ListaAgenda lista={activos} getDatos={getDatos}/>
                </Card>
            </Grid>
            <Grid item xs={1}>
                <Button variant='outlined' onClick={() => setMostrarBoton(x => { return { texto: x.estado ? 'Mostrar' : 'Ocultar', estado: !x.estado } })}>{mostrarBoton.texto}</Button>
            </Grid>
            <Grid item xs={12} sx={{ display: !mostrarBoton.estado ? "none" : "" }}>
                <Card sx={{ p: 2 }}>
                    <ListaAgenda lista={inactivos} getDatos={getDatos} />

                </Card>
            </Grid>

        </Grid>
    )
}
