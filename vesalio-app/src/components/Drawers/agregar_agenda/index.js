import { Autocomplete, Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Zoom } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'
import GenerarAgenda from './GenerarAgenda'

export default function Index() {
    const { drawerOpen, consultorios, mostrarComponent } = useLayoutContext()
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
    const { user } = useAuth()
    const [diaSelected, setDiaSelected] = useState([])
    const [pisoSelected, setPisoSelected] = useState(null)
    const { enqueueSnackbar } = useSnackbar()
    useEffect(() => { console.log(drawerOpen); }, [drawerOpen])
    const handleChangedText = (ev) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({
                ...item,
                value: item.id === ev.target.name ? ev.target.value : item.value
            })
            return arr
        }, []))
    }
    const handleChangedPiso = (_, newValue) => {
        setPisoSelected(newValue);
    }
    const mostrarHistorial = () => {
        mostrarComponent({
            contenido: 'historialAgenda',
            estado: true,
            size: 'lg',
            item: {
                personalId: {
                    asignacion_id: drawerOpen.item.personalId.asignacion_id
                }
            }
        }, 'modalOpen')
    }

    const handleGuardarClick = async () => {
        let errors = []
        if (diaSelected.length === 0) {
            errors.push('Debe seleccionar un dia de la semana')
        } else if (pisoSelected === null) {
            errors.push('Debe seleccionar un piso')
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
                asignacion: drawerOpen.item.personalId.asignacion_id,
                lugar: obtener.lugar_id,
                dias: diaSelected,
                horaInicio: text.find(x => x.id === 'horaInicio').value,
                horaFin: text.find(x => x.id === 'horaFin').value,
                duracion: text.find(x => x.id === 'duracion').value,
                piso_id: obtener.piso_id,
                area_servicio_id: obtener.area_servicio_id
            }
            let response = await axios.post(`http://apis-vesalio.com.pe/generarAgendaNew`, { ...obj })
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


    return (
        <Grid

            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
        >
            <Grid item xs={12} style={{ margin: "10px 25px -25px 25px" }} >
                <Button sx={{ mt: 1 }} variant='outlined' onClick={mostrarHistorial} fullWidth>Ver historial de agendas</Button>
            </Grid>
            <Grid item xs={12} >
                <Card sx={{ p: 1 }}>
                    <CardHeader title={"Generar agenda"} subtitle={"Digite sus datos"} />
                    <Divider />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} lg={6} md={6} >
                                <Box pb={0}>
                                    <b>{'Hora Inicio'}:</b>
                                </Box>
                                <Box style={{ margin: "10px", marginLeft: "0px" }}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name={'horaInicio'}
                                        value={text.find(x => x.id === 'horaInicio').value}
                                        onChange={(e) => handleChangedText(e)}
                                        type={'time'}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6} md={6}>
                                <Box pb={0}>
                                    <b>{'Hora Fin'}:</b>
                                </Box>
                                <Box style={{ margin: "10px", marginLeft: "0px" }}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type={'time'}
                                        name={'horaFin'}
                                        value={text.find(x => x.id === 'horaFin').value}
                                        onChange={(e) => handleChangedText(e)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={3} md={3} mt={1} >
                                <Box pb={0}>
                                    <b>{'Duración(Minutos)'}:</b>
                                </Box>
                                <Box style={{ margin: "10px", marginLeft: "0px" }}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        type={'number'}
                                        name={'duracion'}
                                        value={text.find(x => x.id === 'duracion').value}
                                        onChange={(e) => handleChangedText(e)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={9} md={9} mt={1} >
                                <Box pb={0}>
                                    <b>{'Lugar'}:</b>
                                </Box>
                                <Box style={{ margin: "10px", marginLeft: "0px" }}>
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
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={12} md={12} >
                                <GenerarAgenda setDiaSelected={setDiaSelected} diaSelected={diaSelected}/>
                            </Grid>
                            <Grid item xs={12} lg={12} md={12} >
                                <Button fullWidth variant='contained' onClick={handleGuardarClick}>Generar agenda</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>


        </Grid>
    )
}
