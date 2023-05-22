import { Autocomplete, Box, Button, Card, Grid, List, ListItemButton, ListItemText, styled, TextField, Typography, Zoom } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ListaOrigenes from 'src/content/lista_camas/ListaOrigenes'
import WestIcon from '@mui/icons-material/West';
import HojaEvolucion from './hoja_evolucion'
import HojaIngreso from './nota_ingreso'
import HojaEnfermeria from './hoja_enfermeria'
import Interconsulta from './interconsulta'
import Indicaciones from './hoja_indicaciones'
import ExamenesAuxiliares from './examenes_auxiliares'
import AltaInternacion from './alta_internacion'
import Epicrisis from './epicrisis'
import { useSnackbar } from 'notistack'
import confirmSweetAlert from 'src/utils/confirm'
import useAuth from 'src/hooks/useAuth'
import Alta from './alta'

const ListItemWrapper = styled(ListItemButton)(
    () => `
    
        &.MuiButtonBase-root {
          border-radius: 0;
        }
    `
);


export default function Index() {
    const { drawerOpen, camasEmergencia, medicos } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const [camaSelected, setCamaSelected] = useState(null)
    const [mostrarOcultar, setMostrarOcultar] = useState(false)
    const [emergencia, setEmergencia] = useState(null)
    const [temporalEmergencia, setTemporalEmergencia] = useState(null)
    const [view, setView] = useState({ title: '', id: '' })
    const [medicosLista, setmedicosLista] = useState([]);
    const [tratantePrevio, setTratantePrevio] = useState(null);
    const [medicoSelected, setMedicoSelected] = useState(null);
    const { user } = useAuth()

    useEffect(() => {
        setmedicosLista(medicos.sort(function (a, b) {
            if (a.nombres > b.nombres) {
                return 1;
            }
            if (a.nombres < b.nombres) {
                return -1;
            }
            return 0;
        }))
    }, [medicos])

    const handleFilterMedicos = (value, newValue) => {
        setMedicoSelected(newValue === null ? null : newValue)
    }
    useEffect(() => {
        if (camasEmergencia.length > 0) {
            if (temporalEmergencia !== null) {
                setEmergencia(camasEmergencia.find(x => x === temporalEmergencia) === undefined ? '0' : '1')
            }
        }
    }, [camasEmergencia, temporalEmergencia])

    useEffect(() => {
        const getDatos = async (personaInternacionId) => {
            try {

                const res = await axios.get(`http://200.121.91.211:4001/camaPaciente/${personaInternacionId}`)
                setTemporalEmergencia(res.data.datosInternacion[res.data.datosInternacion.length - 1].cama_id);

                const diagnosticos = await axios.get(`http://200.121.91.211:4001/diagnosticosInternacion/${personaInternacionId}`)
                let fecha = res.data.listaOrigenes.find(x => x.tipo_evento_id === 2).fechahora.split('T')
                let fechaFinal = fecha[0].split('-')


                if (res.data.medicoTratate.personal_id !== null) {
                    setTratantePrevio(res.data.medicoTratate.personal_id)
                }

                setCamaSelected({
                    lista: res.data.listaOrigenes,
                    fechaIngreso: `${fechaFinal[0]}-${fechaFinal[1].length === 1 ? '0' + fechaFinal[1] : fechaFinal[1]}-${fechaFinal[2].length === 1 ? '0' + fechaFinal[2] : fechaFinal[2]}T${fecha[1]}`,
                    turno: res.data.turnosProgramado,
                    diagnosticos: diagnosticos.data.datos
                })
            } catch (e) {
                console.log(e);
            }
        }

        if (drawerOpen.item.boton !== undefined) {
            getDatos(drawerOpen.item.boton.persona_internacion_id)
        }
    }, [drawerOpen])

    useEffect(() => {
        if (tratantePrevio !== null && medicosLista.length > 0) {
            setMedicoSelected(medicos.reduce((arr, item) => {
                arr.push({
                    id: item.id_usuario,
                    title: `${item.nombres}`
                })
                return arr
            }, []).find(x => x.id === tratantePrevio));
        }
    }, [tratantePrevio, medicosLista])

    const handleHojaEvolucion = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Hoja de evolución', id: 'hoja' })
    }
    const handleHojaEnfermeria = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Hoja de Enfermeria', id: 'enfermeria' })
    }
    const handleInterConsulta = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Interconsulta', id: 'interconsulta' })
    }
    const handleHojaIndicaciones = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Hoja de indicaciones', id: 'indicaciones' })
    }
    const handleEstudios = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Exámenes auxiliares', id: 'estudios' })
    }
    const handleAltaInternacion = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Alta | Hospitalizacion', id: 'altaEmergencia' })
    }
    const handleHojaNotaIngreso = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Nota de ingreso', id: 'nota_ingreso' })
    }
    const handleEpicrisis = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Epicrisis', id: 'epicrisis' })
    }
    const handleAlta = () => {
        setMostrarOcultar(x => !x)
        setView({ title: 'Alta', id: 'alta' })
    }

    const handleAsignarMedico = async () => {
        let error = []
        if (medicoSelected === null) {
            error.push("Debe seleccionar un médico tratante")
        }
        if (error.length > 0) {
            error.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            }))
        } else {
            const rpta = await confirmSweetAlert(`${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`, `Esta seguro que desea asignar al medico: ${medicoSelected.title.toUpperCase()} como médico tratante al paciente : ${drawerOpen.title}`, 'warning', true)
            if (rpta) {
                let obj = {
                    personaId: drawerOpen.item.boton.persona_internacion_id,
                    doctor: medicoSelected.id,
                }
                const response = await axios.post(`http://200.121.91.211:4001/updateDoctorTratante`, { ...obj })
                if (typeof response.data === 'object') {
                    enqueueSnackbar(response.data.error, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        TransitionComponent: Zoom,
                        autoHideDuration: 1000
                    })
                } else {
                    enqueueSnackbar(response.data, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        TransitionComponent: Zoom,
                        autoHideDuration: 1000
                    })
                }
            } else {
                confirmSweetAlert('Advertencia', 'Usted cancelo la asignación del medico tratante', 'info', false)
            }
        }
    }
    return (
        <>
            <Box sx={{ m: 2 }}>
                <Typography variant='h4'>
                    {drawerOpen.item.boton.ubicacion}
                </Typography>
            </Box>
            {
                camaSelected !== null && <>
                    <Card sx={{ py: 2 }} >


                        {
                            !mostrarOcultar && <Grid
                                sx={{
                                    px: { xs: 0, md: 2 }
                                }}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item xs={6} lg={2}>
                                    <Typography variant="p" component="p" gutterBottom>
                                        <b>Fecha de Ingreso</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={10}>
                                    <TextField
                                        fullWidth
                                        value={camaSelected.fechaIngreso}
                                        disabled
                                        type={'datetime-local'}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={2}>
                                    <Typography variant="p" component="p" gutterBottom>
                                        <b>Diagnosticos</b>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={10}>
                                    <List disablePadding component="div">

                                        {camaSelected.diagnosticos.map((value, ix) => {
                                            return (
                                                <ListItemWrapper
                                                    sx={{
                                                        py: 0,
                                                        ml: -2
                                                    }}
                                                    key={ix}
                                                >
                                                    <ListItemText
                                                        primary={value.nombreLista}
                                                        primaryTypographyProps={{ variant: 'h5' }}
                                                    />
                                                </ListItemWrapper>
                                            );
                                        })}
                                    </List>
                                </Grid>
                                {
                                    emergencia !== null && <>

                                        {
                                            emergencia === '0' && <>
                                                <Grid item xs={12} lg={9}>
                                                    <Typography variant="p" component="p" gutterBottom><b>Médico Tratante</b></Typography>
                                                    <Autocomplete
                                                        fullWidth
                                                        value={medicoSelected}
                                                        onChange={handleFilterMedicos}
                                                        options={medicosLista.reduce((arr, item) => {
                                                            arr.push({
                                                                id: item.id_usuario,
                                                                title: `${item.nombres}`
                                                            })
                                                            return arr
                                                        }, [])}
                                                        getOptionLabel={(option) => option.title}
                                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                fullWidth
                                                                variant="outlined"
                                                                label={''}
                                                                placeholder={'Seleccione médico'}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} lg={3} sx={{ mt: 3 }}>
                                                    <Button variant='contained' fullWidth onClick={() => handleAsignarMedico()}>Grabar Médico</Button>
                                                </Grid>

                                            </>
                                        }

                                        <Grid item xs={12} lg={12}>
                                            <Typography variant="p" component="p" gutterBottom>
                                                <b>Movimientos</b>
                                            </Typography>
                                            <ListaOrigenes datos={camaSelected.lista} />
                                        </Grid>

                                        <Grid item xs={12} lg={12}>
                                            <Box sx={{ p: 2, alignItems: "center", justifyContent: "center" }} >
                                                {
                                                    emergencia === '0' && <Button variant="contained" sx={{ mx: .5 }}
                                                        onClick={() => handleHojaNotaIngreso()} >Nota de ingreso </Button>
                                                }

                                                <Button variant="contained"
                                                    onClick={() => handleHojaEvolucion()} >Hoja de evolución </Button>
                                                <Button variant="contained" sx={{ mx: .5 }}
                                                    onClick={() => handleHojaIndicaciones()}>Hoja de indicaciones</Button>
                                                <Button variant="contained"
                                                    onClick={() => handleHojaEnfermeria()}  >Hoja de enfermeria </Button>
                                                {
                                                    emergencia === '0' && <Button variant="contained" sx={{ mx: .5 }}
                                                        onClick={() => handleEpicrisis()} >Epicrisis </Button>
                                                }

                                                <Button variant="contained" sx={{ mx: .5 }}
                                                    onClick={() => handleEstudios()}
                                                >Exámenes auxiliares</Button>
                                                <Button variant="contained" sx={{ mt: .5 }}
                                                    onClick={() => handleInterConsulta()}>Interconsulta</Button>
                                                {
                                                    emergencia === '1' && <Button variant="contained" sx={{ mt: .5, mx: .5 }}
                                                        onClick={() => handleAltaInternacion()}>Alta | Hospitalizacion</Button>
                                                }
                                                {
                                                    emergencia === '0' && <Button variant="contained" sx={{ mt: .5, mx: .5 }}
                                                        onClick={() => handleAlta()}>Alta</Button>
                                                }

                                            </Box>
                                        </Grid>
                                    </>
                                }

                            </Grid>
                        }
                        {
                            mostrarOcultar && <Grid
                                sx={{
                                    px: { xs: 0, md: 2 }
                                }}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            > <Grid item xs={12} lg={12}>
                                    <Button
                                        sx={{ float: 'right' }}
                                        startIcon={<WestIcon />}
                                        variant="contained"
                                        onClick={() => setMostrarOcultar(x => !x)} >Volver</Button>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    {
                                        view.id === 'nota_ingreso' && <HojaIngreso title={view.title} />
                                    }
                                    {
                                        view.id === 'alta' && <Alta title={view.title} />
                                    }
                                    {
                                        view.id === 'hoja' && <HojaEvolucion title={view.title} />
                                    }
                                    {
                                        view.id === 'enfermeria' && <HojaEnfermeria />
                                    }
                                    {
                                        view.id === 'interconsulta' && <Interconsulta />
                                    }
                                    {
                                        view.id === 'indicaciones' && <Indicaciones title={view.title} />
                                    }

                                    {
                                        view.id === 'estudios' && <ExamenesAuxiliares title={view.title} />
                                    }
                                    {
                                        view.id === 'altaEmergencia' && <AltaInternacion title={view.title} />
                                    }
                                    {
                                        view.id === 'epicrisis' && <Epicrisis title={view.title} />
                                    }
                                </Grid>
                            </Grid>
                        }


                    </Card>
                </>
            }

        </>
    )
}
