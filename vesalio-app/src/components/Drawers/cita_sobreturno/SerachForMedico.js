import React, { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography, styled, Grid, Zoom } from '@mui/material';
import Calendario from '../cita/Calendario';
import HorasGeneradas from '../cita_rapida/HorasGeneradas';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import confirmSweetAlert from 'src/utils/confirm';
import useAuth from 'src/hooks/useAuth';


const AccordionSummaryWrapper = styled(AccordionSummary)(
    () => `
        &.Mui-expanded {
          min-height: 48px;
        }
  
        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }
    `
);

export default function Index({ medicoSelected, enviar, pacienteWsp }) {
    const { medicos, mostrarComponent } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()
    const [itemAxios, setItemAxios] = useState(null)
    const [fechasGeneradasHoras, setFechasGeneradasHoras] = useState([])
    const [horas, setHoras] = useState([])
    const [horaSelected, setHoraSelected] = useState('')
    const [calendarOpen, setCalendarOpen] = useState(true)
    useEffect(() => {
        setItemAxios(enviar)
    }, [enviar])

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
                    let horaConsultar = 0
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
                        arreglo.push(horaMostrar)
                    } else {
                        salir = false;
                    }
                }

                arr.push({ ...ix, arreglo })
                return arr
            }, [])
            let horasGeneradasFiltradas = horasGeneradas.reduce((arr, item) => {
                let fechaReduce = new Date(item.fecha_calendario)
                if (fechaReduce > fecha) {
                    arr.push(item)
                }
                if (item.fecha_calendario.split('T')[0] === fecha.toISOString().split('T')[0]) {
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

    const eventoSelect = (id) => {
        setHoras(fechasGeneradasHoras.filter(x => x.id.split('_')[0].split('T')[0] === id.split('_')[0].split('T')[0]));
        setCalendarOpen(false)
    }
    const limpiarHoras = () => {
        setHoras([])
        setHoraSelected('')
        setCalendarOpen(true)
    }
    const getGenerarCita = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/generarCitaAdmin`, obj)
        return response.data;
    }

    const reservarCita = async () => {
        let errors = []
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
            const rpta = await confirmSweetAlert('Confirmar cita', '¿Esta seguro que desea confirmar la cita?', 'info', true)
            if (rpta) {
                // aqui va las validaciones 
                let eventoSl = horas.find(x => x.id === horaSelected)
                let result = await getGenerarCita({
                    id_usuario: user._id,
                    fecha: eventoSl.id.split('_')[0].split('T')[0],
                    hora: eventoSl.id.split('_')[1],
                    agenda: eventoSl.agenda,
                    datos: {},
                    celular : pacienteWsp
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
                    }, 1000)
                } else {
                    enqueueSnackbar('Es posible que se haya generado una cita en simultáneo. Intente con otro horario.', {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right'
                        },
                        TransitionComponent: Zoom
                    })
                }
            }
        }

    }
    return (
        <>
            {
                enviar !== null && <>  <Accordion
                    expanded={calendarOpen}
                    sx={{
                        p: 1
                    }}
                    defaultExpanded
                >
                    <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => setCalendarOpen(x => !x)}>
                        <Typography variant="h5">{medicoSelected !== null ? medicos.find(x => x.id_usuario === medicoSelected).nombres : ''}   </Typography>
                    </AccordionSummaryWrapper>
                    <AccordionDetails
                        sx={{
                            p: 0
                        }}
                    >
                        <Calendario fechasGeneradasHoras={fechasGeneradasHoras} eventoSelect={eventoSelect} />
                    </AccordionDetails>
                </Accordion>
                    {
                        horas.length > 0 && <Accordion
                            sx={{
                                p: 1
                            }}
                            defaultExpanded
                        >
                            <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h5">{

                                    horas[0].id.split('_')[0].split('T')[0]

                                }</Typography>
                            </AccordionSummaryWrapper>
                            <AccordionDetails
                                sx={{
                                    p: 0
                                }}
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} sm={12}>
                                        <Button variant="outlined" color={'error'} sx={{ float: 'right', m: 2 }} size='small'
                                            onClick={limpiarHoras}>
                                            Limpiar
                                        </Button>
                                    </Grid>


                                    {horas.map(item => <Grid item xs={12} xl={3} md={4} sm={6} key={item.id}>
                                        <HorasGeneradas item={item} eventSelected={horaSelected} setEventSelected={setHoraSelected} />
                                    </Grid>)}
                                </Grid>

                            </AccordionDetails>
                        </Accordion>
                    }
                    <Divider sx={{ mt: 2 }} />
                    <Grid container spacing={3} sx={{ p: 2 }}>
                        <Grid item lg={12}>
                            <Button fullWidth variant="outlined"
                                onClick={() => reservarCita()}>
                                Reservar cita
                            </Button>
                        </Grid>

                    </Grid></>
            }

        </>


    )
}
