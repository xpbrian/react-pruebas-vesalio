import { Box, Button, Card, CardContent, Checkbox, Grid, IconButton, Link, Tooltip, Typography } from '@mui/material'
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

export default function Index({ lista,handleChanged }) {

    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const [horas, setHoras] = useState([])
    const [horaSelected, setHoraSelected] = useState(null)

    useEffect(()=>{console.log(drawerOpen);},[drawerOpen])

    useEffect(() => {
        let getTime = (hour, minute, step) => {
            let nextMinute = minute + step > 59 ? 60 - (minute + step) : minute + step;
            let nextHour = nextMinute > minute ? hour : hour + 1 > 23 ? 0 : hour + 1;
            return [nextHour, nextMinute];
        };

        let padTime = (time) => `${`${time[0]}`.padStart(2, '0')}:${`${time[1]}`.padEnd(2, '0')}`;

        let makeSchedule = (currentTime, endTime, step) => {
            let nextTime = getTime(currentTime[0], currentTime[1], step);
            return nextTime.join(':') !== endTime.join(':') ?
                `${padTime(currentTime)}-${makeSchedule(nextTime, endTime, step)}`
                : `${padTime(currentTime)}-${padTime(nextTime)}`;
        };

        const startTime = [parseInt(drawerOpen.item.agenda.hora_inicio.split(':')[0]), parseInt(drawerOpen.item.agenda.hora_inicio.split(':')[1])];
        const endTime = [parseInt(drawerOpen.item.agenda.hora_fin.split(':')[0]), parseInt(drawerOpen.item.agenda.hora_fin.split(':')[1])];
        const interval = parseInt(drawerOpen.item.agenda.duracion_turno);

        const scheduleList = makeSchedule(startTime, endTime, interval).split('-');

        setHoras(scheduleList.filter(x => x.length === 5).reduce((arr, item) => {
            let exsite = lista.filter(x => x.hora === item + ':00' && x.estado_turno_id !== 3)
            arr.push({ horas: item, libre: exsite.length === 0 && true, contenido: exsite.length === 0 ? null : exsite })
            return arr
        }, []))
    }, [drawerOpen, lista])
    
    
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
        mostrarComponent({
            contenido: 'addMensajePaciente',
            estado: true,
            size: 'xs',
            item: id
        }, 'modalOpen')
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

    return (

        <>
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
                        horas.map((x, ix) => <Grid key={ix} item xs={12}>

                            <Card>
                                <CardContent >
                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            <Checkbox sx={{ mt: -1 }}  onChange={(e) => handleChanged(e,x)} />
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
                                                                        <Link href='#'  onClick={() => editarPaciente(datos)}>
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
                                            }

                                        </Box>)
                                    }
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
