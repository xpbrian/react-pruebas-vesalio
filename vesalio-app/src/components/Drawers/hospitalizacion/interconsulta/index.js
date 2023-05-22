import { Autocomplete, Button, Divider, Grid, TextField, Zoom } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useAuth from 'src/hooks/useAuth'
import useLayoutContext from 'src/hooks/useAuthLayout'
import ComponenteHTML from '../../consulta_ambulatoria/ComponenteHTML'
import Lista from './Lista'

export default function Index() {
    const arrayTipoConsulta = [{ id: 'MANEJO CONJUNTO', title: 'MANEJO CONJUNTO' }, { id: 'OPINION', title: 'OPINION' }, { id: 'TRANSFERENCIA', title: 'TRANSFERENCIA' }]
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [text, setText] = useState([{ id: 'observacion', text: '' }])
    const [tipoConsulta, setTipoConsulta] = useState('')
    const [lista, setLista] = useState([])
    const { medicos, especialidad, drawerOpen } = useLayoutContext()
    const [medicosLista, setmedicosLista] = useState([]);
    const [especialidadSlected, setEspecialidadSlected] = useState(null)
    const [medicoSelected, setMedicoSelected] = useState(null)
    const { user } = useAuth()
    const [cabecera, setCabecera] = useState(null)

    const handleFilterMedicos = (value, newValue) => {
        setMedicoSelected(newValue === null ? null : newValue.id)
    }
    const limpiarDatos = () => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: '' })
            return arr
        }, []))
    }
    const handleFilterEspecialidad = (value, newValue) => {
        if (newValue === null) {
            setmedicosLista([])
            setEspecialidadSlected(null)
        } else {
            let filtro = medicos.filter(x => x.especialidades.includes(parseInt(newValue.id)))
            setmedicosLista(filtro);
            setEspecialidadSlected(newValue.id)
        }
    }
    useEffect(() => {
        setmedicosLista(medicos)
    }, [medicos])

    const getDatos = async () => {
        try {
            const res = await axios.get(`http://200.121.91.211:4001/interconsulta/${drawerOpen.item.boton.persona_internacion_id}`)
            setLista(res.data.datos);
            if (res.data.cabecera.length > 0) {
                setCabecera(res.data.cabecera[0])
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (drawerOpen.item.boton !== undefined) {
            getDatos()
        }
    }, [drawerOpen])

    const handleClickGuardar = async () => {
        let errors = []
        if (especialidadSlected === null) {
            errors.push('Debe ingresar un estudio')
        }
        if (text.find(x => x.id === 'observacion').text.length === 0) {
            errors.push('Debe ingresar un estudio')
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
            let obj = {
                personaInternacion: drawerOpen.item.boton.persona_internacion_id,
                personalId: medicoSelected,
                especiliadadId: especialidadSlected,
                tipoConsulta: tipoConsulta,
                documento: user.datos.numero_documento,
                descripcionSolicitud: text.find(x => x.id === 'observacion').text,
            }
            console.log(obj);
            const response = await axios.post(`http://200.121.91.211:4001/insertInterconsulta`, { ...obj })
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
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
                limpiarDatos()
                getDatos()
            }
        }

    }

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const hadlesetTipoConsulta = (value, newValue) => {
        if (newValue === null) {
            setTipoConsulta('')
        } else {
            setTipoConsulta(newValue.id);
        }
    }
    return (
        <>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 }
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={1}
            >

                <Grid item xs={12} lg={4} md={4}>
                    <Autocomplete
                        fullWidth
                        onChange={hadlesetTipoConsulta}
                        options={arrayTipoConsulta}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={t('Tipo interconsulta')}
                                placeholder={t('Seleccione interconsulta')}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} lg={4} md={4}>
                    <Autocomplete
                        fullWidth
                        onChange={handleFilterEspecialidad}
                        options={[...especialidad.reduce((arr, item) => {
                            arr.push({
                                id: item.id_especialidad,
                                title: `${item.epecialidad}`
                            })
                            return arr
                        }, []).sort(function (a, b) {
                            if (a.title > b.title) {
                                return 1;
                            }
                            if (a.title < b.title) {
                                return -1;
                            }
                            // a must be equal to b
                            return 0;
                        }),{
                            id: 341,
                            title: `Medicina Intensiva`
                        }]}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={t('Especialidades')}
                                placeholder={t('Seleccione especialidad')}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12} lg={4} md={4}>
                    <Autocomplete
                        fullWidth
                        onChange={handleFilterMedicos}
                        options={medicosLista.reduce((arr, item) => {
                            arr.push({
                                id: item.id_usuario,
                                title: `${item.nombres}`
                            })
                            return arr
                        }, []).sort(function (a, b) {
                            if (a.title > b.title) {
                                return 1;
                            }
                            if (a.title < b.title) {
                                return -1;
                            }
                            // a must be equal to b
                            return 0;
                        })}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={t('Médicos')}
                                placeholder={t('Seleccione médico')}
                            />
                        )}
                    />
                </Grid>

                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'observacion')} handleChangedTextState={handleChangedTextState} title={'Observación'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleClickGuardar}
                    >Guardar</Button>
                </Grid>
            </Grid>
            <Divider />
            {
                lista.length > 0 && <Lista lista={lista} getDatos={getDatos} cabecera={cabecera}/>
            }

        </>
    )
}
