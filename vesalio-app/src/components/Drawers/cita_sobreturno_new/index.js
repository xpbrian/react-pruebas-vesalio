import { Box, Button, Grid, Typography, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
    const [itemAxios, setItemAxios] = useState(null)



    useEffect(() => {
        const getDatos = async (obj) => {
            const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorarioNew`, obj)
            setItemAxios(response.data)
        }
        getDatos({ ...drawerOpen.item })
    }, [drawerOpen])

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
        const response = await axios.post(`http://apis-vesalio.com.pe/generarCitaSobreturnoNew`, obj)
        return response.data;
    }


    const reservarCita = async () => {
        console.log(itemAxios);
        let errors = []
        if (selected.paciente.item === null) {
            errors.push("Debe seleccionar un paciente")
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
                    fecha: drawerOpen.item.fecha,
                    datos: {
                        doctor: itemAxios.cabecera[0],
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

                </Grid>

                <Grid container spacing={3} sx={{ p: 2 }}>
                    <Grid item lg={12}>
                        <Button fullWidth variant="outlined"
                            onClick={() => reservarCita()}>
                            Reservar cita
                        </Button>
                    </Grid>

                </Grid>

            </>}


        </>
    )
}
