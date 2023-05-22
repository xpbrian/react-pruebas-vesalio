import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';
import Lista from './Lista'

export default function Index() {
    const { drawerOpen } = useLayoutContext()
    const [lista, setLista] = useState([])
    useEffect(() => {
        const getDatos = async () => {
            const atenciones = await axios.get(`http://200.121.91.211:4001/listaAtenciones/${drawerOpen.item.documento}`)
            setLista(atenciones.data.recordset)
        }
        getDatos()
    }, [drawerOpen])
    return (
        <>
            <Grid container spacing={1} sx={{ my: 1 }}>
                <Grid item lg={12} sx={{ mr: 2 }}>
                    <Lista lista={lista} />
                </Grid>
            </Grid>
        </>
    )
}
