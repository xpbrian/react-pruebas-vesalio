import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import Lista from './lista'

export default function Index() {

    const { drawerOpen } = useLayoutContext()
    const [lista, setLista] = useState([])


    useEffect(() => {
        const getDatos = async () => {
            const response = await axios.post(`http://apis-vesalio.com.pe/turnosAgendaLista`,
                {
                    fecha: drawerOpen.item.item.fecha_calendario.split('T')[0],
                    idPersonal: drawerOpen.item.personalId
                })
            if (response.status === 200) {
                setLista(response.data)
            }
        }
        console.log(drawerOpen);
        getDatos()
    }, [drawerOpen])

    return (
        <>
            <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                <Grid item lg={12}>
                    <Lista lista={lista} />
                </Grid>
            </Grid>

        </>
    )
}
