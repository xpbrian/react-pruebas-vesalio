import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, styled, TextField, Typography, Zoom } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import useLayoutContext from 'src/hooks/useAuthLayout';
import Medicos from '../cita_rapida/Medico';

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

export default function Index() {
    const { medicos } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const [asignacion, setAsignacion] = useState(null)
    const { mostrarComponent, updateCitasLista } = useLayoutContext()
    const [openAcordion, setOpenAcordion] = useState({ reporteFechaMedicos: false, reporteUso: false, reporteCoberturas: false, reporteAnulados: false, reporteReprogramados: false, reporteCitasMedicos: false })
    const [filter, setFilter] = useState({
        arcordion1: {
            fecha: ''
        },
        arcordion2: {
            fechaInicio: '',
            fechaFin: ''
        },
        arcordion3: {
            fechaInicio: '',
            fechaFin: ''
        },
        arcordion4: {
            fechaInicio: '',
            fechaFin: ''
        },
        arcordion5: {
            fechaInicio: '',
            fechaFin: ''
        },
        arcordion6: {
            fecha: '',
        }
    })
    const [medicoSelected, setMedicoSelected] = useState(null)
    useEffect(() => {
        const getDatos = async (documento, especialidad) => {
            const as = await axios.post(`http://apis-vesalio.com.pe/getMedicosEspecialidadPDF`, { documento, especialidad })
            setAsignacion(as.data[0]);
        }
        if (medicoSelected !== null) {
            let found = medicos.find(x => x.id_usuario === medicoSelected)
            getDatos(found.documento, found.especialidades[0])
        }
    }, [medicoSelected])
    const openAcordionClick = (id) => {
        setOpenAcordion(x => {
            return {
                ...x,
                [id]: !x[id]
            }
        })
    }
    const handleChangedFilter = (id, value) => {
        setFilter(x => {
            return {
                ...x,
                arcordion1: {
                    fecha: value
                }
            }
        })
    }
    const handleChangedFilter2 = (id, value) => {
        setFilter(x => {
            return {
                ...x,
                arcordion2: {
                    [id]: value
                }
            }
        })
    }
    const handleChangedFilter3 = (id, value) => {
        setFilter(x => {
            return {
                ...x,
                arcordion3: {
                    [id]: value
                }
            }
        })
    }
    // const handleChangedFilter4 = (id, value) => {
    //     setFilter(x => {
    //         return {
    //             ...x,
    //             arcordion4: {
    //                 [id]: value
    //             }
    //         }
    //     })
    // }
    const handleChangedFilter5 = (id, value) => {
        setFilter(x => {
            return {
                ...x,
                arcordion5: {
                    [id]: value
                }
            }
        })
    }
    const handleChangedFilter6 = (id, value) => {
        setFilter(x => {
            return {
                ...x,
                arcordion6: {
                    [id]: value
                }
            }
        })
    }
    const handleBuscarFiltro = async () => {
        let errors = [];
        if (filter.arcordion1.fecha === '') {
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
            const rpta = await axios.post(`http://apis-vesalio.com.pe/turnoProgamadoLista`, { fecha: filter.arcordion1.fecha, paciente: null, tipo_paciente: 'documento_paciente', especialidad: null, doctor: null })
            updateCitasLista()
            mostrarComponent({
                contenido: 'acordion1',
                estado: true,
                size: 'md',
                item: {
                    datos: rpta.data,
                    fecha: filter.arcordion1.fecha
                }
            }, 'modalOpen')

        }
    }

    const handleAcordion2 = async () => {
        let errors = [];
        if (filter.arcordion2.fechaInicio === '') {
            errors.push('Debe seleccionar como minimo un tipo de filtro')
        }
        if (filter.arcordion2.fechaFin === '') {
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
            const rpta = await axios.post(`http://apis-vesalio.com.pe/citadosFinanciador`, { fechaInicio: filter.arcordion2.fechaInicio, fechaFin: filter.arcordion2.fechaFin })
            updateCitasLista()
            mostrarComponent({
                contenido: 'acordion2',
                estado: true,
                size: 'md',
                item: {
                    datos: rpta.data,
                    fechaInicio: filter.arcordion2.fechaInicio,
                    fechaFin: filter.arcordion2.fechaFin
                }
            }, 'modalOpen')

        }
    }
    const handleAcordion3 = async () => {
        let errors = [];
        if (filter.arcordion3.fechaInicio === '') {
            errors.push('Debe seleccionar como minimo un tipo de filtro')
        }
        if (filter.arcordion3.fechaFin === '') {
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
            const rpta = await axios.post(`http://apis-vesalio.com.pe/getcitadosEliminadosReporgramados`, { tipo: 3, fechaInicio: filter.arcordion3.fechaInicio, fechaFin: filter.arcordion3.fechaFin })
            updateCitasLista()
            mostrarComponent({
                contenido: 'acordion3',
                estado: true,
                size: 'md',
                item: {
                    datos: rpta.data,
                    fechaInicio: filter.arcordion3.fechaInicio,
                    fechaFin: filter.arcordion3.fechaFin
                }
            }, 'modalOpen')

        }
    }
    // const handleAcordion4 = async () => {
    //     let errors = [];
    //     if (filter.arcordion4.fechaInicio === '') {
    //         errors.push('Debe seleccionar como minimo un tipo de filtro')
    //     }
    //     if (filter.arcordion4.fechaFin === '') {
    //         errors.push('Debe seleccionar como minimo un tipo de filtro')
    //     }
    //     if (errors.length > 0) {
    //         errors.map(x => enqueueSnackbar(x, {
    //             variant: 'error',
    //             anchorOrigin: {
    //                 vertical: 'top',
    //                 horizontal: 'right'
    //             },
    //             TransitionComponent: Zoom
    //         }))
    //     } else {
    //         enqueueSnackbar('Aplicando filtros', {
    //             variant: 'success',
    //             anchorOrigin: {
    //                 vertical: 'top',
    //                 horizontal: 'right'
    //             },
    //             TransitionComponent: Zoom
    //         })
    //         const rpta = await axios.post(`http://apis-vesalio.com.pe/getcitadosEliminadosReporgramados`, { tipo: 10, fechaInicio: filter.arcordion4.fechaInicio, fechaFin: filter.arcordion4.fechaFin })
    //         updateCitasLista()
    //         mostrarComponent({
    //             contenido: 'acordion4',
    //             estado: true,
    //             size: 'md',
    //             item: {
    //                 datos: rpta.data,
    //                 fechaInicio: filter.arcordion4.fechaInicio,
    //                 fechaFin: filter.arcordion4.fechaFin
    //             }
    //         }, 'modalOpen')

    //     }
    // }
    const handleAcordion5 = async () => {
        let errors = [];
        if (filter.arcordion5.fechaInicio === '') {
            errors.push('Debe seleccionar como minimo un tipo de filtro')
        }
        if (filter.arcordion5.fechaFin === '') {
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
            const rpta = await axios.post(`http://apis-vesalio.com.pe/turnoProgamadoListaFecha`, { fechaInicio: filter.arcordion5.fechaInicio, fechaFin: filter.arcordion5.fechaFin })
            updateCitasLista()
            mostrarComponent({
                contenido: 'acordion5',
                estado: true,
                size: 'md',
                item: {
                    datos: rpta.data,
                    fechaInicio: filter.arcordion5.fechaInicio,
                    fechaFin: filter.arcordion5.fechaFin
                }
            }, 'modalOpen')

        }
    }
    useEffect(() => { console.log(filter); }, [filter])
    return (
        <>
            <Accordion
                sx={{
                    p: 1,
                    display:'none'
                }}
                expanded={openAcordion.reporteUso}
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => openAcordionClick('reporteUso')}>
                    <Typography variant="h5">{'Reporte por uso de aplicación'}</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{ px: 2 }}
                        // justifyContent="center"
                        // alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item xs={12} lg={4} md={3}>
                            <TextField
                                placeholder={'Seleccione fecha'}
                                value={filter.arcordion1.fecha}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter('arcordion1', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} md={3} sx={{ mt: .5 }}>
                            <Button variant='contained'
                                onClick={() => handleBuscarFiltro()}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    p: 1
                }}
                expanded={openAcordion.reporteCoberturas}
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => openAcordionClick('reporteCoberturas')}>
                    <Typography variant="h5">{'Reporte por aseguradoras'}</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{ px: 2 }}
                        // justifyContent="center"
                        // alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha Inicio
                            <TextField
                                value={filter.arcordion2.fechaInicio}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter2('fechaInicio', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha Fin
                            <TextField
                                value={filter.arcordion2.fechaFin}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter2('fechaFin', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} md={3} sx={{ mt: 3 }}>
                            <Button variant='contained'
                                onClick={() => handleAcordion2()}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    p: 1
                }}
                expanded={openAcordion.reporteAnulados}
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => openAcordionClick('reporteAnulados')}>
                    <Typography variant="h5">{'Reporte citas eliminadas'}</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{ px: 2 }}
                        // justifyContent="center"
                        // alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha Inicio
                            <TextField
                                value={filter.arcordion3.fechaInicio}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter3('fechaInicio', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha Fin
                            <TextField
                                value={filter.arcordion3.fechaFin}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter3('fechaFin', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} md={3} sx={{ mt: 3 }}>
                            <Button variant='contained'
                                onClick={() => handleAcordion3()}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            {/* <Accordion
                sx={{
                    p: 1
                }}
                expanded={openAcordion.reporteReprogramados}
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => openAcordionClick('reporteReprogramados')}>
                    <Typography variant="h5">{'Reporte citas reprogramadas'}</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{ px: 2 }}
                        // justifyContent="center"
                        // alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha Inicio
                            <TextField
                                value={filter.arcordion4.fechaInicio}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter4('fechaInicio', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha Fin
                            <TextField
                                value={filter.arcordion4.fechaFin}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter4('fechaFin', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} md={3} sx={{ mt: 3 }}>
                            <Button variant='contained'
                                onClick={() => handleAcordion4()}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion> */}
            <Accordion
                sx={{
                    p: 1
                }}
                expanded={openAcordion.reporteCitasMedicos}
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => openAcordionClick('reporteCitasMedicos')}>
                    <Typography variant="h5">{'Reporte citas por médicos'}</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{ px: 2 }}
                        // justifyContent="center"
                        // alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha Inicio
                            <TextField
                                value={filter.arcordion5.fechaInicio}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter5('fechaInicio', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha Fin
                            <TextField
                                value={filter.arcordion5.fechaFin}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter5('fechaFin', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={3} md={3} sx={{ mt: 3 }}>
                            <Button variant='contained'
                                onClick={() => handleAcordion5()}>
                                Buscar
                            </Button>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    p: 1
                }}
                expanded={openAcordion.reporteFechaMedicos}
            >
                <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />} onClick={() => openAcordionClick('reporteFechaMedicos')}>
                    <Typography variant="h5">{'Lista de pacientes por médicos'}</Typography>
                </AccordionSummaryWrapper>
                <AccordionDetails
                    sx={{
                        p: 0
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        sx={{ px: 2 }}
                        // justifyContent="center"
                        // alignItems="stretch"
                        spacing={1}
                    >
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha inicio
                            <TextField
                                value={filter.arcordion6.fecha}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter6('fecha', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4} md={3}>
                            Fecha fin
                            <TextField
                                value={filter.arcordion6.fecha}
                                fullWidth
                                type={'date'}
                                onChange={(e) => handleChangedFilter6('fecha2', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Medicos setMedicoSelected={setMedicoSelected} />
                    {asignacion !== null &&

                        <a href={`https://vesalio.alephoo.com/admision/list_turns/generate_list_turns/${filter.arcordion6.fecha.split('-')[0]}${filter.arcordion6.fecha.split('-')[1]}${filter.arcordion6.fecha.split('-')[2]}/${asignacion.id}/${asignacion.personal_id}`} rel="noreferrer" target="_blank">Citas</a>
                    }
                </AccordionDetails>
            </Accordion>
        </>
    )
}
