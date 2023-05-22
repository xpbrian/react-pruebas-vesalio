import { Box, Button, Grid, Typography, Zoom } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import TabsGeneral from 'src/components/Tabs'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'
import Medicos from './Medico'
import Paciente from './Paciente'
// import axios from 'axios'
import SinDocumentos from './Paciente_Sin_Documentos'

export default function Index() {
    const { enqueueSnackbar } = useSnackbar();
    const { mostrarComponent } = useLayoutContext()
    const [selected, setSelected] = useState({ paciente: { item: null, selected: false } })
    const [tabs, setTabs] = useState([{ value: '01', label: 'Documento', active: true }, { value: '02', label: 'Sin documento', active: false }])
    const { user } = useAuth()
    const [especialidadSelected, setEspecialidadSelected] = useState(null)
    useEffect(() => { console.log(especialidadSelected) }, [especialidadSelected])

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
    const handleClickBuscar = async () => {

        try {
            let obj = {
                especialidad: especialidadSelected,
                documento: user.datos.numero_documento,
                persona: selected.paciente.item.Nro_DocIdenti
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertTriaje`, { ...obj })
            if (typeof response.data === 'object') {
                enqueueSnackbar(response.data.error, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
            } else {
                enqueueSnackbar('Registrado correctamente', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
                mostrarComponent({
                    contenido: '',
                    estado: false,
                }, 'drawerOpen')
            }
        } catch (e) {
            console.log(e);
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

                        <Grid item xs={12} lg={12} md={12} sx={{ mt: -4 }}>
                            <Medicos
                                setEspecialidadSelected={setEspecialidadSelected}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Button variant='contained'
                                onClick={() => handleClickBuscar()}
                                fullWidth>Guardar emergencia</Button>
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


                        <Grid item xs={12} lg={12} md={12} sx={{ mt: -4 }}>
                            <Medicos
                                setEspecialidadSelected={setEspecialidadSelected}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12} md={12}>
                            <Button variant='contained'
                                onClick={() => handleClickBuscar()}
                                fullWidth>Guardar emergencia</Button>
                        </Grid>
                    </Grid>


                </>}


            </>}

        </>





    )
}
