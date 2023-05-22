import { Card, Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import CalendarioAgenda from './CalendarioAgenda'
import CardComentario from './CardComentario'
import Medicos from './Medicos'
import PageHeader from './PageHeader'

export default function Index() {
    const [especialidadLista, setEspecialidadLista] = useState([])
    const [medicoLista, setMedicoLista] = useState([])
    const [medicoSelected, setMedicoSelected] = useState(null)
    const [agignacion, setAsignacion] = useState([])
    const [asignacionSelected, setAsignacionSelected] = useState(null)


    useEffect(() => {
        const recuperarDatos = async () => {
            const medicosEspecialidad = await axios.get(`http://apis-vesalio.com.pe/medicosAll`)
            if (medicosEspecialidad.status === 200) {
                setEspecialidadLista(medicosEspecialidad.data.reduce((arr, item) => {
                    let existe = arr.findIndex(y => y.especialidad_id === item.especialidad_id)
                    if (existe < 0) {
                        arr.push(item)
                    }
                    return arr
                }, []))
                setMedicoLista(medicosEspecialidad.data.reduce((arr, item) => {
                    let existe = arr.findIndex(y => y.apellidos === item.apellidos)
                    if (existe < 0) {
                        arr.push(item)
                    }
                    return arr
                }, []))
            }


        }
        recuperarDatos()
    }, [])
    const getDatosMedicoSelected = async () => {
        const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaAll`, { idPersonal: medicoSelected })
        if (response2.status === 200) {
            setAsignacion(response2.data.asignacionDatos)
        }
    }
    useEffect(() => {
        const getDatos = async (obj) => {
            const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaAll`, obj)
            if (response2.status === 200) {
                setAsignacion(response2.data.asignacionDatos)
                setAsignacionSelected(null);
            }
        }
        if (medicoSelected !== null) {
            getDatos({ idPersonal: medicoSelected })
        } else {
            setAsignacion([])
            setAsignacionSelected(null);

        }
    }, [medicoSelected])

    const handleMostrarCalendario = (item) => {
        setAsignacionSelected(item);
    }
    return (
        <>
            <Helmet>
                <title>Lista de doctores</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
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

                <Grid item xs={12}>
                    <Card>
                        <Medicos setMedicoSelected={setMedicoSelected} setMedicoLista={setMedicoLista} especialidadLista={especialidadLista} medicoLista={medicoLista} />
                    </Card>
                </Grid>

                <Grid item lg={2}>
                    <Grid container>
                        <Grid item lg={12} sx={{ mt: 1 }}>
                            {agignacion.length > 0 &&
                                agignacion.map(item => <CardComentario key={item.asignacion_id} item={item} handleMostrarCalendario={handleMostrarCalendario} getDatosMedicoSelected={getDatosMedicoSelected} />)
                            }
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item lg={10}>
                    <Grid container>
                        {asignacionSelected !== null && <CalendarioAgenda asignacionSelected={asignacionSelected} setAsignacionSelected={setAsignacionSelected}/>}
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}
