import React, { useEffect, useState } from 'react'
import Paciente from './PacienteRapido'
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import useLayoutContext from 'src/hooks/useAuthLayout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Medicos from './Medico';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Typography, Zoom, styled, Grid, Alert } from '@mui/material';
import axios from 'axios';
import HorasGeneradas from './HorasGeneradas';
import Calendario from '../cita/Calendario';
import confirmSweetAlert from 'src/utils/confirm';


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

const arrayexiste = [42320704,
    46823689,
    7583664,
    7583664,
    7583664,
    22265983,
    41134404,
    41134404,
    41540331,
    41540331,
    41540331,
    9456833,
    9456833,
    9456833,
    9456833,
    9456833,
    9456833,
    29681601,
    45740062,
    45740062,
    45740062,
    471854,
    44513376,
    45337563,
    41441482,
    41224362,
    72698596,
    29537959,
    3669167,
    3669167,
    3669167,
    3669167,
    10313043,
    10313043,
    10313043,
    10313043,
    10313043,
    8167030,
    8167030,
    6648855,
    6648855,
    7756226,
    7961156,
    7961156,
    7643156,
    7643156,
    46375115,
    46375115,
    70436626,
    7606322,
    7606322,
    7606322,
    7606322,
    43463203,
    43463203,
    43463203,
    43463203,
    70438130,
    48675658,
    48675658,
    48675658,
    48675658,
    48675658,
    48675658,
    48675658,
    48675658,
    48675658,
    48675658,
    25830842,
    25830842,
    9867312,
    9867312,
    9867312,
    9375212,
    7245772,
    7245772,
    7245772,
    7245772,
    7245772,
    7245772,
    16442919,
    72315515,
    72315515,
    72315515,
    72315515,
    72315515,
    9947758,
    9389885,
    8212945,
    10540953,
    10540953,
    10644940,
    10644940]

export default function Index() {
    const { user } = useAuth()
    const { enqueueSnackbar } = useSnackbar();
    const { medicos, mostrarComponent, familiares, addCita, citas } = useLayoutContext()
    const [pacienteDocumento, setPacienteDocumento] = useState(null)
    const [pacienteWsp, setPacienteWsp] = useState('')
    const [medicoSelected, setMedicoSelected] = useState(null)
    const [displayBusqueda, setDisplayBusqueda] = useState(true)
    const [itemAxios, setItemAxios] = useState(null)
    const [fechasGeneradasHoras, setFechasGeneradasHoras] = useState([])
    const [horas, setHoras] = useState([])
    const [horaSelected, setHoraSelected] = useState('')
    const [calendarOpen, setCalendarOpen] = useState(true)
    const [comentarios, setComentarios] = useState('')
    const [portal, setPortal] = useState(null)

    useEffect(() => {
        let nombres = `${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`
        setPacienteDocumento({ id: user.datos.numero_documento, label: nombres })
        setPacienteWsp(user.datos.whatsapp)
    }, [user])
    const getDatos = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorario`, obj)
        return response.data;
    }
    const buscarHorario = async () => {

        let errors = []
        if (pacienteDocumento.id === '999') {
            errors.push('Debe seleccionar un Paciente')
        }
        if (medicoSelected === null) {
            errors.push('Debe seleccionar un medico')
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
            enqueueSnackbar('Buscando horario disponible del médico seleccionado', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
            let medicoDatos = medicos.find(x => x.id_usuario === medicoSelected)
            let datos = await getDatos({ id_especialidad: medicoDatos.especialidades[0], documento: medicoDatos.documento })
            setDisplayBusqueda(false)
            setItemAxios(datos)
            setHoras([])
            const response2 = await axios.post(`http://apis-vesalio.com.pe/getComentario`, { id_especialidad: medicoDatos.especialidades[0], documento: medicoDatos.documento })
            if (response2.data.length > 0) {
                setComentarios(response2.data[0].comentario)
            }
            let existe = arrayexiste.find(x => x === parseInt(medicoDatos.documento))
            setPortal(existe === undefined ? null : existe)
            console.log(existe);
        }
    }
    const volverBusqueda = () => {
        setDisplayBusqueda(true)
        setMedicoSelected(null)
        setCalendarOpen(true)
    }
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
            let horasGeneradasFiltradas = horasGeneradas.reduce((arr, item) => {
                let fechaReduce = new Date(item.fecha_calendario.split('T')[0])
                console.log(fechaReduce, fecha);
                if (fechaReduce > fecha) {
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
        const response = await axios.post(`http://apis-vesalio.com.pe/generarCitas`, obj)
        console.log(response.data);
        return response.data;
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
            const rpta = await confirmSweetAlert('Confirmar cita', '¿Esta seguro que desea confirmar la cita?', 'info', true)
            if (rpta) {
                // aqui va las validaciones 
                let paciente = familiares.find(x => x.numero_documento === pacienteDocumento.id)
                let eventoSl = horas.find(x => x.id === horaSelected)
                let noAnulados = citas.filter(x => !x.anulado.estado && x.datos !== undefined)
                let found = noAnulados.filter(x => x.datos.paciente.paciente.numero_documento === pacienteDocumento.id && x.datos.doctor.documento === itemAxios.cabecera[0].documento && x.fecha === eventoSl.id.split('_')[0].split('T')[0])
                let found2 = noAnulados.filter(x => x.datos.paciente.paciente.numero_documento === pacienteDocumento.id && x.fecha === eventoSl.id.split('_')[0].split('T')[0] && x.hora === eventoSl.id.split('_')[1])
                if (found.length === 0 && found2.length === 0) {
                    let result = await getGenerarCita({
                        id_usuario: user._id,
                        fecha: eventoSl.id.split('_')[0].split('T')[0],
                        hora: eventoSl.id.split('_')[1],
                        agenda: eventoSl.agenda,
                        anulado: {
                            motivo: '',
                            estado: false
                        },
                        datos: {
                            doctor: itemAxios.cabecera[0],
                            turno: eventoSl.id,
                            paciente: {
                                paciente: paciente === undefined ? user.datos : paciente
                            }
                        },
                        celular: pacienteWsp

                    })
                    
                    if (typeof result === 'object') {
                        addCita(result);
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
                        enqueueSnackbar('Error: Es posible que se haya generado una cita en simultáneo. Intente con otro horario.', {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'right'
                            },
                            TransitionComponent: Zoom
                        })
                    }
                } else {
                    enqueueSnackbar('Error: Es posible que se haya generado una cita en simultáneo. Intente con otro horario.', {
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
    const mostrarInconformidad = (datos, cabecera) => {
        mostrarComponent({
            contenido: 'inconformidad',
            estado: true,
            size: 'xs',
            item: { datos, cabecera }
        }, 'modalOpen')
    }
    return (
        <>
            {
                displayBusqueda && <>
                    <Paciente setPacienteDocumento={setPacienteDocumento} pacienteDocumento={pacienteDocumento} setPacienteWsp={setPacienteWsp} pacienteWsp={pacienteWsp} />
                    <Medicos setMedicoSelected={setMedicoSelected} medicoSelected={medicoSelected} />
                </>
            }

            <Box sx={{ mx: 2, mb: 2, mt: 2 }}>
                <Button
                    variant="contained"
                    color={displayBusqueda ? 'primary' : 'info'}
                    type="button"
                    fullWidth
                    onClick={() => displayBusqueda ? buscarHorario() : volverBusqueda()}
                >
                    {displayBusqueda && 'Buscar horario'}
                    {!displayBusqueda && 'Volver a generar búsqueda'}
                </Button>
            </Box>
            <Divider />
            {
                !displayBusqueda && <>
                    <Accordion
                        expanded={calendarOpen}
                        sx={{
                            p: 1
                        }}
                        defaultExpanded
                    >
                        <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => setCalendarOpen(x => !x)}>
                            <Typography variant="h5">{medicos.find(x => x.id_usuario === medicoSelected).nombres}   </Typography>
                        </AccordionSummaryWrapper>
                        <AccordionDetails
                            sx={{
                                p: 0
                            }}
                        >
                            {comentarios.length > 0 && <Alert sx={{ mx: 2 }} severity="warning">{comentarios}</Alert>}
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

                                    horas[0].id.split('_')[0].split('T')[0].split('-')[2] + '-' + horas[0].id.split('_')[0].split('T')[0].split('-')[1] + '-' + horas[0].id.split('_')[0].split('T')[0].split('-')[0]

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

                            {
                                portal === null && <Button fullWidth variant="outlined" onClick={reservarCita}>
                                    Reservar cita
                                </Button>
                            }
                            {
                                portal !== null && <Typography variant="h5" >
                                    Reserva de cita es directamente con el servicio, agradecemos contactar con la central telefónica llamando al 618-9999.
                                </Typography>
                            }
                        </Grid>
                        <Grid item lg={12}>
                            <Button fullWidth
                                color='warning'
                                variant="contained"
                                onClick={() => mostrarInconformidad(itemAxios.cabecera[0], user.datos)}>
                                No encontré cita disponible
                            </Button>

                        </Grid>
                        {/* <Grid item lg={12}>
                    <Button fullWidth  variant="contained">
                        Pagar reservar cita
                    </Button>
                  
                </Grid> */}

                    </Grid>
                </>
            }


        </>

    )
}
