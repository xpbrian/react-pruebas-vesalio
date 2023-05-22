import { Autocomplete, Button, Grid, TextField, Typography, Zoom, Divider, FormControlLabel, Checkbox } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react'
import useLayoutContext from 'src/hooks/useAuthLayout';
import ComponenteHTML from './ComponenteHTML'
import ListaDiagnostico from './ListaDiagnostico'
import ListaReceta from './ListaRecetas'
import ListaEstudios from './ListaEstudios'
import Hospitalizacion from './Hospitalizacion'
import useAuth from 'src/hooks/useAuth';
import { useParams } from 'react-router';
import confirmSweetAlert from 'src/utils/confirm';

export default function Consulta({
    selected,
    setSelected,
    noCita,
    mediciones,
    handleChangedTextState,
    handleSetHospitaliza,
    addEstudios,
    removeRecetas,
    addRecetas,
    addDiagnostico,
    changedDiagnosticoPrioridad,
    removeDiagnostico,
    text,
    diagnosticoPrioridad,
    diagnosticos,
    proxima,
    setProxima,
    recetas,
    estudios,
    removeEstudios,
    hospitaliza }) {

    let inputRef;

    const { drawerOpen, mostrarComponent } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth()
    const { id } = useParams()
    const [array, setArray] = useState([])
    const [valores, setValores] = useState('')
    const [mostrar, setMostrar] = useState([{ id: 'hospi', value: false }, { id: 'emergencia', value: false }])
    const [camas, setCamas] = useState([]);
    const [mostrarReceta, setMostrarReceta] = useState(false)
    const [camaSelected, setCamaSelected] = useState(null);

    const handleChanged = (value) => {
        setValores(value === null ? '' : value.label);
        setSelected(value)
    }
    const handleChangedCama = (_, newValue) => {
        setCamaSelected(newValue === null ? '' : newValue.id);
    }
    useEffect(() => {
        const getDatos = async (query) => {
            try {
                const response = await axios.get(`http://200.121.91.211:4001/diagnosticos/${query}`)
                setArray(response.data.reduce((arr, item) => {
                    arr.push({ id: item.id, label: item.label })
                    return arr
                }, []))
            } catch (e) {
                console.log(e);
            }

        }

        if (valores.length >= 3) {
            getDatos(valores)
        } else {
            setArray([])
        }

    }, [valores])

    useEffect(() => {
        const getDatos = async () => {
            try {

                const response = await axios.get(`http://200.121.91.211:4001/habitaciones`)
                let arrayC = response.data.datos.filter(x => x.codigoSala === 67).filter(x => response.data.ocupados.find(y => y.id === x.camaId) === undefined)
                setCamas(arrayC.reduce((arr, item) => {
                    arr.push({ id: item.camaId, title: item.nombreSala + '/' + item.nombreHabitacion + '/' + item.nombreCama })
                    return arr
                }, []))
            } catch (e) {
                console.log(e);
            }
        }
        getDatos()

    }, [])



    const guardarEmergencia = async () => {
        let errors = []
        if (text.find(x => x.id === 'examen_fisico').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (text.find(x => x.id === 'tratamiento').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (text.find(x => x.id === 'motivo').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (text.find(x => x.id === 'enfermedad_actual').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (text.find(x => x.id === 'tiempo').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (diagnosticos.length === 0) {
            errors.push('No deben ir campos vacios')
        }

        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            }))
        } else {
            let obj = {
                examenfisico: text.find(x => x.id === 'examen_fisico').text,
                evoluciontto: text.find(x => x.id === 'tratamiento').text,
                motivo_consulta: text.find(x => x.id === 'motivo').text,
                antecedenteActual: text.find(x => x.id === 'enfermedad_actual').text,
                tiempoEvolucion: text.find(x => x.id === 'tiempo').text,
                persona: drawerOpen.item.datosUsuario.Nro_DocIdenti,
                documento: user.datos.numero_documento,
                estudios,
                diagnosticos,
                recetas,
                diagnosticoPrioridad,
                hospitalizacion: mostrar.find(x => x.id === 'hospi').value,
                otros: hospitaliza.find(x => x.id === 'otros').text,
                tiempo: hospitaliza.find(x => x.id === 'tiempo').text,
                requiere: hospitaliza.find(x => x.id === 'require').active,
                tto: hospitaliza.find(x => x.id === 'tiempo').text,
                observacion: mostrar.find(x => x.id === 'emergencia').value,
                camaSelected
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertConsultaBasica`, { ...obj })
            if (typeof response.data === 'object') {
                enqueueSnackbar(response.data.error, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                })
            } else {
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                })

                window.location.reload(true);
            }
        }
    }
    const guardarAmbulatorio = async () => {
        let errors = []
        if (text.find(x => x.id === 'examen_fisico').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (text.find(x => x.id === 'tratamiento').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (text.find(x => x.id === 'motivo').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (text.find(x => x.id === 'enfermedad_actual').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (text.find(x => x.id === 'tiempo').text.length === 0) {
            errors.push('No deben ir campos vacios')
        }
        if (diagnosticos.length === 0) {
            errors.push('No deben ir campos vacios')
        }

        if (errors.length > 0) {
            errors.map(x => enqueueSnackbar(x, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom,
                autoHideDuration: 1000
            }))
        } else {
            let obj = {
                medicion: mediciones[0],
                turno: id,
                examenfisico: text.find(x => x.id === 'examen_fisico').text,
                evoluciontto: text.find(x => x.id === 'tratamiento').text,
                motivo_consulta: text.find(x => x.id === 'motivo').text,
                antecedenteActual: text.find(x => x.id === 'enfermedad_actual').text,
                tiempoEvolucion: text.find(x => x.id === 'tiempo').text,
                persona: drawerOpen.item.datosUsuario.Nro_DocIdenti,
                documento: user.datos.numero_documento,
                diagnosticos,
                estudios,
                recetas,
                diagnosticoPrioridad,
                hospitalizacion: mostrar.find(x => x.id === 'hospi').value,
                otros: hospitaliza.find(x => x.id === 'otros').text,
                tiempo: hospitaliza.find(x => x.id === 'tiempo').text,
                requiere: hospitaliza.find(x => x.id === 'require').active,
                tto: hospitaliza.find(x => x.id === 'tiempo').text,
            }
            const response = await axios.post(`http://200.121.91.211:4001/insertConsultaBasicaAmbulatoriaPrueba`, { ...obj })
            if (typeof response.data === 'object') {
                enqueueSnackbar(response.data.error, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                })
            } else {
                enqueueSnackbar(response.data, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom,
                    autoHideDuration: 1000
                })

                window.location.reload(true);
            }
        }
    }
    const guardarConsulta = async () => {
        const rpta = await confirmSweetAlert(`${user.datos.ape_paterno} ${user.datos.ape_materno} ${user.datos.nombres}`, `Esta seguro que desea guardar la nueva consulta`, 'warning', true)
        if (rpta) {
            if (!noCita) {
                guardarEmergencia()
            } else {
                guardarAmbulatorio()
            }
        }

    }
    const addEstudiosModal = (array) => {
        addEstudios(array)
    }

    return (
        <>

            <Grid item lg={12} sx={{ mx: 2 }}>
                <Typography variant="h5" sx={{ mb: 1 }}><b>Tiempo de enfermedad</b></Typography>
                <TextField  value={text.find(x => x.id === 'tiempo').text} onChange={(e)=>handleChangedTextState(e.target.value, 'tiempo')} />
            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                <ComponenteHTML text={text.find(x => x.id === 'motivo')} handleChangedTextState={handleChangedTextState} title={'Motivo de consulta'} />
            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                <ComponenteHTML text={text.find(x => x.id === 'enfermedad_actual')} handleChangedTextState={handleChangedTextState} title={'Enfermedad actual'} />
            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                <ComponenteHTML text={text.find(x => x.id === 'examen_fisico')} handleChangedTextState={handleChangedTextState} title={'Examen físico'} />
            </Grid>
            <Grid item lg={9} sx={{ mx: 2 }}>
                <Typography variant="h5" sx={{ mb: 1 }}><b>Diagnóstico</b></Typography>
                <Autocomplete
                    inputValue={valores}
                    value={selected}
                    onChange={(_, value) => handleChanged(value)}
                    autoHighlight
                    options={array}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            onChange={(e) =>
                                setValores(e.target.value)
                            }
                            inputRef={input => {
                                inputRef = input;
                            }}
                            fullWidth
                            variant="outlined"
                            label={''}
                            placeholder={'Seleccione diagnostico ...'}
                        />
                    )}
                />
            </Grid>
            <Grid item lg={2} sx={{ mx: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        addDiagnostico()
                        setValores('')
                        setSelected(null)
                        inputRef.focus();
                    }}
                    sx={{ m: 0.2, mt: 4 }}
                >
                    Agregar
                </Button>
            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                {diagnosticos.length > 0 && <ListaDiagnostico removeDiagnostico={removeDiagnostico} changedDiagnosticoPrioridad={changedDiagnosticoPrioridad} diagnosticos={diagnosticos} diagnosticoPrioridad={diagnosticoPrioridad} />}
            </Grid>
            {noCita && <Grid item lg={4} sx={{ mx: 2 }}>
                <Typography variant="h5" sx={{ mb: 1 }}><b>Proxima cita</b></Typography>
                <TextField
                    fullWidth
                    label={''}
                    type={'date'}
                    value={proxima}
                    variant="outlined"
                    onChange={(e) => setProxima(e.target.value)}
                />
            </Grid>}

            <Grid item lg={12} sx={{ mx: 2 }}>
                <ComponenteHTML text={text.find(x => x.id === 'tratamiento')} handleChangedTextState={handleChangedTextState} title={'Tratamiento/Plan'} />
            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                {/* <Button
                    variant="outlined"

                    sx={{ float: 'right', m: 0.2 }}
                >
                    Orden de práctica
                </Button> */}
                {/* <Button
                    variant="outlined"

                    sx={{ float: 'right', m: 0.2 }}
                >
                    Informes
                </Button> */}
                <Button
                    variant="contained"
                    onClick={() => setMostrarReceta(x => !x)

                        //     mostrarComponent({
                        //     contenido: 'receta',
                        //     estado: true,
                        //     size: 'sm',
                        //     item: {
                        //         datosUsuario: drawerOpen.item.datosUsuario, addRecetas: (item) => addRecetas(item)
                        //     }
                        // }, 'modalOpen')


                    }
                    sx={{ float: 'right', m: 0.2 }}
                >
                    Agregar receta
                </Button>
                <Button
                    variant="contained"
                    onClick={() => mostrarComponent({
                        contenido: 'estudiosExternos',
                        estado: true,
                        size: 'xl',
                        item: {
                            datosUsuario: drawerOpen.item.datosUsuario, addEstudiosModal: (item) => addEstudiosModal(item)
                        }
                    }, 'modalOpen')}
                    sx={{ float: 'right', m: 0.2 }}
                >
                    Exámenes Auxiliares
                </Button>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={mostrar.find(x => x.id === 'hospi').value}
                            name="terms"
                            color="primary"
                            onChange={(e) => setMostrar(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === 'hospi' ? e.target.checked : item.value })
                                return arr
                            }, []))}
                        />

                    }
                    label={<><Typography variant='h4'>Requiere hospitalización</Typography></>}
                />
                {
                    !noCita && <FormControlLabel
                        control={
                            <Checkbox
                                checked={mostrar.find(x => x.id === 'emergencia').value}
                                name="terms"
                                color="primary"
                                onChange={(e) => setMostrar(x => x.reduce((arr, item) => {
                                    arr.push({ ...item, value: item.id === 'emergencia' ? e.target.checked : item.value })
                                    return arr
                                }, []))}
                            />

                        }
                        label={<><Typography variant='h4'>Requiere Observación</Typography></>}
                    />
                }

            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                {mostrarReceta && <ListaReceta removeRecetas={removeRecetas} recetas={recetas} addRecetas={addRecetas} />}
            </Grid>
            <Grid item lg={12} sx={{ mx: 2 }}>
                {estudios.length > 0 && <ListaEstudios removeEstudios={removeEstudios} estudios={estudios} />}
            </Grid>
            {mostrar.find(x => x.id === 'hospi').value && <Hospitalizacion handleSetHospitaliza={handleSetHospitaliza} />}
            {(!noCita && mostrar.find(x => x.id === 'emergencia').value) && <Grid item xs={12} lg={12} md={12} sx={{ mx: 2 }}>
                <Autocomplete
                    fullWidth
                    onChange={handleChangedCama}
                    options={camas}
                    getOptionLabel={(option) => option.title}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            label={'Camas'}
                            placeholder={'Seleccione cama'}
                        />
                    )}
                />
            </Grid>}


            <Grid item lg={12} sx={{ mx: 2 }}>
                <Divider />
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ float: 'right', m: 0.2, mt: 4 }}
                    onClick={guardarConsulta}
                >
                    Finalizar consulta
                </Button>
            </Grid>
        </>
    )
}
