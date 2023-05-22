import React, { useState, useEffect } from 'react'
import { Card, Divider, Grid, Typography, Zoom, Chip, styled, Box, Button, Alert } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import SearchFiltro from './SearchFiltro'
import { useSnackbar } from 'notistack'
import axios from 'axios'
import useLayoutContext from 'src/hooks/useAuthLayout'
import Listadotores from './ListDoctores'
import Calendario from '../../components/Drawers/cita/Calendario'
import HorasGeneradas from '../../components/Drawers/cita_rapida/HorasGeneradas';
import ListaAgenda from './ListaAgenda'
import TabsGeneral from 'src/components/Tabs'
import ListaCitasTabla from '../lista_citas/Lista'

const ChipWrapper = styled(Chip)(
    ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        margin: ${theme.spacing(0.5)};
        padding: ${theme.spacing(1)};
        height: 28px;
        line-height: 28px;
        font-weight: bold;
`
);

export default function Index() {

    const { medicos, especialidad, mostrarComponent } = useLayoutContext()
    const [filter, setFilter] = useState({ fecha: '', paciente: null, tipo_paciente: 'documento_paciente', especialidad: null, doctor: null })
    const { enqueueSnackbar } = useSnackbar();
    const [diasAgrupados, setDiasAgrupados] = useState([])
    const [itemAxios, setItemAxios] = useState(null)
    const [comentarios, setComentarios] = useState('')
    const [fechasGeneradasHoras, setFechasGeneradasHoras] = useState([])
    const [horas, setHoras] = useState([])
    const [horaSelected, setHoraSelected] = useState('')
    const [tabs, setTabs] = useState([{ value: '02', label: 'Seleccionar horario', active: true }, { value: '01', label: 'Lista de citas', active: false }])
    const [datos, setDatos] = useState([])

    const getDatos = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorario`, obj)
        console.log(response.data)
        setItemAxios(response.data)
        const response2 = await axios.post(`http://apis-vesalio.com.pe/getComentario`, obj)
        if (response2.data.length > 0) {
            setComentarios(response2.data[0].comentario)
        }
        setHoraSelected('')
        setHoras([])
        setDatos([])

    }
    const handleChangedFilter = (id, value) => {
        setFilter(x => {
            return {
                ...x,
                [id]: value
            }
        })
    }
    const handleBuscarFiltro = async () => {
        let errors = [];
        if (filter.especialidad === null && filter.doctor === null) {
            errors.push('Debe seleccionar como minimo un tipo de filtro')
        }

        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            enqueueSnackbar('Aplicando filtros', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
            const response = await axios.post(`http://apis-vesalio.com.pe/especialidadSemanal`, { id_especialidad: filter.especialidad === null ? '' : filter.especialidad, documento: filter.doctor === null ? '' : filter.doctor })
            setDiasAgrupados(response.data)
        }
    }
    const getLista = async (item, fecha) => {
        const rpta = await axios.post(`http://apis-vesalio.com.pe/turnoProgamadoLista`, {
            fecha: fecha, paciente: null, tipo_paciente: 'documento_paciente',
            especialidad: especialidad.find(x => x.epecialidad === item.cabecera[0].especialidad).id_especialidad, doctor: item.cabecera[0].documento
        })
        setDatos(rpta.data);
    }
    useEffect(() => {
        setItemAxios(null)
        setComentarios('')
        setFechasGeneradasHoras([])
        setHoras([])
        setHoraSelected('')
        setDatos([])
    }, [diasAgrupados])

    useEffect(() => {
        if (itemAxios !== null) {


            let fecha = new Date()
            let datos = itemAxios;
            let diasCalendario = datos.fechas.reduce((arr, item) => {
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
                let arreglo = [datos.cabecera.find(x => x.id_agenda === ix.id_agenda).hora_inicio]
                while (salir) {
                    let dato = datos.cabecera.find(x => x.id_agenda === ix.id_agenda)
                    let horaConsultar = ''
                    let horaMostrar = ''
                    if (dato !== undefined) {
                        horaConsultar = parseInt(arreglo[arreglo.length - 1].substring(3, 5)) + parseInt(dato.duracion_turno)
                        if (horaConsultar >= 60) {
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
            console.log(horasGeneradas);
            let horasGeneradasFiltradas = horasGeneradas.reduce((arr, item) => {
                let fechaReduce = new Date(item.fecha_calendario.split('T')[0])
                if (fechaReduce >= fecha) {
                    arr.push(item)
                }
                return arr
            }, [])

            setFechasGeneradasHoras(horasGeneradasFiltradas.reduce((arr, item) => {
                for (let i = 0; i < item.arreglo.length - 1; i++) {
                    let ocupado = datos.ocupados.find(x => x.fecha.split('T')[0] === item.fecha_calendario.split('T')[0] && item.arreglo[i] === x.hora)
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
            }, []).filter(x => x.title !== 'Ocupado'))
        }

    }, [itemAxios])
    useEffect(() => {
        console.log(horas);
    }, [horas])


    const eventoSelect = (id) => {
        setHoras(fechasGeneradasHoras.filter(x => x.id.split('_')[0].split('T')[0] === id.split('_')[0].split('T')[0]));
        getLista(itemAxios, id.split('_')[0].split('T')[0]);

    }
    const limpiarHoras = () => {
        setHoras([])
        setHoraSelected('')
    }
    const reservarCita = async () => {
        let errors = [];
        if (horaSelected.length === 0) {
            errors.push('Debe seleccionar un horario')
        }
        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            }))
        } else {
            mostrarComponent({
                contenido: 'citaSemanal',
                estado: true,
                item: {
                    itemAxios,
                    horaSelected,
                    horas
                },
                title: 'Reservar cita',
                subtitle: ''
            }, 'drawerOpen')
        }

    }

    const generarSobreturno = () => {
        mostrarComponent({
            contenido: 'citaSobreturno',
            title: "Sobreturno",
            estado: true,
            subtitle:'',
            item: { datos: itemAxios, fecha: horas }
        }, 'drawerOpen')
    }

    return (
        <>
            <Helmet>
                <title>Lista de horarios disponibles</title>
            </Helmet>
            <PageTitleWrapper>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h3" component="h3" gutterBottom>
                            {'Lista de horarios disponibles'}
                        </Typography>
                    </Grid>
                </Grid>
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
                        <SearchFiltro handleChangedFilter={handleChangedFilter} handleBuscarFiltro={handleBuscarFiltro} />
                        <Divider />
                        <Box px={2} py={1} direction="row"
                            justifyContent="center"
                            alignItems="stretch">
                            {diasAgrupados.length > 0 && <Typography>Dias de atencion por especialidad</Typography>}

                            {diasAgrupados.reduce((arr, item) => {
                                let found = arr.findIndex(x => x.dia === item.dia)
                                if (found < 0) {
                                    arr.push(item)
                                }
                                return arr
                            }, []).sort(function (a, b) {
                                if (a.diaOrden > b.diaOrden) {
                                    return 1;
                                }
                                if (a.diaOrden < b.diaOrden) {
                                    return -1;
                                }
                                return 0;
                            }).map((value) => {
                                return (
                                    <ChipWrapper
                                        key={value.diaOrden}
                                        color="secondary"
                                        label={value.dia}
                                    />
                                );
                            })}
                        </Box>
                        <Divider />
                        {
                            diasAgrupados.length > 0 && <Grid
                                sx={{
                                    px: { xs: 0, md: 4 },
                                    mt: 2

                                }}
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={4}
                            >
                                <Grid item xs={12} lg={4}>

                                    <Listadotores getDatos={getDatos} lista={diasAgrupados.reduce((arr, item) => {
                                        let found = arr.findIndex(x => x.documento === item.documento)
                                        let medico = medicos.find(x => x.documento === item.documento)
                                        if (found < 0) {
                                            arr.push({
                                                diaOrden: item.diaOrden,
                                                documento: item.documento,
                                                especialidad: medico.especialidades[0],
                                                nombres: medico.nombres,
                                                dias: [item.dia]
                                            })
                                        } else {
                                            arr[found].dias.push(item.dia)
                                        }
                                        return arr;
                                    }, [])} />
                                </Grid>
                                <Grid item xs={12} lg={8}>
                                    {itemAxios !== null && <>
                                        <Typography variant="h3" component="h5" gutterBottom>
                                            {itemAxios.cabecera[0].Nombres}
                                        </Typography>
                                        <Button fullWidth variant="outlined" sx={{m:2}} color={'info'} size='small' onClick={generarSobreturno}>
                                            Sobrerturno
                                        </Button>
                                        {comentarios.length > 0 && <Alert sx={{ mx: 2 }} severity="warning">{comentarios}</Alert>}

                                        <ListaAgenda itemAxios={itemAxios} />

                                        <Calendario fechasGeneradasHoras={fechasGeneradasHoras} eventoSelect={eventoSelect} />
                                        <br />
                                        <br />

                                        <TabsGeneral tabs={tabs} setTabs={setTabs} />
                                        {

                                            horas.length > 0 && <Grid container spacing={3} sx={{ mt: 2, px: 1 }}>
                                                <Grid item xs={12} md={8} sm={8}>
                                                    <Typography variant="h4">{
                                                        horas[0].id.split('_')[0].split('T')[0].split('-')[2] + '-' + horas[0].id.split('_')[0].split('T')[0].split('-')[1] + '-' + horas[0].id.split('_')[0].split('T')[0].split('-')[0]
                                                    }
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} md={4} sm={4}>
                                                    <Button fullWidth variant="outlined" color={'error'} size='small' onClick={limpiarHoras}>
                                                        Limpiar
                                                    </Button>
                                                </Grid>


                                                {
                                                    tabs.find(x => x.active).value === '02' && horas.map(item => <Grid item xs={12} xl={3} md={4} sm={6} key={item.id}>
                                                        <HorasGeneradas item={item} eventSelected={horaSelected} setEventSelected={setHoraSelected} />
                                                    </Grid>)
                                                }

                                                {
                                                    tabs.find(x => x.active).value === '02' && <Grid item xs={12} xl={12} md={12} sm={12}>
                                                        <Button fullWidth variant="outlined" onClick={reservarCita} sx={{ mb: 2 }}>
                                                            Reservar cita
                                                        </Button>
                                                    </Grid>
                                                }


                                                {
                                                    tabs.find(x => x.active).value === '01' && <Grid item xs={12} xl={12} md={12} sm={12}>
                                                        <ListaCitasTabla datos={datos} /></Grid>
                                                }

                                            </Grid>
                                        }

                                    </>


                                    }


                                </Grid>

                            </Grid>
                        }

                    </Card>
                </Grid>


            </Grid>
        </>
    )
}
