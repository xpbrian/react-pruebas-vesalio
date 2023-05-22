import { Autocomplete, Box, Button, Divider, Zoom, FormControl, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import useLayoutContext from 'src/hooks/useAuthLayout';
import ComponenteHTML from './ComponenteHTML';
import ListaDiagnostico from './ListaDiagnostico'
import ListaReceta from './ListaRecetas'


export default function Index() {
    const arrayConsulta = [{ value: '01', label: '1° Vez' }, { value: '02', label: 'Ulterior' }]
    const { mostrarComponent, drawerOpen } = useLayoutContext()
    const { enqueueSnackbar } = useSnackbar();
    const [text, setText] = useState([{ id: 'motivo', text: '' }, { id: 'enfermedad_actual', text: '' }, { id: 'examen_fisico', text: '' }, { id: 'tratamiento', text: '' }])
    const [valores, setValores] = useState('')
    const [selected, setSelected] = useState(null)
    const [array, setArray] = useState([])
    const [proxima, setProxima] = useState('')
    const [diagnosticos, setDiagnosticos] = useState([])
    const [diagnosticoPrioridad, setDiagnosticoPrioridad] = useState('')
    const [recetas, setRecetas] = useState([])

    const handleChanged = (value) => {
        setValores(value === null ? '' : value.label);
        setSelected(value)
    }

    const handleChangedTextState = (t, id) => {
        setText(x => x.reduce((arr, item) => {
            arr.push({ ...item, text: item.id === id ? t : item.text })
            return arr
        }, []))
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
        setValores('')
        setSelected(null)

    }, [diagnosticos])

    const addDiagnostico = () => {
        if (selected !== null) {
            if (diagnosticos.find(x => x.id === selected.id) === undefined) {
                if (diagnosticos.length === 0) {
                    setDiagnosticoPrioridad(selected.id)
                }
                setDiagnosticos([...diagnosticos, { ...selected }])
            } else {
                enqueueSnackbar('Ya agrego un diagnosticos igual.', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    },
                    TransitionComponent: Zoom
                })
            }

        } else {
            enqueueSnackbar('Debe seleccionar un diagnóstico', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
        }
    }
    const changedDiagnosticoPrioridad = (id) => {
        setDiagnosticoPrioridad(id)
    }
    const addRecetas = (item) => {
        setRecetas([...recetas, item])
    }
    const removeDiagnostico = (id) => {
        setDiagnosticos(x => x.filter(y => y.id !== id))
        if (diagnosticoPrioridad === id) {
            setDiagnosticoPrioridad('')
        }
    }
    const removeRecetas = (id) => {
        setRecetas(x => x.filter(y =>y.medicamento.id !== id))
    }
    return (
        <>
            <Grid container spacing={1} sx={{ my: 1, pb: 3 }}>
                <Grid item lg={12}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                sx={{ mb: 1 }}
                            >
                                {
                                    arrayConsulta.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio size="small" />} label={item.label} />)
                                }

                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Divider />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'motivo')} handleChangedTextState={handleChangedTextState} title={'Motivo de consulta'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'enfermedad_actual')} handleChangedTextState={handleChangedTextState} title={'Antecedentes de enfermedad actual'} />
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
                                // onKeyDown={(e, _) => keyPressHandleAutocomplete(e.key)}
                                fullWidth
                                // inputRef={input => {
                                //     inputRef = input;
                                // }}
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
                        onClick={() => addDiagnostico()}
                        sx={{ m: 0.2, mt: 4 }}
                    >
                        Agregar
                    </Button>
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    {diagnosticos.length > 0 && <ListaDiagnostico removeDiagnostico={removeDiagnostico} changedDiagnosticoPrioridad={changedDiagnosticoPrioridad} diagnosticos={diagnosticos} diagnosticoPrioridad={diagnosticoPrioridad} />}
                </Grid>
                <Grid item lg={4} sx={{ mx: 2 }}>
                    <Typography variant="h5" sx={{ mb: 1 }}><b>Proxima cita</b></Typography>
                    <TextField
                        fullWidth
                        label={''}
                        type={'date'}
                        value={proxima}
                        variant="outlined"
                        onChange={(e) => setProxima(e.target.value)}
                    />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <ComponenteHTML text={text.find(x => x.id === 'tratamiento')} handleChangedTextState={handleChangedTextState} title={'Tratamiento/Plan'} />
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>

                    {/* <Button
                        variant="contained"
                        sx={{ float: 'right', m: 0.2 }}
                    >
                        Informes
                    </Button> */}
                    <Button
                        variant="contained"
                        onClick={() => mostrarComponent({
                            contenido: 'receta',
                            estado: true,
                            size: 'sm',
                            item: {
                                datosUsuario: drawerOpen.item.datosUsuario, addRecetas: (item) => addRecetas(item)
                            }
                        }, 'modalOpen')}
                        sx={{ float: 'right', m: 0.2 }}
                    >
                        Agregar receta
                    </Button>
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    {recetas.length > 0 && <ListaReceta removeRecetas={removeRecetas} recetas={recetas} />}
                </Grid>
                <Grid item lg={12} sx={{ mx: 2 }}>
                    <Divider />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ float: 'right', m: 0.2, mt: 4 }}
                    >
                        Finalizar consulta
                    </Button>
                </Grid>
            </Grid>

        </>
    )
}
