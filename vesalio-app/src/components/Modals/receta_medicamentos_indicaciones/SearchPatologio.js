import { useState, useEffect } from 'react'
import { Autocomplete, Box, Button, Grid, TextField, Divider, Zoom, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from 'notistack';
import useLayoutContext from 'src/hooks/useAuthLayout';

export default function SearchInsumos() {
    let inputRef;
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [valores, setValores] = useState('')
    const [values, setValues] = useState([{ id: 'dosis', value: '' }, { id: 'unidad', value: '26' }, { id: 'duracion', value: '' }, { id: 'comentario', value: '' }, { id: 'frecuencia', value: '' }, { id: 'tipo_dosis', value: '1' }, { id: 'hora', value: '00:00' }])
    const [array, setArray] = useState([])
    const [viaAdministracion, setViaAdministracion] = useState([])
    const [unidadMedida, setunidadMedida] = useState([])
    const [selected, setSelected] = useState(null)
    const [selectedVia, setSelectedVia] = useState(null)


    const valoresxDefault = () => {
        setValores('')
        setValues([{ id: 'dosis', value: '' }, { id: 'unidad', value: '26' }, { id: 'duracion', value: '' }, { id: 'comentario', value: '' }, { id: 'frecuencia', value: '' }, { id: 'tipo_dosis', value: '1' }, { id: 'hora', value: '00:00' }])
        setArray([])
        setSelected(null)
        setSelectedVia(null)
    }

    const { modalOpen } = useLayoutContext()

    useEffect(() => {
        const getFrecuencia = async () => {
            try {
                const response = await axios.get(`http://200.121.91.211:4001/frecuencia_viaAdministracion`)
                setViaAdministracion(response.data.viaAdministracion)
                setunidadMedida(response.data.unidadMedida)
            } catch (e) {
                console.log(e);
            }

        }
        getFrecuencia()
    }, [])

    useEffect(() => {
        if (inputRef !== undefined) {
            inputRef.focus();
        }
        const getDatos = async (query) => {
            try {
                const diagnosticos = await axios.get(`http://200.121.91.211:4001/medicamentos/${query}`)
                setArray(diagnosticos.data.reduce((arr, item) => {
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

    }, [valores, inputRef])

    const handleChanged = (value) => {
        if (value !== null) {
            setValores(value.label);
            setSelected(value)
        } else {
            setValores('');
            setSelected(null)
        }

    }

    const handleClickGuardar = async () => {
        let errors = []
        if (selected === null) {
            errors.push('Debe seleccionar un medicamento')
        } else if (selectedVia === null) {
            errors.push('Debe seleccionar una via de administración')
        } else if (values.filter(x => x.id !== 'comentario' && x.value.length === 0) > 0) {
            errors.push('No debe existir campos vacios')
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

                medicamento: selected,
                frecuencia: values.find(x => x.id === 'frecuencia').value,
                duracion: values.find(x => x.id === 'duracion').value,
                dosis: values.find(x => x.id === 'dosis').value,
                unidadMedida: unidadMedida.find(x => x.id.toString() === values.find(x => x.id === 'unidad').value),
                viaAdministracion: selectedVia,
              
                comentario: values.find(x => x.id === 'comentario').value,
            }
            modalOpen.item.addRecetas(obj)
            valoresxDefault()
            enqueueSnackbar('Medicamento agregado', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                TransitionComponent: Zoom
            })
        }

    }
    const handleChangedVia = (e, newValue) => {
        if (newValue !== null) {
            setSelectedVia(newValue)
        } else {
            setSelectedVia(null)
        }
    }

    return (
        <>
            <Box
                sx={{
                    mt: 4,
                    p: 2,
                    alignItems: 'center'
                }}
            >
                <Grid alignItems="center" container spacing={2}>
                    <Grid item xs={12} lg={12} md={10}>
                        <Autocomplete
                            sx={{
                                mt: -3
                            }}
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
                                    fullWidth
                                    inputRef={input => {
                                        inputRef = input;
                                    }}
                                    variant="outlined"
                                    label={'Medicamentos'}
                                    placeholder={t('Seleccione medicamento ...')}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6} lg={4} md={4}>
                        <TextField
                            fullWidth
                            label={'Dosis'}
                            name={'dosis'}
                            type={'number'}
                            value={values.find(x => x.id === 'dosis').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4} md={4}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>UM</InputLabel>
                            <Select
                                value={values.find(x => x.id === 'unidad').value}
                                label="UM"
                                name='unidad'
                                onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                    arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                    return arr;
                                }, []))}
                            >
                                {unidadMedida.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} md={8}>
                        <Autocomplete
                            fullWidth
                            onChange={handleChangedVia}
                            options={viaAdministracion.reduce((arr, item) => {
                                arr.push({
                                    id: item.id,
                                    title: `${item.nombre}`
                                })
                                return arr
                            }, [])}
                            getOptionLabel={(option) => option.title}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    variant="outlined"
                                    label={'Via de administración'}
                                    placeholder={'Seleccione via de administración'}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6} lg={4} md={4} >
                        <TextField
                            fullWidth
                            label={'Frecuencia(hrs)'}
                            name={'frecuencia'}
                            type={'number'}
                            value={values.find(x => x.id === 'frecuencia').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
                        />
                    </Grid>
                    <Grid item xs={6} lg={4} md={4} >
                        <TextField
                            fullWidth
                            label={'Duración tto(días)'}
                            name={'duracion'}
                            type={'number'}
                            value={values.find(x => x.id === 'duracion').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
                        />
                    </Grid>
                    <Grid item xs={12} lg={12} md={12}>
                        <TextField
                            fullWidth
                            label={'Comentario'}
                            name={'comentario'}
                            type={'text'}
                            multiline
                            rows={3}
                            value={values.find(x => x.id === 'comentario').value}
                            variant="outlined"
                            onChange={(e) => setValues(x => x.reduce((arr, item) => {
                                arr.push({ ...item, value: item.id === e.target.name ? e.target.value : item.value })
                                return arr;
                            }, []))}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Button
                variant="contained"
                onClick={handleClickGuardar}
                sx={{ float: 'right', m: 2 }}
                startIcon={<SaveIcon />}>
                Guardar
            </Button>

        </>

    )
}
