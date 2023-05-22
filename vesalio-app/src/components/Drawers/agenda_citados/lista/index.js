import { Box, Button, Card, CardContent, Checkbox, Grid, IconButton, Link, Tooltip, Typography, Zoom } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout'
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import Label from 'src/components/Label';
import GenerarCita from './GenerarCita'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
import EditIcon from '@mui/icons-material/Edit';
import Componente from './Componente';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

export default function Index({ selected, lista, handleChanged, handleChangeds }) {

    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const [horas, setHoras] = useState([])
    const [horaSelected, setHoraSelected] = useState(null)
    const [adicionales, setAdicionales] = useState([])
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    useEffect(() => {
        setHoras(drawerOpen.item.agenda.horas.horasDisponibles.reduce((arr, item) => {
            let exsite = lista.filter(x => x.hora === item.horas && x.estado_turno_id !== 3)
            arr.push({ horas: item.horas, libre: exsite.length === 0 && true, contenido: exsite.length === 0 ? null : exsite })
            return arr
        }, []))
    }, [drawerOpen, lista])

    useEffect(() => {
        setAdicionales(lista.filter(x => x.hora === '00:00:00' && x.estado_turno_id !== 3))
    }, [lista])

    const anularCita = (id) => {
        mostrarComponent({
            contenido: 'anularCita',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }
    const addObservacion = (id) => {
        mostrarComponent({
            contenido: 'addObservacion',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }
    const addMensajeWsp = (id) => {
        if (id === null) {
            enqueueSnackbar('Debe ingresar un celular al paciente', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1500
            })
        } else if (id !== null) {
            if (id.length > 0) {
                mostrarComponent({
                    contenido: 'addMensajePaciente',
                    estado: true,
                    size: 'xs',
                    item: id
                }, 'modalOpen')
            } else {
                enqueueSnackbar('Debe ingresar un celular al paciente', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1500
                })
            }
        }

    }
    const verObservacion = (id) => {
        mostrarComponent({
            contenido: 'verObservaciones',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
    }
    const addTeleconsulta = (obj) => {
        mostrarComponent({
            contenido: 'addTeleconulta',
            estado: true,
            size: 'xs',
            item: obj
        }, 'modalOpen')
    }
    const editarPaciente = (obj) => {
        mostrarComponent({
            contenido: 'editarPaciente',
            estado: true,
            size: 'xs',
            item: obj
        }, 'modalOpen')
    }
    const reprogramacion = (id) => {
        navigate(`/citas/reprogramacion/${id}`);
        mostrarComponent({
            contenido: '',
            estado: false,
        }, 'drawerOpen')
    }
    const seleccionarTodos = () => {
        handleChangeds(horas.map(x => x.horas));
    }
    return (

        <>
            <Button
                variant='outlined' color={selected.length === 0 ? "secondary" : "primary"} sx={{ ml: 4, mb: 2 }}
                onClick={seleccionarTodos}
            >
               {
                selected.length === 0 ? "Seleccionar todos" : "Limpiar"
               }
            </Button>
            {
                horaSelected === null && <Grid
                    sx={{
                        px: { xs: 0, md: 4 }
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                >
                    {
                        horas.filter((x, ix) => ix !== horas.length - 1).map((x, ix) => <Grid key={ix} item xs={12}>

                            <Card>
                                <CardContent >
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            <Checkbox sx={{ mt: -1 }} checked={selected.filter(y => y === x.horas).length !== 0} onChange={(e) => handleChanged(e, x)} />
                                            <Typography variant='h4'>{x.horas}</Typography>
                                        </Box>
                                        {
                                            x.libre && <Box>
                                                <Tooltip title={'Generar cita'} arrow>
                                                    <IconButton
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => setHoraSelected({
                                                            tipo: "nuevo",
                                                            hora: x.horas
                                                        })
                                                        }
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        }
                                        {/* {
                                    !x.libre && <Box>
                                        <Tooltip title={'Anular'} arrow>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                            >
                                                <BlockIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={'Reprogramar'} arrow>
                                            <IconButton
                                                size="small"
                                                color="secondary"
                                            >
                                                <CachedIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                } */}
                                    </Box>
                                    {
                                        (!x.libre && x.contenido.filter(y => y.estado_turno_id === 7 && y.documento === null).length > 0) && "TURNO BLOQUEADO"
                                    }
                                    {
                                        !x.libre && x.contenido.map((datos, iX) => <Box key={iX}>
                                            {
                                                datos.documento !== null && <Card style={{ border: "1px solid #efefef", boxShadow: "7px 7px 7px -7px #333", padding: "10px" }}>
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
                                                        <Grid container style={{ marginTop: "20px" }} xs={12} lg={12}>

                                                            <Grid style={{ padding: "0px", textAlign: "left" }} item xs={9}>
                                                                <Typography variant='subtitle2'>
                                                                    <Tooltip title="Agregar Datos" placement='top-end'>
                                                                        <Link href='#' onClick={() => editarPaciente(datos)}>
                                                                            {datos.apellidos}
                                                                        </Link>
                                                                    </Tooltip>
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} lg={12}>
                                                            <Typography variant='subtitle2'>
                                                                <b>DNI:{" "}</b>{datos.documento}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12} lg={4}>
                                                            <b>Estado:</b><Label color={datos.estado_turno_id === 7 ? "error" : "primary"}>{datos.estadoturno}</Label>
                                                        </Grid>
                                                        <Grid item xs={12} lg={8}>
                                                            <Typography variant='subtitle2'>
                                                                <b>Celular:{" "}</b>{datos.celular}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} lg={12}>
                                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                                                                <Box sx={{ display: "flex" }}>
                                                                    <Box>
                                                                        <Tooltip title={'Agregar observación'} arrow>
                                                                            <IconButton
                                                                                size="small"
                                                                                color="secondary"
                                                                                onClick={() => addObservacion(datos.id)}
                                                                            >
                                                                                <EditIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title={'Ver observaciones'} arrow>
                                                                            <IconButton
                                                                                size="small"
                                                                                color="secondary"
                                                                                onClick={() => verObservacion(datos.id)}
                                                                            >
                                                                                <PermDeviceInformationIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                        <Tooltip title={'Enviar mensaje paciente'} arrow>
                                                                            <IconButton
                                                                                size="small"
                                                                                color="secondary"
                                                                                onClick={() => addMensajeWsp(datos.celular)}
                                                                            >
                                                                                <PhoneAndroidIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Tooltip>

                                                                        <Tooltip title={'Agregar link de teleconsulta'} arrow>
                                                                            <IconButton
                                                                                size="small"
                                                                                color="secondary"
                                                                                onClick={() => addTeleconsulta(datos)}
                                                                            >
                                                                                <VideoCameraFrontIcon fontSize="small" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </Box>

                                                                    <Box>
                                                                        <Componente list={datos} />
                                                                    </Box>

                                                                </Box>

                                                                <Box>
                                                                    <Tooltip title={'Anular'} arrow>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="secondary"
                                                                            onClick={() => anularCita(datos.id)}
                                                                            sx={{ float: "right" }}
                                                                        >
                                                                            <BlockIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title={'Reprogramar'} arrow>
                                                                        <IconButton
                                                                            size="small"
                                                                            color="secondary"
                                                                            sx={{ float: "right" }}
                                                                            onClick={() => reprogramacion(datos.id)}
                                                                        >
                                                                            <CachedIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            }

                                        </Box>)
                                    }
                                </CardContent>

                            </Card>

                        </Grid>)
                    }
                    <Grid item xs={12}>
                        <Typography variant='h4'>Adicionales</Typography>
                    </Grid>
                    {
                        adicionales.map((datos, ix) => <Grid key={ix} item xs={12}>

                            <Card>
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
                                                <Grid container style={{ marginTop: "20px" }} xs={12} lg={12}>

                                                    <Grid style={{ padding: "0px", textAlign: "left" }} item xs={9}>
                                                        <Typography variant='subtitle2'>
                                                            <Tooltip title="Agregar Datos" placement='top-end'>
                                                                <Link href='#' onClick={() => editarPaciente(datos)}>
                                                                    {datos.apellidos}
                                                                </Link>
                                                            </Tooltip>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} lg={12}>
                                                    <Typography variant='subtitle2'>
                                                        <b>DNI:{" "}</b>{datos.documento}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} lg={4}>
                                                    <b>Estado:</b><Label color={datos.estado_turno_id === 7 ? "error" : "primary"}>{datos.estadoturno}</Label>
                                                </Grid>
                                                <Grid item xs={12} lg={8}>
                                                    <Typography variant='subtitle2'>
                                                        <b>Celular:{" "}</b>{datos.celular}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} lg={12}>
                                                    <Box>
                                                        <Tooltip title={'Anular'} arrow>
                                                            <IconButton
                                                                size="small"
                                                                color="secondary"
                                                                onClick={() => anularCita(datos.id)}
                                                                sx={{ float: "right" }}
                                                            >
                                                                <BlockIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={'Reprogramar'} arrow>
                                                            <IconButton
                                                                size="small"
                                                                color="secondary"
                                                                sx={{ float: "right" }}
                                                            >
                                                                <CachedIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={'Agregar observación'} arrow>
                                                            <IconButton
                                                                size="small"
                                                                color="secondary"
                                                                onClick={() => addObservacion(datos.id)}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={'Ver observaciones'} arrow>
                                                            <IconButton
                                                                size="small"
                                                                color="secondary"
                                                                onClick={() => verObservacion(datos.id)}
                                                            >
                                                                <PermDeviceInformationIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={'Enviar mensaje paciente'} arrow>
                                                            <IconButton
                                                                size="small"
                                                                color="secondary"
                                                                onClick={() => addMensajeWsp(datos.celular)}
                                                            >
                                                                <PhoneAndroidIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title={'Agregar link de teleconsulta'} arrow>
                                                            <IconButton
                                                                size="small"
                                                                color="secondary"
                                                                onClick={() => addTeleconsulta(datos)}
                                                            >
                                                                <VideoCameraFrontIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Card>

                                    </Box>

                                </CardContent>

                            </Card>

                        </Grid>)
                    }

                </Grid>
            }
            {
                horaSelected !== null && <Grid
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
                        <Button fullWidth onClick={() => setHoraSelected(null)}>
                            Volver
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <GenerarCita horaSelected={horaSelected} />
                    </Grid>
                </Grid>
            }
        </>


    )
}
