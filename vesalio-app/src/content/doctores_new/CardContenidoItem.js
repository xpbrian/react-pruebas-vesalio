import { Box, Button, Card, Chip, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function CardContenidoItem({ item, asignacionSelected, setAsignacionSelected }) {
    const [datos, setDatos] = useState(null)
    const [mostrar, setMostrar] = useState(null)
    const { mostrarComponent } = useLayoutContext()
    const getDatos = async (asig, iteobj) => {
        const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAsignacionItem`, {
            idAsignacion: asig.asignacion_id,
            fechaCalendario: iteobj.fecha_calendario.split('T')[0],
            dia: iteobj.dia_de_la_semana
        })
        if (response2.status === 200) {
            console.log(response2.data.asignacionDatos);
            setDatos(response2.data.asignacionDatos.length === 0 ? null : response2.data.asignacionDatos);
        }
    }
    useEffect(() => {
        getDatos(asignacionSelected, item)
    }, [item, asignacionSelected])

    useEffect(() => {
        if (datos !== null && item.existe) {
            const getDatos = async (agenda, iteobj, asignacion) => {
                const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaTurnoProgramado`, {
                    idAsignacion: asignacion.personal_id,
                    fechaCalendario: iteobj.fecha_calendario.split('T')[0],
                })

                if (response2.status === 200) {

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

                    const startTime = [parseInt(agenda.hora_inicio.split(':')[0]), parseInt(agenda.hora_inicio.split(':')[1])];
                    const endTime = [parseInt(agenda.hora_fin.split(':')[0]), parseInt(agenda.hora_fin.split(':')[1])];
                    const interval = parseInt(agenda.duracion_turno);

                    const scheduleList = makeSchedule(startTime, endTime, interval).split('-');
                    setMostrar({
                        citados: response2.data.turnosDatos.reduce((arr, item) => {
                            if (item.estado_turno_id === 1) {
                                arr++
                            }

                            return arr
                        }, 0),
                        bloqueados: response2.data.turnosDatos.reduce((arr, item) => {
                            if (item.estado_turno_id === 7) {
                                arr++
                            }

                            return arr
                        }, 0),
                        disponibles: scheduleList.filter(x => x.length === 5).reduce((arr, item) => {
                            let exsite = response2.data.turnosDatos.filter(x => x.hora === item + ':00' && x.estado_turno_id !== 3)
                            if (exsite.length === 0) {
                                arr.push(item)
                            }
                            return arr
                        }, []).length

                    })
                }
            }
            const getDatosMultiple = async (agenda, iteobj, asignacion) => {
                let tmp = []
                const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaTurnoProgramado`, {
                    idAsignacion: asignacion.personal_id,
                    fechaCalendario: iteobj.fecha_calendario.split('T')[0],
                })
                console.log(response2);
                for (let i = 0; i < agenda.length; i++) {

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

                    const startTime = [parseInt(agenda[0].hora_inicio.split(':')[0]), parseInt(agenda[0].hora_inicio.split(':')[1])];
                    const endTime = [parseInt(agenda[0].hora_fin.split(':')[0]), parseInt(agenda[0].hora_fin.split(':')[1])];
                    const interval = parseInt(agenda[0].duracion_turno);

                    const scheduleList = makeSchedule(startTime, endTime, interval).split('-');
                    tmp.push(scheduleList)
                }
                console.log(tmp.reduce((arr, item) => {
                    item.map(y =>
                        arr.push(y)
                    )
                    return arr
                }, []));


                /*
                if (response2.status === 200) {
            
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
            
                    const startTime = [parseInt(agenda.hora_inicio.split(':')[0]), parseInt(agenda.hora_inicio.split(':')[1])];
                    const endTime = [parseInt(agenda.hora_fin.split(':')[0]), parseInt(agenda.hora_fin.split(':')[1])];
                    const interval = parseInt(agenda.duracion_turno);
            
                    const scheduleList = makeSchedule(startTime, endTime, interval).split('-');
                    setMostrar({
                        citados: response2.data.turnosDatos.reduce((arr, item) => {
                            if (item.estado_turno_id === 1) {
                                arr++
                            }
            
                            return arr
                        }, 0),
                        bloqueados: response2.data.turnosDatos.reduce((arr, item) => {
                            if (item.estado_turno_id === 7) {
                                arr++
                            }
            
                            return arr
                        }, 0),
                        disponibles: scheduleList.filter(x => x.length === 5).reduce((arr, item) => {
                            let exsite = response2.data.turnosDatos.filter(x => x.hora === item + ':00' && x.estado_turno_id !== 3)
                            if (exsite.length === 0) {
                                arr.push(item)
                            }
                            return arr
                        }, []).length
            
                    })
                }
                */
            }
            if (datos.length === 1) {
                getDatos(datos[0], item, asignacionSelected)
            } else {
                getDatosMultiple(datos, item, asignacionSelected);
                setMostrar(null)
            }


        } else {
            setMostrar(null)
        }
    }, [datos, item, asignacionSelected])

    const hanldeClick = () => {
        mostrarComponent({
            contenido: 'agendaCitados',
            estado: true,
            title: (item.dia_nombre + ' ' + item.dia_calendario + ' de ' + item.mes_nombre + ' del ' + item.anio_calendario),
            subtitle: 'Lista de citados',
            item: {
                item,
                agenda: datos[0],
                personalId: asignacionSelected.personal_id,
                asignacionId: asignacionSelected.asignacion_id,
                setAsignacionSelected: () => setAsignacionSelected(null)
            }
        }, 'drawerOpen')
    }
    const generarSobreturno = (fecha) => {
        mostrarComponent({
            contenido: 'citaSobreturnoNew',
            title: "Sobreturno",
            estado: true,
            subtitle: '',
            item: { agenda: asignacionSelected.asignacion_id, fecha: fecha }
        }, 'drawerOpen')
    }
    return (
        <>
            <Card style={{ background: datos === null ? 'white' : (datos.length === 1 ? 'white' : "red"), padding: "0px", textAlign: "center", minHeight: "154px", margin: "5px 10px 10px -5px" }}>

                {
                    item.existe && <>
                        {
                            mostrar !== null && <>
                                <Divider />
                                <Box style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "column", justifyItems: "center" }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                                        <Chip onClick={hanldeClick} label={mostrar.bloqueados} style={{ backgroundColor: "#f14", marginBottom: "10px", color: "white" }} />
                                        <Chip onClick={hanldeClick} label={mostrar.citados} style={{ backgroundColor: "#ff0", marginBottom: "10px" }} />
                                        <Chip onClick={hanldeClick} label={mostrar.disponibles} style={{ backgroundColor: "#0f0", marginBottom: "10px" }} />
                                    </Box>
                                    <Button variant='outlined' fullWidth size={"small"} onClick={() => generarSobreturno(item.fecha_calendario.split('T')[0])} >Adicionales</Button>
                                </Box>
                            </>
                        }
                    </>
                }

            </Card>


        </>
    )
}
