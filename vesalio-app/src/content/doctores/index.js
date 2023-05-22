import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageHeader from './PageHeader'
import Medicos from './Medicos'
import useLayoutContext from 'src/hooks/useAuthLayout'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import TabsGeneral from 'src/components/Tabs'
import axios from 'axios'
import ListaAgenda from './ListaAgenda'
import Calendario from 'src/components/Drawers/cita/Calendario'

export default function Index() {
    const { mostrarComponent } = useLayoutContext()
    const actionRef = useRef(null);
    const [medicoSelected, setMedicoSelected] = useState(null)
    const [datos, setDatos] = useState([])
    const [tabs, setTabs] = useState([{ active: true, value: '1', label: 'Agenda' }, { active: false, value: '2', label: 'Calendario' }])
    const [itemAxios, setItemAxios] = useState(null)
    const [fechaCalendario, setFechaCalendario] = useState([])
    const [fechasGeneradasHoras, setFechasGeneradasHoras] = useState([])
    const [openLocation, setOpenMenuLocation] = useState(false);
    const locations = [{ id: '01', label: 'Datos del doctor' }, { id: '02', label: 'Agregar agenda' }]
    const [contador, setContador] = useState(0)
    const [especialidad, setEspecialidad] = useState([])
    const [medicosLista, setmedicosLista] = useState([]);

    useEffect(() => {
        const recuperarDatos = async () => {
            const medicosEspecialidad = await axios.get(`http://apis-vesalio.com.pe/medicosEspecialidadAgenda`)
            setEspecialidad(medicosEspecialidad.data.reduce((arr, item) => {
                let found = arr.findIndex(x => x.id_especialidad === item.id_especialidad)
                if (found < 0) {
                    arr.push({
                        id_especialidad: item.id_especialidad,
                        epecialidad: item.epecialidad,
                        cantidad: 1
                    })
                } else {
                    arr[found].cantidad += 1;
                }
                return arr
            }, []))
            setmedicosLista(medicosEspecialidad.data.reduce((arr, item) => {
                let found = arr.findIndex(x => x.id_usuario === item.id_usuario)
                if (found < 0) {
                    arr.push({
                        id_usuario: item.id_usuario,
                        nombres: item.nombres,
                        documento: item.documento,
                        aviso_portal: item.aviso_portal,
                        genero: item.genero,
                        especialidades: [item.id_especialidad],
                        dia: [item.dia],
                    })
                } else {
                    let existe = arr[found].especialidades.findIndex(x => item.id_especialidad === x)
                    if (existe < 0) {
                        arr[found].especialidades.push(item.id_especialidad)
                    }
                    let existeDia = arr[found].dia.findIndex(x => item.dia === x)
                    if (existeDia < 0) {
                        arr[found].dia.push(item.dia)
                    }

                }
                return arr
            }, []))
        }
        recuperarDatos()
    }, [])

    useEffect(() => {

        if (medicoSelected !== null) {
            setDatos(medicosLista.filter(x => x.id_usuario === medicoSelected))
        } else {
            setDatos([])
            setContador(0)
        }
    }, [medicosLista, medicoSelected])

    useEffect(() => {
        const getDatos = async (obj) => {
            console.log(obj);
            const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorarioAgenda`, obj)
            setItemAxios(response.data)
        }
        if (datos.length > 0) {
            getDatos({ id_especialidad: datos[0].especialidades[0], documento: datos[0].documento })

        } else {
            setItemAxios(null)
        }
        if (contador > 0) {
            getDatos({ id_especialidad: datos[0].especialidades[0], documento: datos[0].documento })
        }
    }, [datos, contador])

    useEffect(() => {
        if (itemAxios !== null) {
            // let fecha = new Date()
            let diasCalendario = itemAxios.fechas.reduce((arr, item) => {
                item.fechas.map(x => {
                    arr.push({ ...x })
                    return false
                })
                return arr
            }, []).sort(function (a, b) {
                if (a.dia_de_la_semana_en_anio > b.dia_de_la_semana_en_anio) {
                    return 1;
                }
                if (a.dia_de_la_semana_en_anio < b.dia_de_la_semana_en_anio) {
                    return -1;
                }
                return 0;
            })
            let horasGeneradas = diasCalendario.reduce((arr, ix) => {
                let salir = true;
                let arreglo = [itemAxios.cabecera.find(x => x.id_agenda === ix.id_agenda).hora_inicio]
                while (salir) {
                    let dato = itemAxios.cabecera.find(x => x.id_agenda === ix.id_agenda)
                    let horaConsultar = ''
                    let horaMostrar = ''
                    if (dato !== undefined) {
                        horaConsultar = parseInt(arreglo[arreglo.length - 1].substring(3, 5)) + parseInt(dato.duracion_turno)
                        if (horaConsultar >= 60) {
                            // let minutos = (60 - horaConsultar).toString()
                            let minutos = (horaConsultar - 60).toString()
                            let horas = (parseInt(arreglo[arreglo.length - 1].substring(0, 2)) + 1).toString()
                            horaMostrar = `${horas.length === 1 ? '0' + horas : horas}:${minutos.length === 1 ? '0' + minutos : minutos}:00`
                        } else {
                            let horas_ = parseInt(arreglo[arreglo.length - 1].substring(0, 2)).toString()
                            horaMostrar = `${horas_.length === 1 ? '0' + horas_ : horas_}:${horaConsultar}:00`
                        }
                        if (parseInt(horaMostrar.substring(0, 2)) >= parseInt(dato.hora_fin.substring(0, 2)) && parseInt(horaMostrar.substring(3, 5)) >= parseInt(dato.hora_fin.substring(3, 5))) {
                            salir = false;
                        }
                        let convertirDato = parseInt(dato.hora_fin.split(':')[0]) * 60 + parseInt(dato.hora_fin.split(':')[1])
                        let compararHora = parseInt(horaMostrar.split(':')[0]) * 60 + parseInt(horaMostrar.split(':')[1])
                        if (convertirDato >= compararHora) {
                            arreglo.push(horaMostrar)
                        }
                    } else {
                        salir = false;
                    }
                }

                arr.push({ ...ix, arreglo })
                return arr
            }, [])

            setFechaCalendario(horasGeneradas.reduce((arr, item) => {
                arr.push({
                    agenda: item.id_agenda,
                    id: item.fecha_calendario,
                    title: 'Seleccionar',
                    color: '#1975FF',
                    start: new Date(`${item.fecha_calendario.split('T')[0]} 00:00:00`),
                    end: new Date(`${item.fecha_calendario.split('T')[0]} 23:59:00`)
                })
                return arr
            }, []))

            setFechasGeneradasHoras(horasGeneradas.reduce((arr, item) => {
                for (let i = 0; i < item.arreglo.length - 1; i++) {
                    let ocupado = itemAxios.ocupados.find(x => x.fecha.split('T')[0] === item.fecha_calendario.split('T')[0] && item.arreglo[i] === x.hora)
                    arr.push({
                        agenda: item.id_agenda,
                        id: item.fecha_calendario + '_' + item.arreglo[i],
                        title: ocupado === undefined ? 'Disponible' : 'Ocupado',
                        color: ocupado === undefined ? '#1975FF' : '#FF0000',
                        start: new Date(`${item.fecha_calendario.split('T')[0]} ${item.arreglo[i]}`),
                        end: new Date(`${item.fecha_calendario.split('T')[0]} ${item.arreglo[i + 1]}`)
                    })
                }
                return arr
            }, []))

        }

    }, [itemAxios])

    const eventoSelect = (id) => {
        mostrarComponent({
            contenido: 'horasDoctor',
            estado: true,
            title: datos[0].nombres,
            subtitle: 'Horas disponibles del día : ' + id.split('T')[0],
            item: { fechasGeneradasHoras, id }
        }, 'drawerOpen')
    }
    
    const handelOptionsClick = (id) => {
        if (id === '02') {
            mostrarComponent({
                contenido: 'generarAgenda',
                estado: true,
                size: 'sm',
                item: medicoSelected
            }, 'modalOpen')
        }
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
                        <Medicos medicosLista={medicosLista} setmedicosLista={setmedicosLista} especialidad={especialidad} setMedicoSelected={setMedicoSelected} />
                    </Card>
                </Grid>
                {
                    datos.length > 0 && <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                sx={{ p: 3 }}
                                titleTypographyProps={{
                                    component: 'h5',
                                    variant: 'h6',
                                    fontWeight: 'bold',
                                    sx: {
                                        textTransform: 'uppercase',
                                    }
                                }}
                                action={
                                    <IconButton size="small" color="secondary" ref={actionRef}
                                        onClick={() => setOpenMenuLocation(true)}>
                                        <MoreVertTwoToneIcon />
                                    </IconButton>
                                }
                                title={datos[0].nombres}
                            />
                            <CardContent>
                                <Menu
                                    disableScrollLock
                                    anchorEl={actionRef.current}
                                    onClose={() => setOpenMenuLocation(false)}
                                    open={openLocation}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center'
                                    }}
                                    transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'center'
                                    }}
                                >
                                    {locations.map((_location) => (
                                        <MenuItem
                                            key={_location.id}
                                            onClick={() => {
                                                handelOptionsClick(_location.id)
                                                setOpenMenuLocation(false);
                                            }}
                                        >
                                            {_location.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <TabsGeneral tabs={tabs} setTabs={setTabs} />
                            </CardContent>
                            {
                                tabs.find(x => x.active).value === '1' && <ListaAgenda itemAxios={itemAxios} setContador={setContador} />
                            }
                            {
                                tabs.find(x => x.active).value === '2' && <Calendario fechasGeneradasHoras={fechaCalendario} eventoSelect={eventoSelect} />
                            }
                        </Card>
                    </Grid>
                }

            </Grid>
        </>
    )
}
