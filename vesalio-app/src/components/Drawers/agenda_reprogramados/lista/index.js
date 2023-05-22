import { Alert, Box, Button, Card, CardContent, Checkbox, Collapse, Grid, IconButton, TextField, Typography, Zoom } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import confirmSweetAlert from 'src/utils/confirm'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Label from 'src/components/Label'
import { useSnackbar } from 'notistack'
import useAuth from 'src/hooks/useAuth'


export default function Index({ lista }) {
    const { enqueueSnackbar } = useSnackbar();
    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const [horas, setHoras] = useState([])
    const [horaSelected, setHoraSelected] = useState([])
    const [datos, setDatos] = useState([])
    const [openAlert, setOpenAlert] = useState(true);
    const [selected, setSelected] = useState({ paciente: { item: null, selected: false } })
    const [pacienteWsp, setPacienteWsp] = useState('')
    const [itemAxios, setItemAxios] = useState(null)
    const { user } = useAuth()

    useEffect(() => {
        const getDatos = async (obj) => {
            const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorarioNew`, obj)
            setItemAxios(response.data)
        }
        const getDatosLista = async (id, personaId, fecha, dni) => {
            const response = await axios.post(`http://apis-vesalio.com.pe/turnoProgramadoListaCitasItemPersona`, { fecha: fecha, personaId: personaId })
            const rptta = await axios.post(`http://apis-vesalio.com.pe/historiaSistcomp`, {
                numero: dni
            })
            const celular = await axios.get(`http://apis-vesalio.com.pe/recordarioCitas/${id}`)
            setPacienteWsp(celular.data.length === 0 ? '' : celular.data[0].celular)

            setSelected(x => {
                return {
                    ...x,
                    paciente: {
                        item: rptta.data.recordset.sort(function (a, b) {
                            if (a.Nro_Historia > b.Nro_Historia) {
                                return 1;
                            }
                            if (a.Nro_Historia < b.Nro_Historia) {
                                return -1;
                            }
                            return 0;
                        })[0],
                        selected: true
                    }
                }
            })
            setDatos(response.data)
        }
        getDatos({ agenda: drawerOpen.item.asignacionId, fecha: drawerOpen.item.item.fecha_calendario.split('T')[0] })
        getDatosLista(drawerOpen.item.recividoPrincipal.id, drawerOpen.item.recividoPrincipal.persona_id_paciente, drawerOpen.item.item.fecha_calendario.split('T')[0], drawerOpen.item.recividoPrincipal.documento_paciente)
    }, [drawerOpen])

    useEffect(() => {
        setHoras(drawerOpen.item.agenda.horas.horasDisponibles.reduce((arr, item) => {
            let exsite = lista.filter(x => x.hora === item.horas && x.estado_turno_id !== 3)
            arr.push({ horas: item.horas, libre: exsite.length === 0 && true, contenido: exsite.length === 0 ? null : exsite })
            return arr
        }, []))
    }, [drawerOpen, lista])

    const handleCheck = (id) => {
        setHoraSelected([id])
    }

    const getGenerarCita = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/reporgramarCitaAdminNew`, obj)
        return response.data;
    }
    const soloNumeros = (valor) => {
        let numeros = '0123456789'
        let rpta = true
        for (let i = 0; i < valor.length; i++) {
            if (numeros.indexOf(valor.substring(i, i + 1)) === -1) {
                rpta = false
            }
        }
        return rpta
    }
    const reservarCita = async () => {
        let errors = []

        if (!soloNumeros(pacienteWsp)) {
            errors.push('El whatsapp solo debe contener numeros')
        } else {
            if (pacienteWsp.length !== 9) {
                errors.push('El whatsapp solo debe contener 9 numeros')
            }
            if (pacienteWsp.substring(0, 1) !== '9') {
                errors.push('El whatsapp debe iniciar con 9')
            }
        }
        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            }))
        } else {
            const rpta = await confirmSweetAlert('Confirmar cita', '¿Esta seguro que desea confirmar la cita?', 'info', true)
            if (rpta) {
                // aqui va las validaciones 

                let existeTurno = await getExisteTurno({
                    datos: [{ id: 'paciente', value: selected.paciente.item.Nro_DocIdenti },
                    { id: 'asignacion', value: drawerOpen.item.asignacionId },
                    { id: 'fecha', value: drawerOpen.item.item.fecha_calendario.split('T')[0] }]
                })
                if (existeTurno[0].cantidad === 0) {
                    console.log(horaSelected[0]);
                    let result = await getGenerarCita({
                        id_usuario: user._id,
                        fecha: drawerOpen.item.item.fecha_calendario.split('T')[0],
                        hora: horaSelected[0],
                        asignacion: drawerOpen.item.asignacionId,
                        agenda: drawerOpen.item.agenda.id,
                        datos: {
                            doctor: itemAxios.cabecera[0],
                            turno: drawerOpen.item.item.fecha_calendario.split('T')[0] + 'T' + horaSelected[0],
                            paciente: selected
                        },
                        celular: pacienteWsp,
                        paciente: selected,
                        turnoAnterior: drawerOpen.item.recividoPrincipal
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
                            drawerOpen.item.setAsignacionSelected()
                        }, 1000)
                    } else {
                        enqueueSnackbar('Error: Es posible que se haya generado una cita en simultáneo. Intente con otro horario.', {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            },
                            TransitionComponent: Zoom,
                            autoHideDuration: 1000
                        })
                    }
                } else {
                    enqueueSnackbar('Error: No puede generar una cita con el mismo doctor en el mismo día', {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        TransitionComponent: Zoom,
                        autoHideDuration: 1000
                    })
                }


            }
        }

    }
    const getExisteTurno = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/existeTurnoPacienteNew`, obj)
        return response.data;
    }
    return (

        <>

            <Grid
                sx={{
                    px: { xs: 0, md: 4 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                <Grid item lg={12}>
                    {selected.paciente.selected && <>
                        <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                            <Grid item xs={12} lg={12} md={12}>
                                <Box display="flex" alignItems="center">
                                    <Box>
                                        <Typography color="text.primary" variant="h4" noWrap>
                                            {selected.paciente.item.Des_ApePaterno + ' ' + selected.paciente.item.Des_ApeMaterno + ' ' + selected.paciente.item.Des_Nombres}
                                        </Typography>
                                        <Typography variant="subtitle1" noWrap>
                                            {selected.paciente.item.Nro_DocIdenti}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={12} md={12} sx={{ mx: 2 }}>
                                <TextField
                                    variant="outlined"
                                    label={'WhatsApp del paciente con el que va a generar la cita'}
                                    value={pacienteWsp}
                                    onChange={(e) => setPacienteWsp(e.target.value)}
                                    fullWidth
                                    type={'number'}
                                    placeholder={'Ingrese número de whatsapp'}
                                />
                            </Grid>



                        </Grid>


                    </>}
                </Grid>
                <Grid item lg={12}>

                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenAlert(x => !x);
                                }}
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        }
                        severity={datos.length > 0 ? "warning" : 'info'}
                    >
                        {
                            datos.length <= 0 ? "No tiene citas regsitradas para el dia de hoy." :
                                'El paciente tiene citas registradas para el dia de hoy.'}
                    </Alert>
                    <Collapse in={openAlert}>
                        {datos.map(x => <Card>
                            <CardContent >
                                <Box>
                                    <Card style={{ border: "1px solid #efefef", boxShadow: "7px 7px 7px -7px #333", padding: "10px" }}>
                                        <Grid
                                            sx={{
                                                px: { xs: 0, md: 2 }
                                            }}
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <Grid item xs={12} lg={4}>
                                                <Typography variant='subtitle2'>
                                                    <b>Especialidad:{" "}</b>{x.especialidad_nombre}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={8}>
                                                <Typography variant='subtitle2'>
                                                    <b>Doctor:{" "}</b>{x.nombre_doctor}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={4}>
                                                <Typography variant='subtitle2'>
                                                    <b>Fecha:{" "}</b>{x.fecha.split('T')[0]}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} lg={8}>
                                                <Typography variant='subtitle2'>
                                                    <b>Hora:{" "}</b><Label color={"error"} >{x.hora}</Label>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Card>

                                </Box>

                            </CardContent>

                        </Card>)}
                    </Collapse>


                </Grid>


                {
                    horas.filter((x, ix) => ix !== horas.length - 1 && x.libre).map((x, ix) => <Grid key={ix} item xs={12}>

                        <Card>
                            <CardContent >

                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Box sx={{ marginTop: "17px" }}>
                                        <Typography variant='h4'>{x.horas}</Typography>
                                    </Box>
                                    <Box sx={{ marginTop: "17px" }}>
                                        <Checkbox sx={{ mt: -1 }} checked={horaSelected.find(y => y === x.horas) !== undefined} onChange={() => handleCheck(x.horas)} />
                                    </Box>
                                </Box>
                            </CardContent>

                        </Card>

                    </Grid>)
                }



            </Grid>


            {
                horaSelected.length > 0 && <Grid
                    sx={{
                        px: { xs: 0, md: 4 }
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                >




                    <Grid item xs={12}>
                        <Button fullWidth variant='contained' onClick={reservarCita}>
                            Generar
                        </Button>
                    </Grid>

                </Grid>
            }
        </>


    )
}
