import { Box, Button, Grid, Typography, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import Medicos from './Medico'
import Paciente from './Paciente'
import SerachForMedico from './SerachForMedico'
// import SerachForFecha from './SerachForFecha'
import axios from 'axios'
import useLayoutContext from 'src/hooks/useAuthLayout'
import SinDocumentos from './Paciente_Sin_Documentos'

export default function Index() {
    const { medicos } = useLayoutContext()
    const [selected, setSelected] = useState({ paciente: { item: null, selected: false } })
    const [pacienteWsp, setPacienteWsp] = useState('')
    const [tabs, setTabs] = useState([{ value: '01', label: 'Documento', active: true }, { value: '02', label: 'Sin documento', active: false }])

    // const [tabs, setTabs] = useState([{ value: '01', label: 'Por médico', active: true }, { value: '02', label: 'Por fecha', active: false }])
    // const [tabs, setTabs] = useState([{ value: '01', label: 'Por médico', active: true }])
    const [medicoSelected, setMedicoSelected] = useState(null)
    const [especialidadSelected, setEspecialidadSelected] = useState(null)
    const [fechaSelected, setFechaSelected] = useState('')
    const [enviar, setEnviar] = useState({ porMedico: null, porEspecialidad: null })
    const [comentarios, setComentarios] = useState('')
    useEffect(() => { console.log(selected) }, [selected])

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
    const handleClickBuscar = async (tipo) => {

        if (tipo === '01') {
            let medicoDatos = medicos.find(x => x.id_usuario === medicoSelected)
            const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorario`, { id_especialidad: medicoDatos.especialidades[0], documento: medicoDatos.documento })
            const response2 = await axios.post(`http://apis-vesalio.com.pe/getComentario`, { id_especialidad: medicoDatos.especialidades[0], documento: medicoDatos.documento })
            if (response2.data.length > 0) {
                setComentarios(response2.data[0].comentario)
            }
            setEnviar(x => {
                return {
                    ...x,
                    porMedico: response.data
                }
            })

        } else {
            const response = await axios.post(`http://apis-vesalio.com.pe/especialidadHorarios`, { id_especialidad: especialidadSelected, fecha: fechaSelected })

            setEnviar(x => {
                return {
                    ...x,
                    porEspecialidad: response.data
                }
            })
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
                        <Grid item xs={12} lg={12} md={12} sx={{ mt: -4 }}>
                            <Medicos
                                setMedicoSelected={setMedicoSelected}
                                setEspecialidadSelected={setEspecialidadSelected}
                                setFechaSelected={setFechaSelected}
                                tipo={'01'} />
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Button variant='contained'
                                onClick={() => handleClickBuscar('01')}
                                fullWidth>Buscar horarios</Button>
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <SerachForMedico selected={selected} comentarios={comentarios} pacienteWsp={pacienteWsp} enviar={enviar.porMedico} medicoSelected={medicoSelected} />

                            {/* {
                            tabs.find(x => x.active).value === '02' && <SerachForFecha enviar={enviar.porEspecialidad} pacienteWsp={pacienteWsp} especialidadSelected={especialidadSelected} fechaSelected={fechaSelected} />
                        } */}
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
                        <Grid item xs={12} lg={12} md={12} sx={{ mt: -4 }}>
                            <Medicos
                                setMedicoSelected={setMedicoSelected}
                                setEspecialidadSelected={setEspecialidadSelected}
                                setFechaSelected={setFechaSelected}
                                tipo={'01'} />
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Button variant='contained'
                                onClick={() => handleClickBuscar('01')}
                                fullWidth>Buscar horarios</Button>
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <SerachForMedico selected={selected} comentarios={comentarios} pacienteWsp={pacienteWsp} enviar={enviar.porMedico} medicoSelected={medicoSelected} />

                            {/* {
                            tabs.find(x => x.active).value === '02' && <SerachForFecha enviar={enviar.porEspecialidad} pacienteWsp={pacienteWsp} especialidadSelected={especialidadSelected} fechaSelected={fechaSelected} />
                        } */}
                        </Grid>
                    </Grid>


                </>}


            </>}

        </>





    )
}
