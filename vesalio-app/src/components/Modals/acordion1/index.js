import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import Block3 from './block';

export default function Index() {
    const { modalOpen, citasLista } = useLayoutContext()
    const [items, setItems] = useState([])
    useEffect(() => {
        let fecha = modalOpen.item.fecha
        console.log(fecha);
        setItems([
            {
                id: '1',
                title: 'Total turnos',
                cantidad: modalOpen.item.datos.length,
                array: modalOpen.item.datos
            },
            {
                id: '2',
                title: 'Por Alephoo',
                cantidad: modalOpen.item.datos.length - citasLista.filter(x => x.datos !== undefined && x.fecha === fecha).length - citasLista.filter(x => x.datos === undefined && x.fecha === fecha).length,
                array: modalOpen.item.datos
            },
            {
                id: '3',
                title: 'Turnos App',
                cantidad: citasLista.filter(x => x.datos !== undefined && x.fecha === fecha).length,
                array: citasLista.filter(x => x.datos !== undefined && x.fecha === fecha)
            },
            {
                id: '4',
                title: 'Turnos Call Center',
                cantidad: citasLista.filter(x => x.datos === undefined && x.fecha === fecha).length,
                array: citasLista.filter(x => x.datos !== undefined && x.fecha === fecha)
            }])
    }, [modalOpen, citasLista])

    return (

        <Grid container spacing={4} p={2}>

            {items.map(x => <Grid key={x.id} item xs={12} sm={6} lg={3}><Block3 item={x} />  </Grid>)}

        </Grid>

    )
}
