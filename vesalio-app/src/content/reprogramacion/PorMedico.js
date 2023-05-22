import { Box, Card, Chip, Divider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';


export default function ContenidoCalendario({ item, agignacionSelecteds, recividoPrincipal }) {

    const [lista, setLista] = useState([])
    const [data, setData] = useState([])
    const { mostrarComponent } = useLayoutContext()
    const [mostrar, setMostrar] = useState(null)

    useEffect(() => {
        setLista([])
        setData([])
        setMostrar(null)
    }, [])


    useEffect(() => {
        const getDatos = async (fecha, asignaciones) => {
            let response = await axios.post(`http://200.121.91.211:4001/datosCalendarioAsignacion`, {
                fecha: fecha.fecha_calendario,
                dia: fecha.dia_de_la_semana,
                asignaciones: asignaciones.reduce((arr, item) => {
                    arr.push(item.asignacion_id)
                    return arr
                }, [])
            })
            const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaTurnoProgramado`, {
                idAsignacion: asignaciones[0].personal_id,
                fechaCalendario: fecha.fecha_calendario.split('T')[0],
            })
            setData(response2.data)
            setLista(response.data.reduce((arr, item) => {
                arr.push({
                    ...item,
                    nombreMedico: asignaciones.find(x => x.asignacion_id === item.asignacion_id).datosDoctor,
                    mostrar: item.horas.horasDisponibles.filter(x => !x.turno_tomado).length

                })
                return arr
            }, []));

        }
        if (agignacionSelecteds.length > 0) {
            setTimeout(() => {
                getDatos(item, agignacionSelecteds)
            }, 1500)

        }
    }, [item, agignacionSelecteds])

    useEffect(() => {
        if (lista.length > 0) {
            setMostrar({
                disponibles: lista[0].horas.horasDisponibles.reduce((arr, item) => {
                    let exsite = data.turnosDatos.filter(x => x.hora === item.horas && x.estado_turno_id !== 3)
                    if (exsite.length === 0) {
                        arr.push(item)
                    }
                    return arr
                }, []).length

            })
        }
    }, [lista, data])

    const hanldeClick = () => {

        mostrarComponent({
            contenido: 'agendaReprogramados',
            estado: true,
            subtitle: (item.dia_nombre + ' ' + item.dia_calendario + ' de ' + item.mes_nombre + ' del ' + item.anio_calendario),
            title: agignacionSelecteds[0].nombreMedico,
            item: {
                item,
                agenda: lista[0],
                personalId: agignacionSelecteds[0].personal_id,
                asignacionId: agignacionSelecteds[0].asignacion_id,
                recividoPrincipal: recividoPrincipal
            }
        }, 'drawerOpen')

    }

    return (
        <>
            <Card style={{ background: 'white', padding: "0px", textAlign: "center", minHeight: "154px", margin: "5px 10px 10px -5px" }}>

                {
                    item.existe && <>
                        {
                            mostrar !== null && <>
                                <Divider />
                                <Box style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "column", justifyItems: "center" }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                                        <Chip onClick={hanldeClick} label={mostrar.disponibles} style={{ backgroundColor: "#0f0", marginBottom: "10px" }} />
                                    </Box>
                                </Box>
                            </>
                        }
                    </>
                }

            </Card>

        </>
    )
}
