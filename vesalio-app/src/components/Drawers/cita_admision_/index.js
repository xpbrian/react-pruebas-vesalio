import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import Paciente from './Paciente'
import Medicos from './Medico';
import SerachForFecha from './SerachForFecha';
import SerachForMedico from './SerachForMedico';
import axios from 'axios';
import useLayoutContext from 'src/hooks/useAuthLayout';


export default function Index() {
    const { medicos } = useLayoutContext()
    const [mostrarBusqueda, setMostrarBusqueda] = useState(true)
    const [tabs, setTabs] = useState([{ value: '01', label: 'Por medico', active: true }, { value: '02', label: 'Por fecha', active: false }])
    const [medicoSelected, setMedicoSelected] = useState(null)
    const [especialidadSelected, setEspecialidadSelected] = useState(null)
    const [pacienteSelected, setPacienteSelected] = useState(null)
    const [fechaSelected, setFechaSelected] = useState('')
    const [enviar, setEnviar] = useState(null)

    const handleClickBuscar = async (tipo) => {
        console.log(pacienteSelected)
        if (tipo === '01') {
            let medicoDatos = medicos.find(x => x.id_usuario === medicoSelected)
            const response = await axios.post(`http://apis-vesalio.com.pe/medicosEspecialidadHorario`, { id_especialidad: medicoDatos.especialidades[0], documento: medicoDatos.documento })
            setEnviar(response.data)

        } else {
            const response = await axios.post(`http://apis-vesalio.com.pe/especialidadHorarios`, { id_especialidad: especialidadSelected, fecha: fechaSelected })
            setEnviar(response.data)
        }
    }
    const handleSleccionarPaciente = (item) => {
        setPacienteSelected(item);
        setMostrarBusqueda(false)
    }
    const handleLimpiar = () => {
        setMostrarBusqueda(x => !x)
        setEnviar(null)
        setMedicoSelected(null)
        setEspecialidadSelected(null)
        setFechaSelected('')
    }
    return (
        <>
            {
                mostrarBusqueda && <Paciente handleSleccionarPaciente={handleSleccionarPaciente} />
            }
            {
                !mostrarBusqueda && <Grid alignItems="center" justifyContent={"center"} container spacing={3} sx={{ p: 2 }}>
                    <Grid item xs={12} lg={10} md={10}>
                        <Box display="flex" alignItems="center">
                            <Box ml={1.5}>
                                <Typography color="text.primary" variant="h4" noWrap>
                                    Brian chicoma
                                </Typography>
                                <Typography variant="subtitle1" noWrap>
                                    47809055
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={2} md={2}>
                        <Button variant="outlined" size='small' sx={{ float: 'right' }} onClick={() => handleLimpiar()}>
                            Limpiar
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <TabsGeneral tabs={tabs} setTabs={setTabs} />
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} sx={{ mt: -4 }}>
                        <Medicos
                            setMedicoSelected={setMedicoSelected}
                            setEspecialidadSelected={setEspecialidadSelected}
                            setFechaSelected={setFechaSelected}
                            tipo={tabs.find(x => x.active).value} />
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <Button variant='contained'
                            onClick={() => { handleClickBuscar(tabs.find(x => x.active).value) }}
                            fullWidth>Buscar horarios</Button>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        {
                            tabs.find(x => x.active).value === '01' && <SerachForMedico enviar={enviar} medicoSelected={medicoSelected} />
                        }
                        {
                            tabs.find(x => x.active).value === '02' && <SerachForFecha enviar={enviar} especialidadSelected={especialidadSelected} fechaSelected={fechaSelected}/>
                        }
                    </Grid>
                </Grid>
            }






        </>
    )
}
