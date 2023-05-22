import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import AddIcon from '@mui/icons-material/Add';
import ListaPatologico from './Lista'


export default function Index() {
    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const [lista, setLista] = useState([])

    useEffect(() => {
        setLista(drawerOpen.item.item.lista);
    }, [drawerOpen])

    return (
        <>
            <Grid container spacing={1} sx={{ my: 1 }}>
                <Grid item lg={12} sx={{ mr: 2 }}>
                    <Button
                        variant="outlined"
                        sx={{ float: 'right' }}
                        onClick={() => mostrarComponent({
                            contenido: 'medicamentos',
                            estado: true,
                            size: 'sm',
                            item: {
                                datosUsuario: drawerOpen.item.datosUsuario,
                                setDatosAntecedentes: () => drawerOpen.item.setDatosAntecedentes('medicamentos')
                            }
                        }, 'modalOpen')}
                        startIcon={<AddIcon />}>
                        Agregar
                    </Button>
                </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={1} sx={{ my: 1 }}>
                <Grid item lg={12} sx={{ mr: 2 }}>
                    {lista.length === 0 && <Box sx={{ m: 3 }}><Typography variant='h4'>No registra antecedentes de medicacion habitual</Typography></Box>}
                    {lista.length > 0 && <ListaPatologico lista={lista} />}
                </Grid>
            </Grid>
        </>
    )
}
