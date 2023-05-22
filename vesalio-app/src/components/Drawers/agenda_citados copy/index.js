import { Button, Grid, Typography, Zoom } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout'
import Lista from './lista'

export default function Index() {

    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const { user } = useAuth()
    const [lista, setLista] = useState([])
    const [selected, setSelected] = useState([])
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        console.log(drawerOpen)
    }, [drawerOpen])

    useEffect(() => {
        const getDatos = async () => {
            const response = await axios.post(`http://apis-vesalio.com.pe/turnosAgendaLista`,
                {
                    fecha: drawerOpen.item.item.fecha_calendario.split('T')[0],
                    idPersonal: drawerOpen.item.personalId
                })
            if (response.status === 200) {
                console.log(response.data);
                setLista(response.data)
            }
        }
        getDatos()
    }, [drawerOpen])

    const handleChanged = (e, item) => {
        if (e.target.checked) {
            setSelected(x => [...x, item.horas])
        } else {
            setSelected(x => x.filter(y => y !== item.horas))
        }
    }

    const handleBloquear = async () => {
        await axios.post('http://apis-vesalio.com.pe/liberarDoctorNew', {
            datos: selected.reduce((arr, item) => {
                arr.push({
                    hora: item,
                    fecha: drawerOpen.item.item.fecha_calendario.split('T')[0],
                    agenda: drawerOpen.item.agenda.id
                })
                return arr
            }, []),
            id_usuario: user._id
        })
        enqueueSnackbar('Bloqueo realizado correctamente', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            },
            TransitionComponent: Zoom
        })
        // drawerOpen.item.setAsignacionSelected()

        mostrarComponent({
            contenido: '',
            estado: false,
        }, 'drawerOpen')
    }
    const handleLiberar = async () => {
        await axios.post('http://apis-vesalio.com.pe/anularHorariosDoctorNew', {
            datos: selected.reduce((arr, item) => {
                arr.push({
                    hora: item,
                    fecha: drawerOpen.item.item.fecha_calendario.split('T')[0],
                    agenda: drawerOpen.item.agenda.id
                })
                return arr
            }, []),
            id_usuario: user._id
        })
        enqueueSnackbar('Liberacion realizada correctamente', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            },
            TransitionComponent: Zoom
        })
        mostrarComponent({
            contenido: '',
            estado: false,
        }, 'drawerOpen')
        // drawerOpen.item.setAsignacionSelected()

    }
    return (
        <>
            <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                <Grid item lg={3}>
                    <Button variant='outlined' color="info" onClick={handleLiberar}>Liberar horarios</Button>
                </Grid>
                <Grid item lg={3} >
                    <Button variant='outlined' color={"error"} onClick={handleBloquear}>Bloquear horarios</Button>
                </Grid>
                <Grid item lg={12}>
                    <Lista lista={lista} handleChanged={handleChanged} />
                </Grid>
                <Grid item lg={12}>
                    <Typography variant='h4'>Adicionales</Typography>
                </Grid>


            </Grid>

        </>
    )
}
