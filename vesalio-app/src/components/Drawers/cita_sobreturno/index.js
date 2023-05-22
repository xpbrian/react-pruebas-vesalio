import { Box, Button, Grid, Typography, TextField, Zoom } from '@mui/material'
import React, { useState } from 'react'
import Paciente from './Paciente'
import useLayoutContext from 'src/hooks/useAuthLayout'
import confirmSweetAlert from 'src/utils/confirm'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import useAuth from 'src/hooks/useAuth'

export default function Index() {
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()
    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const [selected, setSelected] = useState({ paciente: { item: null, selected: false } })
    const [fecha, setFecha] = useState('')

    const handleSleccionarPaciente = (id, item) => {
        setSelected(x => {
            return {
                ...x,
                [id]: {
                    item,
                    selected: true
                }
            }
        })
    }
    const handleLimpiarAll = () => {
        setSelected({ paciente: { item: null, selected: false } })
    }
    const getGenerarCita = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/generarCitaSobreturno`, obj)
        return response.data;
    }


    const reservarCita = async () => {
        let errors = []

        if (fecha.length === 0) {
            errors.push('Debe ingresar una fecha')
        }


        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            const rpta = await confirmSweetAlert('Confirmar cita', '¿Esta seguro que desea confirmar la cita?', 'info', true)
            if (rpta) {
                // aqui va las validaciones 
                let result = await getGenerarCita({
                    id_usuario: user._id,
                    fecha: fecha,
                    datos: {
                        doctor: drawerOpen.item.datos.cabecera[0],
                        paciente: selected

                    },
                    paciente: selected
                })
                if (typeof result === 'object') {
                    mostrarComponent({
                        contenido: '',
                        estado: false,
                    }, 'drawerOpen')

                    setTimeout(() => {
                        mostrarComponent({
                            contenido: 'citaRealizada',
                            estado: true,
                            size: 'xs'
                        }, 'modalOpen')
                    }, 1000)
                } else {
                    enqueueSnackbar('Error: Es posible que se haya generado una cita en simultáneo. Intente con otro horario.', {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        TransitionComponent: Zoom
                    })
                }
            }
        }

    }
    const mostrarInconformidad = (datos, cabecera) => {
        mostrarComponent({
            contenido: 'inconformidad',
            estado: true,
            size: 'xs',
            item: { datos, cabecera }
        }, 'modalOpen')
    }
    return (
        <>
            {!selected.paciente.selected && <Paciente handleSleccionarPaciente={handleSleccionarPaciente} />}
            {selected.paciente.selected && <>
                <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                    <Grid item xs={12} lg={10} md={10}>
                        <Box display="flex" alignItems="center">
                            <Box ml={1.5}>
                                <Typography color="text.primary" variant="h4" noWrap>
                                    {selected.paciente.item.Des_ApePaterno + ' ' + selected.paciente.item.Des_ApeMaterno + ' ' + selected.paciente.item.Des_Nombres}
                                </Typography>
                                <Typography variant="subtitle1" noWrap>
                                    {selected.paciente.item.Nro_DocIdenti}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={2} md={2}>
                        <Button variant="outlined" size='small' sx={{ float: 'right' }}
                            onClick={() => handleLimpiarAll()}>
                            Limpiar
                        </Button>
                    </Grid>


                    <Grid item xs={12} lg={6} md={6} sx={{ mx: 2 }}>
                        <TextField
                            fullWidth
                            name={'fecha'}
                            type={'date'}
                            value={fecha}
                            variant="outlined"
                            onChange={(e) => setFecha(e.target.value)}
                        />
                    </Grid>

                </Grid>

                <Grid container spacing={3} sx={{ p: 2 }}>
                    <Grid item lg={12}>
                        <Button fullWidth variant="outlined"
                            onClick={() => reservarCita()}>
                            Reservar cita
                        </Button>
                    </Grid>
                    <Grid item lg={12}>
                        <Button fullWidth
                            color='warning'
                            variant="contained"
                            onClick={() => mostrarInconformidad(drawerOpen.item.itemAxios.cabecera[0], user.datos)}>
                            No encontré cita disponible
                        </Button>

                    </Grid>
                </Grid>

            </>}


        </>
    )
}
