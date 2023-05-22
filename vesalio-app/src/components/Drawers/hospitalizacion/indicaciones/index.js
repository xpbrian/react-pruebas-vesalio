// import { User } from "@auth0/auth0-spa-js";
import { Autocomplete, Button, Grid, TextField, Typography, Zoom } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useAuth from "src/hooks/useAuth";
import useLayoutContext from "src/hooks/useAuthLayout";
import ComponenteHTML from '../../consulta_ambulatoria/ComponenteHTML'
import ListaMedicamentos from './ListaMedicamentos'
import ListaPlanHidratacion from './ListaPlanHidratacion'

export default function Index() {
    const [dietas, setDietas] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const [concistenacias, setConcistenacias] = useState([])
    const [oxigeno, setOxegino] = useState([])
    const [nebulizaciones, setNebulizaciones] = useState([])
    const [kinesioterapias, setKinesioterapias] = useState([])
    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const { user } = useAuth()
    const [text, setText] = useState([{ id: 'nebulizaciones', text: '' }, { id: 'precauciones', text: '' }, { id: 'alergias', text: '' }, { id: 'otros', text: '' }, { id: 'alimentacion', text: '' }, { id: 'oxigeno', text: '' }])
    const [value, setValue] = useState([{ id: 'kinoSelected', value: null }, { id: 'nebulizacionSelected', value: null }, { id: 'dietaSlected', value: null }, { id: 'consistenciasSelected', value: null }, { id: 'oxigenoSelected', value: null }])
    const [medicamentos, setMedicamentos] = useState([])
    const [planHidratacion, setPlanHidratacion] = useState([])

    const removeMedicamentos = (id) => {
        setMedicamentos(x => x.filter(y => y.medicamento.id !== id))
    }
    const addMedicamentos = (item) => {
        setMedicamentos(x => [...x, item])
    }
    const removPlanH = (id) => {
        setPlanHidratacion(x => x.filter(y => y.medicamento.id !== id && y.medicamento.id !== id))
    }
    const addPlanH = (item) => {
        setPlanHidratacion(x => [...x, item])
    }

    useEffect(() => {
        console.log(user.cuenta.tipo_usuario.id)
    }, [])

    useEffect(() => {
        const getDatos = async () => {
            try {

                const res = await axios.get(`http://200.121.91.211:4001/dietas`)

                setConcistenacias(res.data.concistenacia.reduce((arr, item) => {
                    arr.push({ id: item.id, title: item.descripcion })
                    return arr
                }, []))

                setDietas(res.data.dieta.reduce((arr, item) => {
                    arr.push({ id: item.id, title: item.descripcion })
                    return arr
                }, []))
                setOxegino(res.data.oxigeno.reduce((arr, item) => {
                    arr.push({ id: item.id, title: item.descripcion })
                    return arr
                }, []))
                setNebulizaciones(res.data.nebulizaciones.reduce((arr, item) => {
                    arr.push({ id: item.id, title: item.descripcion })
                    return arr
                }, []))
                setKinesioterapias(res.data.kinesioterapias.reduce((arr, item) => {
                    arr.push({ id: item.id, title: item.descripcion })
                    return arr
                }, []))

                const resDatos = await axios.get(`http://200.121.91.211:4001/indicacionesView/${drawerOpen.item.boton.persona_internacion_id}`)
                setText([
                    { id: 'precauciones', text: resDatos.data.view.map(x => x.precauciones).reduce((arr, item) => arr + '<hr/>' + item, '') },
                    { id: 'alergias', text: resDatos.data.view.map(x => x.alergias).reduce((arr, item) => arr + '<hr/>' + item, '') },
                    { id: 'otros', text: '' },
                    { id: 'alimentacion', text: '' },
                    { id: 'nebulizaciones', text: '' },
                    { id: 'oxigeno', text: '' }])
            } catch (e) {
                console.log(e);
            }
        }

        getDatos()
    }, [])

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
    }
    const handleGuardar = async () => {
        //
        if (user.cuenta.tipo_usuario.id === "09" ) {
            alert("Debe ser doctor para realizar esta acción")
        } else if (user.cuenta.tipo_usuario.id === "03") {
            let obj = {
                personaInternacion: drawerOpen.item.boton.persona_internacion_id,
                documento: user.datos.numero_documento,
                dieta: value.find(x => x.id === 'dietaSlected').value,
                consistencia: value.find(x => x.id === 'consistenciasSelected').value,
                movilidad: text.find(x => x.id === 'otros').text,
                oxigeno: value.find(x => x.id === 'oxigenoSelected').value,
                nebulizacion: value.find(x => x.id === 'nebulizacionSelected').value,
                kinesioterapia: value.find(x => x.id === 'kinoSelected').value,
                alergiasText: text.find(x => x.id === 'alergias').text,
                precaucionesText: text.find(x => x.id === 'precauciones').text,
                alimentacionText: text.find(x => x.id === 'alimentacion').text,
                textOxigenoterapia: text.find(x => x.id === 'oxigeno').text,
                planHidratacion: planHidratacion
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertIndicaciones`, { ...obj })
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
    
            }
        } else {
            alert("Debe ser doctor para realizar esta acción")
        }
        //
    }
    const handleChangedDieta = (_, newValue) => {
        setValue(x => x.reduce((arr, item) => {
            arr.push({ ...item, value: item.id === 'dietaSlected' ? (newValue !== null ? newValue.id : newValue) : item.value })
            return arr
        }, []))
    }
    const handleChangedConsstencia = (_, newValue) => {
        setValue(x => x.reduce((arr, item) => {
            arr.push({ ...item, value: item.id === 'consistenciasSelected' ? (newValue !== null ? newValue.id : newValue) : item.value })
            return arr
        }, []))
    }
    const handleChangedOxigeno = (_, newValue) => {
        setValue(x => x.reduce((arr, item) => {
            arr.push({ ...item, value: item.id === 'oxigenoSelected' ? (newValue !== null ? newValue.id : newValue) : item.value })
            return arr
        }, []))
    }
    const handleChangedNebu = (_, newValue) => {
        setValue(x => x.reduce((arr, item) => {
            arr.push({ ...item, value: item.id === 'nebulizacionSelected' ? (newValue !== null ? newValue.id : newValue) : item.value })
            return arr
        }, []))
    }
    const handleChangedKino = (_, newValue) => {
        setValue(x => x.reduce((arr, item) => {
            arr.push({ ...item, value: item.id === 'kinoSelected' ? (newValue !== null ? newValue.id : newValue) : item.value })
            return arr
        }, []))
    }
    const agregarPlanHidratacion = () => {
        mostrarComponent({
            contenido: 'planHidratacionIndicaciones',
            estado: true,
            size: 'md',
            item: {
                addRecetas: (item) => addPlanH(item)
            }
        }, 'modalOpen')
    }
    const agregarMedicamentos = () => {
        mostrarComponent({
            contenido: 'recetaMedicamentosIndicaciones',
            estado: true,
            size: 'sm',
            item: {
                addRecetas: (item) => addMedicamentos(item)
            }
        }, 'modalOpen')
    }
    return (
        <>
            <Grid
                sx={{
                    px: { xs: 0, md: 2 },
                    mt: 2
                }}
                container
                direction="row"
                spacing={1}
            >
                <Grid item lg={12}>
                    <ComponenteHTML text={text.find(x => x.id === 'alergias')} handleChangedTextState={handleChangedTextState} title={'Alergias'} />
                </Grid>
                <Grid item lg={6}>
                    <Autocomplete
                        fullWidth
                        options={dietas}
                        onChange={handleChangedDieta}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={'Dietas'}
                                placeholder={'Seleccione dieta'}
                            />
                        )}
                    />
                </Grid>
                <Grid item lg={6}>
                    <Autocomplete
                        fullWidth
                        onChange={handleChangedConsstencia}
                        options={concistenacias}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={'consistencias'}
                                placeholder={'Seleccione consistencia'}
                            />
                        )}
                    />
                </Grid>
                <Grid item lg={12}>
                    <ComponenteHTML text={text.find(x => x.id === 'alimentacion')} handleChangedTextState={handleChangedTextState} title={'Alimentación'} />
                </Grid>
                <Grid item lg={4}>
                    <Typography variant="h4">Plan hidratación</Typography>
                </Grid>
                <Grid item lg={7} >
                    <Button sx={{ float: "right" }} variant={"outlined"} onClick={agregarPlanHidratacion}>
                        Agregar
                    </Button>
                </Grid>
                <Grid item lg={12} >
                    {planHidratacion.length > 0 && <ListaPlanHidratacion removPlanH={removPlanH} planHidratacion={planHidratacion} />}

                </Grid>
                <Grid item lg={6}>
                    <Autocomplete
                        fullWidth
                        onChange={handleChangedOxigeno}
                        options={oxigeno}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={'Oxigenoterapia'}
                                placeholder={'Seleccione Oxigenoterapia'}
                            />
                        )}
                    />
                </Grid>
                <Grid item lg={12}>
                    <ComponenteHTML text={text.find(x => x.id === 'oxigeno')} handleChangedTextState={handleChangedTextState} title={'Observacion Oxigenoterapia'} />
                </Grid>
                <Grid item lg={6}>
                    <Autocomplete
                        fullWidth
                        onChange={handleChangedNebu}
                        options={nebulizaciones}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={'Nebulizaciones'}
                                placeholder={'Seleccione Nebulizaciones'}
                            />
                        )}
                    />
                </Grid>
                <Grid item lg={6}>
                    <Autocomplete
                        fullWidth
                        onChange={handleChangedKino}
                        options={kinesioterapias}
                        getOptionLabel={(option) => option.title}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={'Kinesioterapias'}
                                placeholder={'Seleccione Kinesioterapias'}
                            />
                        )}
                    />
                </Grid>

                <Grid item lg={12}>
                    <ComponenteHTML text={text.find(x => x.id === 'nebulizaciones')} handleChangedTextState={handleChangedTextState} title={'Observaciones nebulizaciones'} />
                </Grid>

                <Grid item lg={4}>
                    <Typography variant="h4">Medicamentos</Typography>
                </Grid>
                <Grid item lg={7} >
                    <Button sx={{ float: "right" }} variant={"outlined"} onClick={agregarMedicamentos}>
                        Agregar
                    </Button>

                </Grid>
                <Grid item lg={12} >
                    {medicamentos.length > 0 && <ListaMedicamentos removeMedicamentos={removeMedicamentos} medicamentos={medicamentos} />}
                </Grid>

                <Grid item lg={12}>
                    <ComponenteHTML text={text.find(x => x.id === 'otros')} handleChangedTextState={handleChangedTextState} title={'Observacion/Otros'} />
                </Grid>
                <Grid item lg={12}>
                    <ComponenteHTML text={text.find(x => x.id === 'precauciones')} handleChangedTextState={handleChangedTextState} title={'Precauciones'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleGuardar}
                    >Guardar</Button>
                </Grid>
            </Grid>
        </>


    )
}
