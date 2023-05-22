import { Autocomplete, Box, Button, Grid, TextField, Zoom } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout'

export default function Index() {
    const { modalOpen, consultorios, dias } = useLayoutContext()
    const [asignaciones, setAsignaciones] = useState([])
    const [text, setText] = useState([
        {
            id: 'fechaInicio',
            value: ''
        },
        {
            id: 'fechaFin',
            value: ''
        },
        {
            id: 'horaInicio',
            value: ''
        },
        {
            id: 'horaFin',
            value: ''
        },
        {
            id: 'duracion',
            value: ''
        }


    ])
    const [semanaSelected, setSemanaSelected] = useState(null)
    const [pisoSelected, setPisoSelected] = useState(null)
    const [asignacionSelected, setAsignacionSelected] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()

    useEffect(() => {
        const getDatos = async (personalId) => {
            const rpta = await axios.get(`http://apis-vesalio.com.pe/asignaciones/${personalId}`)
            setAsignaciones(rpta.data);
            if (rpta.data.length > 0) {
                setAsignacionSelected({
                    id: rpta.data[0].id,
                    label: rpta.data[0].nombre
                })
            }
        }
        getDatos(modalOpen.item)
    }, [modalOpen])



    const handleChangedSemanas = (_, newValue) => {
        setSemanaSelected(newValue);
    }
    const handleGuardarClick = async () => {
        let errors = []
        if (semanaSelected === null) {
            errors.push('Debe seleccionar un dia de la semana')
        } else if (pisoSelected === null) {
            errors.push('Debe seleccionar un piso')
        } else if (asignacionSelected === null) {
            errors.push('Debe seleccionar un asignación')
        }

        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1500
            }))
        } else {
            let obtener = consultorios.find(x => x.lugar_id === pisoSelected.id)
            let obj = {
                id_usuario: user._id,
                asignacion: asignacionSelected.id,
                lugar: obtener.lugar_id,
                dias: semanaSelected,
                fechaInicio: text.find(x => x.id === 'fechaInicio').value,
                fechaFin: text.find(x => x.id === 'fechaFin').value,
                horaInicio: text.find(x => x.id === 'horaInicio').value,
                horaFin: text.find(x => x.id === 'horaFin').value,
                duracion: text.find(x => x.id === 'duracion').value,
                piso_id: obtener.piso_id,
                area_servicio_id: obtener.area_servicio_id
            }
            let response = await axios.post(`http://apis-vesalio.com.pe/generarAgenda`, { ...obj })
            enqueueSnackbar(response.data, {
                variant: 'Success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1500
            })
        }

    }
    const handleChangedPiso = (_, newValue) => {
        setPisoSelected(newValue);
    }
    const handleAsignacionSelected = (_, newValue) => {
        setAsignacionSelected(newValue)
    }
    const handleChangedText = (ev) => {
        console.log(ev.target.name);
        setText(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: item.id === ev.target.name ? ev.target.value : item.value
            })
            return arr
        }, []))
    }
    return (
        <>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item xs={12} lg={12} md={12} >
                    <Box pb={1}>
                        <b>{'Especialidad'}:</b>
                    </Box>
                    <Autocomplete
                        fullWidth
                        value={asignacionSelected}
                        options={asignaciones.reduce((arr, item) => {
                            arr.push({ id: item.id, label: item.nombre })
                            return arr
                        }, [])}
                        onChange={handleAsignacionSelected}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                placeholder={'Seleccione especialidad'}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} lg={12} md={12} >
                    <Box pb={1}>
                        <b>{'Dias'}:</b>
                    </Box>
                    <Autocomplete
                        fullWidth
                        onChange={handleChangedSemanas}
                        options={dias.reduce((arr, item) => {
                            arr.push({ id: item.id, label: item.value })
                            return arr
                        }, [])}
                        multiple
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                placeholder={'Seleccione dia de la semana'}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} lg={6} md={6} >
                    <Box pb={1}>
                        <b>{'Fechas'}:</b>
                    </Box>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name={'fechaInicio'}
                        value={text.find(x => x.id === 'fechaInicio').value}
                        onChange={(e) => handleChangedText(e)}
                        type={'date'}
                    />
                </Grid>
                <Grid item xs={12} lg={6} md={6} sx={{ mt: 3.4 }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name={'fechaFin'}
                        value={text.find(x => x.id === 'fechaFin').value}
                        onChange={(e) => handleChangedText(e)}
                        type={'date'}
                    />
                </Grid>
                <Grid item xs={12} lg={6} md={6} >
                    <Box pb={1}>
                        <b>{'Hora'}:</b>
                    </Box>
                    <TextField
                        variant="outlined"
                        fullWidth
                        name={'horaInicio'}
                        value={text.find(x => x.id === 'horaInicio').value}
                        onChange={(e) => handleChangedText(e)}
                        type={'time'}
                    />
                </Grid>
                <Grid item xs={12} lg={6} md={6} sx={{ mt: 3.4 }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type={'time'}
                        name={'horaFin'}
                        value={text.find(x => x.id === 'horaFin').value}
                        onChange={(e) => handleChangedText(e)}
                    />
                </Grid>
                <Grid item xs={12} lg={3} md={3} >
                    <Box pb={1}>
                        <b>{'Duración(Minutos)'}:</b>
                    </Box>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type={'number'}
                        name={'duracion'}
                        value={text.find(x => x.id === 'duracion').value}
                        onChange={(e) => handleChangedText(e)}
                    />
                </Grid>
                <Grid item xs={12} lg={9} md={9} >
                    <Box pb={1}>
                        <b>{'Lugar'}:</b>
                    </Box>
                    <Autocomplete
                        fullWidth
                        value={pisoSelected}
                        options={consultorios.reduce((arr, item) => {
                            arr.push({ id: item.lugar_id, label: (item.lugar_nombre + ' | ' + item.area_servicio_nombre) })
                            return arr
                        }, []).sort(function (a, b) {
                            if (a.label > b.label) {
                                return 1;
                            }
                            if (a.label < b.label) {
                                return -1;
                            }
                            // a must be equal to b
                            return 0;
                        })}
                        onChange={handleChangedPiso}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                placeholder={'Seleccione lugar'}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} lg={9} md={9} >
                    <Button sx={{ m: 2 }} onClick={handleGuardarClick} fullWidth color="primary" variant='contained'>
                        Grabar
                    </Button>
                </Grid>
            </Grid>

        </>
    )
}
