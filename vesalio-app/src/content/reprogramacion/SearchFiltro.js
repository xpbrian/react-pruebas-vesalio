import { Card, Divider, Grid, Zoom } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import TabsGeneral from 'src/components/Tabs'
import Search from './Search'
import { useSnackbar } from 'notistack';
import Calendario from './Calendario'
import CardComentarios from './CardComentarios'

export default function SearchFiltro({datos}) {

    const [tabs, setTabs] = useState([{ value: '01', label: 'Por especialidad', active: true }, { value: '02', label: 'Por medico', active: false }])
    const [especialidadLista, setEspecialidadLista] = useState([])
    const [arrayDatosMedico, setArrayDatosMedico] = useState([])
    const [medicoLista, setMedicoLista] = useState([])
    const [medicoSelected, setMedicoSelected] = useState(null)
    const [especialidadSelected, setEspecialidadSelected] = useState(null)
    const { enqueueSnackbar } = useSnackbar()
    const [mostrar, setMostrar] = useState(false)
    const [agignacion, setAsignacion] = useState([])
    const [agignacionSelecteds, setAsignacionSelecteds] = useState([])

    useEffect(() => {
        const recuperarDatos = async () => {
            const medicosEspecialidad = await axios.get(`http://apis-vesalio.com.pe/medicosAll`)
            if (medicosEspecialidad.status === 200) {

                setArrayDatosMedico(medicosEspecialidad.data.reduce((arr, item) => {
                    let existe = arr.findIndex(y => y.apellidos === item.apellidos)
                    if (existe < 0) {
                        arr.push(item)
                    }
                    return arr
                }, []))

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



    useEffect(() => {
        if (tabs.find(x => x.active).value === '01' && especialidadSelected === null) {
            setMostrar(false)
        }
        if (tabs.find(x => x.active).value === '02' && medicoSelected === null) {
            setMostrar(false)
        }
    }, [tabs, especialidadSelected, medicoSelected])
    useEffect(() => {
        if (especialidadSelected === null) {
            setAsignacionSelecteds([])
        }
        if (medicoSelected === null) {
            setAsignacionSelecteds([])
        }
    }, [especialidadSelected, medicoSelected])

    const buscarDatos = async () => {
        let tmp = []
        const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaAll`, { idEspecialidad: especialidadSelected, idPersonal: medicoSelected, tipo: tabs.find(x => x.active).value })
        if (response2.status === 200) {
            tmp = response2.data.asignacionDatos
        }
        return tmp
    }

    const handleSearch = async () => {
        let pregunta = tabs.find(x => x.active).value
        let errores = []
        if (pregunta === '01') {
            if (especialidadSelected === null) {
                errores.push("Debe seleccionar una especialidad")
            }
        } else if (medicoSelected === null) {
            errores.push("Debe seleccionar un medico")
        }
        if (errores.length === 0) {
            setMostrar(true)
            let array = await buscarDatos()
            setAsignacion(array);
        } else {
            errores.map(x =>
                enqueueSnackbar(x, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
            )
            setMostrar(false)
        }

    }

    const getDatosMedicoSelected = async () => {
        const response2 = await axios.post(`http://apis-vesalio.com.pe/datosAgendaAll`, { idEspecialidad: especialidadSelected, idPersonal: medicoSelected, tipo: tabs.find(x => x.active).value })
        if (response2.status === 200) {
            setAsignacion(response2.data.asignacionDatos)
        }
    }

    return (
        <>
            <Helmet>
                <title>Lista de doctores</title>
            </Helmet>
            <Grid
                sx={{
                    px: { xs: 0, md: 4 },
                    py: 2
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >

                <Grid item xs={12}>
                    <TabsGeneral setTabs={setTabs} tabs={tabs} />
                    <Divider />
                </Grid>
                <Grid item lg={tabs.find(x => x.active).value === '02' ? 12 : 8}>
                    <Card>
                        <Search arrayDatosMedico={arrayDatosMedico} handleSearch={handleSearch} tabs={tabs.find(x => x.active).value} setEspecialidadSelected={setEspecialidadSelected} setMedicoSelected={setMedicoSelected} setMedicoLista={setMedicoLista} especialidadLista={especialidadLista} medicoLista={medicoLista} />
                    </Card>
                </Grid>
                <Grid item lg={12}>
                    <Divider />
                </Grid>
                {
                    mostrar && <Grid item lg={4}>
                        <CardComentarios getDatosMedicoSelected={getDatosMedicoSelected} setAsignacionSelecteds={setAsignacionSelecteds} agignacion={agignacion} />
                    </Grid>
                }

                <Grid item lg={8}>
                    <Calendario tipo={tabs.find(x => x.active).value} agignacionSelecteds={agignacionSelecteds} datos={datos}/>
                </Grid>

            </Grid>

        </>
    )
}

