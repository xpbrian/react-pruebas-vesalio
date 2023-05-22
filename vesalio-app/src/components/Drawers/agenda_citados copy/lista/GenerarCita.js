import { Box, Button, Grid, Typography, TextField, Zoom } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'
import confirmSweetAlert from 'src/utils/confirm'
import Paciente from '../../cita_admision/Paciente'
import SinDocumentos from '../../cita_admision/Paciente_Sin_Documentos'

export default function Index({ horaSelected }) {
    const [selected, setSelected] = useState({ paciente: { item: null, selected: false } })
    const [pacienteWsp, setPacienteWsp] = useState('')
    const [tabs, setTabs] = useState([{ value: '01', label: 'Documento', active: true }, { value: '02', label: 'Sin documento', active: false }])
    const { enqueueSnackbar } = useSnackbar();
    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const [itemAxios, setItemAxios] = useState(null)
    const { user } = useAuth()


    useEffect(() => {
        const getDatos = async (obj) => {
            const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorarioNew`, obj)
            console.log(obj);
            setItemAxios(response.data)
        }
        getDatos({ agenda: drawerOpen.item.asignacionId, fecha: drawerOpen.item.item.fecha_calendario.split('T')[0] })
    }, [drawerOpen])


    const handleSleccionarPaciente = async (id, item) => {
        setSelected(x => {
            return {
                ...x,
                [id]: {
                    item,
                    selected: true
                }
            }
        })
    }
    useEffect(() => {
        handleLimpiarAll()
    }, [tabs])
    const handleLimpiarAll = () => {
        setSelected({ paciente: { item: null, selected: false } })
    }
    const getGenerarCita = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/generarCitaAdminNew`, obj)
        return response.data;
    }
    const soloNumeros = (valor) => {
        let numeros = '0123456789'
        let rpta = true
        for (let i = 0; i < valor.length; i++) {
            if (numeros.indexOf(valor.substring(i, i + 1)) === -1) {
                rpta = false
            }
        }
        return rpta
    }
    const getExisteTurno = async (obj) => {
        const response = await axios.post(`http://apis-vesalio.com.pe/existeTurnoPacienteNew`, obj)
        return response.data;
    }
    const reservarCita = async () => {
        let errors = []

        if (!soloNumeros(pacienteWsp)) {
            errors.push('El whatsapp solo debe contener numeros')
        } else {
            if (pacienteWsp.length !== 9) {
                errors.push('El whatsapp solo debe contener 9 numeros')
            }
            if (pacienteWsp.substring(0, 1) !== '9') {
                errors.push('El whatsapp debe iniciar con 9')
            }
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

                let existeTurno = await getExisteTurno({
                    datos: [{ id: 'paciente', value: selected.paciente.item.Nro_DocIdenti },
                    { id: 'asignacion', value: drawerOpen.item.asignacionId },
                    { id: 'fecha', value: drawerOpen.item.item.fecha_calendario.split('T')[0] }]
                })
                if (existeTurno[0].cantidad === 0) {
                    let result = await getGenerarCita({
                        id_usuario: user._id,
                        fecha: drawerOpen.item.item.fecha_calendario.split('T')[0],
                        hora: horaSelected.hora,
                        asignacion: drawerOpen.item.asignacionId,
                        agenda: drawerOpen.item.agenda.id,

                        datos: {
                            doctor: itemAxios.cabecera[0],
                            turno: drawerOpen.item.item.fecha_calendario.split('T')[0] + 'T' + horaSelected.hora,
                            paciente: selected
                        },
                        celular: pacienteWsp,
                        paciente: selected
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
                            drawerOpen.item.setAsignacionSelected()
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
                    enqueueSnackbar('Error: No puede generar una cita con el mismo doctor en el mismo día', {
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
            <br />
            <Box sx={{ pl: 2 }}>
                <TabsGeneral setTabs={setTabs} tabs={tabs} />
            </Box>
            {tabs.find(x => x.active).value === '02' && <>
                {!selected.paciente.selected && <SinDocumentos handleSleccionarPaciente={handleSleccionarPaciente} />}
                {selected.paciente.selected && <>
                    <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                        <Grid item xs={12} lg={10} md={10}>
                            <Box display="flex" alignItems="center">
                                <Box ml={1.5}>
                                    <Typography color="text.primary" variant="h4" noWrap>
                                        {selected.paciente.item.Des_ApePaterno + ' ' + selected.paciente.item.Des_ApeMaterno + ' ' + selected.paciente.item.Des_Nombres}
                                    </Typography>
                                    <Typography variant="subtitle1" noWrap>
                                        Sin documentos
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={2} md={2}>
                            <Button variant="outlined" size='small' sx={{ float: 'right' }}
                                onClick={() => handleLimpiarAll()}>
                                Limpiar
                            </Button>
                        </Grid>
                        {/* <Grid item xs={12} lg={12} md={12}>
                            <TabsGeneral tabs={tabs} setTabs={setTabs} />
                        </Grid> */}
                        <Grid item xs={12} lg={12} md={12} sx={{ mx: 2 }}>
                            <TextField
                                variant="outlined"
                                label={'WhatsApp del paciente con el que va a generar la cita'}
                                value={pacienteWsp}
                                onChange={(e) => setPacienteWsp(e.target.value)}
                                fullWidth
                                type={'number'}
                                placeholder={'Ingrese número de whatsapp'}
                            />
                        </Grid>

                    </Grid>


                </>}
            </>}
            {tabs.find(x => x.active).value === '01' && <>
                {!selected.paciente.selected && <Paciente handleSleccionarPaciente={handleSleccionarPaciente} />}
                {selected.paciente.selected && <>
                    <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                        <Grid item xs={12} lg={10} md={10}>
                            <Box display="flex" alignItems="center">
                                <Box ml={1.5}>
                                    <Typography color="text.primary" variant="h4" noWrap>
                                        {selected.paciente.item.Des_ApePaterno + ' ' + selected.paciente.item.Des_ApeMaterno + ' ' + selected.paciente.item.Des_Nombres}
                                    </Typography>
                                    <Typography variant="subtitle1" noWrap>
                                        {selected.paciente.item.Nro_DocIdenti}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} lg={2} md={2}>
                            <Button variant="outlined" size='small' sx={{ float: 'right' }}
                                onClick={() => handleLimpiarAll()}>
                                Limpiar
                            </Button>
                        </Grid>

                        <Grid item xs={12} lg={12} md={12} sx={{ mx: 2 }}>
                            <TextField
                                variant="outlined"
                                label={'WhatsApp del paciente con el que va a generar la cita'}
                                value={pacienteWsp}
                                onChange={(e) => setPacienteWsp(e.target.value)}
                                fullWidth
                                type={'number'}
                                placeholder={'Ingrese número de whatsapp'}
                            />
                        </Grid>



                    </Grid>


                </>}
                <Button variant='contained'
                    onClick={reservarCita}
                    fullWidth>Generar Cita</Button>

            </>}

        </>





    )
}
